package com.example.demo.constant;

import com.google.common.collect.ImmutableMap;

import java.util.Map;

public class Uploader {

    public static final Map<String, Object> OPTIONS = ImmutableMap.of(
            "folder", "storozone",
            "use_filename", true,
            "unique_filename", true
    );

}
