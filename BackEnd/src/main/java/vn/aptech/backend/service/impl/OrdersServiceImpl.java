package vn.aptech.backend.service.impl;


import com.google.gson.JsonObject;
import com.paypal.api.payments.Order;
import com.paypal.base.rest.*;
import com.paypal.base.sdk.info.SDKVersionImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.aptech.backend.dto.OrderPaypal;
import vn.aptech.backend.dto.OrdersDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.request.order.PaymentCreateRequest;
import vn.aptech.backend.dto.response.orders.OrderAdminResponse;
import vn.aptech.backend.dto.response.orders.OrderUserResponse;
import vn.aptech.backend.entity.*;
import vn.aptech.backend.repository.CourseRepository;
import vn.aptech.backend.repository.OrdersRepository;
import vn.aptech.backend.service.OrdersService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.RoleEnums;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.*;

@Service
public class OrdersServiceImpl implements OrdersService {

    private final static String ORDER_CODE = "ABC000";

    @Autowired
    private OrdersRepository repository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private APIContext apiContext;

    @Override
    public ResponseEntity<?> fillAll(Pageable pageable) {
        AppUser appUser = securityUtils.getPrincipal();
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        if (RoleEnums.ROLE_ADMIN.name().equals(appUser.getRole().getName())) {
            Page<Orders> orders = repository.findAll(pageable);
            Page<OrderAdminResponse> orderAdminResponses = orders.map(order -> mapper.map(order, OrderAdminResponse.class));
            return new ResponseHandler<>().sendSuccess(orderAdminResponses);
        } else if (RoleEnums.ROLE_USER.name().equals(appUser.getRole().getName())) {
            Page<Orders> orders = repository.findAllByUserId(appUser.getId(), pageable);
            Page<OrderUserResponse> orderUserResponses = orders.map(order -> mapper.map(order, OrderUserResponse.class));
            return new ResponseHandler<>().sendSuccess(orderUserResponses);
        }
        return new ResponseHandler<>().sendError("Error get all orders");
    }

    @Override
    public ResponseEntity<?> findByOrderNumber(String orderNumber) {
        AppUser appUser = securityUtils.getPrincipal();
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        Orders order = null;
        if (RoleEnums.ROLE_ADMIN.name().equals(appUser.getRole().getName())) {
            order = repository.findByOrderNumber(orderNumber).orElse(null);
        } else if (RoleEnums.ROLE_USER.name().equals(appUser.getRole().getName())) {
            order = repository.findByOrderNumber(orderNumber).orElse(null);
            if (order != null) {
                if (!order.getUser().getId().equals(appUser.getId())) {
                    return new ResponseHandler<>().sendError(StatusErrorEnums.ORDER_CANNOT_TAKE_DATA);
                } else {
                    return new ResponseHandler<>().sendSuccess(mapper.map(order, OrdersDto.class));
                }
            }
        }
        if (order == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.ORDER_NOT_EXISTS);
        }
        return new ResponseHandler<>().sendSuccess(mapper.map(order, OrdersDto.class));
    }

    @Override
    @Transactional
    public ResponseEntity<?> createPayment(PaymentCreateRequest request) {
        AppUser appUser = securityUtils.getPrincipal();
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        synchronized (this) {
            Orders order = new Orders();
            List<OrderDetail> orderDetails = new ArrayList<>();
            double totalAmount = 0;
            for (Long id : request.getCourseIds()) {
                Course course = courseRepository.findByIdAndDeletedDateIsNull(id).orElse(null);
                if (course == null) {
                    return new ResponseHandler<>().sendError(StatusErrorEnums.COURSE_NOT_FOUND);
                } else {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setCourse(course);
                    orderDetails.add(orderDetail);
                    orderDetail.setOrder(order);
                }
            }

            Order orderPaypal = new Order();
            JsonObject object = null;

            try {
                object = OrderPaypal.get(apiContext, request.getOrderId());
            } catch (Exception e) {
                return new ResponseHandler<>().sendError(StatusErrorEnums.GET_ORDER_ID_HAVE_PROBLEM);
            }
            if (object == null) {
                return new ResponseHandler<>().sendError(StatusErrorEnums.GET_ORDER_ID_HAVE_PROBLEM);
            }
            Random random = new Random();
            order.setTotalAmount(totalAmount);
            String code = ORDER_CODE + (random.nextInt(899) + 100) + (random.nextInt(899) + 100);
            order.setOrderNumber(code);
            order.setOrderDetails(orderDetails);
            order.setUser(appUser);
            order.setDateOrder(new Date());
            Payment payment = mapper.map(request, Payment.class);
            if (object.get("status").getAsString().equals("COMPLETED")) {
                order.setStatusOrder(true);
                payment.setStatus(true);
            } else {
                order.setStatusOrder(false);
                payment.setStatus(false);
            }
            payment.setUser(appUser);
            payment.setAmount(Double.parseDouble(object.get("gross_total_amount").getAsJsonObject().get("value").getAsString()));
            order.setTotalAmount(Double.parseDouble(object.get("gross_total_amount").getAsJsonObject().get("value").getAsString()));
            order.setPayment(payment);
            payment.setOrder(order);
            Orders newOrder = repository.save(order);
            return new ResponseHandler<>().sendSuccess(mapper.map(newOrder, OrdersDto.class));
        }
    }

    @Override
    public ResponseEntity<?> findOrdersByOrderNumber(String orderNumber, Pageable pageable) {
        AppUser appUser = securityUtils.getPrincipal();
        if (appUser == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.USER_NOT_FOUND);
        }
        if (RoleEnums.ROLE_ADMIN.name().equals(appUser.getRole().getName())) {
            Page<Orders> orders = repository.findAllByOrderNumber("%"+orderNumber+"%", pageable);
            Page<OrderAdminResponse> orderAdminResponses = orders.map(order -> mapper.map(order, OrderAdminResponse.class));
            return new ResponseHandler<>().sendSuccess(orderAdminResponses);
        } else if (RoleEnums.ROLE_USER.name().equals(appUser.getRole().getName())) {
            Page<Orders> orders = repository.findAllByUserIdAndOrderNumber(appUser.getId(), "%"+orderNumber+"%", pageable);
            Page<OrderUserResponse> orderUserResponses = orders.map(order -> mapper.map(order, OrderUserResponse.class));
            return new ResponseHandler<>().sendSuccess(orderUserResponses);
        }
        return new ResponseHandler<>().sendError("Error get all orders");
    }

    public Order getOrder(APIContext apiContext, String orderId) throws PayPalRESTException {
        if (apiContext == null) {
            throw new IllegalArgumentException("APIContext cannot be null");
        } else if (apiContext.getAccessToken() != null && apiContext.getAccessToken().trim().length() > 0) {
            if (apiContext.getHTTPHeaders() == null) {
                apiContext.setHTTPHeaders(new HashMap());
            }

            apiContext.getHTTPHeaders().put("Content-Type", "application/json");
            apiContext.setSdkVersion(new SDKVersionImpl());
            if (orderId == null) {
                throw new IllegalArgumentException("orderId cannot be null");
            } else {
                Object[] parameters = new Object[]{orderId};
                String pattern = "v1/payments/orders/{0}";
                String resourcePath = RESTUtil.formatURIPath(pattern, parameters);
                String payLoad = "";
                return (Order) PayPalResource.configureAndExecute(apiContext, HttpMethod.GET, resourcePath, payLoad, Order.class);
            }
        } else {
            throw new IllegalArgumentException("AccessToken cannot be null or empty");
        }
    }
}
