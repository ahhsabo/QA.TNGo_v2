using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class FAQ
    {
        public int ID { get; set; }
        [Display(Name = "Tiêu đề")]
        public string? Title { get; set; }
        [Display(Name = "Số thứ tự")]
        public int? Order { get; set; }
        [Display(Name = "Chỉ mục")]
        public int? ParentId { get; set; }
        [Display(Name = "Nội dung")]
        public string? Content { get; set; }

    }
}
