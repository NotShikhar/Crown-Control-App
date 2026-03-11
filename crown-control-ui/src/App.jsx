import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [saveStatus, setSaveStatus] = useState(""); // To show success messages

  // TIP: Ensure this port matches your .NET terminal
  const API_URL = 'http://localhost:5234'; 

  useEffect(() => {
    axios.get(`${API_URL}/api/cards`)
      .then(res => setCards(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const addToDeck = (card) => {
    if (deck.length < 8 && !deck.find(c => c.id === card.id)) {
      setDeck([...deck, card]);
      setSaveStatus(""); // Clear previous success messages
    }
  };

  const removeFromDeck = (id) => {
    setDeck(deck.filter(c => c.id !== id));
    setSaveStatus("");
  };

  const saveDeck = () => {
    if (deck.length !== 8) return;
    if (!deckName) {
      alert("Please enter a name for your deck!");
      return;
    }

    // This perfectly matches the DeckCreateDto we built in C#
    const payload = {
      deckName: deckName,
      cardIds: deck.map(c => c.id)
    };

    axios.post(`${API_URL}/api/decks`, payload)
      .then(res => {
        setSaveStatus(`Success! Deck saved with ID: ${res.data.deckId} and Avg Elixir: ${res.data.averageElixir}`);
        setDeck([]); // Clear the deck
        setDeckName(""); // Clear the name
      })
      .catch(err => {
        console.error("Save Error:", err);
        setSaveStatus("Error saving deck. Check console.");
      });
  };

  const avgElixir = deck.length > 0 
    ? (deck.reduce((sum, c) => sum + c.elixirCost, 0) / deck.length).toFixed(1) 
    : "0.0";

  return (
    <div className="min-h-screen p-8 bg-gray-950 text-white font-sans">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-800 pb-6 gap-6">
        <div>
          <h1 className="text-4xl font-black text-yellow-500 italic uppercase tracking-tighter">Crown Control</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Deck Strategy Interface</p>
        </div>
        
        {/* Save Controls */}
        <div className="flex items-center gap-4 bg-gray-900 p-3 rounded-2xl border border-gray-800 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Name your deck..." 
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-yellow-500 w-full md:w-64"
          />
          <button 
            onClick={saveDeck}
            disabled={deck.length !== 8}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm tracking-wider transition-all whitespace-nowrap"
          >
            Save Deck
          </button>
          <div className="text-right ml-4 pr-2 border-l border-gray-800 pl-4 hidden md:block">
            <p className="text-gray-500 text-[10px] uppercase font-black leading-none mb-1">Avg Elixir</p>
            <p className="text-2xl font-black text-blue-400 tabular-nums">💧 {avgElixir}</p>
          </div>
        </div>
      </header>

      {saveStatus && (
        <div className="bg-green-900/30 border border-green-500 text-green-400 p-4 rounded-xl mb-6 font-bold text-center animate-pulse">
          {saveStatus}
        </div>
      )}

      {/* The 8-Card Deck Slots */}
      <section className="mb-12">
        <h2 className="text-gray-500 mb-4 uppercase text-xs font-black tracking-widest flex justify-between">
          <span>Active Deck ({deck.length}/8)</span>
          <span className="md:hidden text-blue-400">💧 {avgElixir}</span>
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 min-h-[140px] p-6 bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-800">
          {deck.map(card => (
            <div key={card.id} onClick={() => removeFromDeck(card.id)} className="group cursor-pointer hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 rounded-xl shadow-lg shadow-blue-900/20">
                <div className="bg-gray-900 p-3 rounded-[10px] h-full flex flex-col justify-between">
                  <p className="text-center font-black text-[10px] truncate uppercase mb-2">{card.name}</p>
                  <p className="text-center text-blue-400 font-black text-lg">💧{card.elixirCost}</p>
                </div>
              </div>
            </div>
          ))}
          {[...Array(8 - deck.length)].map((_, i) => (
            <div key={i} className="bg-gray-900/30 rounded-xl border border-gray-800/50 min-h-[100px]" />
          ))}
        </div>
      </section>

      {/* Card Collection Grid */}
      <section>
        <h2 className="text-gray-500 mb-4 uppercase text-xs font-black tracking-widest">Card Collection</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {cards.map(card => (
            <button 
              key={card.id} 
              disabled={deck.find(c => c.id === card.id)}
              onClick={() => addToDeck(card)}
              className="relative group bg-gray-900 border border-gray-800 p-4 rounded-2xl hover:border-yellow-500/50 hover:bg-gray-800 transition-all text-left disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed flex flex-col justify-between h-full"
            >
              <span className="absolute top-2 right-2 text-[10px] bg-gray-950 px-2 py-0.5 rounded-full font-bold text-gray-500 uppercase">
                {card.rarity}
              </span>
              <p className="font-black text-lg leading-tight mt-6">{card.name}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-blue-400 font-black">💧 {card.elixirCost}</span>
                <span className="bg-yellow-500 text-gray-950 rounded-full w-6 h-6 flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  +
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App