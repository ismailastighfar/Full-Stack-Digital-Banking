package com.me.ebanking.security.Configurations;

import com.me.ebanking.security.entities.AppUser;
import com.me.ebanking.security.filters.JwtAuthenticationFilter;
import com.me.ebanking.security.filters.JwtAuthorizationFilter;
import com.me.ebanking.security.services.ISecurityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.stream.Collectors;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@CrossOrigin("*")
@Slf4j
public class SecurityConfig {
    private ISecurityService securityService;


    public SecurityConfig( ISecurityService securityService) {
        this.securityService = securityService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf->csrf.ignoringRequestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")));
        httpSecurity.csrf(csrf->csrf.ignoringRequestMatchers(AntPathRequestMatcher.antMatcher("/login")));
        httpSecurity.csrf(csrf->csrf.disable());
        httpSecurity.headers(headers -> headers.frameOptions((frameOptions) -> frameOptions.disable()));
        httpSecurity.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.authorizeHttpRequests(auth -> auth.requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).permitAll());
        httpSecurity.authorizeHttpRequests(auth->auth.requestMatchers("/refreshToken/**"
                ,"/swagger-ui/**","/v3/**","/v1/**","/login/**","/signin","/formUserRole").permitAll()
                /*.requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.POST,"/users/**")).hasAuthority("ADMIN")
                  .requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.GET,"/users/**")).hasAuthority("USER")
                */.anyRequest().authenticated()
        );
        httpSecurity.addFilter(new JwtAuthenticationFilter(authenticationManager(authenticationConfiguration()), securityService));
        httpSecurity.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                AppUser appUser = securityService.findUserByUsername(username);
                log.info("user = "+appUser);
                return new User(
                        appUser.getUsername(),
                        appUser.getPassword(),
                        appUser.getUserRoles()
                                .stream()
                                .map(gr -> new SimpleGrantedAuthority(gr.getRoleName()))
                                .collect(Collectors.toList())
                );
            }
        };
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception
    { return authenticationConfiguration.getAuthenticationManager();}

    @Bean
    @Primary
    AuthenticationConfiguration authenticationConfiguration(){
        return new AuthenticationConfiguration();
    }


}
