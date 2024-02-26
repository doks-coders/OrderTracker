using Infrastructure.Data;
using Infrastructure.Repository.Interfaces;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository.Repositories
{
	public class OrderRepository : Repository<Order>, IOrderRepository
	{

		public OrderRepository(ApplicationDbContext db):base(db)
		{
			_db = db;
		}
	}
}
