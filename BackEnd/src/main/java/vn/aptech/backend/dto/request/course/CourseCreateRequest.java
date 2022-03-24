package vn.aptech.backend.dto.request.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.dto.request.lesson.LessonCreateRequest;
import vn.aptech.backend.utils.enums.LanguageEnum;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseCreateRequest {
    @NotNull
    private Long subCatalogId;
    @NotNull
    @NotBlank
    private String title;
    @NotNull
    @NotBlank
    private String shortDescription;
    @NotNull
    @NotBlank
    private String description;
    @NotNull
    @NotBlank
    private String requirement;
    @NotNull
    @NotBlank
    private String whoThisCourseIsFor;
    @NotNull
    @NotBlank
    private String whatYouWillLearn;
    @NotNull
    private LanguageEnum language;
    @NotNull
    private Float price;
    @NotNull
    @NotBlank
    private String videoDuration;
    @NotNull
    @NotBlank
    private String urlVideoDescription;
    @NotNull
    @NotBlank
    private String imageVideoDescription;

    @NotNull
    private boolean activate;

    List<LessonCourseCreateRequest> lessons;
}
