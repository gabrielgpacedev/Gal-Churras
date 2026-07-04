package com.galchurras.galchurras_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {

    private String categoriaProduto;

    private String estabelecimentoProduto;

    private String nome;

    private String descricao;

    private Double valor;

}
