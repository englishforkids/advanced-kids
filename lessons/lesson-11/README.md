# Lesson 11 — The Perfect Post 📸

Unit 2 · **лексичний урок «Filters & FOMO»**: 12 виразів, без окремої граматики · основний урок 25–30 хв + Game Zone.

Софі не змогла прийти на вечірку. Зранку вона бачить «ідеальне» фото Мії — *Best night ever! ✨🔥 You had to be there!* — і відчуває FOMO. Вона гортає стрічку, порівнює себе з іншими… А потім Джейк пише їй правду: 50 фото, безкінечне редагування, втомлені друзі — і найкращий момент вечора, коли всі відклали телефони. Учні розплутують непорозуміння, вирішують, що робити Софі, і допомагають героям поговорити чесно.
Головне питання: **Can one perfect photo tell a completely wrong story?** Висновок: **What you see online isn’t always the full story.**

```
lessons/lesson-11/
├── lesson-11.html        увесь урок (один файл, vanilla JS, без збірки — рушій уроків 23–24)
├── img/cast/             mia · mia-sad · sophie (ті самі фото, що й в інших уроках курсу)
├── img/scenes/           post-perfect (допис Мії) · post-raw (те саме фото «без фільтра»)
├── img/feed/             картинки для стрічки Софі, Spot the difference і карток breakout
├── img/bg/               фони сторінки: glow (титул) · night (допис) · dusk (сцена 3) · afternoon (сцена 6)
└── img/cover.webp        обкладинка картки на платформі
```

## Налаштування (`LESSON_CONFIG` на початку файлу)

| Поле | Що змінює |
|---|---|
| `PHOTOS` | фото героїв. **У Джейка поки немає фото** — показується аватар із літерою «J». Додайте `img/cast/jake.webp` і впишіть `jake:'img/cast/jake.webp'` |
| `POST` / `POST_RAW` | «ідеальне» фото з допису Мії і те саме фото без фільтра (сюжетний поворот) |
| `CANDID` | (необов’язково) справжній «звичайний» кадр вечора — з’явиться в сюжетному повороті замість `POST_RAW` |
| `REALITY` | (необов’язково) теплий кадр Софі, Мії й Джейка без телефонів для сцени 6 (8:3). Порожньо → фон даху + аватари героїв |
| `FEED` | картинки стрічки та карток breakout |
| `STUDENTS` | імена учнів за замовчуванням (на першому екрані їх теж можна змінити) |
| `ROUNDS` | R у формулі N × R: лексика, читання, мовлення (за замовчуванням 1) |
| `ALIAS_URL` / `KAHOOT_URL` | гра Alias / ваш Kahoot (посилання можна вписати й у Game Zone) |
| `SUPABASE_URL / KEY` | той самий проєкт, що й в інших уроках; лише Realtime, таблиці не потрібні |

## 6 сцен (≈30 хв)

| Сцена | Що відбувається | хв |
|---|---|---|
| 0 · Welcome | кількість присутніх (за замовчуванням 5), імена, раунди, режим Presentation / Live | — |
| 1 · The Photo | титул і головне питання → «This morning…» (читає учень) → допис @mia.daily + 3 питання по одному → реакція Софі → слово **FOMO** (значення, приклад, CCQ) | 3 |
| 2 · The Endless Scroll | стрічка Софі: 3 групи по 4 вирази (The Scroll · The Perfect Image · The Posting Problem). Кожен допис — ситуація: Situation → Guess → Meaning → Example → CCQ. Потім **WHAT’S HAPPENING?** (N × R, 24 ситуації в банку, 🔤 варіанти-опора). Бонус **Spot the difference** (у Quick Mode пропускається) | 7 |
| 3 · Behind the Perfect Photo | чат Джейка у 3 частинах. Текст ділиться на **стільки уривків, скільки учнів** (мінімум 3, максимум 11; 5 учнів → 2+2+1) — кожен читає свій. Після кожної частини — quick check. Потім **READING CHECK** (N × R з 14 питань: short answer, true/false, find the evidence, explain why, predict). Сюжетний поворот: фото 37 без фільтра + «плівка» з 50 спроб | 5 |
| 4 · The Message | «Should I just ignore her?» → обговорення → голосування A/B/C (без «правильної» відповіді) → наслідки кожного вибору (вкладки) → чесна розмова Софі й Мії (ролі читають учні) → **YOUR TURN TO TALK** (N × R, 5 питань з плану + 5 рівноцінних) | 5 |
| 5 · The Reality Challenge | місія «Perfect Post vs Reality»: 5 інструкцій, 5 карток-ситуацій, приклад (сховано). Solo / Pairs / Teams (5 → кімнати 3 + 2), ролі, таймер 3:00 → презентації 4:00: хто читає ідеальний підпис / розповідає реальність, тапайте використані слова, чек-лист, питання класу | 7 |
| 6 · The Reality Check | друзі без телефонів → рефлексія (одне питання на учня) → **Word of the Day** (голоси з телефонів або вручну) → фінальні репліки, цитата, конфеті → Enter Game Zone | 3 |
| 🎮 Game Zone | Alias (нова вкладка) · **Vocabulary Cheat Sheet** (12 рядків на одному екрані 1920×1080: Hide/Show meanings, Hide/Show examples, підсвітка рядків, Reset highlights, Full screen, Return) · **Kahoot review** (10 питань: грати тут або 📋 скопіювати в Kahoot) | після уроку |

