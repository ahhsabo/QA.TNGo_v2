using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Status { get; set; }
        public string? lat { get; set; }
        public string? lng { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }

    }
}
