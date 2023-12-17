namespace MobileHub.DTO
{
    /// <summary>
    /// Clase CommitDto.
    /// </summary>
    public class CommitDto
    { 
        /// <summary>
        /// Propiedad Author
        /// </summary>
        /// <value>El autor del commit.</value>
        public string Author { get; set; } = null!;

        /// <summary>
        /// Propiedad Message
        /// </summary>
        /// <value>El mensaje del commit.</value>
        public string Message { get; set; } = null!;

        /// <summary>
        /// Propiedad Date
        /// </summary>
        /// <value>La fecha del commit.</value>
        public DateTimeOffset Date { get; set; }
    }
}