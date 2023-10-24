using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SRD.Domain.User.DTO;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SRD.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly DataContext _authContext;
        private readonly IUserRepository _userRepository;

        public UserController(DataContext appDbContext, IUserRepository userRepository, IMapper mapper)
        {
            _authContext = appDbContext;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user != null)
                return Ok(user);

            return NotFound("Usuário não encontrado");
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts([FromQuery] int id, [FromQuery] int skip = 10, [FromQuery] int take = 10)
        {
            var contatos = _userRepository.GetContactsByUserId(id).Select(x => new
            {
                x.Id,
                Name = x.Perfil.PerfilName,
                Address = x.Perfil.City,
                Image = x.Perfil.Foto
            });

            return Ok(await Task.Run(() => contatos.Skip(skip).Take(take)));
        }
    }
}
