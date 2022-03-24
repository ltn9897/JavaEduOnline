package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Messages;


public interface MessagesRepository extends JpaRepository<Messages,Long> {

}
