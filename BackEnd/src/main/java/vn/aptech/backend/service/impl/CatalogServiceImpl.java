package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.aptech.backend.dto.CatalogDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.SubCatalogDto;
import vn.aptech.backend.dto.request.catalog.CatalogCreateRequest;
import vn.aptech.backend.dto.request.catalog.CatalogUpdateRequest;
import vn.aptech.backend.entity.Catalog;
import vn.aptech.backend.repository.CatalogRepository;
import vn.aptech.backend.service.CatalogService;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogServiceImpl implements CatalogService {
    @Autowired
    private CatalogRepository repository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public ResponseEntity<?> create(CatalogCreateRequest request) {
        Catalog catalog = this.convertSignupRequesttoCatalog(request);
        CatalogDto newCatalog = mapper.map(repository.save(catalog), CatalogDto.class);
        return new ResponseHandler<>().sendSuccess(newCatalog);
    }

    @Override
    public ResponseEntity<?> fillAll() {
        List<Catalog> catalogs = repository.findCatalogByDeletedDateIsNull();
        List<CatalogDto> result = catalogs.stream().map(catalog -> mapper.map(catalog, CatalogDto.class)).collect(Collectors.toList());
        return new ResponseHandler<>().sendSuccess(result);
    }

    @Override
    public ResponseEntity<?> findByCatalogName(String name) {
        List<Catalog> catalogs = repository.findCatalogByNameLike("%" + name + "%");
        List<CatalogDto> result = catalogs.stream().map(catalog -> mapper.map(catalog, CatalogDto.class)).collect(Collectors.toList());
        return new ResponseHandler<>().sendSuccess(result);
    }

    @Override
    public ResponseEntity<?> update(CatalogUpdateRequest request) {
        Catalog catalog = repository.findById(request.getId()).orElse(null);
        if (catalog == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.CATALOG_NOT_FOUND);
        }
        catalog.setName(request.getName());
        catalog.setDescription(request.getDescription());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(catalog), SubCatalogDto.class));

    }

    @Override
    public ResponseEntity<CatalogDto> findById(Long id) {
        Catalog catalog = repository.findById(id).orElse(null);
        if (catalog == null) {
            return new ResponseHandler<CatalogDto>().sendError(StatusErrorEnums.CATALOG_NOT_FOUND);
        }
        return new ResponseHandler<CatalogDto>().sendSuccess(mapper.map(catalog, CatalogDto.class));

    }

    public Catalog convertSignupRequesttoCatalog(CatalogCreateRequest request) {
        Catalog result = new Catalog();
        result.setName(request.getName());
        result.setDescription(request.getDescription());
        return result;
    }
}
