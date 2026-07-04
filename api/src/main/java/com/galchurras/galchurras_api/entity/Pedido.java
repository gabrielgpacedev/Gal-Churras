package com.galchurras.galchurras_api.entity;

import com.galchurras.galchurras_api.enuns.StatusEntrega;
import com.galchurras.galchurras_api.enuns.StatusPagamento;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;


@Getter
@Setter
@Entity
@Table(
        name = "tb_pedido_produto"
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_endereco", nullable = false)
    private Endereco endereco;

    @Enumerated
    @Column(nullable = false)
    private StatusPagamento statusPagamento;

    @Enumerated
    @Column(nullable = false)
    private StatusEntrega statusEntrega;

    @Enumerated
    @Column(nullable = false)
    private StatusEntrega statusEntregaEstabelecimento;

    @Column(name = "valor_subtotal", nullable = false)
    private Double valorSubtotal;

    @Column(name = "valor_desconto", nullable = false)
    private Double valorDesconto;

    @Column(name = "valor_total", nullable = false)
    private Double valorTotal;

    @Column(name = "data_pedido", nullable = false)
    private Date dataPedido;

    @Column(name = "observacao", nullable = false)
    private String observacao;

    @JoinColumn(name = "id_estabelecimento", nullable = false)
    @ManyToOne
    private Estabelecimento estabelecimento;

    @JoinColumn(name = "id_kit", nullable = false)
    @ManyToOne
    private Kit kit;
}
