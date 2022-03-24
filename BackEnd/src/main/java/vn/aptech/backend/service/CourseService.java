package vn.aptech.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.CourseDto;
import vn.aptech.backend.dto.request.course.CourseDraftCreateRequest;
import vn.aptech.backend.dto.request.course.CourseUpdateRequest;
import vn.aptech.backend.dto.request.course.CourseCreateRequest;

public interface CourseService {

    ResponseEntity<?> create(CourseCreateRequest request);

    ResponseEntity<Page<CourseDto>> fillAll(Pageable pageable);

    ResponseEntity<Page<CourseDto>> findByCourseTitle(String name, Pageable pageable);

    ResponseEntity<?> update(CourseUpdateRequest request);

    ResponseEntity<CourseDto> findById(Long id);

    ResponseEntity<?> getLanguages();

    ResponseEntity<?> delete(Long id);

    ResponseEntity<?> fillAllSavedCourse();

    ResponseEntity<?> fillAllPurchasedCoursed();

    ResponseEntity<Page<CourseDto>> filterCourse(String filter, Pageable pageable);

    ResponseEntity<?> createCourseDraft(CourseDraftCreateRequest request);

    ResponseEntity<Page<CourseDto>> findTopCourse(Pageable pageable);
}
