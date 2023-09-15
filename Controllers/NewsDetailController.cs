using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Controllers
{
    public class NewsDetailController : Controller
    {
        private readonly ApplicationContext _context;

        public NewsDetailController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: NewsDetail
        [Route("NewsDetail/{id}")]
        public IActionResult Index(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var blog = _context.BlogManager
                .FirstOrDefault(m => m.ID == id);
            if (blog == null)
            {
                return NotFound();
            }

            return View(blog);
         }
    }
}
