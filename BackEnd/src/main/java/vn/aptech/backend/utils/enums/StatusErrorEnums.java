package vn.aptech.backend.utils.enums;

public enum StatusErrorEnums {
    //600-700 UserError
    USER_DETAILS_NOT_EXISTS(600, "User Details not exists"),
    USER_USERNAME_IS_ALREADY_TAKEN(601, "Username is already taken!"),
    USER_EMAIL_IS_ALREADY_USE(602, "Email is already use!"),
    USER_OLD_PASSWORD_IS_WRONG(603, "Old Password is wrong"),
    USER_CONFIRM_PASSWORD_DIFFERENT_NEW_PASSWORD(604, "Confirm password different new password"),
    USER_PASSWORD_DIFFERENT_NEW_PASSWORD(605, "Confirm password different password"),
    USER_ROLE_NOT_FOUND(606, "Role not found"),
    USER_IS_NOT_ENABLED(606, "USER IS NOT ENABLED"),
    USER_NOT_FOUND(607, "User not found"),

    //CatalogError - SubCatalogError
    CATALOG_NOT_FOUND(608, "Catalog not found"),
    SUBCATALOG_NOT_FOUND(608, "SubCatalog not found"),
    REVIEW_NOT_FOUND(609,"Review not found"),

    CONVERSATION_NOT_FOUND(610,"Conversation not found"),


    //700-730 CourseError
    COURSE_NOT_FOUND(700, "Course not exists"),
    SAVED_COURSE_NOT_FOUND(701, "Saved Course not exists"),


    //731-760 LessonError
    LESSON_NOT_FOUND(731, "Lesson not found"),

    LESSON_NOT_IN_COURSE(732, "Lesson not in course"),

    //761-799 LectureError
    LECTURE_NOT_FOUND(761, "Lecture not in course"),
    LECTURE_NOT_IN_LESSON(732, "Lecture not in Lesson"),


    //800-850 Payment Error
    PAYMENT_800(800, "Payment not exists"),


    //851-900 Order Error
    ORDER_NOT_EXISTS(851, "Order not exists"),
    ORDER_CANNOT_TAKE_DATA(852, "Order take data"),
    GET_ORDER_ID_HAVE_PROBLEM(853,"Get Order Paypal have problem"),

    //900-999 Other
    OTHER_900(900, "Some thing is wrong");

    private final int statusCode;
    private final String message;

    private StatusErrorEnums(int status, String message) {
        this.statusCode = status;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    @Override
    public String toString() {
        return statusCode + ": " + message;
    }
}
