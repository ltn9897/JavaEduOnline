package vn.aptech.backend.dto;

import org.springframework.http.HttpStatus;

import java.util.Arrays;
import java.util.List;

public class ApiError {
    private HttpStatus status;
    private String messege;
    private List<String> errors;

    public ApiError(HttpStatus status, String messege, List<String> errors) {
        this.status = status;
        this.messege = messege;
        this.errors = errors;
    }

    public ApiError(HttpStatus status, String messege, String error){
        super();
        this.status = status;
        this.messege = messege;
        errors = Arrays.asList(error);
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessege() {
        return messege;
    }

    public void setMessege(String messege) {
        this.messege = messege;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}
