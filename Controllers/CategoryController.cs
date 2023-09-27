using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Controllers
{
    public class GalleryController : Controller
    {
        private readonly ApplicationContext _context;

        public GalleryController(ApplicationContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return PartialView("_Gallery"); ;
        }
    }
}
