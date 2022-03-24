package vn.aptech.backend.service;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.request.review.ReviewCreateRequest;
import vn.aptech.backend.dto.request.review.ReviewUpdateRequest;

public interface ReviewService {
    ResponseEntity<?> fillAll(Pageable pageable);

    ResponseEntity<?> create(ReviewCreateRequest request);

    ResponseEntity<?> update(ReviewUpdateRequest request);

    ResponseEntity<?> delete(long id);
}
