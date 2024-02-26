using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.SuccessMsg
{

	public class ApiSuccess
	{
		
		public string Message { get; set; }
		public int StatusCode { get; set; }

		public ApiSuccess(string message,int statusCode)
		{
			Message = message;
			StatusCode= statusCode;
		}
	}
}
