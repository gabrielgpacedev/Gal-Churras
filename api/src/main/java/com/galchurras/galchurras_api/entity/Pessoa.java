package com.galchurras.galchurras_api.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "tb_pessoa")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "nome")
    private String nome;

    @Column(nullable = false, name = "genero")
    private String genero;

    @Column(nullable = false, name = "dt_nasc")
    private Date dataNascimento;

    @Column(nullable = false, name = "email")
    private String email;

    @Column(nullable = false, name = "documento")
    private String documento;


}
