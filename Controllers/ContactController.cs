using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;
using Microsoft.Extensions.Hosting;

namespace QA.TNGo_v2.Controllers
{
    public class ContactController : Controller
    {
        private readonly ApplicationContext _context;

        public ContactController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Manager/ContactManager/Create
        public IActionResult Index()
        {
            return View();
        }

        // POST: Manager/ContactManager/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index([Bind("Id,Name,Phone,Email,Title,Content,CreatedDate")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                var newPost = new Contact
                {
                    Id = contact.Id,
                    Name = contact.Name,
                    Phone = contact.Phone,
                    Email = contact.Email,
                    Title = contact.Title,
                    Content = contact.Content,
                    CreatedDate = DateTime.Now.Date
                };
                _context.Add(newPost);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(contact);
        }
    }
}