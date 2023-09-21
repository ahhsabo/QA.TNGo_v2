﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace QA.TNGo_v2.Areas.Manager.Controllers
{
    [Area("Manager")]
    [Route("Admin/[Area]/[Controller]")]
    public class FileManagerController : Controller
    {
        private readonly ApplicationContext _context;
        private IWebHostEnvironment _environment;
        public FileManagerController(ApplicationContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        [Route("Posts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _context.BlogManager.ToListAsync();
            return Json(posts.Select(p => new
            {
                Name = "Ảnh số " + p.ID,
                Url = p.Banner
            }));
        }

        [Route("Images")]
        public async Task<IActionResult> GetAllImages()
        {
            string wwwPath = _environment.WebRootPath;
            string wwwUpload = wwwPath + "/Upload";

            var imageList = Directory.GetFiles(wwwUpload)
                .Select(fn => Path.GetFileName(fn));

            return Json(imageList.Select(p => new
            {
                Name = p,
                Url = "/Upload/" + p
            }));
        }

    }
}
