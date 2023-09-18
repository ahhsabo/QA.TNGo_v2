using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class Terms
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public int? Order { get; set; }
        public byte? Type { get; set; }
        public string? Content { get; set; }
    }
}
