package com.taskify.dtos;

import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Data
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FileDto {

    private MultipartFile file;

    private String fieldColumnName;

    private String functionFieldName;

    private String functionFieldId;

    private String functionName;

    private String functionId;

    private String taskType;

    private Long taskId;

}
