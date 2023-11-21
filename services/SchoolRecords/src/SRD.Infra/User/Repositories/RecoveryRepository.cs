using SRD.Core.Data;
using SRD.Domain.User.Entities;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;

namespace SRD.Infra.User.Repositories
{
   public class RecoveryRepository : IRecoveryRepository
    {
        private readonly DataContext _context;

        public RecoveryRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Dispose()
        {
            _context.Dispose();
        }

        public ForgotPassword? GetByToken(string token)
        {
            return _context.PasswordRecoveryTokens.FirstOrDefault(u => u.Token == token);
        }
    }
}
