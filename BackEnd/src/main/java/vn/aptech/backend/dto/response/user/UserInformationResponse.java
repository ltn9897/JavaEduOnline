package vn.aptech.backend.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInformationResponse implements Serializable {
    private Long id;
    private String username;
    private String password;
    private String fullname;
    private String address;
    private String phone;
    private String email;
    private String avatarImage;
    private boolean enabled;
}
