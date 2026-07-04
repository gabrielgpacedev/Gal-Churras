package com.galchurras.galchurras_api.service;

import com.galchurras.galchurras_api.dto.PessoaDTO;
import com.galchurras.galchurras_api.entity.Pessoa;
import com.galchurras.galchurras_api.repository.PessoaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    
    public Optional<Pessoa> buscarPorId(Long id) {
        return pessoaRepository.findPessoaById(id);
    }


    public List<PessoaDTO> listarPessoas() {
        return pessoaRepository.findAll()
                .stream()
                .map(u -> new PessoaDTO(
                        u.getId(),
                        u.getNome(),
                        u.getGenero(),
                        u.getDataNascimento(),
                        u.getEmail(),
                        u.getDocumento()
                ))
                .toList();
    }
}
