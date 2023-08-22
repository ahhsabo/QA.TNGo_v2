using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace QA.SportStore.Models
{
    public class Category
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Url { get; set; }

    }
}
