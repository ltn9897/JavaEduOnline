package vn.aptech.backend.dto.response.home;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAdminResponse {
    private float totalSales;
    private float totalTodaySales;
    private int totalEnroll;
    private int totalTodayEnroll;
    private int totalCourses;
    private int totalTodayCourses;
    private int totalUsers;
    private int totalTodayUsers;
}
