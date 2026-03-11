using CrownControl.Api.Data;
using CrownControl.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrownControl.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DecksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CreateDeck([FromBody] DeckCreateDto request)
        {
            // 1. Enforce the Clash Royale rule: Exactly 8 cards!
            if (request.CardIds.Count != 8)
            {
                return BadRequest("A valid Clash Royale deck must contain exactly 8 cards.");
            }

            // 2. Fetch those 8 specific cards from the database
            var cards = await _context.Cards
                .Where(c => request.CardIds.Contains(c.Id))
                .ToListAsync();

            // Make sure all 8 cards actually exist in the DB
            if (cards.Count != 8)
            {
                return BadRequest("One or more Card IDs provided do not exist in the database.");
            }

            // 3. Calculate the Average Elixir Cost
            decimal averageElixir = (decimal)cards.Average(c => c.ElixirCost);

            // 4. Create the new Deck object
            var newDeck = new Deck
            {
                DeckName = request.DeckName,
                AverageElixir = Math.Round(averageElixir, 1) // Round to 1 decimal place like the game
            };

            // Save the deck to generate its ID
            _context.Decks.Add(newDeck);
            await _context.SaveChangesAsync();

            // 5. Build the Bridge: Link the 8 cards to this new deck in the DeckCards table
            foreach (var card in cards)
            {
                _context.DeckCards.Add(new DeckCard
                {
                    DeckId = newDeck.Id,
                    CardId = card.Id
                });
            }
            
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Deck created successfully!", DeckId = newDeck.Id, AverageElixir = newDeck.AverageElixir });
        }
    }
}