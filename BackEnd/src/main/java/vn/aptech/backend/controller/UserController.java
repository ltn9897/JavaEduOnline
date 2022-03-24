package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vn.aptech.backend.annotation.Admin;
import vn.aptech.backend.annotation.AllRole;
import vn.aptech.backend.dto.PageDto;
import vn.aptech.backend.dto.UserDto;
import vn.aptech.backend.dto.request.user.UserAdminUpdateRequest;
import vn.aptech.backend.dto.request.user.UserChangePasswordRequest;
import vn.aptech.backend.dto.request.user.UserCreateAdminRequest;
import vn.aptech.backend.dto.request.user.UserUpdateRequest;
import vn.aptech.backend.service.UserService;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class UserController implements BaseController {
    @Autowired
    private UserService service;

    @Admin
    @GetMapping("/users")
    public ResponseEntity<Page<UserDto>> getAllUsers(PageDto page) {
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.fillAll(pageable);
    }

    @Admin
    @GetMapping("/user/search")
    public ResponseEntity<Page<UserDto>> findByUsername(String username, PageDto page) {
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.findByUsername(username, pageable);
    }

    @Admin
    @GetMapping("user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long id) {
        return service.findById(id);
    }


    @AllRole
    @GetMapping("/user/user-information")
    public ResponseEntity<?> getUserInformation() {
        return service.getUserInformation();
    }

    @Admin
    @PostMapping("/user/create")
    public ResponseEntity<?> create(@RequestBody @Validated UserCreateAdminRequest request) {
        return service.create(request);
    }

    @AllRole
    @PostMapping("/user/update")
    public ResponseEntity<?> update(@RequestBody @Validated UserUpdateRequest request) {
        return service.update(request);
    }

    @AllRole
    @PostMapping("/user/change-password")
    public ResponseEntity<?> changePassword(@Validated @RequestBody UserChangePasswordRequest request) {
        return service.changePassword(request);
    }

    @Admin
    @PostMapping("/admin/user/update")
    public ResponseEntity<?> update(@Validated @RequestBody UserAdminUpdateRequest request) {
        return service.update(request);
    }

    @Admin
    @DeleteMapping("/admin/user/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return service.delete(id);
    }

}
