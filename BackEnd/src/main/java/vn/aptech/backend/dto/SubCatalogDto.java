package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCatalogDto {
    private Long id;
    private String name;
    private String description;
    private List<CourseDto> courses;
}
