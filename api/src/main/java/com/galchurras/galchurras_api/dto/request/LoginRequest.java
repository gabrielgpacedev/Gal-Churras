package com.galchurras.galchurras_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginRequest {



    private String login;
    private String senha;
}
