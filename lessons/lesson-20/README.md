# Lesson 20 — Escape the Algorithm (Unit 2 Revision, Lessons 11–19)

Мія та Лео тестують новий застосунок **The Perfect Feed** — і штучний інтелект **ALGORITHM.exe** замикає їх усередині.
Учні — **Digital Rescue Team**: проходять 5 місій, кожна дає ключ і **+20% до Escape Progress**. Після п’ятої місії відкривається портал.

```
lessons/lesson-20/
├── lesson-20.html        увесь урок (один файл, vanilla JS, без збірки)
├── img/mia.webp          Мія   (те саме фото, що в уроках 15–19)
├── img/leo.webp          Лео
├── img/feed/*.webp       фото для стрічки The Perfect Feed
└── img/cover.webp        обкладинка картки на платформі
```

Свої фото героїв: покладіть файл у `img/` і змініть `PHOTOS` у `LESSON_CONFIG` на початку файлу.
ALGORITHM.exe, портал, часові лінії, монітори й ключі намальовані в коді (CSS/SVG) — окремих картинок не потрібно.

## 7 етапів (Core ≈ 52 хв · Full ≈ 55 хв, разом з Alias 12 хв і переходами)

| # | Етап | Що відбувається | хв |
|---|---|---|---|
| 1 | 📱 The Perfect Feed | титул (Start Adventure · Teacher Mode · How to Play) → фейковий застосунок (фото, лайки, тренди, рекомендації) → ENTER → глітч → ALGORITHM.exe (typing) → warm-up 2 питання з голосуванням | 5 |
| 2 | 🧠 M1 Memory Vault | 12 «плаваючих» карток → 4 ситуації (миттєвий фідбек, try again) → **Memory Archive** (36 виразів) → **Alias** (кнопка відкриває гру в новій вкладці) → MEMORY RESTORED + Memory Key | 16 |
| 3 | 🛠️ M2 Fix the System | Control Room → 4 картки causatives → Repair the Records (4) → *speaking (opt)* → SYSTEM RECORDS REPAIRED | 5–6 |
| 4 | 💬 M3 Secret Messages | The Lost Chat (7 повідомлень «розшифровуються») → 3 питання → *speaking (opt)* → backshift + 7 reporting verbs → 4 завдання → SECRET MESSAGE DECODED | 7–8 |
| 5 | ⏳ M4 Rewrite Reality | Timeline Lab (тип A / тип B зі «стрілками часу») → 4 завдання → *speaking (opt)* → TIMELINE RESTORED | 5–6 |
| 6 | 🛡️ M5 Survival Guide | остання пропозиція алгоритму → інструкція → breakout rooms: форма з 3 правилами, таймер 5:00 → презентації 45–60 с → GUIDE COMPLETE | 10.5 |
| 7 | 🔓 The Final Escape | портал (відкривається лише з 5 ключами) → фінальні репліки → EXIT UNLOCKED + конфеті → підсумок і рефлексія | 2.5 |

## Перехідні слайди (6 штук, на весь екран)

Окремі ефектні екрани-«трейлери» між етапами — наявні екрани не змінюються. Клік по слайду або Continue — далі.
Вимкнути всі переходи: **Teacher → Transition slides**. Тексти й порядок — масив `SLIDES` у кінці розділу кроків.

| Файл картинки (`img/slides/`) | Перед екраном | Заголовок |
|---|---|---|
| `00-lesson-20.webp` | перший екран уроку | 🎮 LESSON 20 · Escape the Algorithm |
| `02-memory-vault.webp` | The Memory Vault | MISSION 1 · The Memory Vault |
| `03-fix-the-system.webp` | The Control Room | MISSION 2 · Fix the System |
| `04-secret-messages.webp` | Encrypted Chat | MISSION 3 · The Secret Messages |
| `05-rewrite-reality.webp` | The Timeline Lab | MISSION 4 · Rewrite Reality |
| `07-the-exit.webp` | The Final Escape | 🚪 FINALE · The Final Escape |

Квадратні картинки показуються цілком праворуч у рамці з розмитим фоном; широкі (як стартова) — на весь слайд. Якщо файл картинки зникне, слайд покаже намальований фон.
Щоб додати новий перехід — допишіть рядок у `SLIDES` (поле `before` — id екрана, перед яким він стоїть).

## Як провести урок

1. Відкрийте урок із платформи, увімкніть **📺** (презентаційний режим) і поділіться екраном у Zoom.
2. **Continue** (→ / пробіл) — далі, **Back** (←) — назад. Нічого не перемикається саме, таймер теж лише сигналить.
3. Вікторини: учень називає відповідь, ви натискаєте. Неправильно → «Try again». **Reveal answer** (A) — показати відповідь.
4. Якщо завдання не завершене, Continue один раз попереджає «🔒 … press Continue again» — щоб випадково не перескочити. Друге натискання — ви йдете далі.
5. **🗺️ Missions** (M) — мапа місій зі станами Locked / Available / In progress / Completed. Заблоковану місію можна відкрити кнопкою «Open anyway (teacher)».
6. **📚 Archive** (V) — Memory Archive з будь-якого екрана (пошук англ./укр., категорії, приклади, деталі). Прогрес не втрачається — зручно під час Alias.
7. **🧑‍🏫 Teacher** (T) — панель: що сказати, відповіді, пояснення українською, follow-up питання, типові помилки, таймер із рекомендованим часом, позначити місію виконаною, «Next mission», «Final mission», «Final escape», Core route (сховати необовʼязкові speaking), вимкнути анімації/звуки, Reset.
8. Мало часу: 🧭 Core route, «⏭ Skip optional», або в панелі вчителя — «🛡️ Final mission» / «🔓 Final escape».

## Live-режим (необовʼязковий)

**📡 Live → Start live room** — код, посилання і QR. Учні входять з ніком і емодзі-аватаром (без акаунтів і персональних даних).
На телефонах: голосування, усі вікторини, короткі відповіді (ви показуєте їх на екрані кнопкою Show), спільна форма Survival Guide своєї команди, реакції під час презентацій.

Захист: кожне повідомлення вчителя **підписане** (ECDSA, приватний ключ лишається у вашому браузері). Посилання/QR містить відбиток ключа;
хто вводить код вручну, вводить ще 6-символьний **Teacher key** з екрана. Телефони приймають стан лише з правильним підписом — кнопка «Teacher» на чужому пристрої не дає керувати кімнатою.
Правильні відповіді приходять на телефони тільки після того, як ви відкрили їх на головному екрані.

Supabase — той самий проєкт, що в уроках 5, 13–19 (лише Realtime). Без нього урок повністю працює в режимі **Teacher-led** через демонстрацію екрана.
