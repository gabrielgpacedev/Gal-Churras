package com.galchurras.galchurras_api.service;

import com.galchurras.galchurras_api.converter.ConverterKitDTO;
import com.galchurras.galchurras_api.dto.KitDTO;
import com.galchurras.galchurras_api.dto.PedidoDTO;
import com.galchurras.galchurras_api.dto.ProdutoDTO;
import com.galchurras.galchurras_api.entity.Kit;
import com.galchurras.galchurras_api.entity.Pedido;
import com.galchurras.galchurras_api.entity.PedidoKit;
import com.galchurras.galchurras_api.entity.Pessoa;
import com.galchurras.galchurras_api.enuns.StatusPedido;
import com.galchurras.galchurras_api.mapper.EntityMapper;
import com.galchurras.galchurras_api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PessoaRepository pessoaRepository;
    private final EntityMapper entityMapper;
    private final PedidoProdutoRepository pedidoProdutoRepository;

    public PedidoDTO buscarPedidoPessoa(Long idPessoa, Long idPedido) {

        PedidoDTO pedidoDTO = new PedidoDTO();

        Optional<Pessoa> pessoa = pessoaRepository.findById(idPessoa);

        Pedido pedido = pedidoRepository.findPedidoByStatusPedidoAndUsuario_Id(StatusPedido.PREPARANDO, idPessoa).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        List<ProdutoDTO> produtos = pedidoProdutoRepository
                .findAllByIdAndPedido_Id(idPessoa, idPedido)
                .stream()
                .map(entityMapper::produtoToDTO)
                .toList();

        pedidoDTO.setProdutos(produtos);

        pedidoDTO.setNomeEstabelecimento(pedido.getEstabelecimento().getNome());
        pedidoDTO.setStatusPedido(pedido.getStatusPedido());
        pedidoDTO.setHorapedido(pedido.getData_pedido());
        pedidoDTO.setTempoEstimadoEstabelecimentoEntrega(10.2);
        pedidoDTO.setEndereco(pedido.getEndereco()
                .toString());
        pedidoDTO.setProdutos(produtos);
        pedidoDTO.setPedidosKits(
                pedido.getKits()
                        .stream()
                        .map(entityMapper::pedidoKitToDTO)
                        .toList()
        );
        pedidoDTO.setValorTotal(100.2);


        return pedidoDTO;
    }

}
