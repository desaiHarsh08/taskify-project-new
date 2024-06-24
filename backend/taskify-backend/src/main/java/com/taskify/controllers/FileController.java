package com.taskify.controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/v1/files")
public class FileController {

    @GetMapping("")
    public ResponseEntity<Resource> getFile(@RequestParam String filePath) {
        System.out.println("fired: " + filePath);
        try {
            // Resolve the file path relative to the base directory
            Path file = Paths.get(filePath);
            Resource resource = new FileSystemResource(file);

            // Check if the file exists
            if (resource.exists() && resource.isReadable()) {
                // Determine the media type of the file based on the file extension
                String contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
                MediaType mediaType = MediaType.parseMediaType(contentType);

                // Return the file for download
                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
