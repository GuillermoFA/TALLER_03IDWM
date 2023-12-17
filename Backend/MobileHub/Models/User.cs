namespace MobileHub.Models
{

    /// <summary>
    /// Clase User.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Propiedad Id.
        /// </summary>
        /// <value>El identificador del usuario.</value>
        public int Id { get; set; }

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

        /// <summary>
        /// Propiedad LastName.
        /// </summary>
        /// <value>El año de cumpleaños del usuario.</value>
        public int BirthYear { get; set; }

        /// <summary>
        /// Propiedad Rut.
        /// </summary>
        /// <value>El rut del usuario.</value>
        public string Rut { get; set; } = string.Empty;

        /// <summary>
        /// Propiedad Password.
        /// </summary>
        /// <value>La contraseña del usuario.</value>
        public string Password { get; set; } = string.Empty;
    }
}