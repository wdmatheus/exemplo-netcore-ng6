using System;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace NetCore.Api.Security
{
    public class JwtTokenOptions
    {
        public string Issuer { get; set; }
       
        public string Audience { get; set; }

        public DateTime NotBefore { get; set; } = DateTime.UtcNow;

        public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

        public TimeSpan ValidFor { get; set; } = TimeSpan.FromMinutes(2);

        public DateTime Expiration => IssuedAt.Add(ValidFor);

        public SigningCredentials SigningCredentials { get; set; }
    }
}