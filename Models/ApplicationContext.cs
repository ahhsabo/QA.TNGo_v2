using Microsoft.EntityFrameworkCore;
using QA.SportStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace QA.SportStore.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<QA.SportStore.Models.Login> Login { get; set; }

        public DbSet<QA.SportStore.Models.Product> Product { get; set; }

        public DbSet<QA.SportStore.Models.Category> Category { get; set; }
        public DbSet<QA.SportStore.Models.Image> Image { get; set; }
    }
}