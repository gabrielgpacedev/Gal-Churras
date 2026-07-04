package com.galchurras.galchurras_api.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "tb_categoria_produto")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaProduto {

    @Id
    private Long id;

    @Column(name = "descricao")
    private String descricao;
}
