using System.Text;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MobileHub.Data;

var builder = WebApplication.CreateBuilder(args);

Env.Load();
var ip = Env.GetString("LOCAL_IP");
var mobileHubOrigin = "_mobilehub";

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
        var tokenKey = builder.Configuration.GetSection("AppSettings:Token").Value!;
        
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
