package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.dto.CustomUserDetails;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.request.LoginRequest;
import vn.aptech.backend.dto.request.SignupRequest;
import vn.aptech.backend.dto.response.JwtResponse;
import vn.aptech.backend.service.UserService;
import vn.aptech.backend.utils.JwtUtils;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/auth")
public class AuthController implements BaseController {
    @Autowired
    private UserService service;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        if (userDetails == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_DETAILS_NOT_EXISTS);
        }

        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
        if (!userDetails.getUser().isEnabled()) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_IS_NOT_ENABLED);
        }
        return new ResponseHandler<>().sendSuccess(new JwtResponse(jwt, userDetails.getUsername(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest request) {
        return service.create(request);
    }
}
