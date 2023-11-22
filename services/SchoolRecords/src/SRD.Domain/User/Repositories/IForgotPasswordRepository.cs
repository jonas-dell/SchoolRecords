using SRD.Core.Data;

namespace SRD.Domain.User.Repositories
{
    public interface IForgotPasswordRepository : IRepository<Entities.ForgotPassword>
    {
        void Insert(Entities.ForgotPassword forgotPassword);

        Entities.ForgotPassword GetByToken(Entities.ForgotPassword forgotPassword);
        
        IList<Entities.ForgotPassword> FindAll();
    }
}
