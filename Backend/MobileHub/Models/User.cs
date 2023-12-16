namespace MobileHub.Models
{
    public class User
    {
        public string Email { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public int YearBirthDay { get; set; }

        public string Rut { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}