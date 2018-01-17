package com.github.qinhang3.sync.domain;

import java.io.Serializable;

public class Response<T> implements Serializable{
    private static final long serialVersionUID = -7820811676403703148L;

    private T data;
    private boolean success;
    private String message;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static <T> Response<T> success(T data){
        Response<T> r = new Response<>();
        r.setSuccess(true);
        r.setData(data);
        return r;
    }
}
