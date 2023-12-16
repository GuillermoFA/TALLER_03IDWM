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



        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user is null) return Unauthorized("Credenciales Inválidas");
            var result = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
            if(!result) return Unauthorized("Credenciales Inválidas");

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
            
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == registerDto.Email);
            if (user != null) return BadRequest("El email ya está registrado");

            user = await _context.Users.FirstOrDefaultAsync(x => x.Rut == registerDto.Rut);
            if (user != null) return BadRequest("El rut ya está registrado");

            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password, salt);

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

            var token = CreateToken(createdUser);

            var LoggedUserDto = new LoggedUserDto
            {
                Token = token,
                Email = createdUser.Email,
                Name = createdUser.Name,
            };

            return LoggedUserDto;
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>(){
                new Claim("rut", "" + user.Rut),
                new Claim("name", "" + user.Name),
                new Claim("email", "" + user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        [GeneratedRegex(@"^\d{7,8}-[0-9Kk]$", RegexOptions.IgnoreCase, "es-MX")]
        private static partial Regex MyRegex();

    }
}