package com.backend.backend.util;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// create a template class with paging and hasNext and hasPrevious fields
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WithPagination<T> {
    private List<T> items;
    private int page;
    private int size;
    private int totalCount;
    private boolean hasNext;
    private boolean hasPrevious;
    private int totalPages;
    private int currentPage;
}
