package vn.aptech.backend.utils.converter;

import org.springframework.core.convert.converter.Converter;
import vn.aptech.backend.utils.enums.LanguageEnum;

public class LanguageConverter implements Converter<String, LanguageEnum> {

    @Override
    public LanguageEnum convert(String s) {
        return LanguageEnum.valueOf(s);
    }
}
