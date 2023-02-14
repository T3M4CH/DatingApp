using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public sealed class DataContext : DbContext
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
            
    }

    public DbSet<AppUser?> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }

}