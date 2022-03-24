package vn.aptech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import vn.aptech.backend.annotation.AllRole;
import vn.aptech.backend.annotation.User;
import vn.aptech.backend.dto.PageDto;
import vn.aptech.backend.dto.request.order.PaymentCreateRequest;
import vn.aptech.backend.service.OrdersService;

@RestController
@RequestMapping("/api")
public class OrderController implements BaseController {

    @Autowired
    private OrdersService service;

    @AllRole
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders(PageDto page) {
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.fillAll(pageable);
    }

    @AllRole
    @GetMapping("/order/{orderNumber}")
    public ResponseEntity<?> getOrderDetails(@PathVariable("orderNumber") String orderNumber) {
        return service.findByOrderNumber(orderNumber);
    }

    @User
    @PostMapping("/order/payment")
    public ResponseEntity<?> createPayment(@Validated @RequestBody PaymentCreateRequest request) {
        return service.createPayment(request);
    }

    @AllRole
    @GetMapping("/order/search")
    public ResponseEntity<?> getOrdersByOrderNumber(String orderNumber,PageDto page) {
        page = page.builder(page);
        Pageable pageable = PageRequest.of(page.getPage(), page.getSize(), page.getSort()).withPage(page.getPageNumber());
        return service.findOrdersByOrderNumber(orderNumber,pageable);
    }

}
