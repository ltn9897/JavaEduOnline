package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.annotation.Admin;
import vn.aptech.backend.dto.request.lecture.LectureCreateRequest;
import vn.aptech.backend.dto.request.lecture.LectureUpdateRequest;
import vn.aptech.backend.service.LectureService;

@RestController
@RequestMapping("/api")
public class LectureController implements BaseController {

    @Autowired
    private LectureService service;

    @GetMapping("/lecture/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        return service.findById(id);
    }

    @Admin
    @PostMapping("/lecture/create")
    public ResponseEntity<?> create(@Validated @RequestBody LectureCreateRequest request){
        return service.create(request);
    }

    @Admin
    @PostMapping("/lecture/update")
    public ResponseEntity<?> update(@Validated @RequestBody LectureUpdateRequest request){
        return service.update(request);
    }

    @Admin
    @DeleteMapping("/lecture/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id){
        return service.delete(id);
    }
}
