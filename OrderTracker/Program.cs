using ApplicationCore.Middlewares;
using ApplicationCore.Utility;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models.Entities;
using OrderTracker.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}



app.UseHttpsRedirection();
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(u => u.AllowAnyHeader().AllowAnyMethod()
.AllowCredentials()
.WithOrigins("https://localhost:4200"));

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
	var services = scope.ServiceProvider;
	try
	{
		ApplicationDbContext db = services.GetRequiredService<ApplicationDbContext>();
		UserManager<AppUser> userManager = services.GetRequiredService<UserManager<AppUser>>();
		RoleManager<AppRole> roleManager = services.GetRequiredService<RoleManager<AppRole>>();
		ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();


		await AppUserSeed.SeedData(userManager, roleManager, logger);
	}
	catch (Exception ex)
	{
		ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();
		logger.LogInformation(ex.Message);
	}


}
app.Run();



/***
 * 
 




 * ***/