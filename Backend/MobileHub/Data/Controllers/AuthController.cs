using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MobileHub.DTO;
using MobileHub.Models;

namespace MobileHub.Data.Controllers
{   
    /// <summary>
    /// Clase AuthController.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public partial class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        private readonly IConfiguration _configuration;

        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        /// <summary>
        /// Endpoint para logearse.
        /// </summary>
        /// <param name="loginDto"> Parametros del usuario al momento de logearse</param>
        /// <returns>STATUS 200. Logeo exitoso</returns>
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email); // Verifica si el usuario existe
            if (user is null) return Unauthorized("Credenciales Inválidas"); // Si no existe, retorna un error
            var result = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password); // Verifica si la contraseña es correcta
            if(!result) return Unauthorized("Credenciales Inválidas"); // Si no es correcta, retorna un error

            string token = CreateToken(user);

            var response = new
            {
                token,
                user.Email,
                user.Name,
                user.BirthYear,
                user.Rut,

            };

            return Ok(response);
        }

        /// <summary>
        /// Endpoint para registrar un usuario.
        /// </summary>
        /// <param name="registerDto">Datos solicitados para que el cliente rellene para el register</param>
        /// <returns>Usuario registrado en el sistema.</returns>
        [HttpPost("register")]
        public async Task<ActionResult<LoggedUserDto>> Register(RegisterDto registerDto)
        {
            // Validar el formato del RUT chileno utilizando una expresión regular
            // Eliminar puntos del RUT y validar el formato del RUT chileno utilizando una expresión regular
            string rutWithoutDots = registerDto.Rut.Replace(".", ""); 
            if (!MyRegex().IsMatch(rutWithoutDots))
            {
                return BadRequest("El formato del RUT no es válido");
            }
            
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == registerDto.Email); // Verifica si el email existe
            if (user != null) return BadRequest("El email ya está registrado");

            user = await _context.Users.FirstOrDefaultAsync(x => x.Rut == registerDto.Rut); // Verifica si el rut existe
            if (user != null) return BadRequest("El rut ya está registrado");

            // Asignar la contraseña como el RUT sin puntos ni guiones
            string password = rutWithoutDots.Replace("-", "");

            // Hash de la contraseña (puedes usar tu método actual de hash si es necesario)
            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password, salt);

            user = new User
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                Rut = registerDto.Rut,
                BirthYear = registerDto.BirthYear,
                Password = passwordHash
            };

            var createdUser = (await _context.Users.AddAsync(user)).Entity;
            await _context.SaveChangesAsync();

            var token = CreateToken(createdUser); // Crear el token

            var LoggedUserDto = new LoggedUserDto
            {
                Token = token,
                Email = createdUser.Email,
                Name = createdUser.Name,
            };

            return LoggedUserDto;  // Retorna el usuario creado
        }

        /// <summary>
        /// Metodo CreateToken crea el TOKEN para register y login
        /// </summary>
        /// <param name="user">Usuario que contiene el token</param>
        /// <returns></returns>
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>(){
                new Claim("rut", "" + user.Rut),
                new Claim("name", "" + user.Name),
                new Claim("email", "" + user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!)); // Obtener la llave secreta

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature); 

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token); // Crear el token
            return jwt;
        }

        [GeneratedRegex(@"^\d{7,8}-[0-9Kk]$", RegexOptions.IgnoreCase, "es-MX")]
        private static partial Regex MyRegex();

    }
}