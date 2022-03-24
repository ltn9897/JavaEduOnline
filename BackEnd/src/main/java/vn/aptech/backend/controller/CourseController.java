package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.annotation.Admin;
import vn.aptech.backend.annotation.User;
import vn.aptech.backend.dto.CourseDto;
import vn.aptech.backend.dto.PageDto;
import vn.aptech.backend.dto.request.course.CourseCreateRequest;
import vn.aptech.backend.dto.request.course.CourseDraftCreateRequest;
import vn.aptech.backend.dto.request.course.CourseUpdateRequest;
import vn.aptech.backend.service.CourseService;
import vn.aptech.backend.service.LessonService;

@RestController
@RequestMapping("/api")
public class CourseController implements BaseController {
    @Autowired
    private CourseService service;

    @Autowired
    private LessonService lessonService;

    @GetMapping("/languages")
    public ResponseEntity<?> getLanguages() {
        return service.getLanguages();
    }

    @GetMapping("/courses")
    public ResponseEntity<Page<CourseDto>> getAllCourses(PageDto page) {
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.fillAll(pageable);
    }

    @GetMapping("/courses/top-seller")
    public ResponseEntity<Page<CourseDto>> getTopCourse(PageDto page){
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.findTopCourse(pageable);
    }

    @Admin
    @GetMapping("/course/filter")
    public ResponseEntity<Page<CourseDto>> filterCourse(String filter, PageDto page){
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.filterCourse(filter,pageable);
    }

    @Admin
    @PostMapping("/course/create")
    public ResponseEntity<?> create(@Validated @RequestBody CourseCreateRequest request) {
        return service.create(request);
    }

    @Admin
    @PostMapping("/course/create-draft")
    public ResponseEntity<?> create(@Validated @RequestBody CourseDraftCreateRequest request) {
        return service.createCourseDraft(request);
    }

    @Admin
    @PostMapping("/course/update")
    public ResponseEntity<?> update(@RequestBody CourseUpdateRequest request) {
        return service.update(request);
    }


    @GetMapping("/course/search")
    public ResponseEntity<Page<CourseDto>> findByCourseTitle(String title, PageDto page) {
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.findByCourseTitle(title, pageable);
    }

    @GetMapping("course/{id}")
    public ResponseEntity<CourseDto> getById(@PathVariable("id") Long id) {
        return service.findById(id);
    }

    @GetMapping("/course/{id}/lessons")
    public ResponseEntity<?> getLessonsByCourseId(@PathVariable("id") int courseId) {
        return lessonService.findByCourseId(courseId);
    }

    @Admin
    @DeleteMapping("/course/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return service.delete(id);
    }

    @User
    @GetMapping("/course/savedcourses")
    public ResponseEntity<?> getAllSavedCourse() {
        return service.fillAllSavedCourse();
    }

    @User
    @GetMapping("/course/enroll")
    public ResponseEntity<?> getAllPurchasedCourses() {
        return service.fillAllPurchasedCoursed();
    }
}