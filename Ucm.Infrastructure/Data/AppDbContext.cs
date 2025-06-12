﻿
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Ucm.Infrastructure.Data.Models;

namespace Ucm.Infrastructure.Data
{

    public class AppDbContext : IdentityDbContext<AppUserEF, IdentityRole<Guid>, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppUserEF>().ToTable("Users"); // Tùy ý
        }
    }
}