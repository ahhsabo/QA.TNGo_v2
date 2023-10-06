﻿using Microsoft.EntityFrameworkCore;
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
        public DbSet<Models.BlogManager> BlogManager { get; set; }
        public DbSet<Models.FAQ> FAQ { get; set; }
        public DbSet<Models.Terms> Terms { get; set; }
        public DbSet<Models.Contact> Contact { get; set; }
        public DbSet<Models.ContactManager> ContactManager { get; set; }
        public DbSet<Models.LoginAdmin> LoginAdmin { get; set; }
        public DbSet<Models.Station> Station { get; set; }
    }
}