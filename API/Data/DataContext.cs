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

    public DbSet<AppUser?> Users { get; set; }
}