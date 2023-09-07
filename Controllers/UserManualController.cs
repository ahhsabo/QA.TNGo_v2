using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.SportStore.Models;

namespace QA.SportStore.Controllers
{
    public class UserManualController : Controller
    {
        private readonly ApplicationContext _context;

        public UserManualController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Product
        public IActionResult Index()
        {
            return View();
        }


        //private bool UserManualExists(int id)
        //{
        //  return (_context.UserManual?.Any(e => e.ID == id)).GetValueOrDefault();
        //}
    }
}
