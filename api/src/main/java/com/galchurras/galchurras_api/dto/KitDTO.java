package com.galchurras.galchurras_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KitDTO {

    private Long id;

    private String nome;

    private String valor;
}
