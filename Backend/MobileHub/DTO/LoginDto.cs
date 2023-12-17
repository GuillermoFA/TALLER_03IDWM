using System.ComponentModel.DataAnnotations;

namespace MobileHub.DTO
{
    /// <summary>
    /// Clase LoginDto.
    /// </summary>
    public class LoginDto
    {
        /// <summary>
        /// Propiedad Email.
        /// </summary>
        /// <value>El correo electrónico del usuario.</value>
        [Required]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Propiedad Password.
        /// </summary>
        /// <value>La contraseña del usuario.</value>
        [Required]
        public string Password { get; set; } = string.Empty;

    }
}