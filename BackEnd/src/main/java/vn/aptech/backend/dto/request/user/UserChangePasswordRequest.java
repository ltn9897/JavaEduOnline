package vn.aptech.backend.dto.request.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserChangePasswordRequest implements Serializable {
    @NotNull(message = "old Password cannot be null")
    @NotBlank(message = "Old password cannot blank")
    private String oldPassword;
    @NotNull(message = "newPassword cannot be null")
    @NotBlank(message = "newPassword cannot blank")
    private String newPassword;
    @NotNull
    @NotBlank
    private String confirmPassword;
}
