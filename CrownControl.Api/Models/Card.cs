using System.Text.Json.Serialization;

namespace CrownControl.Api.Models
{
    public class Card
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int ElixirCost { get; set; }
        public required string Rarity { get; set; }
        public string? ImageUrl { get; set; }
        
        // This stops Swagger and the API from asking for deck relationships
        // when you are just trying to create or fetch a single card.
        [JsonIgnore]
        public List<DeckCard> DeckCards { get; set; } = new();
    }
}   