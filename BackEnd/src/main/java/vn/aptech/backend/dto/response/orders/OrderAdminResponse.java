package vn.aptech.backend.dto.response.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.dto.UserDto;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAdminResponse {
    private String orderNumber;
    private UserDto user;
    private Double totalAmount;
    private boolean statusOrder;
    private Date dateOrder;
}
