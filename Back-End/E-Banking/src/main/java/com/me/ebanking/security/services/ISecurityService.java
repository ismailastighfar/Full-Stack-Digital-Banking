package com.me.ebanking.security.services;




import com.me.ebanking.security.dtos.LoginRequest;
import com.me.ebanking.security.dtos.LoginResponse;
import com.me.ebanking.security.entities.AppRole;
import com.me.ebanking.security.entities.AppUser;

import java.util.List;

public interface ISecurityService {
    AppUser addNewUser(AppUser appUser);

    AppUser findUserByUsername(String username);

    AppUser findUserByEmail(String email);

    AppRole findRoleByRoleName(String role);

    AppUser addRoleToUser(String roleName, String email);
    AppRole addNewRole(AppRole appRole);
    List<AppUser> userList();

    List<AppRole> roleList();


    LoginResponse authenticate(LoginRequest loginRequest);

    LoginResponse refreshToken(String refreshToken);
}
