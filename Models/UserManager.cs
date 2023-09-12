using System.ComponentModel.DataAnnotations;

namespace QA.TNGo_v2.Models
{
    public class UserManager
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Description { get; set; }
        public string? UserName { get; set; }
        public string? PasswordHash { get; set; }
        public string? Avatar { get; set; }
        public string? DisplayName { get; set; }

    }
}
