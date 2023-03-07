using SRD.Core.Data;
using SRD.Core.Responses;

namespace SRD.Core.Commands
{
    public interface IBaseCommandHandler
    {
        Task<IRequestResponse> SaveData(IUnitOfWork unitOfWork);
    }
}
