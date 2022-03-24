package vn.aptech.backend.dto.request.catalog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CatalogUpdateRequest {
    @NotNull
    private Long id;
    @NotNull
    @NotBlank
    private String name;
    private String description;
}
