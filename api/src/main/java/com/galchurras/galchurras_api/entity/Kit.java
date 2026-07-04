package com.galchurras.galchurras_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_kit")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Kit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "valor", nullable = false)
    private String valor;

    @OneToMany(mappedBy = "kit")
    private List<PedidoKit> pedidos;

}
