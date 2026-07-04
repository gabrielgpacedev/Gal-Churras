package com.galchurras.galchurras_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_tipo_estabelecimento")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoEstabelecimento {

    @Column(name = "id")
    @Id
    private Integer id;

    @Column(name = "descricao")
    private String descricao;

}
