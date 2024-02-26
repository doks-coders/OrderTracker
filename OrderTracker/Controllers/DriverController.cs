using ApplicationCore.SuccessMsg;
using ApplicationCore.Utility;
using AutoMapper;
using Infrastructure.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTOs;
using Models.Entities;
using OrderTracker.Extensions;

namespace OrderTracker.Controllers
{
	[Authorize]
	public class DriverController : BaseApiController
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public DriverController(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}
		[HttpGet("get-driver-orders")]
		public async Task<ActionResult>  GetDriverOrders()
		{
			var res = await _unitOfWork.Orders.GetAll(u => u.DriverUserId==User.GetId(), includeProperties: "");
			return Ok(_mapper.Map<IEnumerable<OrderDTO>>(res.OrderByDescending(u => u.DateCreated)));
		}

		[HttpPost("order-successful/{id}")]
		public async Task<ActionResult> SetOrderToSuccessful(int id)
		{
			Order order = await _unitOfWork.Orders.Get(u => u.Id == id, includeProperties: "");
			if (order == null) return NotFound();
			order.OrderStatus = SD.StatusSucessful;
			if (await _unitOfWork.SaveChanges())
			{
				return Ok(new ApiSuccess("Order has been delivered successfully", 200));
			}
			return BadRequest("Failed To Update");
		}
	}
}
