using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileHub.DTO;
using MobileHub.Models;

namespace MobileHub.Data.Controllers
{
    /// <summary>
    /// Clase UserController.
    /// </summary> 
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly DataContext _context;

        private readonly IConfiguration _configuration;

        public UserController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Endpoint para actualizar un usuario.
        /// </summary>
        /// <param name="userProfileUpdateDto"> El usuario a actualizar</param>
        /// <returns>Usuario actualizado</returns>
        [HttpPut("profile")]
        public async Task<ActionResult<User>> UpdateUserProfile([FromBody] UserProfileUpdateDto userProfileUpdateDto)
        {
            var userName = User.Identity?.Name; // Obtén el nombre del usuario directamente desde la identidad

            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest(new { ErrorMessage = "Nombre de usuario no válido." });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);

            if (existingUser == null)
            {
                return NotFound(new { ErrorMessage = "Usuario no encontrado." });
            }

            existingUser.Name = userProfileUpdateDto.Name;
            existingUser.Email = userProfileUpdateDto.Email;
            existingUser.BirthYear = userProfileUpdateDto.BirthYear;

            await _context.SaveChangesAsync();
            return existingUser;
        }

        /// <summary>
        /// Endpoint para actualizar la contraseña
        /// </summary>
        /// <param name="updatePasswordDto">Password update</param>
        /// <returns>Nueva contraseña</returns>
        [HttpPut("update-password")]
        public async Task<ActionResult> UpdatePassword([FromBody] UpdatePasswordDto updatePasswordDto)
        {
            var userName = User.Identity?.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest(new { ErrorMessage = "Nombre de usuario no válido." });
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Name == userName);

            if (existingUser == null)
            {
                return NotFound(new { ErrorMessage = "Usuario no encontrado." });
            }

            var isCurrentPasswordValid = BCrypt.Net.BCrypt.Verify(updatePasswordDto.CurrentPassword, existingUser.Password);

            if (!isCurrentPasswordValid)
            {
                return BadRequest(new { ErrorMessage = "La contraseña actual es incorrecta." });
            }

            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(updatePasswordDto.NewPassword, salt);

            existingUser.Password = newPasswordHash;

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Contraseña actualizada con éxito." });
        }
        
        }
}