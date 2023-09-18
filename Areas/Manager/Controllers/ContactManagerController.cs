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
    public class ContactManagerController : Controller
    {
        private readonly ApplicationContext _context;

        public ContactManagerController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Manager/ContactManager
        [Route("")]
        public async Task<IActionResult> Index()
        {
              return _context.ContactManager != null ? 
                          View(await _context.ContactManager.ToListAsync()) :
                          Problem("Entity set 'ApplicationContext.ContactManager'  is null.");
        }

        // GET: Manager/ContactManager/Details/5
        [Route("Details")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.ContactManager == null)
            {
                return NotFound();
            }

            var contactManager = await _context.ContactManager
                .FirstOrDefaultAsync(m => m.Id == id);
            if (contactManager == null)
            {
                return NotFound();
            }

            return View(contactManager);
        }

        // GET: Manager/ContactManager/Create
        [Route("Create")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Manager/ContactManager/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Create"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserName,Phone,Email,Title,Content,CreatedDate")] ContactManager contactManager)
        {
            if (ModelState.IsValid)
            {
                _context.Add(contactManager);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(contactManager);
        }

        // GET: Manager/ContactManager/Edit/5
        [Route("Edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ContactManager == null)
            {
                return NotFound();
            }

            var contactManager = await _context.ContactManager.FindAsync(id);
            if (contactManager == null)
            {
                return NotFound();
            }
            return View(contactManager);
        }

        // POST: Manager/ContactManager/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Edit"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserName,Phone,Email,Title,Content,CreatedDate")] ContactManager contactManager)
        {
            if (id != contactManager.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(contactManager);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContactManagerExists(contactManager.Id))
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
            return View(contactManager);
        }

        // GET: Manager/ContactManager/Delete/5
        [Route("Delete")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ContactManager == null)
            {
                return NotFound();
            }

            var contactManager = await _context.ContactManager
                .FirstOrDefaultAsync(m => m.Id == id);
            if (contactManager == null)
            {
                return NotFound();
            }

            return View(contactManager);
        }

        // POST: Manager/ContactManager/Delete/5
        [Route("Delete"), HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ContactManager == null)
            {
                return Problem("Entity set 'ApplicationContext.ContactManager'  is null.");
            }
            var contactManager = await _context.ContactManager.FindAsync(id);
            if (contactManager != null)
            {
                _context.ContactManager.Remove(contactManager);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ContactManagerExists(int id)
        {
          return (_context.ContactManager?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
