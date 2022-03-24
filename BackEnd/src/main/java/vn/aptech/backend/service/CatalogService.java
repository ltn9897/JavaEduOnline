package vn.aptech.backend.service;

import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.CatalogDto;
import vn.aptech.backend.dto.request.catalog.CatalogUpdateRequest;
import vn.aptech.backend.dto.request.catalog.CatalogCreateRequest;

public interface CatalogService {
    ResponseEntity<?> create(CatalogCreateRequest request);

    ResponseEntity<?> fillAll();

    ResponseEntity<?> findByCatalogName(String name);

    ResponseEntity<?> update(CatalogUpdateRequest request);

    ResponseEntity<CatalogDto> findById(Long id);
}
