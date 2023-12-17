// MobileHub\DataAnnotations\YearOfBirthAttribute.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace MobileHub.DataAnnotations
{
    /// <summary>
    /// Clase YearOfBirthAttribute.
    /// </summary>
    public class YearOfBirthAttribute : ValidationAttribute
    {
        /// <summary>
        /// Mensaje de error que tiene la validacion del año.
        /// </summary>
        public YearOfBirthAttribute()
        {
            ErrorMessage = "Invalid year of birth";
        }


        public YearOfBirthAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
        }

        public YearOfBirthAttribute(string errorMessage) : base(errorMessage)
        {
        }

        /// <summary>
        /// Validacion del año de nacimiento.
        /// </summary>
        /// <param name="value">El año de nacimiento</param>
        /// <returns>True si cumple validaciones</returns>
        public override bool IsValid(object? value)
        {
            if (value == null)
            {
                return false;
            }

            int yearOfBirth;
            if (!int.TryParse(value.ToString(), out yearOfBirth))
            {
                return false;
            }

            // Validar que el año de nacimiento esté en el rango permitido
            int currentYear = DateTime.Now.Year;
            return yearOfBirth >= 1900 && yearOfBirth <= currentYear;
        }
    }
}
