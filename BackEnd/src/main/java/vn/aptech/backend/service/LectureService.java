package vn.aptech.backend.service;

import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.request.lecture.LectureCreateRequest;
import vn.aptech.backend.dto.request.lecture.LectureUpdateRequest;

public interface LectureService {
    ResponseEntity<?> findById(long id);

    ResponseEntity<?> create(LectureCreateRequest request);

    ResponseEntity<?> update(LectureUpdateRequest request);

    ResponseEntity<?> delete(long id);
}
