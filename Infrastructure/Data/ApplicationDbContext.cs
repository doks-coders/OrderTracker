using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
	public class ApplicationDbContext: IdentityDbContext<AppUser, AppRole, int,
		IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
		IdentityRoleClaim<int>, IdentityUserToken<int>>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
		{
			
		}
		public DbSet<AppUser> Users { get; set; }
		public DbSet<AppRole> Roles { get; set; }
		public DbSet<Order> Orders { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<AppUser>()
				.HasMany(u => u.UserRoles)
				.WithOne(u => u.User)
				.HasForeignKey(u => u.UserId).IsRequired();

			modelBuilder.Entity<AppRole>()
				.HasMany(u => u.UserRoles)
				.WithOne(u => u.Role)
				.HasForeignKey(u=>u.RoleId).IsRequired();

		}



	}
}
