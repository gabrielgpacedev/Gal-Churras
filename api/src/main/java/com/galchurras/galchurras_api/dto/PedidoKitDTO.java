package com.galchurras.galchurras_api.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PedidoKitDTO {

    private Long idKit;
    private String nome;
    private Integer quantidade;
    private BigDecimal valorUnitario;
}
