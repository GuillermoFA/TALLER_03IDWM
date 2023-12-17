namespace MobileHub.DTO
{
    /// <summary>
    /// Clase LoggedUserDto.
    /// </summary>
    public class LoggedUserDto
    {
        /// <summary>
        /// Propiedad Token.
        /// </summary>
        /// <value>El token del usuario.</value>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// Propiedad Email.
        /// </summary>
        /// <value>El correo electrónico del usuario.</value>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Propiedad Name.
        /// </summary>
        /// <value>El nombre del usuario.</value>
        public string Name { get; set; } = string.Empty;
        
    }
}