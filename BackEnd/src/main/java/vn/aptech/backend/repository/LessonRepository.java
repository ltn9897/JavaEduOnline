package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Lesson;

import java.util.List;
import java.util.Optional;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByCourseIdAndDeletedDateIsNull(long id);

    Optional<Lesson> findByIdAndDeletedDateIsNull(long id);
}
