using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SRD.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]/[action]")]
    public class TestController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TestController(IMediator mediator)
        {
            _mediator = mediator;
        }

    }
}
