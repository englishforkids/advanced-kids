/* ═══════════════════════════════════════════════════════════════
   VOCABULARY — лексика курсу, згрупована за уроками, де її ВПЕРШЕ вчать.

   Один блок = один урок:
     unit, lesson, title  — де слово з'явилося вперше
     practisedIn          — уроки, де лексику практикують (типово наступний урок)
     revisedIn            — уроки повторення
   Ці значення переходять на кожне слово блоку. Якщо в окремого слова
   інше — допишіть йому власне practisedIn / revisedIn.

   Поля слова:
     word        — англійське слово / фраза (обов'язково)
     type        — 'word' | 'phrase' | 'phrasal' | 'idiom' | 'slang'
                   (немає — визначиться само: один токен = word, кілька = phrase)
     translation — український переклад
     meaning     — просте англійське пояснення
     example     — приклад речення
     note        — (необов'язково) коротка примітка
     pron        — (необов'язково) вимова, напр. '/ɔːˈθentɪk/' — показується, лише якщо задана
     related     — (необов'язково) ['fit in', 'blend in'] — пов'язані слова зі словника
     id          — (необов'язково) створюється автоматично: u1-l1-authentic

   ПОВТОР: якщо слово вже є в попередньому уроці, НЕ пишіть його вдруге
   повністю — достатньо { word: 'fit in', repeat: true }. Словник не
   створить дубль, а лише додасть цей урок до practisedIn старого запису.

   Урок 52+: скопіюйте блок, змініть unit / lesson / title і слова.
   ═══════════════════════════════════════════════════════════════ */

