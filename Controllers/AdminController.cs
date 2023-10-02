using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Controllers
{
    public class AdminController : Controller
    {
        // GET:
        public IActionResult Index()
        {
            return View();
        }
    }
}