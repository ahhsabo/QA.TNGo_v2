using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class BlogManager
    {
        public int ID { get; set; }
        [Display(Name = "Tên bài viết")]
        public string? Name { get; set; }
        [Display(Name = "Tóm tắt")]
        public string? Summary { get; set; }
        [Display(Name = "Nội dung")]
        public string? Content { get; set; }
        public string? Banner { get; set; }
        [Display(Name = "Tác giả")]
        public string? Author { get; set; }
        [Display(Name = "Ngày đăng")]
        public DateTime? DatePosted { get; set; }
        public int? Category_ID { get; set; }

    }
}
