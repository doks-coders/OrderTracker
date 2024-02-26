using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository.Interfaces
{
	public interface IRepository<T>
	{
		Task Add(T entity);
		Task Update(T entity);

		Task Remove(T entity);
		Task RemoveRange(IEnumerable<T> entities);

		Task<T> Get(Expression<Func<T, bool>> query, string includeProperties);
		Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> query, string includeProperties);
	}
}
