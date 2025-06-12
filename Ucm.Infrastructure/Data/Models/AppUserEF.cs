using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ucm.Domain.Entities;

namespace Ucm.Infrastructure.Data.Models
{
    public class AppUserEF : IdentityUser<Guid>
    {
        public string FullName { get; set; }

        public User ToDomain()
        {
            return new User
            {
                Id = this.Id,
                Email = this.Email,
                FullName = this.FullName
            };
        }

        public static AppUserEF FromDomain(User user)
        {
            return new AppUserEF
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.Email,
                FullName = user.FullName
            };
        }
    }
}
