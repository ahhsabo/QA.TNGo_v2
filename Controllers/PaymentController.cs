﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Controllers
{
    public class PaymentController : Controller
    {
        private readonly ApplicationContext _context;

        public PaymentController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Product
        public IActionResult Index()
        {
            return View();
        }

    }
}
