using ApplicationCore.Services.Interfaces;
using ApplicationCore.Services.Services;
using Infrastructure.Data;
using Infrastructure.Repository.Interfaces;
using Infrastructure.Repository.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace OrderTracker.Extensions
{
	static class ApplicationServiceExtensions
	{
		public static IServiceCollection AddServices(this IServiceCollection services,IConfiguration config)
		{
			
			services.AddDbContext<ApplicationDbContext>(options => 
			options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

			services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

			services.AddCors(options =>
			{
				options.AddPolicy("AllowSpecificOrigin",
					builder => builder
						.WithOrigins("https://localhost:4200")
						.AllowAnyMethod()
						.AllowAnyHeader()
						.AllowCredentials());
			});

			return services;
		}
	}
}
