# Lesson 12 — промпти для кадрів

Зараз усі сцени намальовані кодом (SVG) з фото героїв у кружечках. Якщо захочете реалістичні кадри — ось промпти.

**Формат:** 2048 × 768 (8:3), без тексту, написів, логотипів і інтерфейсів соцмереж на зображенні.
**Щоб герої були ті самі:** додайте до генератора фото з `img/cast/` як референси (maya.webp, leo.webp, ava.webp).

Спільний опис (вставляйте в кожен промпт):
> Maya (15): dark brown shoulder-length hair, casual oversized sweater, friendly and expressive — creates videos for social media.
> Leo (15): short tousled brown hair, blue hoodie, relaxed and slightly funny — films her videos.
> Ava (15): long dark-blonde hair, modern casual outfit, confident — good at video editing.
> Cinematic photorealism like a modern coming-of-age drama, realistic teenagers aged 14–16 with natural faces, realistic skin and natural proportions, appropriate teenage clothing, no beauty filters, dark navy and charcoal tones with purple and blue accents, warm lamp light, 35mm, no text.

| Ключ у `SCENE_PHOTOS` | Файл | Де в уроці | Промпт |
|---|---|---|---|
| `studio` | `img/scenes/studio.webp` | Story unlocked, обкладинка | Attractive teenage bedroom turned into a small video studio in the evening: ring light, phone on a tripod, fairy lights, a clean white desk with a laptop and a glass of water, plants, city dusk through the window. Maya sits at the desk, Leo stands behind the phone on the tripod, Ava leans on a shelf. |
| `filming` | `img/scenes/filming.webp` | Clue 01 | Maya filming her “perfect after-school reset” at a perfectly clean desk; Leo holds the phone and films her, seen slightly from behind over his shoulder, ring light glowing. |
| `editing` | `img/scenes/editing.webp` | Clue 02, фінал B | Ava editing a video on a laptop in a dark room, her face lit by the screen, timeline and colour sliders visible as abstract light (no readable text), desk lamp, Maya sitting next to her. |
| `takes` | `img/scenes/takes.webp` | Clue 03, твіст, місія, фінал A | Behind the scenes of a failed video shoot: the phone has fallen off the tripod, a glass of water spilled, Leo laughing, Maya covering her face and laughing, Ava pointing at the laptop — funny, natural, not humiliating. |
| `night` | `img/scenes/night.webp` | приватне повідомлення, мовлення | Maya alone in her room at night, sitting on the bed, thoughtful, reading comments on her phone, blue phone light on her face, city lights through the window. |
| `golden` | `img/scenes/golden.webp` | фінал C | Golden-hour afternoon: Maya, Leo and Ava sitting together on a sofa by a big window, laughing and talking, three phones face-down on a small table, warm sunlight, authentic friendship. |

Після генерації: файл → `img/scenes/`, у `LESSON_CONFIG.SCENE_PHOTOS` допишіть рядок, наприклад
`studio : 'img/scenes/studio.webp',` — і сцена автоматично стане фото (кружечки героїв на ній тоді не накладаються).

**ava.webp** (квадрат, якщо захочете замінити фото Ави): *Realistic photo portrait of Ava, a confident 15-year-old girl with long dark-blonde hair, modern casual outfit, warm natural smile, soft blurred bedroom with purple fairy lights behind, cinematic teen-drama look, natural skin, no filters.*
