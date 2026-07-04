package com.galchurras.galchurras_api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "tb_endereco")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Endereco {

    @Id
    private Long id;

    @Column(nullable = false, name = "rua")
    private String rua;

    @Column(nullable = false, name = "bairro")
    private String bairro;

    @Column(nullable = false, name = "numero")
    private Integer numero;

    @Column(name = "complemento")
    private String complemento;

    @Column(nullable = false, name = "cep")
    private String cep;

    @Column(nullable = false, name = "cidade")
    private String cidade;

    @Column(nullable = false, name = "uf")
    private String uf;

}