## Smart task distribution

- Обов’язкові завдання = **присутні учні × раунди** у блоках: лексика, читання (питання), мовлення, рефлексія. 5 учнів, R = 1 → по 5; R = 2 → по 10.
- Наступне завдання отримує учень із найменшою кількістю відповідей у цьому блоці, потім — за весь урок; складність вирівнюється.
- Читання вголос рахується окремо: чат Джейка ділиться на N логічних уривків (не менше одного на частину), кожному учню — свій.
- **👥 Class** (або перший екран) — будь-коли: додати учня, що запізнився, перейменувати, позначити відсутнім, прибрати. Виконані відповіді не стираються; перераховуються лише ті, що лишились («Target adjusted to…»).
- Панель **WHO’S NEXT?**: ✓ Mark completed, 🤝 With help, ↷ Next student, ⤼ Skip (черга учня зберігається), 🔀 Other task, ↶ Undo, + Optional extra (не рахується).

## Як провести

1. Відкрийте урок з платформи → перший екран: кількість учнів, імена, раунди → START LESSON.
2. Для Zoom: **📺 Focus** (F) або **🖥 Audience** — окреме чисте вікно, яким ви ділитесь, а собі лишаєте **🧑‍🏫 Notes** (W): нотатки українською, відповіді, CCQ / ICQ, переклад, розподіл завдань, таймери.
3. Клавіші: → / пробіл — далі, ← — назад, **R** — відповідь, **H** — сховати, **I** — підказка, **D** — завдання виконано, N — сцени, C — клас, G — Game Zone.
4. **⚡ Quick** ховає бонус і необов’язкові follow-up; жодне обов’язкове завдання учня не зникає.
5. Усе зберігається в браузері: перезавантаження сторінки нічого не скидає. Повне скидання — 🗺 Scenes → Restart.

## Live (телефони учнів, необов’язково)

📡 Live → код кімнати, посилання, QR. Учні вводять те саме ім’я, що у вашому списку. На телефоні: чия черга й завдання, голосування (Sophie’s decision, Word of the Day, Kahoot), своя кімната, роль і вибір ситуації для breakout, емоджі-реакції під час презентацій. **Один голос на учня** — змінити можна лише, якщо ви ввімкнете «allow vote changes». Після перепідключення учень бачить, що його голос зараховано. Повідомлення вчителя підписані ключем, тож учень не може перемикати сцени чи відкривати відповіді. Якщо Supabase недоступний, сторінка чесно пише «LOCAL DEMO — this browser only». Без Live урок повністю працює на спільному екрані.

## Фото: що можна замінити

Фото Мії й Софі — ті самі, що й в інших уроках курсу. Допис Мії зроблено з кадру даху (урок 23), «без фільтра» — та сама світлина, оброблена «як з камери». Якщо згенеруєте нові кадри, покладіть їх у `img/` і впишіть у `LESSON_CONFIG`:

- **jake.webp** (квадрат): *Realistic photo portrait of Jake, a relaxed and honest 16-year-old boy, short messy dark-blond hair, grey hoodie, friendly half-smile, evening rooftop with warm string lights softly blurred behind, cinematic teen-drama look, natural skin.*
- **CANDID** (≈5:4): *Candid, unedited phone photo on a city rooftop at night: three teenagers (a girl with a dark messy bun in a lilac sweater and two boys) look tired and slightly bored, one checks his phone, another yawns, flat light, a little blurry, pizza boxes, not humiliating, realistic.*
- **REALITY** (8:3): *Warm golden-hour photo on a rooftop: Sophie (long wavy light-brown hair), Mia (dark hair in a messy bun, lilac sweater) and Jake laughing together, phones face-down in a basket, string lights, city sunset, cinematic, natural.*
