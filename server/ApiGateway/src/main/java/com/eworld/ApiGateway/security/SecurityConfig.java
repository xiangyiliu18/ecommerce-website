package com.eworld.ApiGateway.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.eworld.ApiGateway.security.handlers.AccessDeniedHandlerImpl;
import com.eworld.ApiGateway.security.handlers.AuthenticationEntryPointImpl;
import com.eworld.ApiGateway.security.handlers.AuthenticationFailureHandlerImpl;
import com.eworld.ApiGateway.security.handlers.AuthenticationSuccessHandlerImpl;
import com.eworld.ApiGateway.security.handlers.LogoutSuccessHandlerImpl;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	//private final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);

    @Autowired
    AuthenticationEntryPointImpl authenticationEntryPointImpl;

    @Autowired
    AccessDeniedHandlerImpl accessDeniedHandlerImpl;

    @Autowired
    AuthenticationSuccessHandlerImpl authenticationSuccessHandlerImpl;

    @Autowired
    AuthenticationFailureHandlerImpl authenticationFailureHandlerImpl;

    @Autowired
    LogoutSuccessHandlerImpl logoutSuccessHandlerImpl;

    @Autowired
    UserDetailsService userDetailsServiceImpl;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	 http.csrf().disable()
         	.cors() // cors config.
            	.and()
            .authorizeRequests()
            	.antMatchers("/login", "/checklogin", "/n")
            		.permitAll()
            	.antMatchers("/users/**")
            		.hasAnyAuthority("admin")
            	.antMatchers("/products/**")
            		.hasAnyAuthority("admin","product", "marketing")
            	.antMatchers("/orders/**")
            		.hasAnyAuthority("admin","product", "marketing")
                .anyRequest().authenticated()
                .and()
             .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandlerImpl)
                .authenticationEntryPoint(authenticationEntryPointImpl)
                .and()
             .formLogin()
            	.permitAll()
            	.loginProcessingUrl("/login")
            	.successHandler(authenticationSuccessHandlerImpl)
            	.failureHandler(authenticationFailureHandlerImpl)
                .usernameParameter("username").passwordParameter("password")
                .and()
            .logout()
                .logoutUrl("/logout")
                .permitAll()
                .logoutSuccessHandler(logoutSuccessHandlerImpl)
                .and()
            .httpBasic();
    }
    
    /*
     * cors support
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); // You should only set trusted site here. e.g. http://localhost:4200 means only this site can access.
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoders(){
        PasswordEncoder encoder = new BCryptPasswordEncoder(11);
        return encoder;
    }
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoders());
    }
    
}
