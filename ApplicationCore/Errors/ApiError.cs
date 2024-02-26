using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Errors
{
	public class ApiError
	{
		public int StatusCode { get; set; }
		public string ErrorMessage { get; set; }
		public string ErrorDetails { get; set; }

		public ApiError(int statusCode, string errorMessage, string errorDetails) 
		{
			StatusCode = statusCode; 
			ErrorMessage = errorMessage; 
			ErrorDetails = errorDetails;
		}
	}
}
