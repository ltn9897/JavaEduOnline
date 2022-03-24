package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.annotation.Admin;
import vn.aptech.backend.dto.request.lesson.LessonCreateRequest;
import vn.aptech.backend.dto.request.lesson.LessonUpdateRequest;
import vn.aptech.backend.service.LessonService;

@RestController
@RequestMapping("/api")
public class LessonController implements BaseController{

    @Autowired
    private LessonService service;

    @GetMapping("/lesson/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        return service.findById(id);
    }

    @Admin
    @PostMapping("/lesson/create")
    public ResponseEntity<?> create(@Validated @RequestBody LessonCreateRequest request) {
        return service.create(request);
    }

    @Admin
    @PostMapping("/lesson/update")
    public ResponseEntity<?> update(@Validated @RequestBody LessonUpdateRequest request) {
        return service.update(request);
    }

    @Admin
    @DeleteMapping("/lesson/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        return service.delete(id);
    }

}
