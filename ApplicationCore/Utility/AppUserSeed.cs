using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApplicationCore.Utility
{
	public class AppUserSeed
	{
		public static async Task SeedData(UserManager<AppUser> userManager,RoleManager<AppRole> roleManager,ILogger logger)
		{
			if(!(await userManager.Users.AnyAsync()))
			{
				logger.LogInformation("Seed Started Successfully");

				List<AppRole> appRoles = new List<AppRole>() { 
				new AppRole(){Name="Admin"},
				new AppRole(){Name="Member"},
				new AppRole(){Name="Driver"},
				};
				foreach(AppRole appRole in appRoles)
				{
				 	var res = await roleManager.CreateAsync(appRole);
					logger.LogError(JsonSerializer.Serialize(res.Succeeded));
				}
				logger.LogInformation("Seed Ran Successfully");

			}
		}
	}
}
