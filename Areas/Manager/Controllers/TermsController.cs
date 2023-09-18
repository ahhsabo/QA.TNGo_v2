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
    public class TermsController : Controller
    {
        private readonly ApplicationContext _context;

        public TermsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Manager/Terms
        [Route("")]
        public async Task<IActionResult> Index()
        {
              return _context.Terms != null ? 
                          View(await _context.Terms.ToListAsync()) :
                          Problem("Entity set 'ApplicationContext.Terms'  is null.");
        }

        // GET: Manager/Terms/Details/5
        [Route("Details")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Terms == null)
            {
                return NotFound();
            }

            var terms = await _context.Terms
                .FirstOrDefaultAsync(m => m.ID == id);
            if (terms == null)
            {
                return NotFound();
            }

            return View(terms);
        }

        // GET: Manager/Terms/Create
        [Route("Create")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Manager/Terms/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Create"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Title,Order,Type,Content")] Terms terms)
        {
            if (ModelState.IsValid)
            {
                _context.Add(terms);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(terms);
        }

        // GET: Manager/Terms/Edit/5
        [Route("Edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Terms == null)
            {
                return NotFound();
            }

            var terms = await _context.Terms.FindAsync(id);
            if (terms == null)
            {
                return NotFound();
            }
            return View(terms);
        }

        // POST: Manager/Terms/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Edit"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Title,Order,Type,Content")] Terms terms)
        {
            if (id != terms.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(terms);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TermsExists(terms.ID))
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
            return View(terms);
        }

        // GET: Manager/Terms/Delete/5
        [Route("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Terms == null)
            {
                return NotFound();
            }

            var terms = await _context.Terms
                .FirstOrDefaultAsync(m => m.ID == id);
            if (terms == null)
            {
                return NotFound();
            }

            return View(terms);
        }

        // POST: Manager/Terms/Delete/5
        [Route("Delete"), HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Terms == null)
            {
                return Problem("Entity set 'ApplicationContext.Terms'  is null.");
            }
            var terms = await _context.Terms.FindAsync(id);
            if (terms != null)
            {
                _context.Terms.Remove(terms);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TermsExists(int id)
        {
          return (_context.Terms?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
