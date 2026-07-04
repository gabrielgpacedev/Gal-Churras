package com.galchurras.galchurras_api.mapper;

import com.galchurras.galchurras_api.dto.KitDTO;
import com.galchurras.galchurras_api.dto.PedidoKitDTO;
import com.galchurras.galchurras_api.dto.ProdutoDTO;
import com.galchurras.galchurras_api.entity.Kit;
import com.galchurras.galchurras_api.entity.PedidoKit;
import com.galchurras.galchurras_api.entity.PedidoProduto;
import com.galchurras.galchurras_api.entity.Produto;
import org.springframework.stereotype.Component;

@Component
public class EntityMapper {

    public KitDTO kitToDTO(Kit kit) {
        if (kit == null) {
            return null;
        }

        return new KitDTO(
                kit.getId(),
                kit.getNome(),
                kit.getValor()
        );
    }

    public ProdutoDTO produtoToDTO(PedidoProduto pedidoProduto) {
        Produto produto = pedidoProduto.getProduto();

        ProdutoDTO dto = new ProdutoDTO();
        dto.setNome(produto.getNome());
        dto.setDescricao(produto.getDescricao());
        dto.setValor(produto.getValor());
        dto.setCategoriaProduto(produto.getCategoriaProduto().getDescricao());
        dto.setEstabelecimentoProduto(produto.getEstabelecimento().getNome());

        return dto;
    }

    public PedidoKitDTO pedidoKitToDTO(PedidoKit pedidoKit) {

        return PedidoKitDTO.builder()
                .idKit(pedidoKit.getKit().getId())
                .nome(pedidoKit.getKit().getNome())
                .quantidade(pedidoKit.getQuantidade())
                .valorUnitario(pedidoKit.getValorUnitario())
                .build();
    }


//    public ProdutoDTO toDTO(PedidoProduto pedidoProduto) {
//        return toDTO(pedidoProduto.getProduto());
//    }
}