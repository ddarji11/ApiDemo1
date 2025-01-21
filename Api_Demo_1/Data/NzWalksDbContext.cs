using Api_Demo_1.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace Api_Demo_1.Data
{
    public class NzWalksDbContext:DbContext
    {
        public NzWalksDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        
        {
                
        }

        public DbSet<Region> Regions { get; set; }

        public DbSet<Difficulty> Difficulties { get; set; }

        public DbSet<Walk> Walks { get; set; }


    }
}
