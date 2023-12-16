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
        [Rut]
        public string Rut { get; set; } = null!;

        [Required]
        public int BirthYear { get; set; }
        
    }
}