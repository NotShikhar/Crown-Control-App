namespace CrownControl.Api.Models;

public class Deck
{
    public int Id { get; set; }
    public required string DeckName { get; set; }
    public decimal AverageElixir { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public List<DeckCard> DeckCards { get; set; } = new();
}