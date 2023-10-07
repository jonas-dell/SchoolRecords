using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Perfil.DTO
{
    public class PerfilDTO
    {
        public string? PerfilName { get; set; }
        public string? PerfilLastName { get; set; }
        public string? Sector { get; set; }
        public string? Education { get; set; }
        public string? Country { get; set; }
        public int? ZipCode { get; set; } //cep
        public string? Street { get; set; } //rua
        public string? Complement { get; set; } //Complemento
        public string? District { get; set; } //Bairro
        public string? City { get; set; } //Cidade
        public string Uf { get; set; }
        public int Number { get; set; } //Numero
        public string? Foto { get; set; }
    }
}
