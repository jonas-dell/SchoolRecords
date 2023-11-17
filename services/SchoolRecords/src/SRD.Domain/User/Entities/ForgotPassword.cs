using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.User.Entities
{
    public class ForgotPassword
    {
        public int Id { get; set; }

        public string? Email { get; set; }
    }
}
