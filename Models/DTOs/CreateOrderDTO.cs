using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class CreateOrderDTO
	{
		public string Name { get; set; }


		public string Country { get; set; }


		public string Address { get; set; }


		public string Phone_number { get; set; }


		public string Product_name { get; set; }


		public string Description { get; set; }


		public string Size { get; set; }


		public string Reciever_email { get; set; }


		public string Reciever_name { get; set; }


		public string Reciever_phone_number { get; set; }


		public string Reciever_location { get; set; }
	}
}
