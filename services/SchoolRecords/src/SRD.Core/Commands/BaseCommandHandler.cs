using SRD.Core.Data;
using SRD.Core.Responses;

namespace SRD.Core.Commands
{
    public class BaseCommandHandler : IBaseCommandHandler
    {
        public async Task<IRequestResponse> SaveData(IUnitOfWork unitOfWork)
        {
            if (!await unitOfWork.Commit())
                return RequestResponse.ErrorResponse("Erro ao salvar o registro");
            
            return RequestResponse.SuccessResponse("Registro salvo com sucesso");
        }
    }
}
