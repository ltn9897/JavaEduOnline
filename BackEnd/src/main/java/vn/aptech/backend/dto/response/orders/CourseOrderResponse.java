package vn.aptech.backend.dto.response.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseOrderResponse {
    private Long id;
    private String title;
    private Float price;
}
