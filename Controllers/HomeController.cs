﻿using Microsoft.AspNetCore.Mvc;
using QA.SportStore.Models;
using System.Diagnostics;

namespace QA.SportStore.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(Login _login)
        {
            var cookie = HttpContext.Request.Cookies["USER_LOGIN"];

            if ((cookie != null))
            {
                return RedirectToAction("Index", "Category");
            }
            return RedirectToAction("Index", "Login");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}