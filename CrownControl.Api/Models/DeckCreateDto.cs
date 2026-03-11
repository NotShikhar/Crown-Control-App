namespace CrownControl.Api.Models
{
    // This is the exact package React will send to our API
    public class DeckCreateDto
    {
        public required string DeckName { get; set; }
        public required List<int> CardIds { get; set; }
    }
}