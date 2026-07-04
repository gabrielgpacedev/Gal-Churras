package com.galchurras.galchurras_api.entity;


import com.galchurras.galchurras_api.enuns.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "tb_usuario")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(nullable = false, name = "pessoa_id")
    private Pessoa pessoa;

    @Enumerated
    @Column(nullable = false, name = "id_tipo_usuario")
    private TipoUsuario tipoUsuario;

    @Column(nullable = false, name = "ativo")
    private Boolean ativo;
}
