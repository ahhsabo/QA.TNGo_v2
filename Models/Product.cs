using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace QA.SportStore.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public int? CategoryID { get; set; }
        public string? Type { get; set; }
        public int? Quantity { get; set; }
        public string? Price { get; set; }
        public string? Description { get; set; }
        public string? Images { get; set; }
        public string? Sizes { get; set; }
        public string? Content { get; set; }

    }
}
