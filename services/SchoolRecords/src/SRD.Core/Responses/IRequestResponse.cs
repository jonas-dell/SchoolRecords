namespace SRD.Core.Responses
{
    public interface IRequestResponse
    {
        public bool Successful { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
}
