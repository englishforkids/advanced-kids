# Lesson 26 — промпти для кадрів

Усі 8 сцен уже замінено реалістичними фото (`img/scenes/`). Ці промпти — якщо захочете перегенерувати якусь сцену.

**Формат:** 2048 × 768 (8:3), без тексту, написів і логотипів на зображенні.
**Щоб герої були ті самі:** додайте до генератора фото з `img/cast/` як референси
(leo.webp, sam.webp, mia.webp, maya.webp).

Спільний опис (вставляйте в кожен промпт):
> Leo (17): tousled brown hair, blue hoodie or dark stage jacket, warm confident smile — the lead singer.
> Sam (16): short curly black hair, green hoodie, crew lanyard, shy — a volunteer who is secretly an amazing guitarist.
> Mia (16): dark curly hair in a messy bun, dancer outfit.
> Maya (19): long wavy brown hair, black crew T-shirt, headset — the festival organizer.
> Cinematic photorealism, realistic teenagers with natural proportions, complete bodies when visible, natural poses,
> dark navy and charcoal tones, electric purple and blue concert lighting, warm amber highlights, light haze, 35mm, no text.

| Ключ у `SCENE_PHOTOS` | Файл | Промпт |
|---|---|---|
| `entrance` | `img/scenes/entrance.webp` | Backstage entrance of a big city music festival at night: a black curtain opening to the glowing stage, road cases, cables, purple and blue moving-head lights in haze. No people. |
| `console` | `img/scenes/console.webp` | Professional sound mixing station backstage: large mixing console with glowing faders and meters, headphones, microphones, monitors with waveforms, stage lights blurred in the background. No people. |
| `dressing` | `img/scenes/dressing.webp` | Empty backstage dressing room: mirror with warm bulbs, a handheld microphone lying on the table next to a switched-off phone, an empty chair, purple concert light from the hallway through the open door. No people. |
| `hallway` | `img/scenes/hallway.webp` | Long backstage hallway with cables on the floor, flight cases, posters, purple stage light at the far end. Mia (dancer) stands in the foreground, thoughtful, remembering something. |
| `rdoor` | `img/scenes/rdoor.webp` | Door of a small rehearsal room backstage with warm light through the small window. Sam stands next to the door, nervous, hands in his hoodie pocket, crew lanyard. |
| `duo` | `img/scenes/duo.webp` | Small rehearsal room with acoustic foam, warm lamp and string lights. Leo sits next to Sam; Sam holds an acoustic guitar and plays, Leo listens and smiles. Both full bodies, natural poses. |
| `crew` | `img/scenes/crew.webp` | Backstage crew preparing for the performance: black drapes, ladders, crew members carrying cases, Maya with a headset and a clipboard, stage glowing behind them. |
| `stage` | `img/scenes/stage.webp` | Final concert stage from the audience: huge LED screen, truss, crossing purple and blue spotlights, happy crowd with raised hands and phone lights. Leo sings at the microphone and Sam plays guitar next to him. |

Після генерації: файл → `img/scenes/`, у `LESSON_CONFIG.SCENE_PHOTOS` допишіть рядок,
наприклад `'stage' : 'img/scenes/stage.webp',` — і сцена автоматично стане фото
(кружечки героїв на ній тоді не накладаються).

⚠️ `stage` використовується у всіх трьох фіналах. Фото, де Лео й Сем грають разом, пасує до фіналів A і C;
для фіналу B (Лео співає сам) краще залишити намальовану сцену.
