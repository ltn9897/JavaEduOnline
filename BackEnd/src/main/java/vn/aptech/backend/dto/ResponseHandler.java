package vn.aptech.backend.dto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import vn.aptech.backend.utils.enums.StatusErrorEnums;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler<T>{

    private String message;
    private String status;
    private Object responseObj;

    public ResponseEntity<T> sendSuccess(Object responseObj){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "Success");
        map.put("status", 200);
        map.put("data", responseObj);
        return new ResponseEntity<T>((T) map,HttpStatus.OK);
    }

    public ResponseEntity<T> sendSuccess(String message,Object responseObj){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", 200);
        map.put("data", responseObj);
        return new ResponseEntity<T>((T)map,HttpStatus.OK);
    }

    public ResponseEntity<T> sendError(StatusErrorEnums errorEnums){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", errorEnums.getMessage());
        map.put("status", errorEnums.getStatusCode());
        map.put("data", null);
        return new ResponseEntity<T>((T) map,HttpStatus.OK);
    }

    public ResponseEntity<T> sendError(String message){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", "Error");
        map.put("data", null);
        return new ResponseEntity<T>((T) map,HttpStatus.OK);
    }
}
