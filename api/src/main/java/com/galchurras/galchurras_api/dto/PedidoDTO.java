package com.galchurras.galchurras_api.dto;

import com.galchurras.galchurras_api.enuns.StatusPedido;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDTO {
    private String nomeEstabelecimento;

    private StatusPedido statusPedido;

    private Date horapedido;

    private Double tempoEstimadoEstabelecimentoEntrega;

    private List<KitDTO> kits;

    private List<ProdutoDTO> produtos;

    private List<PedidoKitDTO> pedidosKits;

    private Double valorTotal;

    private String endereco;
}
