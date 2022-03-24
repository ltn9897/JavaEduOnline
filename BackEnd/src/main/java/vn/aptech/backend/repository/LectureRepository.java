package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Lecture;

import java.util.List;
import java.util.Optional;

public interface LectureRepository extends JpaRepository<Lecture,Long> {
    Optional<Lecture> findByIdAndDeletedDateIsNull(long id);

    List<Lecture> findByLessonIdAndDeletedDateIsNullOrderBySortAsc(Long lessonId);
}
