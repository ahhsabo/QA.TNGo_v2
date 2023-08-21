using Microsoft.EntityFrameworkCore;
using QA.SportStore.Models;

namespace QA.SportStore.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        public DbSet<Login> Login { get; set; }
    }
}