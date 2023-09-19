using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Areas.Manager.Controllers
{
    [Area("Manager")]
    [Route("Admin/[Area]/[Controller]")]
    public class BlogManagerController : Controller
    {
        private readonly ApplicationContext _context;

        public BlogManagerController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: User/BlogManager
        [Route("")]
        public async Task<IActionResult> Index()
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            return _context.BlogManager != null ?
                        View(await _context.BlogManager.ToListAsync()) :
                        Problem("Entity set 'ApplicationContext.BlogManager'  is null.");
        }

        // GET: User/BlogManager/Details/5
        [Route("Details")]
        public async Task<IActionResult> Details(int? id)
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            if (id == null || _context.BlogManager == null)
            {
                return NotFound();
            }

            var blogManager = await _context.BlogManager
                .FirstOrDefaultAsync(m => m.ID == id);
            if (blogManager == null)
            {
                return NotFound();
            }

            return View(blogManager);
        }

        // GET: User/BlogManager/Create
        [Route("Create")]
        public IActionResult Create()
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            return View();
        }

        // POST: User/BlogManager/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Create"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name,Summary,Content,Banner,Author,DatePosted,Category_ID")] BlogManager blogManager)
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            if (ModelState.IsValid)
            {
                _context.Add(blogManager);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(blogManager);
        }

        // GET: User/BlogManager/Edit/5
        [Route("Edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            if (id == null || _context.BlogManager == null)
            {
                return NotFound();
            }

            var blogManager = await _context.BlogManager.FindAsync(id);
            if (blogManager == null)
            {
                return NotFound();
            }
            return View(blogManager);
        }

        // POST: User/BlogManager/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Edit"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name,Summary,Content,Banner,Author,DatePosted,Category_ID")] BlogManager blogManager)
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            if (id != blogManager.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(blogManager);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BlogManagerExists(blogManager.ID))
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
            return View(blogManager);
        }

        // GET: User/BlogManager/Delete/5
        [Route("Delete")]

        public async Task<IActionResult> Delete(int? id)
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            if (id == null || _context.BlogManager == null)
            {
                return NotFound();
            }

            var blogManager = await _context.BlogManager
                .FirstOrDefaultAsync(m => m.ID == id);
            if (blogManager == null)
            {
                return NotFound();
            }

            return View(blogManager);
        }

        // POST: User/BlogManager/Delete/5
        [Route("Delete"), HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            List<Category> categoryList = _context.Category.ToList();
            ViewData["Category"] = categoryList;
            if (_context.BlogManager == null)
            {
                return Problem("Entity set 'ApplicationContext.BlogManager'  is null.");
            }
            var blogManager = await _context.BlogManager.FindAsync(id);
            if (blogManager != null)
            {
                _context.BlogManager.Remove(blogManager);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BlogManagerExists(int id)
        {
            return (_context.BlogManager?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
