using static System.String;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set; } = Empty;
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
}