package com.me.ebanking.security.repositories;


import com.me.ebanking.security.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findAppUserByEmail(String email);
    AppUser findAppUserByUsername(String username);
}
