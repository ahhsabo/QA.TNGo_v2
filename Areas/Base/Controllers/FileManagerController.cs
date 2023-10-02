using System;
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

namespace QA.TNGo_v2.Areas.Base.Controllers
{
    [Area("Base")]
    [Route("Admin/[Area]/[Controller]")]
    public class FileManagerController : Controller
    {
        private readonly ApplicationContext _context;
        private readonly IWebHostEnvironment _environment;
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

        [Route("UploadImage"), HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile imageFile)
        {
            var isSuccess = false;
            if (imageFile != null)
            {
                try
                {
                    // Specify the folder path within the wwwroot directory where you want to save the uploaded image.
                    string folderPath = Path.Combine(_environment.WebRootPath, "Upload"); // Change this path as needed.

                    // Generate a unique file name for the image.
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

                    // Combine the folder path and file name to get the full file path.
                    string fullPath = Path.Combine(folderPath, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    // Optionally, you can save the file path in a database or perform other actions.
                    isSuccess = true;
                    ViewBag.Message = "Image uploaded successfully!";
                }
                catch (Exception ex)
                {
                    isSuccess = false;
                    ViewBag.Error = "Error uploading image: " + ex.Message;
                }
            }
            else
            {
                isSuccess = false;
                ViewBag.Error = "Please select a valid image file.";
            }

            return Json(new
            {
                Status = isSuccess,
            });
        }
    }
}
