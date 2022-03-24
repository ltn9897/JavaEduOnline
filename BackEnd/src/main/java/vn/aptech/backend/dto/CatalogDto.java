package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.aptech.backend.entity.SubCatalog;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CatalogDto {
    private Long id;
    private String name;
    private String description;
    private List<SubCatalogDto> subCatalogs;
}
