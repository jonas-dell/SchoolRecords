using SRD.Domain.Test.Entities;
using SRD.Domain.Test.Repositories;
using SRD.Infra.Context;

namespace SRD.Infra.Test.Repositories
{
    public class TestRepository : ITestRepository
    {
        private readonly DataContext _context;

        public TestRepository(DataContext context)
        {
            _context = context;
        }

        public Teste Logar(string username)
        {
            {
                return _context.Testes.Where(x => x.Name == username).FirstOrDefault();
            }
        }


        // Consulta no banco no banco de dados usando Entity Framework

        //Teste ITestRepository.Logar(string username)
        //{
        //    return _context.Testes.Where(x => x.Name == username).FirstOrDefault();
        //}
    }
}
