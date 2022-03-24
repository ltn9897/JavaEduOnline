package vn.aptech.backend.dto.request.lesson;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonUpdateRequest {
    @NotNull
    private Long id;
    @NotNull
    private Long courseId;
    @NotNull
    @NotBlank
    private String title;
}
