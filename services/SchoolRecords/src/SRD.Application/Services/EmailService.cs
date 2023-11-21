using MailKit.Net.Smtp;
using MimeKit;
using SRD.Domain.User.Entities;


namespace SRD.Application.Services
{
    public interface IEmailService
    {
        Task SendPasswordRecoveryEmail(User user, string recoveryToken);
    }

    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;

        public EmailService()
        {
            // Configuração do cliente SMTP
            _smtpClient = new SmtpClient();
        }

        public async Task SendPasswordRecoveryEmail(User user, string recoveryToken)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(user.Username, "jonaseal17@gmail.com"));
                message.To.Add(new MailboxAddress("usuário", "jonaseal17@gmail.com"));
                message.Subject = "Recuperação de Senha - SchoolRecords";

                var builder = new BodyBuilder();


                string uppercaseName = user.Username.ToUpper();
                string apiUrl = "http://localhost:4200/forgot-password/token";
                builder.HtmlBody = $@"
                <html>
                <body>
                    <p>Olá {uppercaseName},</p>
                    <p>Recebemos uma solicitação para redefinir a senha da sua conta no SchoolRecords.</p>
                    <p>Utilize o seguinte código para completar o processo:</p>
                    <h2>{recoveryToken}</h2>
                    <p>Para redefinir sua senha, clique no seguinte link: <a href= {apiUrl} >Redefinir Senha</a></p>

                    <p>Este token é válido por 30 minutos, a partir do momento da solicitação.</p>
                    <p>Se você não fez essa solicitação, recomendamos a troca imediata da sua senha.</p>
                    <p>Equipe: <strong>SchoolRecords</strong></p>
                </body>
                </html>
                ";

                message.Body = builder.ToMessageBody();

                Console.WriteLine("Enviando e-mail...");

                await _smtpClient.ConnectAsync("smtp.gmail.com", 465, true);
                await _smtpClient.AuthenticateAsync("jonaseal17@gmail.com", "fyft tmmw gnyy cnjb");
                await _smtpClient.SendAsync(message);
                await _smtpClient.DisconnectAsync(true);

                Console.WriteLine("E-mail enviado com sucesso!");
            }
            catch (Exception ex)
            {
                // Tratar exceções de construção e envio de e-mail
                Console.WriteLine($"Erro ao enviar e-mail: {ex.Message}");
            }
            finally
            {
                // Certifique-se de desconectar mesmo em caso de exceção
                if (_smtpClient.IsConnected)
                {
                    await _smtpClient.DisconnectAsync(true);
                }
            }
        }
    }
}
