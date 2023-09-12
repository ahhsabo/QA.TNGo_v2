using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace QA.TNGo_v2.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        public DbSet<Models.Login> Login { get; set; }
        public DbSet<Models.Product> Product { get; set; }
        public DbSet<Models.Category> Category { get; set; }
        public DbSet<Models.Image> Image { get; set; }
        public DbSet<Models.UserManager> UserManager { get; set; }
    }
}