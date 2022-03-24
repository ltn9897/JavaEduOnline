package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersDto {
    private Long id;
    private String orderNumber;
    private UserDto user;
    private Double totalAmount;
    private boolean statusOrder;
    private Date dateOrder;
    private List<OrderDetailDto> orderDetails;
}
