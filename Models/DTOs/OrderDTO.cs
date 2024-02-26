using Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class OrderDTO
	{
		public int Id { get; set; }

		public string Name { get; set; }


		public string Country { get; set; }


		public string Address { get; set; }


		public string Phone_number { get; set; }


		public string Product_name { get; set; }


		public string Transport { get; set; }


		public string Description { get; set; }


		public string Size { get; set; }


		public string OrderStatus { get; set; }

		public string PaymentStatus { get; set; }

		public string Reciever_email { get; set; }


		public string Reciever_name { get; set; }


		public string Reciever_phone_number { get; set; }

		public string Reciever_location { get; set; }

		public DateTime DateCreated { get; set; } 

		public AppUser? AppUser { get; set; }

	
		public int? DriverUserId { get; set; }

		public AppUser? Driver { get; set; }
	}
}
