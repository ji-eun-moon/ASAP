package com.ssafy.project.asap.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class JwtUtil {


//    @Value("${jwt.security.secret.key}")
//    private String secretKey;

    private static final Long accessExpiration = 60 * 60 * 24L;

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String createToken(String id){

        Claims claims = Jwts.claims();
        claims.put("id", id);

        log.info("id = " + id);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + accessExpiration))
                .signWith(key)
                .compact();
    }

    public static boolean isExpired(String token){

        log.info(Jwts.parserBuilder().build().parseClaimsJwt(token).getBody().toString());

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(token).getBody().getExpiration().before(new Date());

    }

    public static String getId(String token){

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(token).getBody().getId();
    }

}
