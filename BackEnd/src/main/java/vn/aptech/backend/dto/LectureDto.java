package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LectureDto {
    private Long id;
    private String title;
    private Integer sort;
    private String videoUrl;
    private String videoDuration;
    private boolean preview;
}
