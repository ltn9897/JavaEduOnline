package vn.aptech.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.aptech.backend.entity.Orders;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query(value = "SELECT o FROM Orders o WHERE o.user.id = :id")
    Page<Orders> findAllByUserId(Long id, Pageable pageable);

    Optional<Orders> findByOrderNumber(String orderNumber);

    @Query(value = "SELECT o FROM Orders o WHERE o.user.id = :id")
    List<Orders> findAllByUserId(Long id);

    @Query(value = "SELECT DISTINCT o.order from OrderDetail o WHERE o.course.id = :courseId")
    List<Orders> findOrdersByCourseId(Long courseId);

    @Query(value = "SELECT SUM(o.totalAmount) FROM Orders o WHERE o.deletedDate IS NULL")
    Float sumTotalSales();

    @Query(value = "SELECT SUM(o.totalAmount) FROM Orders o WHERE o.dateOrder = :date AND o.deletedDate IS NULL")
    Float sumTotalSalesToday(Date date);

    @Query(value = "SELECT COUNT (o) FROM OrderDetail o WHERE o.deletedDate IS NULL")
    int countTotalCourseSales();

    @Query(value = "SELECT COUNT(*) FROM OrderDetail WHERE convert(Date,created_date) = convert(DATE, :date)",nativeQuery = true)
    int countTotalTodayCourseSales(Date date);

    @Query(value = "SELECT o FROM Orders o WHERE o.user.id = :id AND o.orderNumber LIKE :orderNumber")
    Page<Orders> findAllByUserIdAndOrderNumber(@Param("id") Long id, @Param("orderNumber") String orderNumber, Pageable pageable);

    @Query(value = "SELECT o FROM Orders o WHERE o.orderNumber LIKE :orderNumber")
    Page<Orders> findAllByOrderNumber(String orderNumber, Pageable pageable);
}
