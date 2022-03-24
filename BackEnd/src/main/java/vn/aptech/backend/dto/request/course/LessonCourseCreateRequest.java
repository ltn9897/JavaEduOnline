package vn.aptech.backend.dto.request.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonCourseCreateRequest {

    @NotNull
    @NotBlank
    private String title;

    List<LectureCourseCreateRequest> lectures;
}
