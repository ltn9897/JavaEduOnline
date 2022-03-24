package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
