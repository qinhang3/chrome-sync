package com.github.qinhang3.sync.controller;

import com.github.qinhang3.sync.domain.Response;
import com.github.qinhang3.sync.domain.SyncVO;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/sync")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SyncController {

    private Cache<String, SyncVO> cache = CacheBuilder.newBuilder().expireAfterWrite(8, TimeUnit.HOURS)
            .maximumSize(100).build();

    private Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/get")
    public Response<List<SyncVO>> get(){
        List<SyncVO> syncVOS = new ArrayList<>(cache.asMap().values());
        syncVOS.sort((o1, o2) -> -o1.getCreateTime().compareTo(o2.getCreateTime()));
        logger.info("get values:  size = {}", syncVOS.size());
        return Response.success(syncVOS);
    }

    @RequestMapping("/add")
    public Response<List<SyncVO>> add(@RequestParam("value") String value){
        if (!StringUtils.isEmpty(value)){
            logger.info("add value : [{}]", value);
            SyncVO syncVO = new SyncVO(value, new Date(), null);
            cache.put(value, syncVO);
        }
        return get();
    }
}
