package com.eworld.ApiGateway.security.handlers;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.eworld.ApiGateway.daos.UserDao;
import com.eworld.ApiGateway.security.handlers.SecurityUtil;

@Component
public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler {
	@Autowired
    UserDao employeeDao;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		SecurityUtil.sendAuthenticationSuccessResponse(response, HttpServletResponse.SC_OK, "Login successfully!", employeeDao.findByUsername(authentication.getName()), null);
	}
	
}
