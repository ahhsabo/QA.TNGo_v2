using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ApplicationContext _context;

        public CategoryController(ApplicationContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            Category categoryList = _context.Category.FirstOrDefault();
            ViewData["Category"] = categoryList;

            return View();
        }
    }
}
