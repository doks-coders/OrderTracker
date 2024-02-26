using Infrastructure.Data;
using Infrastructure.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository.Repositories
{
	public class UnitOfWork:IUnitOfWork
	{
		private readonly ApplicationDbContext _db;

		public IOrderRepository Orders { get; }

		public UnitOfWork(ApplicationDbContext db)
		{
			Orders = new OrderRepository(db);
			_db = db;
		}

		public async Task<bool> SaveChanges()
		{
			return (0 < await _db.SaveChangesAsync());
		}
	}
}
