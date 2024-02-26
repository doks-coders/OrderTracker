using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entities
{
	public class Order
	{
		[Key]
		public int Id { get; set; }
		
		public string Name { get; set; }

		
		public string Country { get; set; }

		
		public string Address { get; set; }

		
		public string Phone_number { get; set; }

		
		public string Product_name { get; set; }

		
		public string? Transport { get; set; }

		
		public string Description { get; set; }

		
		public string Size { get; set; }

		
		public string Reciever_email { get; set; }

		
		public string Reciever_name { get; set; }

		
		public string Reciever_phone_number { get; set; }

		
		public string Reciever_location { get; set; }


		public DateTime DateCreated { get; set; } = DateTime.UtcNow;



		public string? OrderStatus { get; set; } = "Processing";

		public string? PaymentStatus { get; set; } = "Unpaid";

		public string? TrackingNumber { get; set; }



		public int? AppUserId { get; set; }

		[ForeignKey(nameof(AppUserId))]
		public AppUser? AppUser { get; set; }


		public int? DriverUserId { get; set; }

		[ForeignKey(nameof(DriverUserId))]
		public AppUser? Driver { get; set; }



	}
}

/*
 name: ["Daniel"],
      country: ["Odokuma"],
      address: ["Port Harcourt"],
      phone_number: ["90948294"],


      product_name:[""],
      transport: ["Bike"],
      description:[""],
      size: ["10g - 100g"],


      reciever_email:[""],
      reciever_name:[""],
      reciever_phone_number:[""],
      reciever_location:[""]
 
 */
