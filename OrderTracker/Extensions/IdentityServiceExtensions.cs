using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Models.Entities;
using System.Text;

namespace OrderTracker.Extensions
{
	static class IdentityServiceExtensions
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration config)
		{
			services.AddIdentityCore<AppUser>(opt =>
			opt.Password.RequireNonAlphanumeric = false)
			.AddRoles<AppRole>()
			.AddRoleManager<RoleManager<AppRole>>()
			.AddEntityFrameworkStores<ApplicationDbContext>();

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new()
					{
						ValidateIssuerSigningKey = true,
						ValidateIssuer = false,
						ValidateAudience=false,

						IssuerSigningKey = new 
						SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]))

					};
				});
			return services;
		}
	}
}
