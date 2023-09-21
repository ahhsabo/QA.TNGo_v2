using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web;
using System.Collections.Generic;

namespace QA.TNGo_v2.Models
{
    public class ImageGallery
    {
        public IEnumerable<string> imageList { get; set; }
    }
}