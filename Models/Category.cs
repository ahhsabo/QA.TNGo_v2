﻿using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class Category
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Url { get; set; }
        public string? Thumbnail { get; set; }
    }
}
