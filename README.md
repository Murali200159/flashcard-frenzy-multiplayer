# Flashcard Frenzy Multiplayer – SignSetu Assignment

## Project Overview

This is my submission for the SignSetu practical assignment.
I chose the **Flashcard Frenzy Multiplayer** project.

Goal:
Logged-in players view the same flashcard question. The first player to submit the correct answer earns a point, which instantly updates the scoreboard. Each match’s questions and scores are stored for later review.

## Tech Stack

* Next.js – frontend and backend routes
* Supabase – authentication and real-time updates
* MongoDB – storing match history, questions, and scores
* Vercel – deployment

## Live Deployment

Deployed App URL: \[Paste link here]

## Repository

GitHub Repo Link: \[Paste link here]

## Features Implemented

* User authentication with Supabase
* Multiplayer flashcard game with real-time updates
* Instant scoreboard updates when a correct answer is submitted
* Match data (questions and scores) stored in MongoDB
* Fully deployed on Vercel

## Setup and Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/flashcard-frenzy-multiplayer.git
cd flashcard-frenzy-multiplayer
```

Install dependencies:

```bash
npm install
```

Set up environment variables:
Create a `.env.local` file in the project root and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key  
MONGODB_URI=your_mongodb_connection_string  
```

Run the project locally:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)


## Future Improvements

* Add support for private game rooms with invite codes
* Add timer-based questions for faster gameplay
* Improve UI/UX for mobile devices

## Acknowledgments

Thanks to SignSetu for the opportunity.
