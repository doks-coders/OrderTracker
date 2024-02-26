using System.Security.Claims;

namespace OrderTracker.Extensions
{
	static class UserExtensions
	{
		public static string GetName(this ClaimsPrincipal User)
		{
			return User.FindFirst(ClaimTypes.Name).Value;
		}

		public static int GetId(this ClaimsPrincipal User)
		{
			return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
		}
	}
}
