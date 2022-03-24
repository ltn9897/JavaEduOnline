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
import vn.aptech.backend.dto.PageDto;
import vn.aptech.backend.dto.request.review.ReviewCreateRequest;
import vn.aptech.backend.dto.request.review.ReviewUpdateRequest;
import vn.aptech.backend.service.ReviewService;

@RestController
@RequestMapping("/api")
public class ReviewController implements BaseController{

    @Autowired
    private ReviewService service;

    @Admin
    @GetMapping("/reviews")
    public ResponseEntity<?> getAllReviews(PageDto page){
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.fillAll(pageable);
    }

    @User
    @PostMapping("/review/create")
    public ResponseEntity<?> update(@Validated @RequestBody ReviewCreateRequest request){
        return service.create(request);
    }

    @User
    @PostMapping("/review/update")
    public ResponseEntity<?> update(@Validated @RequestBody ReviewUpdateRequest request){
        return service.update(request);
    }

    @User
    @GetMapping("/review/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){
        return service.delete(id);
    }
}
