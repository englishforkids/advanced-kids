# Lesson 25 — промпти для реалістичних кадрів (необов’язково)

Урок уже працює з поточними фото. Ці кадри потрібні лише тоді, коли захочете замінити
«зібрані» сцени (герої-кружечки поверх фону) на повноцінні фото, як в уроці 24.

**Формат:** 2048 × 768 (8:3), без тексту й підписів на зображенні.
**Щоб герої були ті самі:** додайте до генератора фото з `img/cast/` як референси
(ethan.webp, mia.webp, leo.webp, sophie.webp).

Спільний опис героїв (вставляйте в кожен промпт):
> Ethan (15): wavy brown hair, grey-blue hoodie, backpack, shy friendly smile.
> Mia (16): dark curly hair in a messy bun, lavender sweatshirt, light jeans, energetic.
> Leo (16): tousled brown hair, blue hoodie, cheeky grin.
> Sophie (15): long wavy light-brown hair, burgundy jacket over a cream top, thoughtful.
> Realistic cinematic photo, natural poses, full or half bodies, modern casual clothes, warm cinematic light, 35mm, shallow depth of field, no text.

| Ключ у `SCENE_PHOTOS` | Файл | Промпт |
|---|---|---|
| `friday` | `img/scenes/friday.webp` | Friday afternoon at an outdoor skatepark at golden hour. Ethan, Mia and Leo sit on the edge of a ramp, laughing and looking at Mia’s phone, planning a hangout. Sophie is NOT in the picture. |
| `sophie-alone` | `img/scenes/sophie-alone.webp` | Early evening, city rooftop / quiet street bench with string lights. Sophie sits alone, looking at her phone, a little sad and unsure. Cool blue dusk light, soft bokeh. |
| `together` | `img/scenes/together.webp` | Skatepark at sunset. Ethan, Mia, Leo and Sophie stand together talking and smiling again, relaxed body language, Sophie in the middle of the group. |
| `final` | `img/scenes/final.webp` | Saturday afternoon in a cozy creative space: paint, canvases, board games, snacks, string lights. All four friends — Ethan, Mia, Leo, Sophie — painting and laughing together. Warm, happy, natural. |

Після генерації: файл → `img/scenes/`, у `LESSON_CONFIG.SCENE_PHOTOS` допишіть рядок,
наприклад `'together' : 'img/scenes/together.webp',` — і сцена автоматично стане фото
(кружечки героїв тоді не накладаються).
