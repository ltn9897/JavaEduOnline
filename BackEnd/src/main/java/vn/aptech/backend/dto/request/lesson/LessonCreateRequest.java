package vn.aptech.backend.dto.request.lesson;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.dto.request.lecture.LectureCreateRequest;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonCreateRequest {
    @NotNull
    private Long courseId;
    @NotNull
    @NotBlank
    private String title;

    List<LectureCreateRequest> lectures;
}
