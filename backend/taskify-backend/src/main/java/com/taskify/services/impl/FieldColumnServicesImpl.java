package com.taskify.services.impl;

import java.io.IOException;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.taskify.constants.ColumnType;
import com.taskify.dtos.FieldColumnDto;
import com.taskify.dtos.FileDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.models.FieldColumnModel;
import com.taskify.models.FunctionFieldModel;
import com.taskify.models.FunctionModel;
import com.taskify.models.TaskModel;
import com.taskify.repositories.FieldColumnRepository;
import com.taskify.repositories.FunctionFieldRepository;
import com.taskify.repositories.FunctionRepository;
import com.taskify.repositories.TaskRepository;
import com.taskify.services.FieldColumnServices;

@Service
public class FieldColumnServicesImpl implements FieldColumnServices {

    @Autowired
    private FieldColumnRepository fieldColumnRepository;

    @Autowired
    private FunctionFieldRepository functionFieldRepository;

    @Autowired
    private FunctionRepository functionRepository;

    @Autowired
    private TaskRepository taskRepository;

    // TODO: Store file and send emails to the user
    @Override
    public FieldColumnDto createFieldColumn(FieldColumnDto fieldColumnDto, FileDto[] fileDtos) {
        FieldColumnModel fieldColumnModel = new FieldColumnModel();
        fieldColumnModel.setType(fieldColumnDto.getType());
        fieldColumnModel.setName(fieldColumnDto.getName());
        fieldColumnModel.setForwardFileToEmail(fieldColumnDto.getForwardFileToEmail());
        fieldColumnModel.setLargeText(fieldColumnDto.getLargeText());
        fieldColumnModel.setIsUnique(fieldColumnDto.getUnique());
        fieldColumnModel.setAutoAssign(fieldColumnDto.getAutoAssign());
        fieldColumnModel.setMultipleFiles(fieldColumnDto.getMultipleFiles());
        fieldColumnModel.setLastEdited(new java.sql.Date(System.currentTimeMillis()));

        FunctionFieldModel fieldModel = this.functionFieldRepository.findById(fieldColumnDto.getFunctionFieldId())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "No function_field exists for id: " + fieldColumnDto.getFunctionFieldId()));

        fieldColumnModel.setFunctionField(fieldModel);

        FieldColumnModel savedFieldColumnModel = this.fieldColumnRepository.save(fieldColumnModel);

        fieldColumnDto.setId(savedFieldColumnModel.getId());

        if (fieldColumnDto.getType().equals(ColumnType.FILE.name())) { // Store the file
            try {
                String fileDirectory = generateFileDirectory(fieldColumnDto);
                String fileName = fieldColumnDto.getName();
                int i = 0;
                if (fileDtos.length > 1) { // There are multiple files present
                    for (FileDto fileDto : fileDtos) {
                        MultipartFile file = fileDto.getFile();
                        System.out.println("\n\n original file name:" + file.getOriginalFilename() + "\n");
                        saveFile(file, fileDirectory, fileName + ++i);
                    }
                } else if (fileDtos != null && fileDtos.length > 0) { // Only one file present
                    MultipartFile file = fileDtos[0].getFile();
                    System.out.println("\n\n original file name:" + file.getOriginalFilename() + "\n");
                    saveFile(file, fileDirectory, fileName);
                }

                savedFieldColumnModel.setValue(fileDirectory);

            } catch (IOException e) {
                // Handle the exception, maybe log it or rethrow it
                e.printStackTrace();
                return null;
            }
        } else {
            savedFieldColumnModel.setValue(fieldColumnDto.getValue());
        }

        savedFieldColumnModel = this.fieldColumnRepository.save(savedFieldColumnModel);

        return this.fieldColumnModelToDto(savedFieldColumnModel);
    }

    private String saveFile(MultipartFile file, String fileDirectory, String fileName) throws IOException {
        // Define the directory path adjacent to the root directory
        Path directoryPath = Paths.get("../data" + fileDirectory);

        // Ensure the directory exists
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        // Extract the file extension from the original file
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));

        // Create the full file name with extension
        String fullFileName = fileName + extension;

        // Create the path for the file to be stored, using the provided fileName
        Path filePath = directoryPath.resolve(fullFileName);

        // Save the file to the defined directory
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return the complete file path as a string
        return filePath.toAbsolutePath().toString();
    }

    public String generateFileDirectory(FieldColumnDto fieldColumnDto) {
        FunctionFieldModel functionFieldModel = this.functionFieldRepository
                .findById(fieldColumnDto.getFunctionFieldId()).orElseThrow(
                        () -> new ResourceNotFoundException(
                                "No function_field exist for id: " + fieldColumnDto.getFunctionFieldId()));
        FunctionModel functionModel = this.functionRepository.findById(functionFieldModel.getFunction().getId())
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "No function exist for id: " + functionFieldModel.getFunction().getId()));
        TaskModel taskModel = this.taskRepository.findById(functionModel.getTask().getId()).orElseThrow(
                () -> new ResourceNotFoundException("No task exist for id: " + functionModel.getTask().getId()));

        String fileDirectory = ("/" + taskModel.getTaskType() +
                "/" + "task-" + taskModel.getId() +
                "/(" + functionModel.getFunctionTitle() + ")-" + functionModel.getId() +
                "/(" + functionFieldModel.getFieldTitle() + ")-" + functionFieldModel.getId() +
                "/(" + fieldColumnDto.getName() + ")-" + fieldColumnDto.getId());

        System.out.println("\n\nGenerating file direactory: " + fileDirectory);
        return fileDirectory;

    }

    @Override
    public List<FieldColumnDto> getAllFieldColumnsByFunctionField(Long functionFieldId) {
        FunctionFieldModel functionFieldModel = this.functionFieldRepository.findById(functionFieldId).orElseThrow(
                () -> new ResourceNotFoundException("No function_field exist with id: " + functionFieldId));
        List<FieldColumnModel> fieldColumnModelList = this.fieldColumnRepository
                .findByFunctionField(functionFieldModel);

        List<FieldColumnDto> fieldColumnDtoList = new ArrayList<>();
        for (FieldColumnModel fieldColumnModel : fieldColumnModelList) {
            fieldColumnDtoList.add(this.fieldColumnModelToDto(fieldColumnModel));
        }

        return fieldColumnDtoList;
    }

    @Override
    public FieldColumnDto getFieldColumnById(Long fieldColumnId) {
        return this.fieldColumnModelToDto(
                this.fieldColumnRepository.findById(fieldColumnId).orElseThrow(
                        () -> new ResourceNotFoundException("No field_column exist for id: " + fieldColumnId)));
    }

    public FieldColumnDto updateFieldColumn(FieldColumnDto fieldColumnDto, Long fieldColumnId) {
        FieldColumnModel foundFieldColumn = this.fieldColumnRepository.findById(fieldColumnId)
                .orElseThrow(() -> new ResourceNotFoundException("No field_column exists for id: " + fieldColumnId));

        // Update common fields
        foundFieldColumn.setType(fieldColumnDto.getType());
        foundFieldColumn.setName(fieldColumnDto.getName());
        foundFieldColumn.setForwardFileToEmail(fieldColumnDto.getForwardFileToEmail());
        foundFieldColumn.setLargeText(fieldColumnDto.getLargeText());
        foundFieldColumn.setIsUnique(fieldColumnDto.getUnique());
        foundFieldColumn.setAutoAssign(fieldColumnDto.getAutoAssign());
        foundFieldColumn.setMultipleFiles(fieldColumnDto.getMultipleFiles());
        foundFieldColumn.setLastEdited(new java.sql.Date(System.currentTimeMillis()));

        // Handle value based on file type
        if (fieldColumnDto.getFiles() != null) {
            if (ColumnType.FILE.name().equals(fieldColumnDto.getType())) {
                try {

                    String fileDirectory = generateFileDirectory(fieldColumnDto);
                    String fileName = fieldColumnDto.getName();
                    int i = 0;
                    if (fieldColumnDto.getFiles().size() > 1) { // There are multiple files present
                        // Remove existing files first
                        deleteExistingFiles(foundFieldColumn.getValue());

                        // Save new files
                        for (Object file : fieldColumnDto.getFiles()) {
                            saveFile((MultipartFile) file, fileDirectory, fileName + ++i);
                        }
                    } else { // Only one file present
                        MultipartFile file = (MultipartFile) fieldColumnDto.getFiles().get(0);
                        deleteExistingFiles(foundFieldColumn.getValue());
                        saveFile(file, fileDirectory, fileName);
                    }

                    foundFieldColumn.setValue(fileDirectory);
                } catch (IOException e) {
                    // Handle the exception, maybe log it or rethrow it
                    e.printStackTrace();
                    return null;
                }

            } else {
                // Handle other types (String, Date, Boolean)

                foundFieldColumn.setValue((String) fieldColumnDto.getFiles().get(0));

            }
        }
        else {
            foundFieldColumn.setValue(fieldColumnDto.getValue());
        }

        // Save the updated FieldColumnModel
        FieldColumnModel savedFieldColumnModel = this.fieldColumnRepository.save(foundFieldColumn);

        return this.fieldColumnModelToDto(savedFieldColumnModel);
    }

    public void deleteExistingFiles(String fileDirectory) {
        Path directoryPath = Paths.get(fileDirectory);

        // Check if the directory exists
        if (Files.exists(directoryPath) && Files.isDirectory(directoryPath)) {
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(directoryPath)) {
                for (Path filePath : stream) {
                    if (Files.isRegularFile(filePath)) {
                        Files.delete(filePath); // Delete each file in the directory
                    }
                }
            } catch (IOException e) {
                e.printStackTrace(); // Handle exception as needed
            }
        }
    }

    @Override
    public Boolean deleteFieldColumn(Long fieldColumnId) {
        FieldColumnModel fieldColumnModel = this.fieldColumnRepository.findById(fieldColumnId).orElseThrow(
                () -> new ResourceNotFoundException("No field_column exist for id: " + fieldColumnId));
        // Delete the folder and files
        if (fieldColumnModel.getType().equals(ColumnType.FILE.name())) {
            this.deleteExistingFiles(fieldColumnModel.getValue());
        }
        this.fieldColumnRepository.deleteById(fieldColumnId);
        return true;
    }

    public FieldColumnDto fieldColumnModelToDto(FieldColumnModel fieldColumnModel) {
        if (fieldColumnModel == null) {
            return null;
        }

        FieldColumnDto fieldColumnDto = new FieldColumnDto();
        fieldColumnDto.setFunctionFieldId(fieldColumnModel.getFunctionField().getId());
        fieldColumnDto.setId(fieldColumnModel.getId());
        fieldColumnDto.setType(fieldColumnModel.getType());
        fieldColumnDto.setName(fieldColumnModel.getName());
        fieldColumnDto.setForwardFileToEmail(fieldColumnModel.getForwardFileToEmail());
        fieldColumnDto.setLargeText(fieldColumnModel.getLargeText());
        fieldColumnDto.setUnique(fieldColumnModel.getIsUnique());
        fieldColumnDto.setAutoAssign(fieldColumnModel.getAutoAssign());
        fieldColumnDto.setMultipleFiles(fieldColumnModel.getMultipleFiles());
        fieldColumnDto.setFunctionFieldId(fieldColumnModel.getFunctionField().getId());
        fieldColumnDto.setLastEdited(fieldColumnModel.getLastEdited());

        if (fieldColumnModel.getType().equals(ColumnType.FILE.name())) { // Get the file

            String fileDirectory = fieldColumnModel.getValue();

            List<Object> resources = new ArrayList<>();
            Path directoryPath = Paths.get("../data" + fileDirectory);
            System.out.println("\n\file directory: " + fileDirectory);
            System.out.println("\n\file name: " + fileDirectory);
            System.out.println("\n\ndirectoryPath: " + directoryPath);

            // Fetch all files from the directory
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(directoryPath)) {
                for (Path filePath : stream) {
                    if (Files.isRegularFile(filePath)) {
                        Resource resource = new UrlResource(filePath.toUri());
                        resources.add(resource);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception as needed
            }

            // Assuming you have a way to convert Resource to whatever type you need in
            // FieldColumnDto
            fieldColumnDto.setFiles(resources);

        } else {
            fieldColumnDto.setValue(fieldColumnModel.getValue());
        }

        return fieldColumnDto;
    }

}
