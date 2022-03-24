package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aptech.backend.dto.LessonDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.request.lesson.LessonCreateRequest;
import vn.aptech.backend.dto.request.lesson.LessonUpdateRequest;
import vn.aptech.backend.entity.Course;
import vn.aptech.backend.entity.Lesson;
import vn.aptech.backend.repository.CourseRepository;
import vn.aptech.backend.repository.LectureRepository;
import vn.aptech.backend.repository.LessonRepository;
import vn.aptech.backend.service.LessonService;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private LessonRepository repository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ResponseEntity<?> findByCourseId(long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        List<Lesson> lessons = repository.findByCourseIdAndDeletedDateIsNull(courseId);
        List<LessonDto> result = lessons.stream().map(lesson -> mapper.map(lesson, LessonDto.class)).collect(Collectors.toList());

        return new ResponseHandler<>().sendSuccess(result);
    }

    @Override
    public ResponseEntity<?> findById(long id) {
        Lesson lesson = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (lesson == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LESSON_NOT_FOUND);
        }
        return new ResponseHandler<>().sendSuccess(mapper.map(lesson, LessonDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> create(LessonCreateRequest request) {
        Course course = courseRepository.findById(request.getCourseId()).orElse(null);
        if (course == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        Lesson lesson = mapper.map(request, Lesson.class);
        lesson.setCourse(course);
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(lesson), LessonDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> update(LessonUpdateRequest request) {
        Lesson lesson = repository.findByIdAndDeletedDateIsNull(request.getId()).orElse(null);
        if (lesson == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LESSON_NOT_FOUND);
        }
        Course course = courseRepository.findById(request.getCourseId()).orElse(null);
        if (course == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        if (lesson.getCourse() != course) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LESSON_NOT_IN_COURSE);
        }
        lesson.setTitle(request.getTitle());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(lesson), LessonDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> delete(long id) {
        Lesson lesson = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (lesson == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.LESSON_NOT_FOUND);
        }
        lesson.getLectures().forEach(lecture -> {
            lecture.setDeletedDate(new Date());
            lectureRepository.save(lecture);
        });
        lesson.setDeletedDate(new Date());
        repository.save(lesson);
        return new ResponseHandler<>().sendSuccess("Deleted Success");
    }
}
