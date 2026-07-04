package com.galchurras.galchurras_api.repository;

import com.galchurras.galchurras_api.entity.PedidoProduto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoProdutoRepository extends JpaRepository<PedidoProduto, Long> {

    List<PedidoProduto> findAllByIdAndPedido_Id(Long id, Long pedidoId);
}
