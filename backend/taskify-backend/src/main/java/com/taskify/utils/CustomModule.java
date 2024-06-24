package com.taskify.utils;

import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.core.io.UrlResource;

public class CustomModule extends SimpleModule {

    public CustomModule() {
        addSerializer(UrlResource.class, new UrlResourceSerializer());
    }
}