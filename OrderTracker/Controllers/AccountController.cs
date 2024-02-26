using ApplicationCore.Helpers;
using ApplicationCore.Services.Interfaces;
using ApplicationCore.SuccessMsg;
using ApplicationCore.Utility;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.DTOs;
using Models.Entities;
using OrderTracker.Extensions;
using System.Data;

namespace OrderTracker.Controllers
{
	public class AccountController : BaseApiController
	{
		
		

		private readonly UserManager<AppUser> _userManager;
		private readonly RoleManager<AppRole> _roleManager;
		private readonly ITokenService _tokenService;

		private readonly IMapper _mapper;

		public AccountController(ApplicationDbContext db, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager,IMapper mapper, ITokenService tokenService )
		{
			_userManager = userManager;
			_mapper = mapper;
			_tokenService = tokenService;
		}

		
		[HttpPost("register")]
		public async Task<ActionResult> Register([FromBody]RegisterUserDTO registerUserDTO)
		{
			if (await UserExist(registerUserDTO.Email)) return BadRequest("User Exists");
			if (registerUserDTO.Password != registerUserDTO.Verify_password) return BadRequest("Passwords do not match");
			
			AppUser user = _mapper.Map<AppUser>(registerUserDTO);
		    
			IdentityResult resU = await _userManager.CreateAsync(user, registerUserDTO.Password);
			if (!resU.Succeeded) return BadRequest(resU.Errors);

			IdentityResult resR = await _userManager.AddToRoleAsync(user, SD.Role_Member);
			if (!resR.Succeeded) return BadRequest(resR.Errors);

			var roles = await _userManager.GetRolesAsync(user);
			


			return Ok(new UserDTO()
			{
				Email=user.Email,
				Address=user.Address,
				Phone_number=user.Phone_number,
				Token=await _tokenService.CreateToken(user),
				Roles = roles.ToArray()
			});
		}

		[HttpPost("login")]
		public async Task<ActionResult> Login([FromBody]LoginUserDTO loginUserDTO)
		{
			AppUser? user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginUserDTO.Email);
			if (user == null) return NotFound("User does not exist");
			bool matches = await _userManager.CheckPasswordAsync(user, loginUserDTO.Password);
			var roles = await _userManager.GetRolesAsync(user);

			
			if (matches)
			{
				return Ok(new UserDTO()
				{
					Email = user.Email,
					Address = user.Address,
					Phone_number = user.Phone_number,
					Token = await _tokenService.CreateToken(user),
					Roles = roles.ToArray()
				});
			}
			

			return BadRequest("There was a problem logging in");

			/*
			 * 
{
  "email": "test@mail.com",
  "password": "Password123@",
  "verify_password": "Password123@"
}
			bool matches = await _userManager.CheckPasswordAsync(user, loginUserDTO.Password);
			if (matches)
			{
				return Ok(loginUserDTO);
			}
			return BadRequest("Passwords Do no Match");
			*/

		}

		[HttpPut("update-user")]
		public async Task<ActionResult> UpdateUser([FromBody] EditUserDTO editUserDTO)
		{
			//Get User
			AppUser user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == User.GetId());
			user = _mapper.Map(editUserDTO, user);
			await _userManager.UpdateAsync(user);
			var roles = await _userManager.GetRolesAsync(user);

			return Ok(new UserDTO()
			{
				Email = user.Email,
				Name = user.Name,
				Address = user.Address,
				Phone_number = user.Phone_number,
				Token = await _tokenService.CreateToken(user),
				Roles = roles.ToArray()
			});
		}
		private async Task<bool> UserExist(string email)
		{
			return await _userManager.Users.AnyAsync(u => u.Email == email);
		}

	}
}
