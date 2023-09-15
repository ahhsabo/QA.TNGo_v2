﻿using System;
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
    public class NewsController : Controller
    {
        private readonly ApplicationContext _context;

        public NewsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: News
        public IActionResult Index()
        {
            var blog = _context.BlogManager.ToList();
            return View(blog);
        }
    }
}
