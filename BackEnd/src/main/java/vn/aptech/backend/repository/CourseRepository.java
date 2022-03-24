package vn.aptech.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.aptech.backend.entity.Course;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByIdAndDeletedDateIsNull(Long id);

    Page<Course> findCourseByDeletedDateIsNull(Pageable pageable);

    @Query("SELECT o FROM Course o where o.activate = TRUE AND o.deletedDate is null order by o.orderDetails.size DESC ")
    Page<Course> findTopCourseUser(Pageable pageable);

    Page<Course> findCourseByActivateIsTrueAndDeletedDateIsNull(Pageable pageable);

    Page<Course> findCourseByTitleLikeAndDeletedDateIsNull(String name, Pageable pageable);

    Page<Course> findByActivateAndDeletedDateIsNull(boolean activate, Pageable pageable);

    @Query(value = "SELECT o.course FROM SavedCourse o WHERE o.user.id = :userId AND o.deletedDate IS NULL")
    List<Course> findCourseSavedByUserId(Long userId);

    @Query(value = "SELECT o.course FROM OrderDetail o WHERE o.order.user.id = :userId")
    List<Course> findCoursesByUserId(Long userId);

    int countCourseByDeletedDateIsNull();

    @Query(value = "select count(*) from Course Where convert(Date,created_date) = convert(DATE, :date)", nativeQuery = true)
    int countCourseByCreatedDateAndDeletedDateIsNull(Date date);
}
