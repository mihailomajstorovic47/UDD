package com.udd.udd.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AdvancedSearchRequestDTO {
    private String criteria;
    private String op;
    private String content;
    private Boolean phrase;
}
