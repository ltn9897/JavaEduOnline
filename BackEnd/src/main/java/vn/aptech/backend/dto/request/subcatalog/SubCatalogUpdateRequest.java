package vn.aptech.backend.dto.request.subcatalog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCatalogUpdateRequest {
    @NotNull
    private Long id;
    private Long catalogId;
    @NotNull
    @NotBlank
    private String name;
    private String description;
}
