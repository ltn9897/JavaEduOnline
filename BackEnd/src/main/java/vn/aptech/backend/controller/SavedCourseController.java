package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.aptech.backend.annotation.User;
import vn.aptech.backend.service.SavedCourseService;

@RestController
@RequestMapping("/api")
public class SavedCourseController implements BaseController{

    @Autowired
    private SavedCourseService service;

    @User
    @GetMapping("/savedcourse/save/{courseId}")
    public ResponseEntity<?> savedCourse(@PathVariable int courseId){
        return service.savedCourse(courseId);
    }

    @User
    @GetMapping("/savedcourse/unsaved/{courseId}")
    public ResponseEntity<?> unSavedCourse(@PathVariable int courseId){
        return service.unsaved(courseId);
    }
}
