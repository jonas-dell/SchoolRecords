using SRD.Core.Data;
using SRD.Domain.User.Entities;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;

namespace SRD.Infra.User.Repositories
{
    public class ForgotPasswordRepository : IForgotPasswordRepository
    {
        private readonly DataContext _context;

        public ForgotPasswordRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void Dispose()
        {
            _context.Dispose();
        }
        public void Insert(ForgotPassword forgotPassword)
        {
            _context.PasswordRecoveryTokens.Add(forgotPassword);
        }
        public IList<ForgotPassword> FindAll()
        {
            return _context.PasswordRecoveryTokens.ToList();
        }

        public ForgotPassword GetByToken(ForgotPassword forgotPassword)
        {
            var token = forgotPassword.Token;
            return _context.PasswordRecoveryTokens.FirstOrDefault(fp => fp.Token == token);
        }
    }
}
