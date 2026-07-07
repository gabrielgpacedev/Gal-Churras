package com.galchurras.galchurras_api.service;

import com.galchurras.galchurras_api.dto.request.LoginRequest;
import com.galchurras.galchurras_api.entity.Usuario;
import com.galchurras.galchurras_api.repository.UsuarioRepository;
import io.jsonwebtoken.security.Password;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public String login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByLogin(request.getLogin()).orElseThrow(() ->  new RuntimeException("Usuário não encontrado"));

        if(!encoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return jwtService.generateToken(usuario);
    }
}
