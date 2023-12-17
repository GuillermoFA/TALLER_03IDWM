namespace MobileHub.DTO
{
    /// <summary>
    /// Clase RepositoryDto.
    /// </summary>
    public class RepositoryDto
    {
        /// <summary>
        /// Propiedad Name
        /// </summary>
        /// <value>Nombre del repositorio</value>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Propiedad Description
        /// </summary>
        /// <value>Descripciones como la fecha de Update y Creacion del repositorio</value>
        public DateTimeOffset CreatedAt { get; set; } = DateTime.Now;
        public DateTimeOffset UpdatedAt { get; set; } = DateTime.Now;

        /// <summary>
        /// Propiedad CommitsAmount
        /// </summary>
        /// <value>Cantidad de commits del repositorio</value>
        public int CommitsAmount { get; set; }
    }
}