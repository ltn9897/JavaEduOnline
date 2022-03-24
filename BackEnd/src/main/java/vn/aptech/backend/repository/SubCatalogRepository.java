package vn.aptech.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.dto.SubCatalogDto;
import vn.aptech.backend.entity.Course;
import vn.aptech.backend.entity.SubCatalog;

import java.util.List;
import java.util.Optional;

public interface SubCatalogRepository extends JpaRepository<SubCatalog, Long> {

    Optional<SubCatalog> findSubCatalogByName(String name);

    List<SubCatalog> findSubCatalogByDeletedDateIsNull();

    List<SubCatalog> findSubCatalogByNameLikeAndDeletedDateIsNull(String name);
}
