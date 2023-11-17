using SRD.Domain.User.Entities;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

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
            _smtpClient = new SmtpClient
            {
                Port = 465,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("jonaseal17@gmail.com", "mmhn gjwo axqy mmir"),
                EnableSsl = true,
                Host = "smtp.gmail.com"
            };
        }

        public async Task SendPasswordRecoveryEmail(User user, string recoveryToken)
        {
            // Construção do e-mail
            //var mailMessage = new MailMessage
            //{
            //    From = new MailAddress(user, "Usuário novo"),
            //    Subject = "Recuperação de Senha",
            //    Body = $"Use o seguinte link para redefinir sua senha: https://seu-app.com/reset-password?token={recoveryToken}",
            //    IsBodyHtml = true
            //};

            //mailMessage.To.Add(new MailAddress(userEmail));

            //// Envio do e-mail
            //await _smtpClient.SendMailAsync(mailMessage);
        }
    }
}
