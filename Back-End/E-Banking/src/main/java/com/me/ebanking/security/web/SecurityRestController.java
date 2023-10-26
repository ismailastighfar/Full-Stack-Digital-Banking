package com.me.ebanking.security.web;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.me.ebanking.security.Util.JwtUtil;
import com.me.ebanking.security.dtos.LoginRequest;
import com.me.ebanking.security.dtos.LoginResponse;
import com.me.ebanking.security.entities.AppRole;
import com.me.ebanking.security.entities.AppUser;
import com.me.ebanking.security.exceptions.InvalidJwtTokenException;
import com.me.ebanking.security.services.ISecurityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.me.ebanking.security.Util.JwtUtil.AUTH_HEADER;


@RestController
@CrossOrigin("*")
public class SecurityRestController {
    private ISecurityService securityService;

    public SecurityRestController(ISecurityService securityService) {
        this.securityService = securityService;
    }

    @PostAuthorize("hasAnyAuthority('SALARIE')")
    @GetMapping(path = "/users")
    public List<AppUser> getAllUsers(){
        return securityService.userList();
    }

    @GetMapping("/roles")
    public List<AppRole> getAllRoles(){
        return securityService.roleList();
    }

    @GetMapping("/users/{username}")
    public AppUser getUser(@PathVariable String username){
        return securityService.findUserByUsername(username);
    }

    @PostMapping("/users")
    public AppUser addUser(@RequestBody AppUser user){
        return securityService.addNewUser(user);
    }

    @PostMapping("/roles")
    public AppRole addRole(@RequestBody AppRole role){
        return securityService.addNewRole(role);
    }

    @PostMapping("/formUserRole")
    public AppUser addRoleUser(@RequestBody RoleUserForm roleUserForm){
        return securityService.addRoleToUser(roleUserForm.getRoleName(),roleUserForm.getUsername());
    }
    @GetMapping("/refreshToken")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String authorizationToken = request.getHeader(AUTH_HEADER);
        if(authorizationToken!=null && authorizationToken.startsWith(JwtUtil.PREFIX)) {
            try {
                String jwt = authorizationToken.substring(7);
                Algorithm algorithm = Algorithm.HMAC256(JwtUtil.SECRET);
                JWTVerifier jwtVerifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
                String userName = decodedJWT.getSubject();
                AppUser appUser = securityService.findUserByUsername(userName);
                String jwtAccessToken = JWT.create()
                        .withSubject(appUser.getEmail())
                        .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtil.EXPIRE_ACCESS_TOKEN))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", appUser.getUserRoles().stream().map(r -> r.getRoleName()).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> idToken = new HashMap<>();
                idToken.put("access-token", jwtAccessToken);
                idToken.put("refresh-token", jwt);
                response.setContentType("application/json");
                response.setHeader(AUTH_HEADER, jwtAccessToken);
                new ObjectMapper().writeValue(response.getOutputStream(), idToken);

            } catch (Exception e) {
                throw new InvalidJwtTokenException("Invalid jwt token");
            }
        }else {
            throw new RuntimeException("refresh token required");
        }
    }
    @GetMapping(path = "/profile")
    public AppUser profile(Principal principal){
        AppUser user=securityService.findUserByUsername(principal.getName());
        return  user;
    }
    @PostMapping("/signin")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return securityService.authenticate(loginRequest);
    }


}
@Data
class RoleUserForm{
    private String username;
    private String roleName;
}
