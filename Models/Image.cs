using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using System.Collections.Generic;

namespace QA.TNGo_v2.Models
{
    public class Image
    {
        public int ImageID { get; set; }
        public string? Tittle { get; set; }
        public string? Path { get; set; }
    }
}