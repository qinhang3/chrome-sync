package com.github.qinhang3.sync.controller;

import com.github.qinhang3.sync.domain.Response;
import com.github.qinhang3.sync.domain.SyncVO;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/sync")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SyncController {

    private Cache<String, SyncVO> cache = CacheBuilder.newBuilder().expireAfterWrite(8, TimeUnit.HOURS)
            .maximumSize(100).build();

    @RequestMapping("/get")
    public Response<List<SyncVO>> get(){
        List<SyncVO> syncVOS = new ArrayList<>(cache.asMap().values());
        syncVOS.sort((o1, o2) -> -o1.getCreateTime().compareTo(o2.getCreateTime()));
        return Response.success(syncVOS);
    }

    @RequestMapping("/add")
    public Response<List<SyncVO>> add(@RequestParam("value") String value){
        SyncVO syncVO = new SyncVO(value, new Date(), null);
        cache.put(UUID.randomUUID().toString(), syncVO);
        return get();
    }
}
