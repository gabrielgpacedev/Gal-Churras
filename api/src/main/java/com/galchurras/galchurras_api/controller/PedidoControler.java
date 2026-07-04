package com.galchurras.galchurras_api.controller;

import com.galchurras.galchurras_api.dto.PedidoDTO;
import com.galchurras.galchurras_api.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pedido")
@RequiredArgsConstructor
public class PedidoControler {

    private final PedidoService pedidoService;

    @GetMapping("/{idPessoa}/pedido/{idPedido}")
    public PedidoDTO getPedido(@PathVariable Long idPessoa, @PathVariable Long idPedido) {
        return pedidoService.buscarPedidoPessoa(idPessoa, idPedido);
    }
}
