using API.Extensions;
using static System.String;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set; } = Empty;
    public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
    public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();
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

    // public int GetAge()
    // {
    //     return DateOfBirth.ToAge();
    // }
}