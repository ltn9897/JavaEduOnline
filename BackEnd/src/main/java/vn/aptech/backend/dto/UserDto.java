package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String fullname;
    private String email;
    private boolean enabled;
    private String address;
    private String phone;
    private String avatarImage;
    private RoleDto role;
}
