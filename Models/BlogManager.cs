using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class BlogManager
    {
   
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Summary { get; set; }
        public string? Content { get; set; }
        public string? Banner { get; set; }
        public string? Author { get; set; }
        public DateTime? DatePosted { get; set; }
        public int? Category_ID { get; set; }

    }
}
