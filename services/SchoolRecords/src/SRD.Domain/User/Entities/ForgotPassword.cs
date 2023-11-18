namespace SRD.Domain.User.Entities
{
    public class ForgotPassword
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
