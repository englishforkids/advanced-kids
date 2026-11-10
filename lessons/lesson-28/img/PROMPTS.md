# Lesson 28 — промпти для реалістичних кадрів (необов’язково)

Урок уже працює: студія й пульт — реалістичні фото з бібліотеки курсу, Сем і Олівер — кружечки-фото
поверх фото коридору й подвір’я. Ці кадри потрібні лише тоді, коли захочете повноцінні сцени з усіма героями.

**Формат:** 2048 × 768 (8:3), без тексту, підписів і логотипів.
**Щоб герої були ті самі:** додайте до генератора фото з `img/cast/` як референси.

Спільний опис героїв (вставляйте в кожен промпт, де вони є):
> Maya (16): dark shoulder-length hair, casual cardigan, big headphones around her neck, warm and empathetic.
> Leo (16): curly brown hair, navy hoodie, friendly and expressive.
> Sam (15): short curly black hair, green hoodie, sensitive, a bit guarded.
> Oliver (15): wavy brown hair, grey hoodie, friendly but regretful.
> Realistic cinematic photo of real teenagers, natural proportions and hands, complete bodies in wide shots, soft warm studio lighting with restrained purple and amber accents, 35mm, shallow depth of field, no text.

| Ключ у `SCENE_PHOTOS` | Файл | Промпт |
|---|---|---|
| `studio` (заміна) | `img/scenes/studio.webp` | A modern teen podcast studio at night: Maya and Leo sit at a desk with two microphones on arms, wearing headphones; acoustic panels, warm lamp, purple accent light, a red ON AIR light on the wall (no readable text), city lights through the window. |
| `console` (заміна) | `img/scenes/console.webp` | Close-up of a podcast mixing desk and one microphone under a single warm spotlight, purple background glow, headphones on the desk. |
| `corridor` | `img/scenes/corridor-sam-oliver.webp` | A school corridor with lockers, late afternoon. Sam stands on the left, arms crossed, looking away; Oliver on the right holds his phone, looking worried and sorry. A few metres between them. Cool light with a little amber. |
| `courtyard` | `img/scenes/courtyard.webp` | School courtyard at golden hour. Sam and Oliver stand a little apart, both looking at their phones, unsure. Calm, hopeful mood. |
| `ending-A` | `img/scenes/ending-a.webp` | The next day, school courtyard at sunset. Sam and Oliver sit on a bench and talk calmly face to face; Sam is listening, Oliver is explaining. Warm, honest, not overly happy. |
| `ending-B` | `img/scenes/ending-b.webp` | School courtyard at sunset. Sam walks away slowly with a small calm nod; Oliver stays by the bench and gives a small understanding wave. Respectful distance, hopeful. |

Після генерації: файл → `img/scenes/`, у `LESSON_CONFIG.SCENE_PHOTOS` допишіть рядок, наприклад
`'corridor' : 'img/scenes/corridor-sam-oliver.webp',` — і сцена автоматично стане цим фото (кружечки героїв тоді не накладаються).
