package vn.aptech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.aptech.backend.entity.AppRole;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<AppRole, Long> {
    Optional<AppRole> findByName(String name);
}
