using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace MobileHub.DataAnnotations
{
    public class RutAttribute : ValidationAttribute
    {
        public RutAttribute()
        {
            ErrorMessage = "Rut is not valid";
        }

        public RutAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
        }

        public RutAttribute(string errorMessage) : base(errorMessage)
        {
        }

        public override bool IsValid(object? value)
        {
            if (value == null)
            {
                return false;
            }

            string rut = value?.ToString() ?? string.Empty;

            // Validar formato del RUT
            if (!IsValidRutFormat(rut))
            {
                return false;
            }

            // Obtener el cuerpo y el dígito verificador
            string[] rutParts = rut.Split('-');
            string rutBody = rutParts[0].Replace(".", "");
            char expectedDigit = char.ToUpper(rutParts[1][0]);

            // Calcular el dígito verificador esperado
            char calculatedDigit = CalculateRutDigit(rutBody);

            // Comparar el dígito verificador esperado con el proporcionado
            return expectedDigit == calculatedDigit;
        }

        private bool IsValidRutFormat(string rut)
        {
            // Verificar que el RUT tenga el formato correcto
            // Por ejemplo, 20.416.349-9
            return Regex.IsMatch(rut, @"^\d{1,3}\.\d{3}\.\d{3}-[\dkK]$");
        }

        private char CalculateRutDigit(string rutBody)
        {
            // Calcular el dígito verificador del RUT
            int rutNumber;
            if (!int.TryParse(rutBody, out rutNumber))
            {
                // Error al convertir el cuerpo del RUT a un número
                return '0'; // O el valor que desees para indicar un error
            }

            int factor = 2;
            int sum = 0;

            // Iterar sobre los dígitos del RUT en sentido inverso
            for (int i = rutBody.Length - 1; i >= 0; i--)
            {
                sum += int.Parse(rutBody[i].ToString()) * factor;
                factor = (factor % 7) + 1; // Ciclo de factores 2 a 7
            }

            int remainder = sum % 11;
            int result = 11 - remainder;

            // Manejar el caso especial para el dígito verificador 11
            char calculatedDigit = result == 11 ? '0' : result == 10 ? 'K' : result.ToString()[0];

            return calculatedDigit;
        }
    }
}