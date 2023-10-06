using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Drawing.Printing;
using System.Net.Http.Headers;

namespace QA.TNGo_v2.Controllers
{
    [Route("[controller]")]
    public class StationController : Controller
    {
        private readonly ApplicationContext _context;

        public StationController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: Product
        [Route("")]
        public async Task<IActionResult> Index()
        {
            //List<Station> stationList = _context.Station.ToList();
            //ViewData["Station"] = stationList;
            return _context.Station != null ?
                View(await _context.Station.ToListAsync()) :
                Problem("Entity set 'ApplicationContext.Station'  is null.");
        }

        [Route("GetStation")]
        public async Task<IActionResult> GetStation()
        {
            var stations = await _context.Station.ToListAsync();
            return Json(stations.Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Code = p.Code,
                lat = p.lat,
                lng = p.lng,
                Address = p.Address,
                City = p.City
            }));
        }

    }
}

