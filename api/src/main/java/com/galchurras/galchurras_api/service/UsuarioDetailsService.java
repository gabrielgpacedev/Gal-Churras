package com.galchurras.galchurras_api.service;

import com.galchurras.galchurras_api.entity.Usuario;
import com.galchurras.galchurras_api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Usuario usuario = usuarioRepository.findByLogin(username).orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));

        return User
                .withUsername(usuario.getUsername())
                .password(usuario.getSenha())
                .authorities("USER")
                .build();
    }
}
