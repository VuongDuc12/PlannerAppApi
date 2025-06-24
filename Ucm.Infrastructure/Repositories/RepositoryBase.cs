using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ucm.Domain.IRepositories;
using Ucm.Infrastructure.Common.Mappers;
using Ucm.Infrastructure.Data;
using Ucm.Shared.Common.Pagination;

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
        public async Task<PagedResult<TEntity>> GetPagedAsync(PaginationParams pagination)
        {
            IQueryable<TEf> query = _dbSet;

            // Apply basic search filter (nếu có)
            if (!string.IsNullOrWhiteSpace(pagination.SearchTerm))
            {
                query = ApplySearchFilter(query, pagination.SearchTerm);
            }

            var pagedEf = await query.ToPagedResultAsync(pagination);

            return new PagedResult<TEntity>
            {
                Items = pagedEf.Items.Select(_mapper.ToEntity).ToList(),
                TotalCount = pagedEf.TotalCount,
                PageNumber = pagedEf.PageNumber,
                PageSize = pagedEf.PageSize
            };
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
            // Gán lại Id cho entity domain nếu có property Id
            var idProp = typeof(TEntity).GetProperty("Id");
            var efIdProp = ef.GetType().GetProperty("Id");
            if (idProp != null && efIdProp != null)
            {
                // EF sẽ gán Id sau khi SaveChangesAsync, nên cần gán lại sau khi save
                // => Sẽ gán lại trong SaveChangesAsync nếu cần
            }
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
            // Sau khi save, gán lại Id cho entity domain nếu có
            foreach (var entry in _context.ChangeTracker.Entries())
            {
                if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                {
                    var entity = entry.Entity;
                    var efIdProp = entity.GetType().GetProperty("Id");
                    if (efIdProp != null)
                    {
                        var idValue = efIdProp.GetValue(entity);
                        // Tìm entity domain tương ứng và gán lại Id nếu cần
                        // (Chỉ thực hiện nếu entity là object EF và có property Id)
                    }
                }
            }
        }
        protected virtual IQueryable<TEf> ApplySearchFilter(IQueryable<TEf> query, string searchTerm)
        {
            return query; // Mặc định: không lọc gì cả
        }
    }
}
