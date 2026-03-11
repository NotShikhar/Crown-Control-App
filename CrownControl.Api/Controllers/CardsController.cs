using CrownControl.Api.Data;
using CrownControl.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrownControl.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // This injects your SQLite database into the controller
        public CardsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cards (Fetches all cards for the React frontend)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards()
        {
            return await _context.Cards.ToListAsync();
        }

        // POST: api/cards (Allows you to add new cards to the database)
        [HttpPost]
        public async Task<ActionResult<Card>> AddCard(Card card)
        {
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCards), new { id = card.Id }, card);
        }
    }
}