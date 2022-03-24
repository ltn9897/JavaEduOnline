package vn.aptech.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Lecture")
public class Lecture extends BaseEntity {
    private String title;
    private Integer sort;
    @Column(name = "video_url")
    private String videoUrl;
    @Column(name = "video_duration")
    private String videoDuration;

    private boolean preview;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
