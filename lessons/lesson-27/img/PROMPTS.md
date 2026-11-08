# Lesson 27 — промпти для реалістичних кадрів (необов’язково)

Урок уже працює: сцени намальовані кодом, герої — фото-аватари. Ці кадри потрібні лише тоді,
коли захочете замінити намальовані сцени повноцінними кінематографічними фото.

**Формат:** 2048 × 768 (8:3, кадр обрізається з 16:9 без втрат), без тексту, підписів і логотипів.
**Щоб герої були ті самі:** додайте до генератора фото з `img/cast/` як референси.

Спільний опис героїв (вставляйте в кожен промпт, де вони є):
> Maya (15): brown shoulder-length hair, blue denim jacket, confident, expressive face.
> Ethan (15): dark hair, green hoodie, calm friendly expression.
> Leo (16): short slightly wavy light-brown hair, black sweatshirt, expressive but a bit uncertain.
> Sofia (15): long dark curly hair, beige sweater, calm and observant.
> Realistic cinematic photo of real teenagers aged 15–16, natural proportions and hands, natural poses, modern school clothes, soft cinematic light, 35mm, shallow depth of field, no text.

| Ключ у `SCENE_PHOTOS` | Файл | Промпт |
|---|---|---|
| `bigday` | `img/scenes/bigday.webp` | A bright modern classroom in the morning. The four teenagers stand at the front next to a projector screen with a colourful project slide, getting ready to present; classmates’ heads blurred in the foreground. |
| `moment` | `img/scenes/moment.webp` | Same classroom, end of the presentation. Leo in the centre smiling proudly; Maya on the left looking at him, annoyed, whispering; Ethan glancing at Maya worriedly; Sofia quiet on the right. |
| `aftermath` | `img/scenes/aftermath.webp` | School corridor with lockers, late morning. Maya typing angrily on her phone in the foreground; Ethan and Sofia behind her looking at their phones; Leo walking away at the far end. Tense mood, cool light with a little amber. |
| `voice-maya` | `img/scenes/voice-maya.webp` | Evening, Maya alone in her bedroom by a window, recording a voice message on her phone, upset but calm. Cool blue light, city lights outside. |
| `voice-leo` | `img/scenes/voice-leo.webp` | Evening, Leo sitting on a hospital corridor bench (or at home in his room), recording a voice message, nervous and regretful. Warm dim light. |
| `library` | `img/scenes/library.webp` | A school library at 3:30 PM, warm afternoon light through a big window. The four friends sit around a wooden table with laptops and books, serious but calm, Ethan in the middle. |
| `final` | `img/scenes/final.webp` | After school, golden hour outside the school building. The four friends walk out together, relaxed; Maya slightly apart, but smiling a little. Hopeful, warm. |
| `ending-A` | `img/scenes/ending-a.webp` | Two weeks later: the four friends laughing together on school steps, close again. Warm sunset. |
| `ending-B` | `img/scenes/ending-b.webp` | A month later: the group sits together at a café table; Leo a little to the side, carefully listening. Friendly but not perfect. |
| `ending-C` | `img/scenes/ending-c.webp` | Next term: two different project groups at separate classroom tables; Maya and Sofia at one, Ethan and Leo at another, they nod to each other respectfully. |

Після генерації: файл → `img/scenes/`, у `LESSON_CONFIG.SCENE_PHOTOS` допишіть рядок, наприклад
`'library' : 'img/scenes/library.webp',` — і сцена автоматично стане фото (кружечки героїв тоді не накладаються).
