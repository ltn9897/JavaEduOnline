package vn.aptech.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.response.home.DashboardAdminResponse;
import vn.aptech.backend.repository.CourseRepository;
import vn.aptech.backend.repository.OrdersRepository;
import vn.aptech.backend.repository.UserRepository;
import vn.aptech.backend.service.HomeService;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class HomeServiceImpl implements HomeService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> getDashboardAdmin() {
        Date today = Date.valueOf(LocalDate.now());
        DashboardAdminResponse response = new DashboardAdminResponse();
        response.setTotalSales(ordersRepository.sumTotalSales() != null ? ordersRepository.sumTotalSales() : 0);
        response.setTotalTodaySales(ordersRepository.sumTotalSalesToday(today) != null ? ordersRepository.sumTotalSalesToday(today) : 0);
        response.setTotalCourses(courseRepository.countCourseByDeletedDateIsNull());
        response.setTotalTodayCourses(courseRepository.countCourseByCreatedDateAndDeletedDateIsNull(today));
        response.setTotalUsers(userRepository.countAllByDeletedDateIsNull());
        response.setTotalTodayUsers(userRepository.countAllByCreatedDateAndDeletedDateIsNull(today));
        response.setTotalEnroll(ordersRepository.countTotalCourseSales());
        response.setTotalTodayEnroll(ordersRepository.countTotalTodayCourseSales(today));
        return new ResponseHandler<>().sendSuccess(response);
    }
}
