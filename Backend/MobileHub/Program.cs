using System.Text;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MobileHub.Data;

// Path: Backend/MobileHub/Program.cs
var builder = WebApplication.CreateBuilder(args);

// Carga las variables de entorno desde el archivo .env
Env.Load();

// Configura CORS para permitir peticiones desde el frontend
var ip = Env.GetString("LOCAL_IP");

var mobileHubOrigin = "_mobilehub";

// Configura CORS para permitir peticiones desde el frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: mobileHubOrigin,
        builder =>
        {
            builder.WithOrigins(ip)
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddAuthentication().AddJwtBearer(opt =>
{
    try
    {
        // Accede a la clave del token directamente desde las variables de entorno
        var tokenKey = Env.GetString("SECRET_TOKEN");
        
        if (string.IsNullOrEmpty(tokenKey))
        {
            Console.WriteLine("Error: Token key is null or empty.");
        }
        else
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey))
            };
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error configuring JWT: {ex.Message}");
    }
});
       



// Dependency Injection
builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlite("Data Source=MobileHub.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(mobileHubOrigin);

app.UseAuthorization();

app.MapControllers();

app.Run();
