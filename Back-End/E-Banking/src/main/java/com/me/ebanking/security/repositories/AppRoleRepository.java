package com.me.ebanking.security.repositories;


import com.me.ebanking.security.entities.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    AppRole findAppRoleByRoleName(String roleName);
}
