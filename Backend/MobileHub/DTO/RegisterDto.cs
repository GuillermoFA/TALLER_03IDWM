using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.DTO
{
    public class RegisterDto
    {
        [Required]
        [UCNEmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Rut { get; set; } = null!;

        [Required]
        [YearOfBirth]
        public int BirthYear { get; set; }

        [Required]
        [StringLength(150, MinimumLength = 10, ErrorMessage = "El nombre completo debe tener entre 10 y 150 caracteres.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
        
    }
}