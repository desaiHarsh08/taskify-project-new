package com.taskify.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

import org.springframework.core.io.UrlResource;

public class UrlResourceSerializer extends JsonSerializer<UrlResource> {

    @Override
    public void serialize(UrlResource value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeString(value.getURL().toString());
    }
}