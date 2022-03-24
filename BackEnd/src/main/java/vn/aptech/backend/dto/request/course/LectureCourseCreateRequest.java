package vn.aptech.backend.dto.request.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LectureCourseCreateRequest {
    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private Integer sort;

    @NotNull
    @NotBlank
    private String videoUrl;

    @NotNull
    @NotBlank
    private String videoDuration;

    private boolean preview;
}
