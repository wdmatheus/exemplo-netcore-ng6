using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NetCore.Api.Controllers
{
    [Route("[controller]")]
    public class ValuesController : Controller
    {
        [HttpGet, Authorize("Auth")]
        public IActionResult Get()
        {
            var email = User.Claims.FirstOrDefault(x => x.Type == "emailAddress")?.Value;
            
            return Ok(new
            {
                msg = $"Auth user email is : {email}"
            });
        }
        
        [HttpGet("user-info"), Authorize("Admin")]
        public IActionResult GetAdmin()
        {
            var claims = User.Claims.ToDictionary(x => x.Type, x => x.Value).ToList();
            
            return Ok(claims);
        }
    }
}