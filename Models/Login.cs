﻿using System.ComponentModel.DataAnnotations;

namespace QA.SportStore.Models
{
    public class Login
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public string? Email { get; set; }
        public string? ConfirmEmail { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
