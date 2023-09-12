using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Areas.User.Controllers
{
    [Area("User")]
    [Route("Admin/[Area]/[Controller]")]
    public class UserManagerController : Controller
    {
        private readonly ApplicationContext _context;

        public UserManagerController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: User/UserManager
        [Route("Index")]
        public async Task<IActionResult> Index()
        {
              return _context.UserManager != null ? 
                          View(await _context.UserManager.ToListAsync()) :
                          Problem("Entity set 'ApplicationContext.UserManager'  is null.");
        }

        // GET: User/UserManager/Details/5
        [Route("Details")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.UserManager == null)
            {
                return NotFound();
            }

            var userManager = await _context.UserManager
                .FirstOrDefaultAsync(m => m.ID == id);
            if (userManager == null)
            {
                return NotFound();
            }

            return View(userManager);
        }

        // GET: User/UserManager/Create
        [Route("Create")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: User/UserManager/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Create"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name,Email,PhoneNumber,Description,UserName,PasswordHash,Avatar,DisplayName")] UserManager userManager)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userManager);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userManager);
        }

        // GET: User/UserManager/Edit/5
        [Route("Edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserManager == null)
            {
                return NotFound();
            }

            var userManager = await _context.UserManager.FindAsync(id);
            if (userManager == null)
            {
                return NotFound();
            }
            return View(userManager);
        }

        // POST: User/UserManager/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Edit"),HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,Email,PhoneNumber,Description,UserName,PasswordHash,Avatar,DisplayName")] UserManager userManager)
        {
            if (id != userManager.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userManager);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserManagerExists(userManager.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(userManager);
        }

        // GET: User/UserManager/Delete/5
        [Route("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserManager == null)
            {
                return NotFound();
            }

            var userManager = await _context.UserManager
                .FirstOrDefaultAsync(m => m.ID == id);
            if (userManager == null)
            {
                return NotFound();
            }

            return View(userManager);
        }

        // POST: User/UserManager/Delete/5
        [Route("Delete"), HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserManager == null)
            {
                return Problem("Entity set 'ApplicationContext.UserManager'  is null.");
            }
            var userManager = await _context.UserManager.FindAsync(id);
            if (userManager != null)
            {
                _context.UserManager.Remove(userManager);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserManagerExists(int id)
        {
          return (_context.UserManager?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
