using Infrastructure.Data;
using Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository.Repositories
{

	public class Repository<T> : IRepository<T> where T : class
	{
		internal ApplicationDbContext _db;
		internal DbSet<T> dbSet;
		public Repository(ApplicationDbContext db)
		{
			_db = db;
			dbSet = db.Set<T>();
		}

		public async Task Add(T entity)
		{
			await dbSet.AddAsync(entity);
		}

		public async Task<T> Get(Expression<Func<T, bool>> query, string includeProperties)
		{
			IQueryable<T> dataQuery = dbSet.AsQueryable();
			if (query != null)
			{
				dataQuery = dataQuery.Where(query);
			}

			if (!string.IsNullOrEmpty(includeProperties))
			{
				dataQuery = AddProperties(includeProperties, dataQuery);
			}

			return await dataQuery.FirstOrDefaultAsync();
		}



		public async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> query, string includeProperties)
		{
			IQueryable<T> dataQuery = dbSet.AsQueryable();
			if (query != null)
			{
				dataQuery = dataQuery.Where(query);
			}
			if (!string.IsNullOrEmpty(includeProperties))
			{
				dataQuery = AddProperties(includeProperties, dataQuery);
			}

			return await dataQuery.ToListAsync();
		}

		public async Task Remove(T entity)
		{
			dbSet.Remove(entity);
		}

		public async Task RemoveRange(IEnumerable<T> entities)
		{
			dbSet.RemoveRange(entities);
		}

		public async Task Update(T entity)
		{
			throw new NotImplementedException();
		}


		private IQueryable<T> AddProperties(string includeProperties, IQueryable<T> dataQuery)
		{
			string[] props = includeProperties.Split(",", StringSplitOptions.RemoveEmptyEntries);
			foreach (string prop in props)
			{
				dataQuery = dataQuery.Include(prop.Trim());
			}
			return dataQuery;
		}
	}
}
