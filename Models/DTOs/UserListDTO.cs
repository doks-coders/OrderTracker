using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class UserListDTO
	{
		public int Id { get; set; }
		public string Email { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
		public string Phone_number { get; set; }
	}
}
