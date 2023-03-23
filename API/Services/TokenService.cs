﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService : ITokenService
{
    public TokenService(IConfiguration configuration, UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
    }

    private readonly SymmetricSecurityKey _key;
    private readonly UserManager<AppUser> _userManager;
    
    public async Task<string> CreateToken(AppUser appUser)
    {
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.NameId, appUser.Id.ToString()),
            new (JwtRegisteredClaimNames.UniqueName, appUser.UserName),
        };

        var roles = await _userManager.GetRolesAsync(appUser);
        
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}