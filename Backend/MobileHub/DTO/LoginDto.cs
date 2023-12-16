using System.ComponentModel.DataAnnotations;

namespace MobileHub.DTO
{
    public class LoginDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

    }
}