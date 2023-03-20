namespace SRD.Domain.User.Entities
{
    public class UserContact
    {
        public User User { get; set; }
        public int UserId { get; set; }
        public User Contact { get; set; }
        public int ContactId { get; set; }
    }
}
