# Lesson 15 — If Only I Had Known… (Mixed Conditionals)

Mia finds an old post and "the timeline breaks". Students fix it, and the meter
**TIMELINE RESTORED** fills up: 15% → 35% → 65% → 100%.

```
lessons/lesson-15/
├── lesson-15.html   the whole lesson (one file, vanilla JS)
├── img/mia.webp     Mia's photo (used everywhere Mia appears)
├── img/leo.webp     Leo's photo (used everywhere Leo appears)
├── img/old-post.webp  Mia's old #DanceChallenge post in the chat
├── img/feed/post-1…5.webp  the 5 posts in Mia's Feed (Leo's post uses his photo)
└── img/cover.webp   hub card cover
```

## Characters

The start screen shows the cast: **Mia**, **Leo**, **You** (the timeline team) and the
breakout-room characters. Mia's and Leo's photos appear in the chats, the listening
player (the speaker lights up), the grammar timelines and every example about them.
To change a photo, replace `img/mia.webp` or `img/leo.webp` (square, 320×320).

All help lines for students are in simple English. Only the Teacher Mode notes are in Ukrainian.

## Route (≈ 37 min full / ≈ 33 min core)

| # | Scene | min |
|---|-------|-----|
| 1 | Mia's message → THE TIMELINE IS BROKEN | 2 |
| 2 | Warm-up: 1 question + YES / MAYBE / NO poll | 2 |
| 3 | Mia's Feed — match 5 posts to expressions | 2 |
| 3 | Mia's notes — 5 gaps · **optional** | 2 |
| 4 | Listening (script + 3 questions) → the first clue | 5 |
| 5 | Grammar discovery: sentence A and B, step by step | 3 |
| 6 | Mixed Conditionals (idea · Past → Now · Now → Past) + Super simple rule | 4 |
| 6 | Fix the timeline — 3 questions · **optional** | 2 |
| 7 | What if…? — 4 questions + RANDOM QUESTION | 3 |
| 8 | Breakout mission → teams + 5:00 timer → presentations | 9 |
| 9 | Final story → final challenge → Mission complete | 3 |

The ⏱ **Full / Core** button (or Teacher Mode) hides both optional scenes.

## Teacher controls

- **🧑‍🏫 Teacher** (key `T`) — steps, what to say, answers, the route,
  Reveal answer / Show example / Reset scene / Skip optional / Next scene.
- Keys: `→` / Space next · `←` back · `R` reveal · `E` example · `M` map · `F` full screen.
- Answers stay hidden until you reveal them. Nothing moves on by itself.
- Everything is saved in the browser — refreshing the page keeps your place.
- **Teams**: 3 by default, "+ Add team" gives Kate and Dan (up to 5).
  "📋 Copy tasks for Zoom chat" copies the mission + all characters for the breakout rooms.
  The timer keeps running when you change screens (⏱ chip in the top bar).

## Audio

Without a file, the dialogue is read by two browser voices (female for Mia,
male for Leo). For a real recording put `audio/what-happened.mp3` in this folder and
set `AUDIO_FILE : 'audio/what-happened.mp3'` at the top of `lesson-15.html`.

## Live Student Mode (optional)

📡 **Live** → Start live room → students scan the QR / open the link
(`lesson-15.html?room=1234&role=student`). Same Supabase project as Lessons 5, 13, 14,
no tables needed (Realtime broadcast). On their phones students:
vote in the poll and quizzes (counts appear on your screen), send emoji during speaking,
fill in the breakout form (it appears on the team card in Presentations), and send
endings for the final challenge (you choose which to Show).

## Upload to GitHub

1. Repo `advanced-kids` → **Add file → Upload files**.
2. Drag in `index.html` and the `lessons` folder from this archive → **Commit changes**.
3. Open `https://englishforkids.github.io/advanced-kids/` with **Ctrl+Shift+R** —
   Lesson 15 is the first card.
