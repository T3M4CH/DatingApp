using Microsoft.AspNetCore.Identity;
using static System.String;

namespace API.Entities;

public class AppUser : IdentityUser<int>
{
    public DateTime DateOfBirth { get; set; }
    public string KnownAs { get; set; } = Empty;
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime LastActive { get; set; } = DateTime.Now;
    public string Gender { get; set; } = Empty;
    public string LookingFor { get; set; } = Empty;
    public string Interests { get; set; } = Empty;
    public string City { get; set; } = Empty;
    public string Country { get; set; } = Empty;
    public ICollection<Photo> Photos { get; set; }
    public ICollection<UserLike> LikedByUsers { get; set; }
    public ICollection<UserLike> LikedUsers { get; set; }
    public ICollection<Message> MessagesSent { get; set; }
    public ICollection<Message> MessageReceived { get; set; }
    public ICollection<AppUserRole> UserRoles { get; set; }
}