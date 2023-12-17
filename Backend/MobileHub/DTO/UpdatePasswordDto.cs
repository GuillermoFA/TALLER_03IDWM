namespace MobileHub.DTO
{
    /// <summary>
    /// Clase UpdatePasswordDto.
    /// </summary>
    public class UpdatePasswordDto
    {
        /// <summary>
        /// Propiedad CurrentPassword
        /// </summary>
        /// <value> Contraseña actual del usuario </value>
        public string CurrentPassword { get; set; } = null!;

        /// <summary>
        /// Propiedad NewPassword
        /// </summary>
        /// <value> Nueva contraseña del usuario </value>
        public string NewPassword { get; set; } = null!;
    }
}