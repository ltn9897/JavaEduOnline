package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.SavedCourse;

import java.util.Optional;

public interface SavedCourseRepository extends JpaRepository<SavedCourse,Long> {
    Optional<SavedCourse> findByCourseIdAndUserIdAndDeletedDateIsNull(Long courseId, Long userId);
}
