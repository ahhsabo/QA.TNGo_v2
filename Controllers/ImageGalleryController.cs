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
    public class ImageGalleryController : Controller
    {
        private readonly ApplicationContext _context;
        private IWebHostEnvironment _environment;
        public ImageGalleryController(ApplicationContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IActionResult> GetAllImages()
        {
            string wwwPath = _environment.WebRootPath;
            string wwwUpload = wwwPath + "/Upload";

            var imageList = Directory.GetFiles(wwwUpload)
                .Select(fn => Path.GetFileName(fn));
            ViewData["GetAllImages"] = imageList;
            return View();
        }
    }
}
