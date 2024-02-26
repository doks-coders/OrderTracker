using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class ProcessOrderDTO
	{
		public int Id { get; set; }
		public int DriverUserId { get; set; }
		public string Transport { get; set; }
	}
}
