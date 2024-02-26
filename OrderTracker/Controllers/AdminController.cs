using ApplicationCore.SuccessMsg;
using ApplicationCore.Utility;
using AutoMapper;
using Infrastructure.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.DTOs;
using Models.Entities;

namespace OrderTracker.Controllers
{
	[Authorize]
	public class AdminController : BaseApiController
	{
		private readonly IMapper _mapper;
		private readonly IUnitOfWork _unitOfWork;
		private readonly UserManager<AppUser> _userManager;

		public AdminController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
		{
			_mapper = mapper;
			_unitOfWork = unitOfWork;
			_userManager = userManager;
		}

		[HttpGet("get-orders")]
		public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
		{
			var res = await _unitOfWork.Orders.GetAll(u => true, includeProperties: "");
			return Ok(_mapper.Map<IEnumerable<OrderDTO>>(res.OrderByDescending(u => u.DateCreated)));
		}

		[HttpGet("get-drivers")]
		public async Task<ActionResult<IEnumerable<UserListDTO>>> GetDrivers()
		{
			var res = await _userManager.GetUsersInRoleAsync("Driver");
			return Ok(_mapper.Map<IEnumerable<UserListDTO>>(res.OrderByDescending(u => u.Name)));
		}

		[HttpPost("set-processing")]
		public async Task<ActionResult> SetProcessingModel([FromBody] ProcessOrderDTO processOrderDTO)
		{
			Order order = await _unitOfWork.Orders.Get(u => u.Id == processOrderDTO.Id,includeProperties:"");
			order.DriverUserId = processOrderDTO.DriverUserId;
			order.Transport = processOrderDTO.Transport;
			order.OrderStatus = SD.StatusShipped;

			if(await _unitOfWork.SaveChanges())
			{
				return Ok(new ApiSuccess("Order Processed Successfully", 200));
			}
			return BadRequest("Error Settings");
		}
		

	}
}
