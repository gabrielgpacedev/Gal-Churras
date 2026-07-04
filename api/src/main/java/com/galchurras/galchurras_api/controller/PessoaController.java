package com.galchurras.galchurras_api.controller;

import com.galchurras.galchurras_api.dto.PessoaDTO;
import com.galchurras.galchurras_api.service.PessoaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/pessoa")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    @GetMapping
    public List<PessoaDTO> getPessoas() {
        return pessoaService.listarPessoas();
    }
}
