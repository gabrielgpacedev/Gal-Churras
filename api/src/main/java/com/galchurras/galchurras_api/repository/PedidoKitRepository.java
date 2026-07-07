package com.galchurras.galchurras_api.repository;

import com.galchurras.galchurras_api.entity.PedidoKit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoKitRepository extends JpaRepository<PedidoKit, Long> {
    List<PedidoKit> findAllByPedido_Id(Long pedidoId);
}
