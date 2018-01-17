package com.github.qinhang3.sync.domain;

import java.io.Serializable;
import java.util.Date;

public class SyncVO implements Serializable{

    private static final long serialVersionUID = 2448686178974505825L;

    private String value;
    private Date createTime;
    private String from;

    public SyncVO(String value, Date createTime, String from) {
        this.value = value;
        this.createTime = createTime;
        this.from = from;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }
}
