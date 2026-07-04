package com.galchurras.galchurras_api.repository;

import com.galchurras.galchurras_api.entity.Pedido;
import com.galchurras.galchurras_api.entity.Pessoa;
import com.galchurras.galchurras_api.enuns.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    Optional<Pedido> findPedidoByStatusPedidoAndUsuario_Id(StatusPedido statusPedido, Long usuarioId);
}
