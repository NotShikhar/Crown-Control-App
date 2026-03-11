using CrownControl.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CrownControl.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // These are your actual database tables
        public DbSet<Card> Cards { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<DeckCard> DeckCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the many-to-many relationship primary keys
            modelBuilder.Entity<DeckCard>()
                .HasKey(dc => new { dc.DeckId, dc.CardId });
        }
    }
}