window.AK_VOCAB = [

/* ─────────────── UNIT 1 · Identity & Self-Expression ─────────────── */
{ unit: 1, lesson: 1, title: 'Wearing a Mask?', practisedIn: [2], revisedIn: [3, 10], words: [
  { word: 'authentic', type: 'word', translation: 'справжній; щирий', meaning: 'real and true to who you are, not fake', example: 'She tries to stay authentic online, even when it’s not “cool”.' },
  { word: 'overthink', type: 'word', translation: 'надто багато думати; накручувати себе', meaning: 'to think about something so much that it makes you worried', example: 'I overthink every message before I send it.' },
  { word: 'bottle up', type: 'phrasal', translation: 'тримати (емоції) в собі', meaning: 'to keep strong feelings inside and not show them', example: 'He bottled up his anger for weeks, and then it all came out.', related: ['talk it out'] },
  { word: 'reveal', type: 'word', translation: 'розкривати; показувати', meaning: 'to show something that was hidden or secret', example: 'In the last episode, Mia finally reveals her real reason.' },
  { word: 'put together', type: 'phrase', translation: 'зібраний; упевнений (на вигляд)', meaning: 'looking calm, organised and in control', example: 'She always looks so put together, even on Monday mornings.' },
  { word: 'lowkey', type: 'slang', translation: 'трохи; потай; не афішуючи', meaning: 'a little, or secretly — you don’t say it loudly', example: 'I’m lowkey nervous about the presentation.', related: ['lowkey obsessed'] },
  { word: 'blank out', type: 'phrasal', translation: 'усе вилетіло з голови', meaning: 'to suddenly forget everything, so your mind is empty', example: 'I knew the answer, but I blanked out when the teacher looked at me.' },
  { word: 'energy shift', type: 'slang', translation: 'зміна настрою / атмосфери', meaning: 'a sudden change in the mood of a person or a room', example: 'There was a huge energy shift when the new girl walked in.' },
  { word: 'in my feels', type: 'slang', translation: 'на емоціях; розчулений', meaning: 'feeling very emotional, often a bit sad or nostalgic', example: 'That song always gets me in my feels.' },
  { word: 'no filter', type: 'slang', translation: 'без фільтрів; кажу як є', meaning: 'saying exactly what you think, without being careful', example: 'My grandma has no filter — she tells everyone what she thinks.' },
  { word: 'awkward', type: 'word', translation: 'незручний; ніяковий', meaning: 'uncomfortable and a little embarrassing', example: 'There was an awkward silence after his joke.' },
  { word: 'feel seen', type: 'slang', translation: 'відчувати, що тебе справді розуміють', meaning: 'to feel that someone really understands you', example: 'When she said she overthinks too, I felt so seen.' },
  { word: 'unbothered', type: 'word', translation: 'спокійний; байдужий до чужої думки', meaning: 'calm and not worried by what other people say or do', example: 'People laughed, but she stayed totally unbothered.' }
]},

{ unit: 1, lesson: 4, title: 'Labels and Boxes', practisedIn: [5], revisedIn: [6, 10], words: [
  { word: 'label', type: 'word', translation: 'ярлик; навішувати ярлик', meaning: 'a quick word people use to describe and judge someone', example: 'Don’t let one label define who you are.' },
  { id: 'u1-l4-rebel-n', word: 'rebel (noun)', type: 'word', translation: 'бунтар', meaning: 'a person who refuses to follow rules or do what others expect', example: 'Everyone saw him as the class rebel.', note: 'Noun: REbel — stress on the first part.', related: ['rebel (verb)'] },
  { id: 'u1-l4-rebel-v', word: 'rebel (verb)', type: 'word', translation: 'бунтувати; повставати', meaning: 'to fight against rules or the people in control', example: 'Teenagers often rebel against strict rules.', note: 'Verb: reBEL — stress on the second part.', related: ['rebel (noun)'] },
  { word: 'peer pressure', type: 'phrase', translation: 'тиск з боку однолітків', meaning: 'when people your age push you to do something so you fit in', example: 'He bought the expensive trainers because of peer pressure.' },
  { word: 'outcast', type: 'word', translation: 'вигнанець; ізгой', meaning: 'a person who is not accepted by a group', example: 'In the film, the outcast becomes the hero.' },
  { word: 'fit in', type: 'phrasal', translation: 'вписуватися; бути своїм', meaning: 'to be accepted by a group because you are like them', example: 'At my new school, I tried really hard to fit in.', related: ['blend in', 'stand out'] },
  { word: 'vibe', type: 'slang', translation: 'атмосфера; настрій; «вайб»', meaning: 'the feeling a person or place gives you', example: 'This café has such a calm vibe.' },
  { word: 'conform', type: 'word', translation: 'підкорятися правилам; бути як усі', meaning: 'to behave the way the group or the rules expect', example: 'You don’t have to conform to be liked.' },
  { word: 'quirky', type: 'word', translation: 'дивакуватий (у хорошому сенсі)', meaning: 'unusual in an interesting and fun way', example: 'Her quirky style makes her stand out.' },
  { word: 'mainstream', type: 'word', translation: 'масовий; популярний; мейнстрим', meaning: 'what most people like or think is normal', example: 'He doesn’t really listen to mainstream music.' },
  { word: 'misfit', type: 'word', translation: '«біла ворона»', meaning: 'someone who doesn’t fit into a group', example: 'The story is about a group of misfits who become best friends.' },
  { word: 'fake it', type: 'phrase', translation: 'прикидатися', meaning: 'to pretend to feel or be something', example: 'I wasn’t confident at all, so I just faked it.' },
  { word: 'stand out', type: 'phrasal', translation: 'вирізнятися', meaning: 'to be easy to notice because you are different or better', example: 'Her bright yellow jacket really stands out.', related: ['fit in', 'blend in'] }
]},

{ unit: 1, lesson: 7, title: 'Inner Critic / Self-Talk', practisedIn: [8], revisedIn: [9, 10], words: [
  { word: 'self-talk', type: 'word', translation: 'внутрішній діалог', meaning: 'the things you say to yourself in your head', example: 'Positive self-talk helps me before tests.' },
  { word: 'confidence boost', type: 'phrase', translation: 'заряд упевненості', meaning: 'something that makes you feel more confident', example: 'Her kind comment was a real confidence boost.' },
  { word: 'glow-up', type: 'slang', translation: 'помітне перетворення на краще', meaning: 'a big positive change in how you look or feel', example: 'He had a total glow-up over the summer.' },
  { word: 'negative loop', type: 'phrase', translation: 'замкнене коло негативних думок', meaning: 'when the same bad thoughts repeat again and again', example: 'I got stuck in a negative loop after one bad grade.' },
  { word: 'mental reset', type: 'phrase', translation: 'перезавантаження для голови', meaning: 'a short break that clears your mind so you can start again', example: 'A walk outside is my mental reset.' },
  { word: 'second-guess', type: 'word', translation: 'сумніватися в собі; перепитувати себе', meaning: 'to doubt a decision you have already made', example: 'Stop second-guessing yourself — your first answer was right.' },
  { word: 'reframe', type: 'word', translation: 'переосмислити; подивитися інакше', meaning: 'to think about a situation in a new, more positive way', example: 'Try to reframe the mistake as a lesson.' },
  { word: 'hype yourself up', type: 'slang', translation: 'підбадьорити себе', meaning: 'to make yourself feel excited and confident', example: 'I hype myself up with music before a match.' },
  { word: 'chill your brain', type: 'slang', translation: 'заспокоїти голову', meaning: 'to calm your thoughts down', example: 'I need ten minutes to chill my brain after school.' },
  { word: 'talk it out', type: 'phrasal', translation: 'обговорити; проговорити', meaning: 'to talk about a problem until you feel better or solve it', example: 'Instead of fighting, let’s talk it out.', related: ['bottle up', 'hear someone out'] },
  { word: 'empowering', type: 'word', translation: 'що додає сили й упевненості', meaning: 'making you feel strong and in control', example: 'It was so empowering to finally say no.' },
  { word: 'inner critic', type: 'phrase', translation: 'внутрішній критик', meaning: 'the voice in your head that says you’re not good enough', example: 'My inner critic says my drawings are bad, but I keep drawing.' }
]},

/* ─────────────── UNIT 2 · Digital Life & Social Media Pressure ─────────────── */
{ unit: 2, lesson: 11, title: 'Filters and FOMO', practisedIn: [12], revisedIn: [13, 20], words: [
  { word: 'FOMO', type: 'slang', translation: 'страх щось пропустити', meaning: 'fear of missing out — worry that others are having fun without you', example: 'I got FOMO when I saw the party photos.' },
  { word: 'doomscrolling', type: 'slang', translation: 'безкінечне гортання поганих новин', meaning: 'scrolling for a long time, usually through bad or negative content', example: 'I was doomscrolling until 2 a.m. and felt terrible the next day.' },
  { word: 'overshare', type: 'word', translation: 'розповідати забагато особистого', meaning: 'to share too much private information, especially online', example: 'He overshares in his stories — we know what he eats every hour.' },
  { word: 'ghost follow', type: 'slang', translation: 'мовчки стежити (без лайків)', meaning: 'to follow someone but never like or comment', example: 'I ghost follow a few artists — I never comment, I just watch.' },
  { word: 'drop a post', type: 'slang', translation: 'викласти допис', meaning: 'to publish something new online', example: 'She dropped a post at midnight and it blew up.' },
  { word: 'post and regret', type: 'slang', translation: 'викласти й одразу пошкодувати', meaning: 'to post something and soon wish you hadn’t', example: 'Classic post and regret: he deleted the photo after five minutes.' },
  { word: 'edited', type: 'word', translation: 'оброблений; відредагований', meaning: 'changed with an app to look different or better', example: 'Everyone could tell the photo was edited.' },
  { word: 'over-edit', type: 'word', translation: 'переборщити з обробкою', meaning: 'to change a photo so much that it looks fake', example: 'Don’t over-edit your selfies — you look great as you are.' },
  { word: 'highlight reel', type: 'idiom', translation: 'лише найкращі моменти', meaning: 'only the best moments of someone’s life that they show online', example: 'Remember, Instagram is just a highlight reel.' },
  { word: 'show up real', type: 'slang', translation: 'бути справжнім (онлайн)', meaning: 'to show your true self online, not a perfect version', example: 'I like creators who show up real — messy room and all.' },
  { word: 'snap and scroll', type: 'slang', translation: 'клацнув фото — і гортаєш далі', meaning: 'to take a quick photo, post it and keep scrolling without really enjoying the moment', example: 'We didn’t enjoy the concert — we just snapped and scrolled.' },
  { word: 'post-worthy', type: 'word', translation: 'вартий того, щоб викласти', meaning: 'good or interesting enough to share online', example: 'This sunset is totally post-worthy.' }
]},

{ unit: 2, lesson: 14, title: 'Likes Don’t Equal Love', practisedIn: [15], revisedIn: [16, 20], words: [
  { word: 'take it down', type: 'phrasal', translation: 'видалити (допис, відео)', meaning: 'to remove a post or video from the internet', example: 'Please take it down — I look terrible in that video.' },
  { word: 'blow it out of proportion', type: 'idiom', translation: 'перебільшувати проблему', meaning: 'to make something seem much more serious than it really is', example: 'Don’t blow it out of proportion. It was only a small mistake.' },
  { word: 'live up to the hype', type: 'idiom', translation: 'виправдати очікування', meaning: 'to be as good as people said it would be', example: 'The new game didn’t live up to the hype.' },
  { word: 'be all about something', type: 'phrase', translation: 'дуже захоплюватися чимось', meaning: 'to be very interested in or focused on something', example: 'My brother is all about football right now.' },
  { word: 'be into something', type: 'phrasal', translation: 'захоплюватися; подобатися', meaning: 'to like something a lot', example: 'I’m really into K-pop at the moment.' },
  { word: 'look up to', type: 'phrasal', translation: 'рівнятися на когось', meaning: 'to admire and respect someone', example: 'I really look up to my older sister.' },
  { word: 'back off', type: 'phrasal', translation: 'відчепитися; відступити', meaning: 'to stop pushing or bothering someone', example: 'Back off! I said I don’t want to talk about it.' },
  { word: 'check out', type: 'phrasal', translation: 'подивитися; зацінити', meaning: 'to look at something because it’s interesting', example: 'Check out my new video!' },
  { word: 'get over it', type: 'phrasal', translation: 'пережити; змиритися', meaning: 'to stop feeling upset about something', example: 'It was embarrassing, but she got over it.' },
  { word: 'go for it', type: 'idiom', translation: 'дій!; спробуй!', meaning: 'used to encourage someone to try something', example: 'You want to sing at the concert? Go for it!' }
]},

{ unit: 2, lesson: 17, title: 'Algorithm & Screen Time', practisedIn: [18], revisedIn: [19, 20], words: [
  { word: 'pop up', type: 'phrasal', translation: 'вискакувати; з’являтися', meaning: 'to appear suddenly on your screen', example: 'A notification popped up in the middle of my revision.' },
  { word: 'tune it out', type: 'phrasal', translation: 'не звертати уваги', meaning: 'to stop listening to or noticing something', example: 'My phone kept buzzing, so I just tuned it out.' },
  { word: 'zone out', type: 'phrasal', translation: 'відключитися; «залипнути»', meaning: 'to stop paying attention and start daydreaming', example: 'I zoned out during the video and missed the main point.' },
  { word: 'mute ads', type: 'phrase', translation: 'вимкнути звук реклами', meaning: 'to turn off the sound of adverts', example: 'I always mute ads when I’m watching videos.' },
  { word: 'binge-watch', type: 'word', translation: 'дивитися серіал запоєм', meaning: 'to watch many episodes of a series one after another', example: 'We binge-watched the whole season in one weekend.' },
  { word: 'scroll guilt', type: 'slang', translation: 'провина через «залипання» в телефоні', meaning: 'feeling bad because you spent too much time scrolling', example: 'After three hours on TikTok, the scroll guilt hit me.' },
  { word: 'stay plugged in', type: 'idiom', translation: 'постійно бути онлайн', meaning: 'to stay connected to your phone and the internet all the time', example: 'She feels she has to stay plugged in or she’ll miss something.' },
  { word: 'go off', type: 'phrasal', translation: 'спрацювати; задзвонити', meaning: 'when a phone or alarm suddenly makes a noise', example: 'My phone went off in the middle of class.' },
  { word: 'freak out over likes', type: 'slang', translation: 'панікувати через лайки', meaning: 'to get very worried about how many likes you get', example: 'Don’t freak out over likes — they don’t measure your worth.' },
  { word: 'turn it into content', type: 'slang', translation: 'зробити з цього контент', meaning: 'to use a real moment to make a post or video', example: 'He fell off his skateboard and immediately turned it into content.' },
  { word: 'get pinged', type: 'slang', translation: 'отримати сповіщення', meaning: 'to get a notification or a message', example: 'I get pinged every five minutes by the class group chat.' },
  { word: 'get sucked in', type: 'phrasal', translation: 'затягнути (кудись)', meaning: 'to become so involved in something that you can’t stop', example: 'I opened YouTube for one video and got sucked in for two hours.' },
  { word: 'get inside your head', type: 'idiom', translation: '«залізти в голову»', meaning: 'when something keeps affecting your thoughts and feelings', example: 'Don’t let mean comments get inside your head.' },
  { word: 'switch it off', type: 'phrasal', translation: 'вимкнути', meaning: 'to turn a device off', example: 'If you can’t focus, just switch it off.' }
]},

/* ─────────────── UNIT 3 · Relationships, Belonging & Conflict ─────────────── */
{ unit: 3, lesson: 21, title: 'Real Ones Only', practisedIn: [22], revisedIn: [23, 30], words: [
  { word: 'ride or die', type: 'slang', translation: 'вірний друг до кінця', meaning: 'a friend who supports you no matter what', example: 'She’s my ride or die — she’s always on my side.' },
  { word: 'click with someone', type: 'idiom', translation: 'одразу знайти спільну мову', meaning: 'to like and understand someone immediately', example: 'We clicked from the first day of camp.' },
  { word: 'fall out', type: 'phrasal', translation: 'посваритися', meaning: 'to stop being friends after an argument', example: 'They fell out over a stupid comment in the group chat.', related: ['patch things up'] },
  { word: 'squad', type: 'slang', translation: 'компанія друзів', meaning: 'your group of close friends', example: 'The whole squad is coming to my birthday.' },
  { word: 'drift apart', type: 'phrasal', translation: 'поступово віддалитися', meaning: 'to slowly become less close over time', example: 'We drifted apart after she moved to another school.' },
  { word: 'flaky', type: 'word', translation: 'ненадійний (постійно скасовує плани)', meaning: 'often cancelling plans or not doing what you promised', example: 'Don’t be flaky — you promised to come!' },
  { word: 'be there for someone', type: 'phrase', translation: 'бути поруч; підтримувати', meaning: 'to support someone when they need help', example: 'When my dog died, my friends were really there for me.' },
  { word: 'two-faced', type: 'word', translation: 'дворушний; нещирий', meaning: 'nice to your face, but mean behind your back', example: 'I can’t trust him — he’s so two-faced.' },
  { word: 'third wheel', type: 'idiom', translation: 'третій зайвий', meaning: 'the extra person with a couple or two very close friends', example: 'I felt like a third wheel at the cinema with them.' },
  { word: 'no drama vibe', type: 'slang', translation: 'атмосфера без драм', meaning: 'a calm, peaceful feeling with no arguments', example: 'I love our squad’s no drama vibe.' },
  { word: 'spill the tea', type: 'slang', translation: 'розкажи плітки / новини', meaning: 'to share gossip or interesting news', example: 'Come on, spill the tea! What happened at the party?' },
  { word: 'show up for someone', type: 'phrasal', translation: 'підтримати ділом', meaning: 'to support someone, especially by being there at important moments', example: 'She always shows up for me, even at my piano concerts.' },
  { word: 'bestie energy', type: 'slang', translation: '«енергія найкращих друзів»', meaning: 'the warm, close feeling of being best friends', example: 'Those two have serious bestie energy.' },
  { word: 'have someone’s back', type: 'idiom', translation: 'прикривати; бути на чиємусь боці', meaning: 'to protect and support someone', example: 'Don’t worry, I’ve got your back.' },
  { word: 'bond over', type: 'phrasal', translation: 'зблизитися через щось спільне', meaning: 'to become close because you share an interest or experience', example: 'We bonded over our love of horror films.' }
]},

{ unit: 3, lesson: 24, title: 'Belonging & Being Left Out', practisedIn: [25], revisedIn: [26, 30], words: [
  { word: 'fit in', repeat: true },
  { word: 'left out', type: 'phrase', translation: 'відсторонений; «за бортом»', meaning: 'not included in a group or activity', example: 'I felt left out when they made plans without me.' },
  { word: 'exclude', type: 'word', translation: 'виключати; не приймати', meaning: 'to not let someone join or take part', example: 'It’s not okay to exclude people from the group chat.' },
  { word: 'stick together', type: 'phrasal', translation: 'триматися разом', meaning: 'to stay close and support each other', example: 'Whatever happens, we stick together.' },
  { word: 'social circle', type: 'phrase', translation: 'коло спілкування', meaning: 'the group of people you spend time with', example: 'My social circle got bigger when I joined the drama club.' },
  { word: 'find your people', type: 'idiom', translation: 'знайти «своїх»', meaning: 'to find people who understand and accept you', example: 'At art camp, I finally found my people.' },
  { word: 'blend in', type: 'phrasal', translation: 'злитися з натовпом', meaning: 'to look or act like everyone else so you’re not noticed', example: 'On my first day, I just tried to blend in.', related: ['fit in', 'stand out'] },
  { word: 'ditched', type: 'slang', translation: 'кинутий; покинутий', meaning: 'left alone by someone, often unexpectedly', example: 'My friends ditched me at the mall.' },
  { word: 'get ghosted', type: 'slang', translation: 'коли тебе раптом ігнорують', meaning: 'when someone suddenly stops replying to you with no explanation', example: 'I got ghosted after I sent that long message.' },
  { word: 'vibe with', type: 'slang', translation: 'бути на одній хвилі з', meaning: 'to feel a good connection with someone or something', example: 'I really vibe with the new kid.' },
  { word: 'tag along', type: 'phrasal', translation: 'піти за компанію', meaning: 'to go somewhere with someone, often without a real invitation', example: 'Can I tag along to the skate park?' },
  { word: 'leave someone on read', type: 'slang', translation: 'прочитати й не відповісти', meaning: 'to read someone’s message and not reply', example: 'She left me on read for two days.' }
]},

{ unit: 3, lesson: 27, title: 'Conflict & Repair', practisedIn: [28], revisedIn: [29, 30], words: [
  { word: 'talk it out', repeat: true },
  { word: 'hear someone out', type: 'phrasal', translation: 'вислухати до кінця', meaning: 'to listen to everything someone wants to say', example: 'Just hear me out before you get angry.' },
  { word: 'blow up at someone', type: 'phrasal', translation: 'накричати; вибухнути', meaning: 'to suddenly shout at someone angrily', example: 'I blew up at my brother for using my headphones.' },
  { word: 'talk behind someone’s back', type: 'idiom', translation: 'говорити за спиною', meaning: 'to say bad things about someone when they’re not there', example: 'Real friends don’t talk behind your back.' },
  { word: 'patch things up', type: 'idiom', translation: 'помиритися', meaning: 'to become friends again after an argument', example: 'We finally patched things up after a week.', related: ['fall out'] },
  { word: 'hold a grudge', type: 'idiom', translation: 'тримати образу', meaning: 'to stay angry with someone for a long time', example: 'She still holds a grudge about the birthday thing.' },
  { word: 'set boundaries', type: 'phrase', translation: 'встановлювати межі', meaning: 'to tell people clearly what is okay and not okay for you', example: 'It’s healthy to set boundaries, even with friends.' },
  { word: 'give someone space', type: 'phrase', translation: 'дати комусь простір', meaning: 'to leave someone alone for a while', example: 'He’s upset — let’s give him some space.' },
  { word: 'own up to something', type: 'phrasal', translation: 'визнати провину', meaning: 'to admit that you did something wrong', example: 'He owned up to breaking the window.' },
  { word: 'cross the line', type: 'idiom', translation: 'перейти межу', meaning: 'to do or say something that is not acceptable', example: 'Joking is fine, but that comment crossed the line.' },
  { word: 'make it up to someone', type: 'phrasal', translation: 'загладити провину', meaning: 'to do something nice for someone because you hurt or disappointed them', example: 'Sorry I forgot your birthday — I’ll make it up to you.' }
]},

/* ─────────────── UNIT 4 · Obsessions, Gaming & Flow State ─────────────── */
{ unit: 4, lesson: 31, title: 'My Weird Obsession', practisedIn: [32], revisedIn: [33, 40], words: [
  { word: 'lowkey obsessed', type: 'slang', translation: 'потай одержимий', meaning: 'quietly but seriously into something', example: 'I’m lowkey obsessed with this anime.', related: ['lowkey'] },
  { word: 'that’s my jam', type: 'slang', translation: 'це моє!; обожнюю', meaning: 'this is something (often a song) I really love', example: 'Turn it up — that’s my jam!' },
  { word: 'deep in it', type: 'slang', translation: 'по вуха в цьому', meaning: 'very involved in a hobby or activity', example: 'She started knitting last month and now she’s deep in it.' },
  { word: 'can’t shut up about it', type: 'phrase', translation: 'не може замовкнути про це', meaning: 'to talk about something all the time because you love it', example: 'He got a new bike and can’t shut up about it.' },
  { word: 'total geek for', type: 'slang', translation: 'справжній фанат (чогось)', meaning: 'someone who loves and knows a lot about a topic', example: 'I’m a total geek for space.' },
  { word: 'the go-to person for', type: 'phrase', translation: 'той, до кого всі звертаються', meaning: 'the person everyone asks for help with something', example: 'Max is the go-to person for computer problems.' },
  { word: 'not just a phase', type: 'idiom', translation: 'це не минуще захоплення', meaning: 'a serious, lasting interest, not something that will end soon', example: 'Mum, skateboarding is not just a phase!' },
  { word: 'mad skills in', type: 'slang', translation: 'круті навички в', meaning: 'very strong skills in something', example: 'She has mad skills in video editing.' },
  { word: 'turn heads', type: 'idiom', translation: 'привертати увагу', meaning: 'to make people notice and look at you', example: 'Her costume turned heads at the festival.' },
  { word: 'one-of-a-kind', type: 'phrase', translation: 'унікальний; єдиний такий', meaning: 'completely unique — there is nothing else like it', example: 'His sneaker designs are one-of-a-kind.' }
]},

{ unit: 4, lesson: 34, title: 'Game On', practisedIn: [35], revisedIn: [36, 40], words: [
  { word: 'glitch', type: 'word', translation: 'збій; глюк', meaning: 'a small fault that makes a game or program act strangely', example: 'A glitch made my character fall through the floor.' },
  { word: 'bluff', type: 'word', translation: 'блефувати; блеф', meaning: 'to pretend you have or know something, to trick others', example: 'He was bluffing — he didn’t have a single good card.' },
  { word: 'lag', type: 'word', translation: 'лаг; затримка', meaning: 'a delay in a game because the internet is slow', example: 'I only lost because of the lag!' },
  { word: 'revive', type: 'word', translation: 'оживити (персонажа)', meaning: 'to bring a character back to life in a game', example: 'Wait for me, I’ll revive you!' },
  { word: 'mayhem', type: 'word', translation: 'хаос; безлад', meaning: 'wild, noisy chaos', example: 'The last round was total mayhem.' },
  { word: 'rage quit', type: 'slang', translation: 'вийти з гри від злості', meaning: 'to angrily stop playing because you are losing', example: 'He lost three times in a row and rage quit.' },
  { word: 'perseverance', type: 'word', translation: 'наполегливість', meaning: 'continuing to try even when something is hard', example: 'It took real perseverance to finish that level.' },
  { word: 'noob', type: 'slang', translation: 'новачок; «нуб»', meaning: 'a new or not very good player (can sound rude)', example: 'Don’t call her a noob — it’s her first game.' },
  { word: 'gamer tag', type: 'phrase', translation: 'ігровий нік', meaning: 'your name in an online game', example: 'What’s your gamer tag? I’ll add you.' },
  { word: 'take turns', type: 'phrase', translation: 'по черзі', meaning: 'to do something one after another', example: 'Let’s take turns with the controller.' },
  { word: 'roll the dice', type: 'idiom', translation: 'кинути кубики; ризикнути', meaning: 'to throw dice in a game — also, to take a risk', example: 'It’s your go — roll the dice!' },
  { word: 'draw a card', type: 'phrase', translation: 'взяти карту', meaning: 'to take a card from the pile in a card game', example: 'If you can’t play, draw a card.' },
  { word: 'sore loser', type: 'idiom', translation: 'той, хто не вміє програвати', meaning: 'someone who gets angry or upset when they lose', example: 'Don’t be a sore loser — it’s just a game.' },
  { word: 'team up', type: 'phrasal', translation: 'об’єднатися в команду', meaning: 'to join together to do something', example: 'Let’s team up for the next mission.' },
  { word: 'roleplay', type: 'word', translation: 'рольова гра; грати роль', meaning: 'to pretend to be a character', example: 'In this game, you roleplay as a detective.' },
  { word: 'deck', type: 'word', translation: 'колода (карт)', meaning: 'a full set of playing cards', example: 'Shuffle the deck before you deal.' }
]},

{ unit: 4, lesson: 37, title: 'Flow State / Passion Pulse', practisedIn: [38], revisedIn: [39, 40], words: [
  { word: 'time flies', type: 'idiom', translation: 'час летить', meaning: 'time passes very quickly', example: 'Time flies when you’re drawing.' },
  { word: 'in the zone', type: 'idiom', translation: 'у потоці; повністю зосереджений', meaning: 'fully focused and doing something really well', example: 'Don’t talk to me now — I’m in the zone.' },
  { word: 'lost track of time', type: 'phrase', translation: 'забув(-ла) про час', meaning: 'didn’t notice how much time had passed', example: 'I lost track of time playing guitar and missed dinner.' },
  { word: 'fully present', type: 'phrase', translation: 'повністю тут і зараз', meaning: 'giving all your attention to what is happening now', example: 'When I dance, I’m fully present.' },
  { word: 'get in your creative bag', type: 'slang', translation: 'увійти в творчий раж', meaning: 'to start being very creative and productive', example: 'Once I get in my creative bag, I can write for hours.' },
  { word: 'ideas just poured out', type: 'phrase', translation: 'ідеї просто полилися', meaning: 'lots of ideas came very quickly and easily', example: 'At the workshop, the ideas just poured out.' },
  { word: 'hands-on', type: 'word', translation: 'практичний; «своїми руками»', meaning: 'learning by doing things yourself, not just reading', example: 'I love hands-on projects like building robots.' },
  { word: 'mentally recharged', type: 'phrase', translation: '«перезаряджений» морально', meaning: 'feeling fresh and full of energy again', example: 'After the weekend camp, I felt mentally recharged.' },
  { word: 'fully locked in', type: 'slang', translation: 'повністю зосереджений', meaning: 'completely focused (informal)', example: 'He was fully locked in for the final match.' },
  { word: 'pushed to your limit', type: 'idiom', translation: 'на межі можливостей', meaning: 'doing as much as you possibly can', example: 'The race pushed me to my limit.' }
]},

/* ─────────────── UNIT 5 · Future, Identity, Growth & Resilience ─────────────── */
{ unit: 5, lesson: 41, title: 'What’s the Plan? / Finding Your Path', practisedIn: [42], revisedIn: [43, 50], words: [
  { word: 'map out', type: 'phrasal', translation: 'детально спланувати', meaning: 'to plan something carefully in detail', example: 'Let’s map out the next three years.' },
  { word: 'be in discovery mode', type: 'phrase', translation: 'бути в пошуку', meaning: 'to explore and try things to find out what you like', example: 'I don’t know my dream job yet — I’m in discovery mode.' },
  { word: 'keep options open', type: 'idiom', translation: 'залишати собі вибір', meaning: 'to not decide too early, so you still have choices', example: 'I’m taking science and art to keep my options open.' },
  { word: 'aim for', type: 'phrasal', translation: 'прагнути; цілитися на', meaning: 'to try to get or reach something', example: 'I’m aiming for a top grade in English.', note: 'aim for + noun', related: ['aim to'] },
  { word: 'aim to', type: 'phrase', translation: 'мати на меті (щось зробити)', meaning: 'to plan or try to do something', example: 'I aim to read one book a month.', note: 'aim to + verb', related: ['aim for'] },
  { word: 'gap year', type: 'phrase', translation: 'рік перерви перед університетом', meaning: 'a year off between school and university, often to travel or work', example: 'My cousin is taking a gap year to volunteer in Spain.' },
  { word: 'reset', type: 'word', translation: 'перезапуск; почати з нуля', meaning: 'a fresh start', example: 'Summer is my chance for a full reset.' },
  { word: 'light someone up', type: 'phrasal', translation: 'запалювати; робити щасливим', meaning: 'to make someone very happy and excited', example: 'Talking about animals really lights her up.' },
  { word: 'job shadowing', type: 'phrase', translation: 'день «у тіні» фахівця', meaning: 'following a worker for a day to see what their job is like', example: 'I did job shadowing at a vet clinic.' },
  { word: 'values', type: 'word', translation: 'цінності', meaning: 'the beliefs and ideas that are most important to you', example: 'Honesty is one of my core values.', related: ['align with'] },
  { word: 'align with', type: 'phrasal', translation: 'відповідати; узгоджуватися з', meaning: 'to match or agree with', example: 'I want a job that aligns with my values.', related: ['values'] },
  { word: 'true vocation', type: 'phrase', translation: 'справжнє покликання', meaning: 'the work you feel you were born to do', example: 'Teaching is her true vocation.' }
]},

{ unit: 5, lesson: 44, title: 'Personality & Strengths', practisedIn: [45], revisedIn: [46, 50], words: [
  { word: 'core strength', type: 'phrase', translation: 'головна сильна сторона', meaning: 'your biggest, most important strength', example: 'Listening is my core strength.' },
  { word: 'introvert', type: 'word', translation: 'інтроверт', meaning: 'a person who gets energy from quiet time alone', example: 'As an introvert, I need some quiet time after school.', related: ['extrovert', 'ambivert'] },
  { word: 'extrovert', type: 'word', translation: 'екстраверт', meaning: 'a person who gets energy from being with other people', example: 'He’s a total extrovert — he loves big parties.', related: ['introvert', 'ambivert'] },
  { word: 'ambivert', type: 'word', translation: 'амбіверт', meaning: 'a person who is a mix of introvert and extrovert', example: 'I’m an ambivert: I love parties, but I need alone time too.', related: ['introvert', 'extrovert'] },
  { word: 'empathetic', type: 'word', translation: 'емпатичний; співчутливий', meaning: 'able to understand and share other people’s feelings', example: 'She’s very empathetic — she always knows when I’m sad.' },
  { word: 'strategic thinker', type: 'phrase', translation: 'стратегічний мислитель', meaning: 'someone who plans carefully to reach a goal', example: 'In chess, you need to be a strategic thinker.' },
  { word: 'problem-solver', type: 'word', translation: 'той, хто вміє розв’язувати проблеми', meaning: 'someone who is good at finding solutions', example: 'When the Wi-Fi stops, Dad is our problem-solver.' },
  { word: 'adaptable', type: 'word', translation: 'гнучкий; що легко пристосовується', meaning: 'able to change easily when things change', example: 'You have to be adaptable when plans change at the last minute.' },
  { word: 'emotionally intelligent', type: 'phrase', translation: 'з високим емоційним інтелектом', meaning: 'good at understanding your own and other people’s feelings', example: 'An emotionally intelligent captain listens before reacting.' },
  { word: 'big-picture thinker', type: 'phrase', translation: 'той, хто бачить загальну картину', meaning: 'someone who sees the whole situation, not just the details', example: 'She’s a big-picture thinker, so she leads our project.' },
  { word: 'driven', type: 'word', translation: 'цілеспрямований; вмотивований', meaning: 'very motivated to succeed', example: 'He’s so driven — he trains every morning before school.' },
  { word: 'collaborative', type: 'word', translation: 'що вміє співпрацювати', meaning: 'good at working together with others', example: 'Our class project was really collaborative.' },
  { word: 'resilient', type: 'word', translation: 'стійкий; що швидко відновлюється', meaning: 'able to recover quickly after problems', example: 'Teenagers are often more resilient than adults think.', related: ['bounce back'] },
  { word: 'grounded', type: 'word', translation: 'врівноважений; приземлений', meaning: 'calm, sensible and not easily stressed', example: 'Even after winning, she stayed grounded.' }
]},

{ unit: 5, lesson: 47, title: 'Grit & Growth / Overcoming Setbacks', practisedIn: [48], revisedIn: [49, 50], words: [
  { word: 'fail forward', type: 'idiom', translation: 'вчитися на невдачах і рухатися далі', meaning: 'to use failures as steps towards success', example: 'Every bad test taught me something — I’m failing forward.' },
  { word: 'bounce back', type: 'phrasal', translation: 'швидко відновитися', meaning: 'to recover quickly after a problem', example: 'She lost the first match but bounced back in the second.', related: ['resilient', 'come back stronger'] },
  { word: 'grit', type: 'word', translation: 'сила духу; наполегливість', meaning: 'courage and determination to keep going', example: 'It takes grit to train every single day.' },
  { word: 'trial and error', type: 'idiom', translation: 'метод спроб і помилок', meaning: 'trying different ways until you find one that works', example: 'I learned to cook by trial and error.' },
  { word: 'learn the hard way', type: 'idiom', translation: 'навчитися на власних помилках', meaning: 'to learn something through a bad experience', example: 'I learned the hard way to save my work every five minutes.' },
  { word: 'own your mistakes', type: 'phrase', translation: 'визнавати свої помилки', meaning: 'to accept that you made a mistake and take responsibility', example: 'Good captains own their mistakes.' },
  { word: 'setback', type: 'word', translation: 'невдача; перешкода', meaning: 'a problem that stops your progress for a while', example: 'The injury was a big setback, but he came back.' },
  { word: 'take it on the chin', type: 'idiom', translation: 'стійко прийняти удар', meaning: 'to accept bad news or criticism without complaining', example: 'The coach criticised him, and he took it on the chin.' },
  { word: 'come back stronger', type: 'phrase', translation: 'повернутися сильнішим', meaning: 'to return better after a difficult time', example: 'After failing the audition, she came back stronger the next year.' },
  { word: 'trial run', type: 'phrase', translation: 'пробний запуск; репетиція', meaning: 'a practice to test something before the real thing', example: 'Let’s do a trial run of the presentation.' },
  { word: 'progress over perfection', type: 'idiom', translation: 'прогрес важливіший за ідеал', meaning: 'it’s better to improve step by step than to be perfect', example: 'My motto this year: progress over perfection.' },
  { word: 'turning point', type: 'phrase', translation: 'поворотний момент', meaning: 'a moment when things change in an important way', example: 'Joining the band was a turning point in my life.' }
]}

/* Наступний урок — скопіюйте блок і поставте кому перед ним:
,{ unit: 6, lesson: 52, title: 'Назва уроку', practisedIn: [53], revisedIn: [54, 60], words: [
  { word: 'new phrase', type: 'phrase', translation: 'переклад', meaning: 'simple English meaning', example: 'Example sentence.' }
]}
*/
];
