package com.udd.udd.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String education;
    private String highlight;
    private String address;
}
