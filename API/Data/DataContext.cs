﻿using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public sealed class DataContext : IdentityDbContext<AppUser, AppRole, int,
    IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
    IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        //optionsBuilder.UseSqlite()
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

        modelBuilder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();

        modelBuilder.Entity<UserLike>()
            .HasKey(k => new { k.SourceUserId, k.LikeUserId });

        modelBuilder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserLike>()
            .HasOne(s => s.LikedUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.LikeUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.MessageReceived)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
    }

    public DbSet<Group> Groups { get; set; }
    public DbSet<Connection> Connections { get; set; }
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }
}