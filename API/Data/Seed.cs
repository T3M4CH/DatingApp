﻿using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        List<AppUser?>? users = JsonSerializer.Deserialize<List<AppUser>>(userData);
        
        if (users == null) return;
        
        var roles = new List<AppRole>
        {
            new() {Name = "Member"},
            new() {Name = "Admin"},
            new() {Name = "Moderator"}
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }
        
        foreach (var user in users)
        {
            user.UserName = user.UserName.ToLower();

            await userManager.CreateAsync(user, "Passw0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new AppUser
        {
            UserName = "sara"
        };

        await userManager.CreateAsync(admin, "Passw0rd");
        await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
    } 
}