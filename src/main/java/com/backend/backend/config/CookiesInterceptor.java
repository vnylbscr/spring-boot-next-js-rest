// package com.backend.backend.config;

// import java.util.Collection;

// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;

// import org.apache.commons.lang3.StringUtils;
// import org.springframework.http.HttpHeaders;
// import org.springframework.web.servlet.HandlerInterceptor;
// import org.springframework.web.servlet.ModelAndView;

// import lombok.extern.slf4j.Slf4j;

// @Slf4j
// public class CookiesInterceptor implements HandlerInterceptor {
// final String sameSiteAttribute = "; SameSite=None";
// final String secureAttribute = "; Secure";

// @Override
// public void postHandle(HttpServletRequest request, HttpServletResponse
// response,
// Object handler, ModelAndView modelAndView) throws Exception {

// Collection<String> setCookieHeaders =
// response.getHeaders(HttpHeaders.SET_COOKIE);

// log.info("setCookieHeaders: {}", setCookieHeaders);

// if (setCookieHeaders == null || setCookieHeaders.isEmpty())
// return;

// setCookieHeaders
// .stream()
// .filter(StringUtils::isNotBlank)
// .map(header -> {
// if (header.toLowerCase().contains("samesite")) {
// log.info("header: contains samesite {}", header);
// return header;
// } else {
// return header.concat(sameSiteAttribute);
// }
// })
// .map(header -> {
// if (header.toLowerCase().contains("secure")) {
// log.info("header: contains secure {}", header);
// return header;
// } else {
// return header.concat(secureAttribute);
// }
// })
// .forEach(finalHeader -> response.setHeader(HttpHeaders.SET_COOKIE,
// finalHeader));
// }

// }
