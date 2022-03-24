package vn.aptech.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Orders")
public class Orders extends BaseEntity {
    @Column(name = "order_number")
    private String orderNumber;
    @Column(name = "total_amount")
    private Double totalAmount;
    @Column(name = "status_order")
    private boolean statusOrder;
    @Column(name = "date_order")

    @CreatedDate
    @Temporal(TemporalType.DATE)
    private Date dateOrder;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "order",cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id", referencedColumnName = "id")
    private Payment payment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private AppUser user;
}
