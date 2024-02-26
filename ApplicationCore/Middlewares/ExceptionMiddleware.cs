using ApplicationCore.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApplicationCore.Middlewares
{
	public class ExceptionMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly ILogger<ExceptionMiddleware> _logger;
		private readonly IHostEnvironment _env;

		public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
		{
			_next = next;
			_logger = logger;
			_env = env;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
			await _next(context);
			}catch(Exception ex)
			{
				
				_logger.LogError(ex.Message);

				context.Response.StatusCode = 500;
				context.Response.ContentType = "application/json";

				ApiError error;
				if (_env.IsDevelopment())
				{
					error = new(500, ex.Message, ex?.StackTrace.ToString());
				}
				else
				{
					error = new(500, ex.Message, "Internal 500 Error");
				}
				
				

				JsonSerializerOptions options = new()
				{
					PropertyNamingPolicy = JsonNamingPolicy.CamelCase
				};

				await context.Response.WriteAsync(JsonSerializer.Serialize(error,options));

			}
		}
	}
}
