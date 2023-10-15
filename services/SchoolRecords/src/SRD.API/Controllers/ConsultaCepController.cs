using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SRD.Application.Services;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ConsultaCepController : ControllerBase
    {

        private readonly ConsultaCepService _consultaCepService;

        public ConsultaCepController(ConsultaCepService consultaCepService)
        {
            _consultaCepService = consultaCepService;
        }


        [HttpGet("{cep}")]
        public async Task<ActionResult> ConsultaCep(string cep)
            {
            if (string.IsNullOrEmpty(cep))
            {
                return BadRequest("CEP inválido");
            }

            var dadosCep = await _consultaCepService.ConsultarCep(cep);

            if (dadosCep != null)
            {
                return Ok(dadosCep);
            }

            return BadRequest("Erro ao consultar o CEP");
        }
    }
}
