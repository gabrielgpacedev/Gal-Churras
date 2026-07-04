package com.galchurras.galchurras_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "tb_estabelecimento")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estabelecimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_endereco", nullable = false)
    private Endereco endereco;

    @Column(name = "cnpj", nullable = false)
    private String cnpj;

    @Column(name = "nome", nullable = false)
    private String nome;
}