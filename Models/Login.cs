using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class Login
    {
        public int Id { get; set; }
        [Display(Name = "Tài khoản")]
        [Required(ErrorMessage = "{0} không được để trống")]
        public string? UserName { get; set; }
        [Display(Name = "Mật khẩu")]
        [Required(ErrorMessage = "{0} không được để trống")]
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public string? Email { get; set; }
        public string? ConfirmEmail { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
