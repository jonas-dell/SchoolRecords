using SRD.Core.Data;

namespace SRD.Domain.User.Repositories
{
    public interface IRecoveryRepository : IRepository<Entities.TokenPassword>
    {
        Entities.ForgotPassword? GetByToken (string token);
    }
}
