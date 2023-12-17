namespace MobileHub.DTO
{
    /// <summary>
    /// Clase UserProfileUpdateDto.
    /// </summary>
    public class UserProfileUpdateDto
    {
        /// <summary>
        /// Propiedad Name
        /// </summary>
        /// <value>Nombre del usuario a editar</value>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Propiedad Email
        /// </sumary> 
        /// <value>Correo electrónico del usuario a editar</value>
        public string Email { get; set; } = null!;

        /// <summary>
        /// Propiedad BirthYear
        /// </summary>
        /// <value>Año de cumpleaños del usuario a editar</value>
        public int BirthYear { get; set; }
    }
}