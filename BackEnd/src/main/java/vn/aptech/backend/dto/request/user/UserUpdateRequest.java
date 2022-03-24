package vn.aptech.backend.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    @NotNull
    @NotBlank
    private String email;
    private String fullname;
    private String avatarImage;
    private String phone;
    private String address;
}
