﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOs
{
	public class RegisterUserDTO
	{
		public string Email { get; set; }
		public string Password { get; set; }
		public string Verify_password { get; set; }
	}
}
