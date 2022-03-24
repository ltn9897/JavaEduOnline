package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.dto.response.orders.CourseOrderResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {
    private CourseOrderResponse course;
}
