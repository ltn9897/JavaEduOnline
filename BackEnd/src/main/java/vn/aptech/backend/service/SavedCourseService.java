package vn.aptech.backend.service;

import org.springframework.http.ResponseEntity;

public interface SavedCourseService {
    ResponseEntity<?> savedCourse(long courseId);

    ResponseEntity<?> unsaved(long courseId);
}
