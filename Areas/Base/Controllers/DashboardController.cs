using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QA.TNGo_v2.Controllers;
using QA.TNGo_v2.Models;
using System.Diagnostics;

namespace QA.TNGo_v2.Areas.Base.Controllers
{
    [Area("Base")]
    public class DashboardController : Controller
    {
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ILogger<DashboardController> logger)
        {
            _logger = logger;
        }

        [Route("Admin")]
        public IActionResult Index()
        {
            var cookie = HttpContext.Request.Cookies["USER_LOGIN-ADMIN"];

            if ((cookie != null))
            {
                return View();
            }
            return RedirectToAction("Index", "LoginAdmin");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
