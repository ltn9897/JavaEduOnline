package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aptech.backend.dto.CourseDto;
import vn.aptech.backend.dto.LessonDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.ReviewDto;
import vn.aptech.backend.dto.request.course.CourseCreateRequest;
import vn.aptech.backend.dto.request.course.CourseDraftCreateRequest;
import vn.aptech.backend.dto.request.course.CourseUpdateRequest;
import vn.aptech.backend.entity.*;
import vn.aptech.backend.repository.*;
import vn.aptech.backend.service.CourseService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.LanguageEnum;
import vn.aptech.backend.utils.enums.RoleEnums;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository repository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private SubCatalogRepository subCatalogRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private SavedCourseRepository savedCourseRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ModelMapper mapper;

    @Transactional
    @Override
    public ResponseEntity<?> create(CourseCreateRequest request) {
        SubCatalog subCatalog = subCatalogRepository.findById(request.getSubCatalogId()).orElse(null);
        if (subCatalog == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.SUBCATALOG_NOT_FOUND);
        }
        Course course = this.convertSignupRequestToAppCourse(request);

        course.setSubCatalog(subCatalog);
        Course newCourse = repository.save(course);
        request.getLessons().forEach(lessonCreateRequest -> {
            Lesson lesson = mapper.map(lessonCreateRequest, Lesson.class);
            lesson.setCourse(course);
            lessonRepository.save(lesson);
            lessonCreateRequest.getLectures().forEach(lectureCreateRequest -> {
                Lecture lecture = mapper.map(lectureCreateRequest, Lecture.class);
                lecture.setLesson(lesson);
                lectureRepository.save(lecture);
            });
        });
        return new ResponseHandler<>().sendSuccess(mapper.map(newCourse, CourseDto.class));
    }

    @Override
    @Transactional
    public ResponseEntity<?> createCourseDraft(CourseDraftCreateRequest request) {
        SubCatalog subCatalog = subCatalogRepository.findById(request.getSubCatalogId()).orElse(null);
        if (subCatalog == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.SUBCATALOG_NOT_FOUND);
        }
        Course course = mapper.map(request, Course.class);
        course.setActivate(false);
        course.setSubCatalog(subCatalog);
        Course newCourse = repository.save(course);
        return new ResponseHandler<>().sendSuccess(mapper.map(newCourse, CourseDto.class));
    }

    @Override
    public ResponseEntity<Page<CourseDto>> findTopCourse(Pageable pageable) {
        Page<Course> courses = repository.findTopCourseUser(pageable);
        Page<CourseDto> courseDtoPage = courses.map(this::convertEntityToDto);
        return new ResponseHandler<Page<CourseDto>>().sendSuccess(courseDtoPage);
    }

    @Override
    @SuppressWarnings("Duplicates")
    public ResponseEntity<Page<CourseDto>> fillAll(Pageable pageable) {
        Page<Course> courses = null;
        AppUser user = securityUtils.getPrincipal();
        if (user != null && user.getRole().getName().equals(RoleEnums.ROLE_ADMIN.name())) {
            courses = repository.findCourseByDeletedDateIsNull(pageable);
        } else {
            courses = repository.findCourseByActivateIsTrueAndDeletedDateIsNull(pageable);
        }

        Page<CourseDto> courseDtoPage = courses.map(this::convertEntityToDto);
        return new ResponseHandler<Page<CourseDto>>().sendSuccess(courseDtoPage);
    }

    @Override
    @SuppressWarnings("Duplicates")
    public ResponseEntity<Page<CourseDto>> findByCourseTitle(String name, Pageable pageable) {
        Page<Course> courses = repository.findCourseByTitleLikeAndDeletedDateIsNull("%" + name + "%", pageable);
        Page<CourseDto> courseDtoPage = courses.map(this::convertEntityToDto);
        return new ResponseHandler<Page<CourseDto>>().sendSuccess(courseDtoPage);
    }

    @Transactional
    @Override
    public ResponseEntity<?> update(CourseUpdateRequest request) {
        SubCatalog subCatalog = subCatalogRepository.findById(request.getSubCatalogId()).orElse(null);
        if (subCatalog == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.SUBCATALOG_NOT_FOUND);
        }
        Course course = repository.findByIdAndDeletedDateIsNull(request.getId()).orElse(null);
        if (course == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        course.setTitle(request.getTitle());
        course.setShortDescription(request.getShortDescription());
        course.setSubCatalog(subCatalog);
        course.setDescription(request.getDescription());
        course.setRequirement(request.getRequirement());
        course.setWhoThisCourseIsFor(request.getWhoThisCourseIsFor());
        course.setWhatYouWillLearn(request.getWhatYouWillLearn());
        course.setActivate(request.isActivate());
        course.setLanguage(request.getLanguage());
        course.setPrice(request.getPrice());
        course.setVideoDuration(request.getVideoDuration());
        course.setUrlVideoDescription(request.getUrlVideoDescription());
        course.setImageVideoDescription(request.getImageVideoDescription());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(course), CourseDto.class));
    }

    @Override
    public ResponseEntity<CourseDto> findById(Long id) {
        Course course = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (course == null) {
            return new ResponseHandler<CourseDto>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }

        CourseDto result = mapper.map(course, CourseDto.class);

        result.setSubCatalogId(course.getSubCatalog().getId());

        List<Lesson> lessons = lessonRepository.findByCourseIdAndDeletedDateIsNull(id);

        lessons.forEach(lesson -> {
            lesson.setLectures(lectureRepository.findByLessonIdAndDeletedDateIsNullOrderBySortAsc(lesson.getId()));
        });

        List<LessonDto> lessonDtos = lessons.stream()
                .map(lesson -> mapper.map(lesson, LessonDto.class))
                .collect(Collectors.toList());
        result.setLessons(lessonDtos);

        List<ReviewDto> reviews = reviewRepository.findByCourseIdAndDeletedDateIsNull(id)
                .stream().map(review -> {
                    ReviewDto reviewDto = mapper.map(review, ReviewDto.class);
                    reviewDto.setUsername(review.getUser().getUsername());
                    return reviewDto;
                })
                .collect(Collectors.toList());
        result.setReviews(reviews);

        List<Orders> orders = ordersRepository.findOrdersByCourseId(id);

        result.setTotalSold(orders.size());

        AppUser user = securityUtils.getPrincipal();
        if (user != null) {
            SavedCourse savedCourse = savedCourseRepository.findByCourseIdAndUserIdAndDeletedDateIsNull(id, user.getId()).orElse(null);
            result.setSaved(savedCourse != null);
            for(Orders order : orders){
                if (order.getUser().getId().equals(user.getId()) || user.getRole().getName().equals(RoleEnums.ROLE_ADMIN.name())) {
                    result.setPurchased(true);
                    break;
                } else {
                    result.setPurchased(false);
                    result.getLessons().forEach(lessonDto -> lessonDto.getLectures().forEach(lectureDto -> {
                        if (!lectureDto.isPreview()) {
                            lectureDto.setVideoUrl(null);
                        }
                    }));
                }
            }
            orders.forEach(order -> {

            });
            Review userReview = reviewRepository.findByCourseIdAndUserIdAndDeletedDateIsNull(id, user.getId()).orElse(null);
            if (userReview != null) {
                result.setUserReview(mapper.map(userReview, ReviewDto.class));

            } else {
                result.setUserReview(null);
            }
        } else {
            result.setSaved(false);
            result.setPurchased(false);
            result.getLessons().forEach(lessonDto -> lessonDto.getLectures().forEach(lectureDto -> {
                if (!lectureDto.isPreview()) {
                    lectureDto.setVideoUrl(null);
                }
            }));
            result.setPurchased(false);
            result.setUserReview(null);
        }
        if (result.getReviews().size() > 0) {
            float totalRating = 0;
            for (Review review : course.getReviews()) {
                totalRating += review.getRatting();
            }
            result.setAvgRatting(totalRating / course.getReviews().size());
        } else {
            result.setAvgRatting(0);
        }


        return new ResponseHandler<CourseDto>().sendSuccess(result);
    }

    @Override
    public ResponseEntity<?> getLanguages() {
        Map<String, String> result = new LinkedHashMap<>();
        for (LanguageEnum languageEnum : LanguageEnum.values()) {
            result.put(languageEnum.name(), languageEnum.getValue());
        }
        return new ResponseHandler<>().sendSuccess(result);
    }

    @Transactional
    @Override
    public ResponseEntity<?> delete(Long id) {
        Course course = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (course == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        course.setDeletedDate(new Date());
        course.getLessons().forEach(lesson -> {
            lesson.setDeletedDate(new Date());
            lesson.getLectures().forEach(lecture -> lecture.setDeletedDate(new Date()));

        });
        repository.save(course);
        return new ResponseHandler<>().sendSuccess("Deleted success");
    }

    @Override
    public ResponseEntity<?> fillAllSavedCourse() {
        AppUser appUser = securityUtils.getPrincipal();
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        List<Course> courses = repository.findCourseSavedByUserId(appUser.getId());

        List<CourseDto> result = courses.stream().map(course -> {
            CourseDto courseDto = mapper.map(course, CourseDto.class);
            courseDto.setLessons(null);
            return courseDto;
        }).collect(Collectors.toList());
        return new ResponseHandler<>().sendSuccess(result);
    }

    @Override
    public ResponseEntity<?> fillAllPurchasedCoursed() {
        AppUser user = securityUtils.getPrincipal();

        List<Course> courses = repository.findCoursesByUserId(user.getId());

        List<CourseDto> result = courses.stream().map(course -> mapper.map(course, CourseDto.class)).collect(Collectors.toList());
        return new ResponseHandler<>().sendSuccess(result);
    }

    @Override
    public ResponseEntity<Page<CourseDto>> filterCourse(String filter, Pageable pageable) {
        Page<Course> courses = null;
        switch (filter) {
            case "Draft":
                courses = repository.findByActivateAndDeletedDateIsNull(false, pageable);
                break;
            case "Activate":
                courses = repository.findByActivateAndDeletedDateIsNull(true, pageable);
                break;
            default:
                courses = repository.findCourseByDeletedDateIsNull(pageable);
                break;
        }
        Page<CourseDto> courseDtoPage = courses.map(this::convertEntityToDto);
        return new ResponseHandler<Page<CourseDto>>().sendSuccess(courseDtoPage);
    }


    public Course convertSignupRequestToAppCourse(CourseCreateRequest request) {
        Course result = mapper.map(request, Course.class);
        return result;
    }

    @SuppressWarnings("Duplicates")
    public CourseDto convertEntityToDto(Course course) {
        CourseDto courseDto = mapper.map(course, CourseDto.class);
        courseDto.setCatalog(course.getSubCatalog().getCatalog().getName());
        List<Orders> orders = ordersRepository.findOrdersByCourseId(course.getId());
        courseDto.setTotalSold(course.getOrderDetails().size());
        courseDto.setReviews(null);
        courseDto.setLessons(null);
        List<Review> reviews = reviewRepository.findByCourseIdAndDeletedDateIsNull(course.getId());
        if (reviews.size() > 0) {
            float totalRating = 0;
            for (Review review : reviews) {
                totalRating += review.getRatting();
            }
            courseDto.setAvgRatting(totalRating / reviews.size());
        } else {
            courseDto.setAvgRatting(0);
        }
        return courseDto;

    }
}
