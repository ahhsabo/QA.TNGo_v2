using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class FAQ
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public int? Order { get; set; }
        public int? ParentId { get; set; }
        public string? Content { get; set; }

    }
}
