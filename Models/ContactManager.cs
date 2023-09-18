using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class ContactManager
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
