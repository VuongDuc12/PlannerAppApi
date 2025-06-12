


using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Common.Mappers;
using Ucm.Infrastructure.Data;

namespace HotelApp.Infrastructure.Repositories
{
    public class RepositoryBase<TEntity, TEf> : IRepositoryBase<TEntity>
        where TEntity : class
        where TEf : class
    {
        protected readonly AppDbContext _context;
        protected readonly DbSet<TEf> _dbSet;
        protected readonly IEntityEfMapper<TEntity, TEf> _mapper;

        public RepositoryBase(AppDbContext context, IEntityEfMapper<TEntity, TEf> mapper)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _context.Set<TEf>();
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var efList = await _dbSet.ToListAsync();
            return efList.Select(e => _mapper.ToEntity(e));
        }

        public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
        {
            // Not directly supported; you may need to map predicate or filter in-memory
            var efList = await _dbSet.ToListAsync();
            var entities = efList.Select(e => _mapper.ToEntity(e));
            return entities.Where(predicate.Compile());
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            var ef = await _dbSet.FindAsync(id);
            return ef == null ? null : _mapper.ToEntity(ef);
        }

        public async Task AddAsync(TEntity entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            var ef = _mapper.ToEf(entity);
            await _dbSet.AddAsync(ef);
        }

        public void Update(TEntity entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            var ef = _mapper.ToEf(entity);
            _dbSet.Update(ef);
        }

        public void Delete(TEntity entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            var ef = _mapper.ToEf(entity);
            _dbSet.Remove(ef);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
