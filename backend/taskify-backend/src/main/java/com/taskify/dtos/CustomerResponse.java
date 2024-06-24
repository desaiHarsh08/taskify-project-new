package com.taskify.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

    private List<CustomerDto> content;

    private int pageNumber;

    private int pageSize;

    private Long totalEntries;

    private int totalPages;

    private boolean isLastPage;

}
