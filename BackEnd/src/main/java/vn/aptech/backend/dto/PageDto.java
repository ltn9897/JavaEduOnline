package vn.aptech.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDto {
    private int page;
    private int size;
    private int pageNumber;
    private String sort;

    public PageDto builder(PageDto pageDto){
        if (pageDto.getPage() == 0) {
            pageDto.setPage(0);
        }
        if (pageDto.getSize() == 0) {
            pageDto.setSize(10);
        }
        if(pageDto.getPageNumber()==0){
            pageDto.setPageNumber(0);
        }
        if(StringUtils.isEmpty(sort)){
            sort = "ASC";
        }
        return pageDto;
    }

    public Sort getSort(){
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by("id").ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by("id").descending();
        }
        return sortable;
    }
}
