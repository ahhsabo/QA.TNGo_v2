using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class ContactManager
    {
        public int Id { get; set; }
        [Display(Name = "Họ và tên")]
        public string? UserName { get; set; }
        [Display(Name = "Số điện thoại")]
        public string? Phone { get; set; }
        public string? Email { get; set; }
        [Display(Name = "Tiêu đề")]
        public string? Title { get; set; }
        [Display(Name = "Nội dung")]
        public string? Content { get; set; }
        [Display(Name = "Ngày gửi")]
        public DateTime? CreatedDate { get; set; }
    }
}