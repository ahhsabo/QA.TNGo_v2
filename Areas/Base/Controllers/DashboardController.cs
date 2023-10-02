using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace QA.TNGo_v2.Areas.Base.Controllers
{
    [Area("Base")]
    public class DashboardController : Controller
    {
        //[Authorize]
        [Route("Admin")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
