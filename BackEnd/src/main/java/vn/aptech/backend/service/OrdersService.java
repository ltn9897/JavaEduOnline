package vn.aptech.backend.service;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import vn.aptech.backend.dto.request.order.PaymentCreateRequest;

public interface OrdersService {
    ResponseEntity<?> fillAll(Pageable pageable);

    ResponseEntity<?> findByOrderNumber(String orderNumber);

    ResponseEntity<?> createPayment(PaymentCreateRequest request);

    ResponseEntity<?> findOrdersByOrderNumber(String orderNumber, Pageable pageable);
}
