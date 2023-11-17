using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SRD.Application.Services
{
    public interface IEmailService
    {
        Task SendPasswordRecoveryEmail(string userEmail, string recoveryToken);
    }

    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;

        public EmailService()
        {
            // Configuração do cliente SMTP
            _smtpClient = new SmtpClient
            {
                Port = 587,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("jonaseal17@gmail.com", "graduado_288"),
                EnableSsl = true,
                Host = "smtp.gmail.com"
            };
        }

        public async Task SendPasswordRecoveryEmail(string userEmail, string recoveryToken)
        {
            // Construção do e-mail
            var mailMessage = new MailMessage
            {
                From = new MailAddress("seuemail@gmail.com", "Nome do Remetente"),
                Subject = "Recuperação de Senha",
                Body = $"Use o seguinte link para redefinir sua senha: https://seu-app.com/reset-password?token={recoveryToken}",
                IsBodyHtml = true
            };

            mailMessage.To.Add(new MailAddress(userEmail));

            // Envio do e-mail
            await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
