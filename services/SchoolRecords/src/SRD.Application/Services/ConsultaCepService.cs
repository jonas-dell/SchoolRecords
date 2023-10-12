namespace SRD.Application.Services
{
    public class ConsultaCepService
    {
        private readonly HttpClient _httpClient;

        public ConsultaCepService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> ConsultarCep(string cep)
        {
            var viaCepUrl = $"http://viacep.com.br/ws/{cep}/json";
            var response = await _httpClient.GetAsync(viaCepUrl);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }

            return string.Empty;
        }
    }
}
