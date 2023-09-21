using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Controllers
{
    public class ModalController : Controller
    {
        private readonly ApplicationContext _context;

        public ModalController(ApplicationContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
