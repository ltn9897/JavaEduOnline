package vn.aptech.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Catalog")
public class Catalog extends BaseEntity{
    private String name;
    private String description;

    @OneToMany(mappedBy = "catalog")
    List<SubCatalog> subCatalogs;

}
