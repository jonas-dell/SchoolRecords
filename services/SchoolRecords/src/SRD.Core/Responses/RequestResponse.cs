namespace SRD.Core.Responses
{
    public class RequestResponse : IRequestResponse
    {
        public RequestResponse() { }

        public RequestResponse(bool successful, string message, object data)
        {
            Successful = successful;
            Message = message;
            Data = data;
        }

        public bool Successful { get; set; }
        public string Message { get; set; }
        public object? Data { get; set; }

        public static IRequestResponse SuccessResponse(string message = "", object? data = null)
        {
            return new RequestResponse()
            {
                Successful = true,
                Message = string.IsNullOrWhiteSpace(message) ? "Requisição processada com sucesso" : message,
                Data = data is not null ? data : null,
            };
        }

        public static IRequestResponse ErrorResponse(string message = "", object? data = null)
        {
            return new RequestResponse()
            {
                Successful = false,
                Message = string.IsNullOrWhiteSpace(message) ? "Erro ao processar a requisição" : message,
                Data = data is not null ? data : null,
            };
        }
    }
}
