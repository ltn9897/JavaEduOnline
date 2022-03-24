package vn.aptech.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.entity.AppUser;
import vn.aptech.backend.entity.Course;
import vn.aptech.backend.entity.SavedCourse;
import vn.aptech.backend.repository.CourseRepository;
import vn.aptech.backend.repository.SavedCourseRepository;
import vn.aptech.backend.service.SavedCourseService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;

@Service
public class SavedCourseServiceImpl implements SavedCourseService {

    @Autowired
    private SavedCourseRepository repository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    @Transactional
    public ResponseEntity<?> savedCourse(long courseId) {
        AppUser user = securityUtils.getPrincipal();
        Course course = courseRepository.findByIdAndDeletedDateIsNull(courseId).orElse(null);
        SavedCourse savedCourse = new SavedCourse();
        savedCourse.setUser(user);
        savedCourse.setCourse(course);
        repository.save(savedCourse);
        return new ResponseHandler<>().sendSuccess("Saved course success");
    }

    @Override
    @Transactional
    public ResponseEntity<?> unsaved(long courseId) {
        AppUser user = securityUtils.getPrincipal();
        Course course = courseRepository.findByIdAndDeletedDateIsNull(courseId).orElse(null);
        if(course == null){
            return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
        }
        SavedCourse savedCourse = repository.findByCourseIdAndUserIdAndDeletedDateIsNull(courseId, user.getId()).orElse(null);
        if(savedCourse == null){
            return new ResponseHandler<>().sendError(StatusErrorEnums.SAVED_COURSE_NOT_FOUND);
        }
        savedCourse.setDeletedDate(new Date());
        repository.save(savedCourse);
        return new ResponseHandler<>().sendSuccess("Unsaved course success");
    }
}
