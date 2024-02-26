using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class EditUserDTO
	{
		public string Name { get; set; }
		public string Country { get; set; }
		public string Address { get; set; }
		public string Phone_number { get; set; }
	}
}
