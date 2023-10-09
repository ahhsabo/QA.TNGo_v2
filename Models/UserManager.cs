using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class UserManager
    {
        public int ID { get; set; }
        [Display(Name = "Họ và tên")]
        public string? Name { get; set; }
        [Display(Name = "Email")]
        public string? Email { get; set; }
        [Display(Name = "Số điện thoại")]
        public string? PhoneNumber { get; set; }
        [Display(Name = "Mô tả")]
        public string? Description { get; set; }
        [Display(Name = "Tên đăng nhập")]
        public string? UserName { get; set; }
        [Display(Name = "Mật khẩu")]
        public string? PasswordHash { get; set; }
        [Display(Name = "Ảnh đại diện")]
        public string? Avatar { get; set; }
        [Display(Name = "Tên hiển thị")]
        public string? DisplayName { get; set; }

    }
}
