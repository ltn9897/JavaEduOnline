package vn.aptech.backend.dto.response.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderUserResponse {
    private String orderNumber;
    private Double totalAmount;
    private boolean statusOrder;
    private Date dateOrder;
}
