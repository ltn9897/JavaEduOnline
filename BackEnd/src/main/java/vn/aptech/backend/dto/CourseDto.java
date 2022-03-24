package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.utils.enums.LanguageEnum;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;
    private String title;
    private String shortDescription;
    private String description;
    private String requirement;
    private String whoThisCourseIsFor;
    private String whatYouWillLearn;
    private LanguageEnum language;
    private boolean activate;
    private Float price;
    private String videoDuration;
    private String urlVideoDescription;
    private String imageVideoDescription;
    List<LessonDto> lessons;
    private Date updatedDate;
    private String catalog;
    private Long subCatalogId;
    //Feild orther
    private boolean isPurchased;
    private boolean isSaved;
    private float avgRatting;
    private int totalSold;
    private ReviewDto userReview;
    private List<ReviewDto> reviews;
}
