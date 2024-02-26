using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class UserDTO
	{
		public string Email { get; set; }
		public string Name { get; set; }
		public string Token { get; set; }
		public string Address { get; set; }
		public string Phone_number { get; set; }
		public string [] Roles { get; set; } = [];
	}
}

/*
 email:string
    name:string
    token:string
    address:string
    phone_number:string
    roles:string[]
 */
