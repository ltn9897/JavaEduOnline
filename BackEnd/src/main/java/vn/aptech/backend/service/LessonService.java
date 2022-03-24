package vn.aptech.backend.service;

import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.request.lesson.LessonCreateRequest;
import vn.aptech.backend.dto.request.lesson.LessonUpdateRequest;

public interface LessonService {
    ResponseEntity<?> findByCourseId(long courseId);

    ResponseEntity<?> findById(long id);

    ResponseEntity<?> create(LessonCreateRequest request);

    ResponseEntity<?> update(LessonUpdateRequest request);

    ResponseEntity<?> delete(long id);
}
