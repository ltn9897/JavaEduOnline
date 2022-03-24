package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.annotation.Admin;
import vn.aptech.backend.dto.CatalogDto;
import vn.aptech.backend.dto.request.catalog.CatalogUpdateRequest;
import vn.aptech.backend.dto.request.catalog.CatalogCreateRequest;
import vn.aptech.backend.service.CatalogService;
@RestController
@RequestMapping("/api")
public class CatalogController implements BaseController{
    @Autowired
    private CatalogService service;

    @GetMapping("/catalogs")
    public ResponseEntity<?> getAllCatalogs() {
        return service.fillAll();
    }

    @Admin
    @PostMapping("/catalog/create")
    public ResponseEntity<?> create(@Validated @RequestBody CatalogCreateRequest request) {
        return service.create(request);
    }

    @Admin
    @PostMapping("/catalog/update")
    public ResponseEntity<?> update(@Validated @RequestBody CatalogUpdateRequest request) {
        return service.update(request);
    }

    @Admin
    @GetMapping("/catalog/search")
    public ResponseEntity<?> findByCatalogName(String name) {
        return service.findByCatalogName(name);
    }

    @GetMapping("/catalog/{id}")
    public ResponseEntity<CatalogDto> getCatalogById(@PathVariable("id") Long id) {
        return service.findById(id);
    }
}
