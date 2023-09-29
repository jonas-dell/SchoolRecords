using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Test.Entities
{
    public class Teste
     {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
       
        public string? Password { get; set; }
    }
}
