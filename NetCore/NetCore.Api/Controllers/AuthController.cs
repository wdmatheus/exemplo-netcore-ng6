using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using NetCore.Api.Models;
using NetCore.Api.Security;

namespace NetCore.Api.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromForm] string userName, [FromForm] string password,
            [FromServices] ApiJwtToken apiJwtToken)
        {
            var validUser = ValidUsers.FirstOrDefault(x => x.EmailAddress.Equals(userName) && x.Password.Equals(password));

            if (validUser == null)
            {
                return BadRequest("User name or password invalid");
            }

            var claims = new List<Claim>
            {
                new Claim("emailAddress", validUser.EmailAddress),
                new Claim("name", validUser.Name),
                new Claim("profile", validUser.Profile)
            };

            var token = apiJwtToken.GenerateJwtToken(claims);
            
            return Ok(new {user = validUser, token});
        }


        private static IEnumerable<User> ValidUsers => new List<User>
        {
            new User
            {
                EmailAddress = "admin@netcore-ng6.com",
                Name = "NetCore Ng6",
                Password = "123456",
                Profile = "Admin"
            },
            new User
            {
                EmailAddress = "user@netcore-ng6.com",
                Name = "User",
                Password = "123456",
                Profile = "User"
            }
        };
    }
}