# 👑 Crown Control - Clash Royale Deck Builder

A full-stack web application designed for analyzing and building Clash Royale decks. This project demonstrates real-time state management, relational database design, and robust API architecture.

## 🚀 The Tech Stack

This project was built using a modern enterprise stack:

* **Frontend:** React.js (Vite) + Tailwind CSS v4
* **Backend:** ASP.NET Core Web API (C#)
* **Database:** Entity Framework Core (SQLite)
* **Data Fetching:** Axios

## ✨ Key Features

* **Interactive UI:** A highly responsive, drag-and-drop style interface built with modern React patterns and Tailwind CSS.
* **Real-time Math Engine:** Calculates the precise Average Elixir cost dynamically as users add or remove cards from their 8-card deck.
* **Relational Database:** Utilizes EF Core Code-First migrations to manage complex Many-to-Many relationships between `Decks` and `Cards`.
* **RESTful API:** Clean controller architecture handling standard CRUD operations and custom business logic.

## 🛠️ Local Setup

To run this project locally, you will need the [.NET 8 SDK](https://dotnet.microsoft.com/download) and [Node.js](https://nodejs.org/) installed.

### 1. Boot the Backend (API)
```bash
cd CrownControl.Api
dotnet run
