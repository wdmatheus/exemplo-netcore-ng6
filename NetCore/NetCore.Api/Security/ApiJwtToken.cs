using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace NetCore.Api.Config.Security
{
    public class ApiJwtToken
    {
        public string CorsPolicy { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string SecretKey { get; set; }

        public SymmetricSecurityKey SigningKey =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public SigningCredentials SigningCredentials =>
            new SigningCredentials(SigningKey, SecurityAlgorithms.HmacSha256);

        public TokenValidationParameters TokenValidationParameters => new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = Issuer,

            ValidateAudience = true,
            ValidAudience = Audience,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = SigningKey,

            RequireExpirationTime = true,
            ValidateLifetime = true,

            ClockSkew = TimeSpan.Zero
        };


        public JwtTokenOptions JwtTokenOptions => new JwtTokenOptions
        {
            Issuer = Issuer,
            Audience = Audience,
            SigningCredentials = SigningCredentials
        };

        public string GenerateJwtToken(IEnumerable<Claim> claims)
        {
            var jwt = new JwtSecurityToken(
                JwtTokenOptions.Issuer,
                JwtTokenOptions.Audience,
                claims,
                JwtTokenOptions.NotBefore,
                JwtTokenOptions.Expiration,
                JwtTokenOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        public ClaimsPrincipal ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            return handler.ValidateToken(token, TokenValidationParameters, out var validToken);
        }
    }
}