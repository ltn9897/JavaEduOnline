package vn.aptech.backend.dto.request.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateRequest {
    @NotNull
    private Long id;
    @NotNull
    private float ratting;
    private String feedback;
    @NotNull
    private Long courseId;
}
