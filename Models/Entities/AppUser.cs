
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entities
{
	public class AppUser:IdentityUser<int>
	{
		public string Email { get; set; }
		public string? Name { get; set; }
		public string? Country { get; set; }
		public string? Address { get; set; }
		public string? Phone_number { get; set; } 

		public ICollection<AppUserRole> UserRoles { get; set; }
	}
}
