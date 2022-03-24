package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.UserDto;
import vn.aptech.backend.dto.request.SignupRequest;
import vn.aptech.backend.dto.request.user.UserAdminUpdateRequest;
import vn.aptech.backend.dto.request.user.UserChangePasswordRequest;
import vn.aptech.backend.dto.request.user.UserCreateAdminRequest;
import vn.aptech.backend.dto.request.user.UserUpdateRequest;
import vn.aptech.backend.dto.response.user.UserInformationResponse;
import vn.aptech.backend.entity.AppRole;
import vn.aptech.backend.entity.AppUser;
import vn.aptech.backend.repository.RoleRepository;
import vn.aptech.backend.repository.UserRepository;
import vn.aptech.backend.service.UserService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.RoleEnums;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private SecurityUtils securityUtils;
    @Value("${default.avatar}")
    private String defaultAvatar;

    @Transactional
    @Override
    public ResponseEntity<?> create(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_PASSWORD_DIFFERENT_NEW_PASSWORD);
        }
        if (repository.existsByUsername(request.getUsername())) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_USERNAME_IS_ALREADY_TAKEN);
        }
        if (repository.existsByEmail(request.getEmail())) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_EMAIL_IS_ALREADY_USE);
        }
        request.setPassword(encoder.encode(request.getPassword()));

        AppUser user = mapper.map(request, AppUser.class);

        AppRole appRole = roleRepository.findByName(RoleEnums.ROLE_USER.name()).get();

        user.setRole(appRole);

        user.setEnabled(true);

        UserDto newUser = mapper.map(repository.save(user), UserDto.class);
        return new ResponseHandler<>().sendSuccess(newUser);
    }

    @Override
    public ResponseEntity<UserInformationResponse> getUserInformation() {
        AppUser user = securityUtils.getPrincipal();
        if (user == null) {
            return new ResponseHandler<UserInformationResponse>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        if (StringUtils.isEmpty(user.getAvatarImage())) {
            user.setAvatarImage(defaultAvatar);
        }
        UserInformationResponse userInformationResponse = mapper.map(user, UserInformationResponse.class);
        return new ResponseHandler<UserInformationResponse>().sendSuccess(userInformationResponse);
    }

    @Transactional
    @Override
    public ResponseEntity<?> changePassword(UserChangePasswordRequest request) {
        ResponseHandler<List<UserDto>> response = new ResponseHandler<>();
        AppUser user = securityUtils.getPrincipal();
        if (!encoder.matches(request.getOldPassword(), user.getPassword())) {
            return response.sendError(StatusErrorEnums.USER_OLD_PASSWORD_IS_WRONG);
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return response.sendError(StatusErrorEnums.USER_CONFIRM_PASSWORD_DIFFERENT_NEW_PASSWORD);
        }
        user.setPassword(encoder.encode(request.getNewPassword()));

        repository.save(user);
        return response.sendSuccess("Password change success");
    }

    @Override
    public ResponseEntity<Page<UserDto>> fillAll(Pageable pageable) {
        Page<AppUser> appUsers = repository.findAppUsersByDeletedDateIsNull(pageable);
        Page<UserDto> userDtoPage = appUsers.map(appUser -> {
            if (StringUtils.isEmpty(appUser.getAvatarImage())) {
                appUser.setAvatarImage(defaultAvatar);
            }
            return mapper.map(appUser, UserDto.class);
        });
        return new ResponseHandler<Page<UserDto>>().sendSuccess(userDtoPage);
    }

    @Override
    public ResponseEntity<Page<UserDto>> findByUsername(String username, Pageable pageable) {
        Page<AppUser> appUsers = repository.findAppUsersByUsernameLikeAndDeletedDateIsNull("%" + username + "%", pageable);
        Page<UserDto> userDtoPage = appUsers.map(appUser -> mapper.map(appUser, UserDto.class));
        return new ResponseHandler<Page<UserDto>>().sendSuccess(userDtoPage);
    }

    @Transactional
    @Override
    public ResponseEntity<?> update(UserUpdateRequest request) {
        AppUser appUser = securityUtils.getPrincipal();
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        appUser.setFullname(request.getFullname());
        appUser.setAddress(request.getAddress());
        appUser.setPhone(request.getPhone());
        appUser.setEmail(request.getEmail());
        appUser.setAvatarImage(request.getAvatarImage());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(appUser), UserDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> update(UserAdminUpdateRequest request) {
        AppUser appUser = repository.findByIdAndDeletedDateIsNull(request.getId()).orElse(null);
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        if (repository.existsByEmailAndIdIsNot(request.getEmail(), request.getId())) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_EMAIL_IS_ALREADY_USE);
        }
        AppRole role = roleRepository.findByName(request.getRole()).orElse(null);
        if (role == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_ROLE_NOT_FOUND);
        }
        appUser.setRole(role);
        appUser.setPassword(encoder.encode(request.getPassword()));
        appUser.setEnabled(request.isEnabled());
        appUser.setFullname(request.getFullname());
        appUser.setAddress(request.getAddress());
        appUser.setPhone(request.getPhone());
        appUser.setEmail(request.getEmail());
        appUser.setAvatarImage(request.getAvatarImage());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(appUser), UserDto.class));
    }

    @Override
    public ResponseEntity<UserDto> findById(Long id) {
        AppUser appUser = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (appUser == null) {
            return new ResponseHandler<UserDto>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        if (StringUtils.isEmpty(appUser.getAvatarImage())) {
            appUser.setAvatarImage(defaultAvatar);
        }
        return new ResponseHandler<UserDto>().sendSuccess(mapper.map(appUser, UserDto.class));
    }

    @Transactional
    @Override
    public ResponseEntity<?> delete(Long id) {
        AppUser appUser = repository.findByIdAndDeletedDateIsNull(id).orElse(null);
        if (appUser == null) {
            return new ResponseHandler<UserDto>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        appUser.setDeletedDate(new Date());
        repository.save(appUser);
        return new ResponseHandler<>().sendSuccess("Deleted");
    }

    @Transactional
    @Override
    public ResponseEntity<?> create(UserCreateAdminRequest request) {
        if (repository.existsByUsername(request.getUsername())) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_USERNAME_IS_ALREADY_TAKEN);
        }
        if (repository.existsByEmail(request.getEmail())) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_EMAIL_IS_ALREADY_USE);
        }
        request.setPassword(encoder.encode(request.getPassword()));

        AppUser user = mapper.map(request, AppUser.class);

        AppRole appRole = roleRepository.findByName(request.getRole()).orElse(null);

        if (appRole == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_ROLE_NOT_FOUND);
        }

        user.setRole(appRole);

        user.setEnabled(true);

        UserDto newUser = mapper.map(repository.save(user), UserDto.class);
        return new ResponseHandler<>().sendSuccess(newUser);
    }
}
