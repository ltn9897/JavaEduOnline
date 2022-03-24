package vn.aptech.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.aptech.backend.entity.Catalog;

import java.util.List;
import java.util.Optional;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {
    Optional<Catalog> findCatalogByName(String name);

    List<Catalog> findCatalogByDeletedDateIsNull();

    List<Catalog> findCatalogByNameLike(String name);
}
