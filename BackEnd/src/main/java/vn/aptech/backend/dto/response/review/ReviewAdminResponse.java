package vn.aptech.backend.dto.response.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewAdminResponse {
    private Long id;
    private String username;
    private String courseTitle;
    private Float ratting;
    private String feedback;
}
