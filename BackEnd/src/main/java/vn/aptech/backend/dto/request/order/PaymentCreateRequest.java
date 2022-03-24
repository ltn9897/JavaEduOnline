package vn.aptech.backend.dto.request.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCreateRequest {
    @NotNull
    private List<Long> courseIds;
    @NotNull
    @NotBlank
    private String orderId;
}
