using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QA.TNGo_v2.Models;

namespace QA.TNGo_v2.Areas.Base.Controllers
{
    [Area("Base")]
    [Route("Admin/[Area]/[Controller]")]
    public class LoginAdminController : Controller
    {
        private readonly ApplicationContext _context;

        public LoginAdminController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: LoginAdmin
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        //POST: LoginAdmin
        [Route(""), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index([Bind("Id,UserName,Password")] LoginAdmin loginAdmin)
        {
            if (ModelState.IsValid)
            {
                if (loginAdmin.UserName != null && loginAdmin.Password != null)
                {
                    List<LoginAdmin> db_pass = await _context.LoginAdmin.ToListAsync();
                    //pass mình nhập

                    var f_password = GetMD5(loginAdmin.Password);
                    var result = (from w in _context.LoginAdmin
                                  where w.UserName == loginAdmin.UserName && w.Password == f_password
                                  select w).FirstOrDefault();
                    if (result != null)
                    {
                        Response.Cookies.Append("USER_LOGIN-ADMIN", "logged_in");
                        return RedirectToAction("Index", "Dashboard");
                    }
                    if (result == null)
                    {
                        ModelState.AddModelError(string.Empty, "Tên đăng nhập hoặc mật khẩu không đúng");
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Vui lòng nhập đầy đủ thông tin");
                }
            }
            ModelState.AddModelError("", "Thao tác không hợp lệ. Vui lòng kiểm tra lại.");
            return RedirectToAction("Index", "LoginAdmin");
        }



        // GET: Logout
        [Route("Logout")]
        public IActionResult Logout()
        {
            if (ModelState.IsValid)
            {
                if (Request.Cookies["USER_LOGIN-ADMIN"] != null)
                {
                    Response.Cookies.Delete("USER_LOGIN-ADMIN");
                    return RedirectToAction("Index", "LoginAdmin");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Bạn chưa đăng nhập!");
                    return RedirectToAction("Index", "LoginAdmin");
                }

            }
            return RedirectToAction("Index", "LoginAdmin");
        }





        // GET: Login/Register
        [Route("Register")]
        public IActionResult Register()
        {
            return View();
        }

        // POST: Logins/Register
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Route("Register"), HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([Bind("Id,UserName,Password,Email,FirstName,LastName")] LoginAdmin loginAdmin)
        {
            if (ModelState.IsValid)
            {
                //Pass user nhập vào đăng kí
                var passMD5 = GetMD5(loginAdmin.Password);
                loginAdmin.Password = passMD5;
                _context.Add(loginAdmin);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(loginAdmin);
        }

        //create a string MD5
        public static string GetMD5(string str)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] fromData = Encoding.UTF8.GetBytes(str);
            byte[] targetData = md5.ComputeHash(fromData);
            string byte2String = null;

            for (int i = 0; i < targetData.Length; i++)
            {
                byte2String += targetData[i].ToString("x2");

            }
            return byte2String;
        }

        private bool LoginExists(int id)
        {
            return (_context.LoginAdmin?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
