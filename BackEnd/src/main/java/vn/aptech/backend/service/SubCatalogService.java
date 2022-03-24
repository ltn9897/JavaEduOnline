package vn.aptech.backend.service;

import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.SubCatalogDto;
import vn.aptech.backend.dto.request.subcatalog.SubCatalogUpdateRequest;
import vn.aptech.backend.dto.request.subcatalog.SubCatalogCreateRequest;

public interface SubCatalogService {
    ResponseEntity<?> create(SubCatalogCreateRequest request);

    ResponseEntity<?> fillAll();

    ResponseEntity<?> findBySubCatalogName(String name);

    ResponseEntity<?> update(SubCatalogUpdateRequest request);

    ResponseEntity<SubCatalogDto> findById(Long id);
}
