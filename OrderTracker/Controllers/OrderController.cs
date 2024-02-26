using ApplicationCore.SuccessMsg;
using AutoMapper;
using Infrastructure.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Models.DTOs;
using Models.Entities;
using OrderTracker.Extensions;

namespace OrderTracker.Controllers
{
	[Authorize]
	public class OrderController : BaseApiController
	{ 


		private readonly IMapper _mapper;
		private readonly IUnitOfWork _unitOfWork;
		public OrderController(IMapper mapper, IUnitOfWork unitOfWork)
		{
			_mapper = mapper;
			_unitOfWork = unitOfWork;
		}

		[HttpPost("create-order")]
		public async Task<ActionResult> CreateOrder([FromBody] CreateOrderDTO createOrderDTO)
		{
		
			Order order = _mapper.Map<Order>(createOrderDTO);
			order.AppUserId = User.GetId();

			//!Hack for payment
			order.PaymentStatus = "Paid";
			await _unitOfWork.Orders.Add(order);
			if(await _unitOfWork.SaveChanges())
			{
				return Ok(new ApiSuccess("Order Created Successfully",200));
			}
			return BadRequest("Order was not successfully saved");
		}

		[HttpGet("get-orders")]
		public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrders()
		{
			var res = await _unitOfWork.Orders.GetAll(u => u.AppUserId == User.GetId(), includeProperties: "");
			return Ok(_mapper.Map<IEnumerable<OrderDTO>>(res.OrderByDescending(u=>u.DateCreated)));
		}
	}
}
