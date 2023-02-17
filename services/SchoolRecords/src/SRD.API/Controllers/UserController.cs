using Microsoft.AspNetCore.Mvc;

namespace SRD.API.Controllers
{
    public class UserController : ControllerBase
    {
        public IActionResult GetUsers()
        {
            return Ok();
        }
    }
}
