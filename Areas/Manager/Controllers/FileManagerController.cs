using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Areas.Manager.Controllers
{
    [Area("Manager")]
    [Route("Admin/[Area]/[Controller]")]
    public class FileManagerController : Controller
    {
        private readonly ApplicationContext _context;

        public FileManagerController(ApplicationContext context)
        {
            _context = context;
        }
        [Route("posts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _context.BlogManager.ToListAsync();
            return Json(posts.Select(p => new
                {
                    Name = "Ảnh số " + p.ID,
                    Url = p.Banner
                }));
        }
    }
}
