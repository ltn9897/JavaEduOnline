package vn.aptech.backend.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.aptech.backend.dto.CourseDto;
import vn.aptech.backend.dto.ResponseHandler;
import vn.aptech.backend.dto.SubCatalogDto;
import vn.aptech.backend.dto.request.subcatalog.SubCatalogCreateRequest;
import vn.aptech.backend.dto.request.subcatalog.SubCatalogUpdateRequest;
import vn.aptech.backend.entity.*;
import vn.aptech.backend.repository.*;
import vn.aptech.backend.service.SubCatalogService;
import vn.aptech.backend.utils.SecurityUtils;
import vn.aptech.backend.utils.enums.RoleEnums;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubCatalogServiceImpl implements SubCatalogService {
    @Autowired
    private SubCatalogRepository repository;

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Autowired
    private ModelMapper mapper;


    @Override
    public ResponseEntity<?> create(SubCatalogCreateRequest request) {
        Catalog catalog = catalogRepository.findById(request.getCatalogId()).orElse(null);
        if (catalog == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.CATALOG_NOT_FOUND);
        }
        SubCatalog subCatalog = this.convertSignupRequesttoSubCatalog(request);
        subCatalog.setCatalog(catalog);
        SubCatalogDto newSubCatalog = mapper.map(repository.save(subCatalog), SubCatalogDto.class);
        return new ResponseHandler<>().sendSuccess(newSubCatalog);
    }

    @Override
    public ResponseEntity<?> fillAll() {
        List<SubCatalog> subCatalogs = repository.findSubCatalogByDeletedDateIsNull();
        List<SubCatalogDto> subCatalogDtoPage = subCatalogs.stream().map(subCatalog -> mapper.map(subCatalog, SubCatalogDto.class)).collect(Collectors.toList());
        return new ResponseHandler<>().sendSuccess(subCatalogDtoPage);
    }

    @Override
    public ResponseEntity<Page<SubCatalogDto>> findBySubCatalogName(String name) {
        List<SubCatalog> subCatalogs = repository.findSubCatalogByNameLikeAndDeletedDateIsNull("%" + name + "%");
        List<SubCatalogDto> subCatalogDtoPage = subCatalogs.stream().map(subCatalog -> mapper.map(subCatalog, SubCatalogDto.class)).collect(Collectors.toList());
        return new ResponseHandler<Page<SubCatalogDto>>().sendSuccess(subCatalogDtoPage);
    }

    @Override
    public ResponseEntity<?> update(SubCatalogUpdateRequest request) {
        SubCatalog subCatalogs = repository.findById(request.getId()).orElse(null);
        if (subCatalogs == null) {
            return new ResponseHandler<>().sendError(StatusErrorEnums.SUBCATALOG_NOT_FOUND);
        }
        if (request.getCatalogId() != null) {
            Catalog catalog = catalogRepository.findById(request.getCatalogId()).orElse(null);
            if (catalog == null) {
                return new ResponseHandler<>().sendError(StatusErrorEnums.CATALOG_NOT_FOUND);
            }
            subCatalogs.setCatalog(catalog);
        }
        subCatalogs.setName(request.getName());
        subCatalogs.setDescription(request.getDescription());
        return new ResponseHandler<>().sendSuccess(mapper.map(repository.save(subCatalogs), SubCatalogDto.class));
    }

    @Override
    public ResponseEntity<SubCatalogDto> findById(Long id) {
        SubCatalog subCatalog = repository.findById(id).orElse(null);
        if (subCatalog == null) {
            return new ResponseHandler<SubCatalogDto>().sendError(StatusErrorEnums.SUBCATALOG_NOT_FOUND);
        }
        SubCatalogDto result = mapper.map(subCatalog, SubCatalogDto.class);
        List<Course> courses = new ArrayList<>();
        AppUser user = securityUtils.getPrincipal();
        if (user != null && user.getRole().getName().equals(RoleEnums.ROLE_ADMIN.name())) {
            courses = subCatalog.getCourses();
        } else {
            courses = subCatalog.getCourses().stream().filter(Course::isActivate).collect(Collectors.toList());
        }
        List<CourseDto> courseDtos = courses.stream().map(this::convertEntityToDto).collect(Collectors.toList());
        result.setCourses(courseDtos);
        return new ResponseHandler<SubCatalogDto>().sendSuccess(result);
    }

    public SubCatalog convertSignupRequesttoSubCatalog(SubCatalogCreateRequest request) {
        SubCatalog result = new SubCatalog();
        result.setName(request.getName());
        result.setDescription(request.getDescription());
        return result;
    }

    @SuppressWarnings("Duplicates")
    public CourseDto convertEntityToDto(Course course) {
        CourseDto courseDto = mapper.map(course, CourseDto.class);
        courseDto.setCatalog(course.getSubCatalog().getCatalog().getName());
        List<Orders> orders = ordersRepository.findOrdersByCourseId(course.getId());
        courseDto.setTotalSold(orders.size());
        courseDto.setReviews(null);
        courseDto.setLessons(null);
        List<Review> reviews = reviewRepository.findByCourseIdAndDeletedDateIsNull(course.getId());
        if (reviews.size() > 0) {
            float totalRating = 0;
            for (Review review : reviews) {
                totalRating += review.getRatting();
            }
            courseDto.setAvgRatting(totalRating / reviews.size());
        } else {
            courseDto.setAvgRatting(0);
        }
        return courseDto;

    }
}
