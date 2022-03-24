package vn.aptech.backend.utils.enums;

public enum LanguageEnum {
    ENG("English"),
    VN("Viet Nam"),
    FR("France"),
    JP("Japan");

    private final String language;

    LanguageEnum(String language) {
        this.language = language;
    }

    public String getValue() {
        return language;
    }
}
