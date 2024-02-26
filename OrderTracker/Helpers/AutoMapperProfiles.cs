using AutoMapper;
using Models.DTOs;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Helpers
{
	public class AutoMapperProfiles:Profile
	{
		public AutoMapperProfiles() 
		{
			CreateMap<RegisterUserDTO, AppUser>()
				.ForMember(u=>u.UserName,
				opt=>opt.MapFrom(u=>u.Email));



			CreateMap<CreateOrderDTO, Order>();

			CreateMap<Order, OrderDTO>();

			CreateMap<EditUserDTO, AppUser>();

			CreateMap<AppUser, UserListDTO>();
		}
	}
}
