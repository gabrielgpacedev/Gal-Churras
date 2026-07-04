package com.galchurras.galchurras_api.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PessoaDTO {
    private  long id;

    private String nome;

    private String genero;

    private Date dataNascimento;

    private String email;

    private String documento;
}
