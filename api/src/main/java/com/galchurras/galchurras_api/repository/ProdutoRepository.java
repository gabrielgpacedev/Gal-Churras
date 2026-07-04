package com.galchurras.galchurras_api.repository;

import com.galchurras.galchurras_api.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
