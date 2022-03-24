package vn.aptech.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    Page<Review> findByDeletedDateIsNull(Pageable pageable);

    Optional<Review> findByIdAndDeletedDateIsNull(Long id);

    List<Review> findByCourseIdAndDeletedDateIsNull(Long courseId);

    Optional<Review> findByCourseIdAndUserIdAndDeletedDateIsNull(Long courseId, Long userId);
}
