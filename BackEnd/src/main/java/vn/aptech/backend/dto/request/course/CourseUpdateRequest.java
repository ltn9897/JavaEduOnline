package vn.aptech.backend.dto.request.course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.utils.enums.LanguageEnum;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseUpdateRequest {
    @NotNull
    private Long id;
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
    private boolean activate;
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
}
