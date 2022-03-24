package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aptech.backend.dto.CourseDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.ReviewDto;
import vn.aptech.backend.dto.request.review.ReviewCreateRequest;
import vn.aptech.backend.dto.request.review.ReviewUpdateRequest;
import vn.aptech.backend.dto.response.review.ReviewAdminResponse;
import vn.aptech.backend.entity.AppUser;
import vn.aptech.backend.entity.Course;
import vn.aptech.backend.entity.Review;
import vn.aptech.backend.repository.CourseRepository;
import vn.aptech.backend.repository.ReviewRepository;
import vn.aptech.backend.service.ReviewService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ResponseEntity<?> fillAll(Pageable pageable) {
        Page<Review> reviews = repository.findByDeletedDateIsNull(pageable);
        Page<ReviewAdminResponse> reviewDtoPage = reviews.map(this::convertEntityToAdminResponse);
        return new ResponseHandler<>().sendSuccess(reviewDtoPage);
    }

    @Override
    @Transactional
    public ResponseEntity<?> create(ReviewCreateRequest request) {
        Course course = courseRepository.findByIdAndDeletedDateIsNull(request.getCourseId()).orElse(null);
        if (course == null) {
            return new ResponseHandler<CourseDto>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        Review review = mapper.map(request,Review.class);
        AppUser user = securityUtils.getPrincipal();
        review.setUser(user);
        review.setCourse(course);
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(review),ReviewDto.class));
    }

    @Override
    @Transactional
    public ResponseEntity<?> update(ReviewUpdateRequest request) {
        Course course = courseRepository.findByIdAndDeletedDateIsNull(request.getCourseId()).orElse(null);
        if (course == null) {
            return new ResponseHandler<CourseDto>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        Review review = repository.findByIdAndDeletedDateIsNull(request.getId()).orElse(null);
        if (review == null) {
            return new ResponseHandler<CourseDto>().sendError(StatusErrorEnums.REVIEW_NOT_FOUND);
        }
        review.setRatting(request.getRatting());
        review.setFeedback(request.getFeedback());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(review),ReviewDto.class));
    }

    @Override
    public ResponseEntity<?> delete(long id) {
        Review review = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (review == null) {
            return new ResponseHandler<CourseDto>().sendError(StatusErrorEnums.REVIEW_NOT_FOUND);
        }
        review.setDeletedDate(new Date());
        repository.save(review);
        return new ResponseHandler<>().sendSuccess("Deleted successful");
    }

    public ReviewAdminResponse convertEntityToAdminResponse(Review review){
        ReviewAdminResponse result = mapper.map(review,ReviewAdminResponse.class);
        result.setCourseTitle(review.getCourse().getTitle());
        result.setUsername(review.getUser().getUsername());
        return result;
    }
}
