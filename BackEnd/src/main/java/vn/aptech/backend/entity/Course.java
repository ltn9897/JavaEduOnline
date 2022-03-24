package vn.aptech.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.UpdateTimestamp;
import vn.aptech.backend.utils.enums.LanguageEnum;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Course")
public class Course extends BaseEntity {
    private String title;
    @Column(name = "short_description")
    private String shortDescription;
    private String description;
    private String requirement;
    @Column(name = "who_this_course_is_for")
    private String whoThisCourseIsFor;
    @Column(name = "what_you_will_learn")
    private String whatYouWillLearn;
    private boolean activate;
    private Float price;
    @Column(name = "video_duration")
    private String videoDuration;
    @Enumerated(EnumType.STRING)
    private LanguageEnum language;
    @Column(name = "url_video_description")
    private String urlVideoDescription;
    @Column(name = "image_video_description")
    private String imageVideoDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcatalog_id")
    private SubCatalog subCatalog;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Lesson> lessons;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Review> reviews;

    @OneToMany(mappedBy = "course")
    private List<SavedCourse> savedCourses;

    @OneToMany(mappedBy = "course")
    private List<OrderDetail> orderDetails;
}
