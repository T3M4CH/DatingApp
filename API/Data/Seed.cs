using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext dataContext)
    {
        if (await dataContext.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        Console.WriteLine(File.Exists("Data/UserSeedData.json"));
        List<AppUser?>? users = JsonSerializer.Deserialize<List<AppUser>>(userData);
        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmac.Key;

            dataContext.Users.Add(user);
        }

        await dataContext.SaveChangesAsync();
    } 
}