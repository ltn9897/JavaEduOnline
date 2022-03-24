package vn.aptech.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.UserDto;
import vn.aptech.backend.dto.request.SignupRequest;
import vn.aptech.backend.dto.request.user.UserAdminUpdateRequest;
import vn.aptech.backend.dto.request.user.UserChangePasswordRequest;
import vn.aptech.backend.dto.request.user.UserCreateAdminRequest;
import vn.aptech.backend.dto.request.user.UserUpdateRequest;

public interface UserService {

    ResponseEntity<?> create(SignupRequest request);

    ResponseEntity<?> getUserInformation();

    ResponseEntity<?> changePassword(UserChangePasswordRequest request);

    ResponseEntity<Page<UserDto>> fillAll(Pageable pageable);

    ResponseEntity<Page<UserDto>> findByUsername(String username, Pageable pageable);

    ResponseEntity<?> update(UserUpdateRequest request);

    ResponseEntity<?> update(UserAdminUpdateRequest request);

    ResponseEntity<UserDto> findById(Long id);

    ResponseEntity<?> delete(Long id);

    ResponseEntity<?> create(UserCreateAdminRequest request);
}
