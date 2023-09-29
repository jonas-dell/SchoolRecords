using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SRD.Domain.Test.Repositories
{
    public interface ITestRepository
    {
        Entities.Teste Logar(string username);
        
    }
}
