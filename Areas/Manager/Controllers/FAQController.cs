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
    public class FAQController : Controller
    {
        private readonly ApplicationContext _context;

        public FAQController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Manager/FAQ
        [Route("")]
        public async Task<IActionResult> Index()
        {
              return _context.FAQ != null ? 
                          View(await _context.FAQ.ToListAsync()) :
                          Problem("Entity set 'ApplicationContext.FAQ'  is null.");
        }

        // GET: Manager/FAQ/Details/5
        [Route("Details")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.FAQ == null)
            {
                return NotFound();
            }

            var fAQ = await _context.FAQ
                .FirstOrDefaultAsync(m => m.ID == id);
            if (fAQ == null)
            {
                return NotFound();
            }

            return View(fAQ);
        }

        // GET: Manager/FAQ/Create
        [Route("Create")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Manager/FAQ/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Create"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Title,Order,ParentId,Content")] FAQ fAQ)
        {
            if (ModelState.IsValid)
            {
                _context.Add(fAQ);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(fAQ);
        }

        // GET: Manager/FAQ/Edit/5
        [Route("Edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.FAQ == null)
            {
                return NotFound();
            }

            var fAQ = await _context.FAQ.FindAsync(id);
            if (fAQ == null)
            {
                return NotFound();
            }
            return View(fAQ);
        }

        // POST: Manager/FAQ/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Edit"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Title,Order,ParentId,Content")] FAQ fAQ)
        {
            if (id != fAQ.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(fAQ);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FAQExists(fAQ.ID))
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
            return View(fAQ);
        }

        // GET: Manager/FAQ/Delete/5
        [Route("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.FAQ == null)
            {
                return NotFound();
            }

            var fAQ = await _context.FAQ
                .FirstOrDefaultAsync(m => m.ID == id);
            if (fAQ == null)
            {
                return NotFound();
            }

            return View(fAQ);
        }

        // POST: Manager/FAQ/Delete/5
        [Route("Delete"), HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.FAQ == null)
            {
                return Problem("Entity set 'ApplicationContext.FAQ'  is null.");
            }
            var fAQ = await _context.FAQ.FindAsync(id);
            if (fAQ != null)
            {
                _context.FAQ.Remove(fAQ);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FAQExists(int id)
        {
          return (_context.FAQ?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
