/* ═══════════════════════════════════════════════════════════════
   GRAMMAR — граматичні теми курсу. Одна тема = один об'єкт.

   Обов'язкові поля:
     id            — коротка адреса теми (латиницею, через дефіс)
     title, short  — назва та опис в одне речення
     unit          — номер юніту
     introducedIn  — урок, де тему вводять
     practisedIn   — уроки практики     (масив, може бути [])
     revisedIn     — уроки повторення   (масив, може бути [])
     level         — 'B2' | 'B2+' | 'C1'
     what, whatUa  — «What is it?» англійською і українською
     when          — список «When do we use it?»
     structure     — формули: { label, formula, example }  або  { table: { head:[..], rows:[[..],..] } }
     examples      — речення; **жирним** виділяється граматика
     compare       — (необов'язково) { title, cols: [{ h, formula, ex, note }] }
     mistakes      — { wrong, right, why }
     practice      — питання (перші 5 — Mini Practice у темі, усі — вкладка Practice):
        { t:'mc',      q, options:[..], a: індекс, why }        — вибір відповіді
        { t:'gap',     q:'… ___ …', a:['варіант', ...], why }   — вписати пропущене
        { t:'rewrite', q, start:'Початок…', a:['варіант', ...], why } — перефразувати
        { t:'error',   parts:['…','…'], wrong: індекс, fix, full, why } — знайти помилку

   Нова тема для уроку 52+ — скопіюйте будь-який об'єкт і змініть поля.
   ═══════════════════════════════════════════════════════════════ */

window.AK_GRAMMAR = [

/* ═════════════════════ UNIT 1 ═════════════════════ */
{
  id: 'perfect-tenses',
  title: 'Perfect Tenses',
  short: 'Connect two moments: what has been happening up to now, and what happened before another past moment.',
  unit: 1, introducedIn: 2, practisedIn: [3], revisedIn: [10], level: 'B2',
  what: 'Perfect tenses link two times. Present Perfect Continuous connects the past with NOW. Past Perfect and Past Perfect Continuous go back to an “earlier past” — before another moment in the past.',
  whatUa: 'Перфектні часи пов’язують два моменти. Present Perfect Continuous — дія, що почалася в минулому й триває досі (або щойно закінчилась і видно результат). Past Perfect — дія, що сталася РАНІШЕ за інший момент у минулому. Past Perfect Continuous — як довго щось тривало до певного моменту в минулому.',
  when: [
    'Present Perfect Continuous — an action that started in the past and is still going on (How long? for / since).',
    'Present Perfect Continuous — an action that has just stopped, and you can see the result.',
    'Past Perfect — the “earlier past”: something that happened before another past action.',
    'Past Perfect Continuous — how long something had been happening before a moment in the past.'
  ],
  structure: [
    { label: 'Present Perfect Continuous', formula: 'have / has + been + V-ing', example: 'I’ve been waiting for an hour.' },
    { label: 'Past Perfect', formula: 'had + V3', example: 'The film had started when we arrived.' },
    { label: 'Past Perfect Continuous', formula: 'had + been + V-ing', example: 'She had been practising for months before the show.' }
  ],
  examples: [
    'I’**ve been scrolling** for two hours and I still haven’t started my homework.',
    'Your eyes are red — **have** you **been gaming** all night?',
    'By the time I opened the group chat, everyone **had** already **seen** the meme.',
    'Mia **had never performed** on stage before the school festival.',
    'Leo was exhausted because he **had been training** since 6 a.m.',
    'We **had been waiting** in the queue for an hour when the tickets sold out.'
  ],
  compare: {
    title: 'Past Simple vs Past Perfect',
    cols: [
      { h: 'Past Simple', formula: 'When I arrived, the film started.', note: 'First I arrived, then the film started — I saw the beginning.' },
      { h: 'Past Perfect', formula: 'When I arrived, the film had started.', note: 'The film started BEFORE I arrived — I missed the beginning.' }
    ]
  },
  mistakes: [
    { wrong: 'I am waiting here since 3 o’clock.', right: 'I have been waiting here since 3 o’clock.', why: 'With since / for and an action up to now, use Present Perfect Continuous.' },
    { wrong: 'At school I realised I forgot my bag at home.', right: 'At school I realised I had forgotten my bag at home.', why: 'Forgetting happened earlier than realising → Past Perfect.' },
    { wrong: 'I have been knowing her for years.', right: 'I have known her for years.', why: 'State verbs (know, like, believe) don’t usually take the continuous form.' }
  ],
  practice: [
    { t: 'mc', q: 'My hands are covered in paint because I ___ my room all morning.', options: ['have painted', 'have been painting', 'had painted'], a: 1, why: 'The action continued up to now and you can see the result (paint!) → Present Perfect Continuous.' },
    { t: 'gap', q: 'By the time we got to the cinema, the film ___ (already / start).', a: ['had already started'], why: 'The film started before we got there → Past Perfect: had + V3.' },
    { t: 'mc', q: 'She was exhausted because she ___ for the exam all night.', options: ['had been studying', 'has been studying', 'was study'], a: 0, why: 'How long before a past moment (she was exhausted) → Past Perfect Continuous.' },
    { t: 'error', parts: ['I', 'am learning', 'English', 'since I was six.'], wrong: 1, fix: 'have been learning', full: 'I have been learning English since I was six.', why: 'With since + an action up to now → Present Perfect Continuous.' },
    { t: 'rewrite', q: 'I started waiting at 4 o’clock. It’s 5 o’clock now.', start: 'I', a: ['I have been waiting for an hour', 'I have been waiting for one hour', 'I have been waiting since 4 o’clock', 'I have been waiting since 4'], why: 'Action from the past up to now → have been + V-ing.' },
    { t: 'mc', q: 'When I opened TikTok, the video ___ one million views.', options: ['got', 'had already got', 'has got'], a: 1, why: 'It got the views BEFORE I opened the app → Past Perfect.' },
    { t: 'gap', q: 'How long have you ___ (play) this game? — Since lunch!', a: ['been playing'], why: 'How long + up to now → have been + V-ing.' }
  ]
},
{
  id: 'inversion',
  title: 'Inversion for Emphasis',
  short: 'Start with Never, Little, No sooner… and swap the subject and auxiliary to sound dramatic.',
  unit: 1, introducedIn: 5, practisedIn: [6], revisedIn: [10], level: 'C1',
  what: 'Inversion means changing the normal word order to sound dramatic. When a sentence starts with a negative or “limiting” word (Never, Rarely, Little, Hardly…), the auxiliary verb comes BEFORE the subject — just like in a question.',
  whatUa: 'Інверсія — це зміна звичайного порядку слів для емоційного наголосу. Якщо речення починається із заперечного чи обмежувального слова (Never, Rarely, Little, Hardly…), допоміжне дієслово стає ПЕРЕД підметом — як у питанні.',
  when: [
    'To sound dramatic in stories, speeches, reviews and presentations.',
    'To show that something is very rare, surprising or happened very quickly.',
    'Mostly in written or formal English — in a normal chat we use normal word order.'
  ],
  structure: [
    { label: 'Never / Rarely / Seldom', formula: 'Never + have / had + subject + V3', example: 'Never have I seen such a crowd.' },
    { label: 'Little', formula: 'Little + did + subject + base verb', example: 'Little did she know the truth.' },
    { label: 'No sooner … than', formula: 'No sooner + had + subject + V3 + than …', example: 'No sooner had I posted than my mum commented.' },
    { label: 'Hardly … when', formula: 'Hardly + had + subject + V3 + when …', example: 'Hardly had we started when the power went off.' },
    { label: 'Not until', formula: 'Not until + time / clause + did + subject + base verb', example: 'Not until the end did I understand.' }
  ],
  examples: [
    '**Never have I seen** so many people at a school concert.',
    '**Little did Leo know** that the whole class was watching his stream.',
    '**No sooner had** I **posted** the photo **than** my mum commented on it.',
    '**Hardly had** the match **started when** the Wi-Fi died.',
    '**Rarely do** you **meet** someone who actually listens.',
    '**Not until** I read the comments **did** I **realise** the video had gone viral.'
  ],
  compare: {
    title: 'Normal order vs Inversion',
    cols: [
      { h: 'Normal', formula: 'I have never seen such a crowd.', note: 'Neutral, everyday English.' },
      { h: 'Inverted', formula: 'Never have I seen such a crowd.', note: 'Same meaning — but more dramatic and formal.' }
    ]
  },
  mistakes: [
    { wrong: 'Never I have seen such a mess.', right: 'Never have I seen such a mess.', why: 'After Never at the start, put the auxiliary BEFORE the subject.' },
    { wrong: 'Little she knew the truth.', right: 'Little did she know the truth.', why: 'In the past simple we need did + base verb.' },
    { wrong: 'No sooner had we arrived when it started to rain.', right: 'No sooner had we arrived than it started to rain.', why: 'No sooner goes with THAN. Hardly goes with WHEN.' },
    { wrong: 'Not until the end I understood.', right: 'Not until the end did I understand.', why: 'Not until … → did + subject + base verb.' }
  ],
  practice: [
    { t: 'mc', q: 'Never ___ such a boring film!', options: ['I have watched', 'have I watched', 'I watched'], a: 1, why: 'Never at the start → auxiliary + subject: have I watched.' },
    { t: 'mc', q: 'No sooner had the bell rung ___ everyone ran out.', options: ['when', 'than', 'then'], a: 1, why: 'No sooner … than.' },
    { t: 'rewrite', q: 'I didn’t know that my friends were planning a surprise.', start: 'Little', a: ['Little did I know that my friends were planning a surprise', 'Little did I know my friends were planning a surprise'], why: 'Little + did + subject + base verb (know).' },
    { t: 'error', parts: ['Hardly', 'we had', 'started the game', 'when the power went off.'], wrong: 1, fix: 'had we', full: 'Hardly had we started the game when the power went off.', why: 'After Hardly → had + subject.' },
    { t: 'gap', q: 'Rarely ___ (I / feel) this nervous before a test.', a: ['do I feel', 'have I felt'], why: 'Rarely → auxiliary + subject: do I feel / have I felt.' },
    { t: 'mc', q: 'Not until the next morning ___ the message.', options: ['did she see', 'she saw', 'she did see'], a: 0, why: 'Not until … did + subject + base verb.' }
  ]
},
{
  id: 'past-modals',
  title: 'Modal Verbs in the Past',
  short: 'should have, might have, must have, couldn’t have — regrets and guesses about the past.',
  unit: 1, introducedIn: 8, practisedIn: [9], revisedIn: [10], level: 'B2',
  what: 'We use modal verb + have + V3 to talk about the past: what was a good idea (but didn’t happen), what possibly happened, and what we are almost sure did or didn’t happen.',
  whatUa: 'Модальне дієслово + have + V3 говорить про минуле: жаль або критику (should have), можливість (might have), упевнений висновок (must have) і неможливість (couldn’t have).',
  when: [
    'Regret / criticism — should have / shouldn’t have: it was (not) a good idea, but…',
    'Possibility — might have / might not have: maybe it happened, we’re not sure.',
    'Strong deduction — must have: I’m almost sure it happened.',
    'Impossible — couldn’t have: I’m sure it did NOT happen.'
  ],
  structure: [
    { label: 'Regret / criticism', formula: 'should (not) + have + V3', example: 'I should have charged my phone.' },
    { label: 'Possibility', formula: 'might (not) + have + V3', example: 'She might have fallen asleep.' },
    { label: 'Strong deduction', formula: 'must + have + V3', example: 'He must have passed the test.' },
    { label: 'Impossible', formula: 'couldn’t + have + V3', example: 'It couldn’t have been Mia.' }
  ],
  examples: [
    'I **should have charged** my phone — now it’s dead and I can’t call anyone.',
    'You **shouldn’t have shared** that screenshot without asking.',
    'She’s not answering. She **might have fallen** asleep.',
    'He **might not have seen** your message yet.',
    'Leo is smiling — he **must have passed** the test.',
    'It **couldn’t have been** Mia — she was at football practice all afternoon.'
  ],
  compare: {
    title: 'How sure are you?',
    cols: [
      { h: 'must have', formula: 'He must have taken it.', note: '≈ 90% YES — I’m almost sure he did.' },
      { h: 'might have', formula: 'He might have taken it.', note: '≈ 50% — maybe, maybe not.' },
      { h: 'couldn’t have', formula: 'He couldn’t have taken it.', note: '≈ 90% NO — I’m sure he didn’t.' }
    ]
  },
  mistakes: [
    { wrong: 'I should have went to bed earlier.', right: 'I should have gone to bed earlier.', why: 'After have, use V3 (gone), not the past simple (went).' },
    { wrong: 'She must have forget her keys.', right: 'She must have forgotten her keys.', why: 'must have + V3.' },
    { wrong: 'He mustn’t have seen it.', right: 'He couldn’t have seen it.', why: 'For an impossible past, use couldn’t have / can’t have — not mustn’t have.' },
    { wrong: 'You should of told me.', right: 'You should have told me.', why: '“should’ve” sounds like “should of”, but we write HAVE.' }
  ],
  practice: [
    { t: 'mc', q: 'All the lights are off. They ___ gone to bed already.', options: ['must have', 'should have', 'couldn’t have'], a: 0, why: 'Strong deduction from evidence (lights off) → must have.' },
    { t: 'mc', q: 'I failed the test. I ___ studied more.', options: ['must have', 'should have', 'might have'], a: 1, why: 'Regret: it was a good idea, but I didn’t do it → should have.' },
    { t: 'gap', q: 'Don’t worry — she ___ (not / get) your text yet. Her phone is often off.', a: ['might not have got', 'might not have gotten', 'may not have got', 'may not have gotten'], why: 'Possibility in the past (negative) → might not have + V3.' },
    { t: 'error', parts: ['It', 'mustn’t have been', 'Leo —', 'he was in Spain.'], wrong: 1, fix: 'couldn’t have been', full: 'It couldn’t have been Leo — he was in Spain.', why: 'Impossible past → couldn’t have + V3.' },
    { t: 'rewrite', q: 'It was a bad idea for me to post that photo.', start: 'I', a: ['I shouldn’t have posted that photo', 'I should not have posted that photo'], why: 'Criticism of a past action → shouldn’t have + V3.' },
    { t: 'mc', q: 'I can’t find my headphones anywhere. I ___ left them on the bus.', options: ['might have', 'should have', 'couldn’t have'], a: 0, why: 'A possible explanation — we’re not sure → might have.' }
  ]
},

/* ═════════════════════ UNIT 2 ═════════════════════ */
{
  id: 'causatives',
  title: 'Causative Structures',
  short: 'have / get something done, get someone to do something, make someone do something.',
  unit: 2, introducedIn: 12, practisedIn: [13], revisedIn: [20], level: 'B2',
  what: 'Causative structures show that somebody else does something for us, or that we cause someone to do something — by asking, persuading or forcing them.',
  whatUa: 'Каузативні конструкції показують, що дію виконує хтось інший для нас (have something done), або що ми просимо, переконуємо чи змушуємо когось щось зробити.',
  when: [
    'have / get something done — a service: someone does it for you (a haircut, a phone repair). get is more informal.',
    'have something done — also for bad experiences: “I had my bike stolen.”',
    'have somebody do something — you ask or arrange for someone to do it.',
    'get somebody to do something — you persuade someone.',
    'make somebody do something — you force someone; they have no choice.'
  ],
  structure: [
    { label: 'Service (formal)', formula: 'have + object + V3', example: 'I had my phone fixed.' },
    { label: 'Service (informal)', formula: 'get + object + V3', example: 'I got my hair cut.' },
    { label: 'Ask / arrange', formula: 'have + person + base verb', example: 'The coach had us run five laps.' },
    { label: 'Persuade', formula: 'get + person + to + base verb', example: 'I got my brother to help me.' },
    { label: 'Force', formula: 'make + person + base verb', example: 'Mum made me delete the game.' }
  ],
  examples: [
    'I’m **getting** my phone screen **fixed** — I dropped it again.',
    'She **had** her hair **dyed** blue for the concert.',
    'Our coach **had** us **run** five extra laps.',
    'I finally **got** my dad **to buy** me new headphones.',
    'My parents **make** me **switch off** my phone at dinner.',
    'Alex **had** his account **hacked** last week.'
  ],
  compare: {
    title: 'Who did it?',
    cols: [
      { h: 'I did it', formula: 'I fixed my phone.', note: 'I did the work myself.' },
      { h: 'Someone else did it', formula: 'I had my phone fixed.', note: 'A repair shop did it for me.' },
      { h: 'Persuade vs force', formula: 'I got him to help. / They made him help.', note: 'get … to = persuade; make … (no to) = force.' }
    ]
  },
  mistakes: [
    { wrong: 'I cut my hair yesterday at the hairdresser’s.', right: 'I had my hair cut yesterday.', why: 'If someone else did it, use have / get + object + V3.' },
    { wrong: 'I had fixed my bike at the shop.', right: 'I had my bike fixed at the shop.', why: 'Word order: the object comes BEFORE V3.' },
    { wrong: 'Mum made me to tidy my room.', right: 'Mum made me tidy my room.', why: 'After make somebody — no “to”.' },
    { wrong: 'I got him help me.', right: 'I got him to help me.', why: 'After get somebody — we need “to”.' }
  ],
  practice: [
    { t: 'mc', q: 'My hair is too long. I’m going to ___ tomorrow.', options: ['cut my hair', 'have my hair cut', 'have cut my hair'], a: 1, why: 'A service → have + object + V3.' },
    { t: 'gap', q: 'Our teacher made us ___ (write) the essay again.', a: ['write'], why: 'make + person + base verb (no to).' },
    { t: 'gap', q: 'I finally got my sister ___ (lend) me her jacket.', a: ['to lend'], why: 'get + person + TO + base verb.' },
    { t: 'error', parts: ['Leo', 'had', 'fixed his laptop', 'at a repair shop.'], wrong: 2, fix: 'his laptop fixed', full: 'Leo had his laptop fixed at a repair shop.', why: 'have + object + V3 — the object comes first.' },
    { t: 'rewrite', q: 'A photographer took our class photo.', start: 'We had', a: ['We had our class photo taken', 'We had our class photo taken by a photographer'], why: 'have + object + V3.' },
    { t: 'mc', q: 'Somebody stole my bike yesterday. → I ___ yesterday.', options: ['had my bike stolen', 'stole my bike', 'got stolen my bike'], a: 0, why: 'have something done also describes bad experiences.' }
  ]
},
{
  id: 'mixed-conditionals',
  title: 'Mixed Conditionals',
  short: 'Talk about how past situations affect the present — and how who you are affected the past.',
  unit: 2, introducedIn: 15, practisedIn: [16], revisedIn: [20], level: 'B2+',
  what: 'Mixed conditionals mix two times. The “if” part and the result are about DIFFERENT times — usually an imagined past with a result now.',
  whatUa: 'Змішані умовні речення поєднують різний час в умові й результаті. Найчастіше: нереальна дія в минулому → її наслідок зараз. Або навпаки: нереальна ситуація тепер (завжди) → наслідок у минулому.',
  when: [
    'Past cause → present result: imagine a different past and how NOW would be different.',
    'Present situation → past result: a general (unreal) fact about you explains a past event.',
    'To talk about regrets and “what if” moments.'
  ],
  structure: [
    { label: 'Past → Present', formula: 'If + Past Perfect → would + base verb', example: 'If I had gone to bed earlier, I wouldn’t be tired now.' },
    { label: 'Present → Past', formula: 'If + Past Simple → would have + V3', example: 'If I were braver, I would have spoken up yesterday.' }
  ],
  examples: [
    'If I **had gone** to bed earlier, I **wouldn’t be** tired now.',
    'If Mia **hadn’t posted** that video, she **wouldn’t be** famous at school today.',
    'If I **had saved** my pocket money, I **could buy** the new game now.',
    'If Leo **were** more organised, he **wouldn’t have missed** the deadline.',
    'If I **didn’t love** football so much, I **wouldn’t have joined** the team.',
    'If we **had left** on time, we **would be** at the concert right now.'
  ],
  compare: {
    title: 'Two kinds of mixed conditionals',
    cols: [
      { h: 'Past → Present', formula: 'If + had + V3, would + verb', ex: 'If I had studied, I would be at a better school now.', note: 'Changed past → different NOW.' },
      { h: 'Present → Past', formula: 'If + Past Simple, would have + V3', ex: 'If I weren’t so shy, I would have asked her yesterday.', note: 'Who I am (always) → what happened then.' }
    ]
  },
  mistakes: [
    { wrong: 'If I would have known, I would be there now.', right: 'If I had known, I would be there now.', why: 'Never use “would” in the if-part.' },
    { wrong: 'If I had slept more, I wouldn’t have been tired now.', right: 'If I had slept more, I wouldn’t be tired now.', why: '“now” = present result → would + base verb.' },
    { wrong: 'If she isn’t so shy, she would have asked.', right: 'If she weren’t so shy, she would have asked.', why: 'An unreal present situation → past simple (were).' }
  ],
  practice: [
    { t: 'mc', q: 'If I ___ my phone, I’d be able to call you now.', options: ['hadn’t lost', 'didn’t lose', 'wouldn’t lose'], a: 0, why: 'Past cause → present result: If + Past Perfect.' },
    { t: 'gap', q: 'If Leo had listened to the coach, he ___ (be) in the team now.', a: ['would be'], why: 'Present result → would + base verb.' },
    { t: 'mc', q: 'I’m scared of heights. If I ___ scared of heights, I would have tried the zipline yesterday.', options: ['weren’t', 'wouldn’t be', 'am not'], a: 0, why: 'Unreal present situation → If + Past Simple (weren’t). Never “would” in the if-part.' },
    { t: 'error', parts: ['If I', 'would have saved', 'my work,', 'I wouldn’t be so stressed now.'], wrong: 1, fix: 'had saved', full: 'If I had saved my work, I wouldn’t be so stressed now.', why: 'No “would” in the if-part → Past Perfect.' },
    { t: 'rewrite', q: 'I didn’t take a jacket, so I’m cold now.', start: 'If I had', a: ['If I had taken a jacket, I wouldn’t be cold now', 'If I had taken a jacket, I would not be cold now'], why: 'Past cause (had taken) → present result (wouldn’t be).' },
    { t: 'mc', q: 'Which sentence means: “She isn’t brave, so she didn’t sing at the party”?', options: ['If she were braver, she would have sung at the party.', 'If she had been braver, she would sing now.', 'If she is braver, she will sing.'], a: 0, why: 'Present situation (were) → past result (would have sung).' }
  ]
},
{
  id: 'reported-speech',
  title: 'Reported Speech',
  short: 'Tell people what someone said: tense shifts, time words and reporting verbs.',
  unit: 2, introducedIn: 18, practisedIn: [19], revisedIn: [20], level: 'B2',
  what: 'Reported speech is how we tell someone what another person said, without quoting their exact words. Usually the verb moves one step back into the past, and words like “today” or “here” change too.',
  whatUa: 'Непряма мова — це переказ чужих слів. Зазвичай час дієслова «зсувається» на крок у минуле, а слова часу й місця змінюються (today → that day, here → there). Дієслова admit, deny, warn показують, ЯК людина це сказала.',
  when: [
    'To retell conversations, chats, rumours and stories.',
    'When the reporting verb is in the past (said, told, admitted…), we usually shift tenses back.',
    'Reporting verbs (admit, deny, warn, insist, claim, confess) show HOW someone said something.'
  ],
  structure: [
    { table: { head: ['Direct speech', 'Reported speech'], rows: [
      ['present simple — “I am tired.”', 'past simple — she said she was tired'],
      ['present continuous — “I’m leaving.”', 'past continuous — he said he was leaving'],
      ['present perfect — “I’ve seen it.”', 'past perfect — she said she had seen it'],
      ['past simple — “I posted it.”', 'past perfect — he said he had posted it'],
      ['will — “I’ll help.”', 'would — she said she would help'],
      ['can — “I can come.”', 'could — he said he could come'],
      ['may — “I may be late.”', 'might — she said she might be late']
    ]}},
    { table: { head: ['Time & place', 'Changes to'], rows: [
      ['today', 'that day'], ['tomorrow', 'the next day'], ['yesterday', 'the day before'],
      ['now', 'then'], ['here', 'there'], ['this', 'that']
    ]}},
    { table: { head: ['Reporting verb', 'Pattern & example'], rows: [
      ['admit', 'admit + -ing / that — He admitted copying the answers.'],
      ['confess', 'confess (to) + -ing / that — She confessed to eating the cake.'],
      ['deny', 'deny + -ing / that — Max denied posting the rumour.'],
      ['warn', 'warn + person + (not) to — Mum warned me not to be late.'],
      ['insist', 'insist on + -ing / that — Nora insisted on paying.'],
      ['claim', 'claim + to / that — He claimed to know the singer.']
    ]}}
  ],
  examples: [
    '“I’m not going to the party.” → Nora **said** she **wasn’t going** to the party.',
    '“I’ve deleted the post.” → Max **told** us he **had deleted** the post.',
    '“I’ll call you tomorrow.” → Leo **said** he **would call** me **the next day**.',
    'Max **denied starting** the rumour.',
    'Mia **admitted** that she **had read** the chat.',
    'The teacher **warned** us **not to share** our passwords.'
  ],
  compare: {
    title: 'say vs tell',
    cols: [
      { h: 'say', formula: 'She said (that) she was tired.', note: 'No person after say. (say TO me — possible, but rare.)' },
      { h: 'tell', formula: 'She told me (that) she was tired.', note: 'tell + PERSON.' }
    ]
  },
  mistakes: [
    { wrong: 'She said me that she was tired.', right: 'She told me that she was tired.', why: 'tell + person; say without a person.' },
    { wrong: 'Yesterday he said he will help me.', right: 'Yesterday he said he would help me.', why: 'will → would in reported speech.' },
    { wrong: 'He denied to post it.', right: 'He denied posting it.', why: 'deny + -ing (or deny that…).' },
    { wrong: 'She asked where was the party.', right: 'She asked where the party was.', why: 'Reported questions use normal word order, not question order.' }
  ],
  practice: [
    { t: 'mc', q: '“I am bored,” said Leo. → Leo said he ___ bored.', options: ['is', 'was', 'has been'], a: 1, why: 'present simple → past simple.' },
    { t: 'gap', q: '“I will text you tomorrow.” → She said she would text me ___.', a: ['the next day', 'the following day'], why: 'tomorrow → the next day.' },
    { t: 'mc', q: '“Okay, okay — I took your charger.” → He ___ taking my charger.', options: ['denied', 'admitted', 'warned'], a: 1, why: 'He says it’s true → admitted + -ing.' },
    { t: 'error', parts: ['Nora', 'said me', 'that the rumour', 'wasn’t true.'], wrong: 1, fix: 'told me', full: 'Nora told me that the rumour wasn’t true.', why: 'tell + person.' },
    { t: 'rewrite', q: '“I have seen the video,” Max said.', start: 'Max said', a: ['Max said he had seen the video', 'Max said that he had seen the video'], why: 'present perfect → past perfect.' },
    { t: 'mc', q: '“Don’t touch my laptop!” → My brother ___ me not to touch his laptop.', options: ['denied', 'warned', 'claimed'], a: 1, why: 'warn + person + not to + verb.' },
    { t: 'gap', q: '“I didn’t post it!” → She denied ___ (post) it.', a: ['posting'], why: 'deny + -ing.' }
  ]
},

/* ═════════════════════ UNIT 3 ═════════════════════ */
{
  id: 'emphatic-do',
  title: 'Emphatic do / does / did',
  short: 'I DO care. She DOES have your back. Add power to a positive sentence.',
  unit: 3, introducedIn: 22, practisedIn: [23], revisedIn: [30], level: 'B2',
  what: 'We add do / does / did before the main verb in a POSITIVE sentence to make it stronger — especially when someone doubts us, or when we want to contrast.',
  whatUa: 'Ми додаємо do / does / did перед основним дієсловом у стверджувальному реченні, щоб посилити його: «я СПРАВДІ…», «вона ТАКИ…». Часто — коли хтось сумнівається або ми щось протиставляємо. У мовленні do/does/did наголошуємо.',
  when: [
    'To insist that something is true when someone doubts it.',
    'To contrast with what someone thought or said.',
    'To show strong feelings.',
    'For warm, strong invitations: “Do come to my party!”'
  ],
  structure: [
    { label: 'I / you / we / they (present)', formula: 'do + base verb', example: 'I do care.' },
    { label: 'he / she / it (present)', formula: 'does + base verb', example: 'She does have your back.' },
    { label: 'Past (everyone)', formula: 'did + base verb', example: 'We did drift apart.' }
  ],
  examples: [
    'I know I forget to reply sometimes, but I **do care** about you.',
    'She seems quiet, but she **does have** your back.',
    'We **did drift** apart after middle school — but now we’re close again.',
    '“You never help!” — “I **did help**! I made all the posters.”',
    'He **does talk** a lot, but he’s a great friend.',
    '**Do come** to my party — it won’t be the same without you!'
  ],
  compare: {
    title: 'Normal vs Emphatic',
    cols: [
      { h: 'Normal', formula: 'I care about you.', note: 'A simple statement.' },
      { h: 'Emphatic', formula: 'I do care about you.', note: 'Stronger — often an answer to doubt. Stress DO.' }
    ]
  },
  mistakes: [
    { wrong: 'She does has your back.', right: 'She does have your back.', why: 'After do / does / did → base verb (no -s).' },
    { wrong: 'We did drifted apart.', right: 'We did drift apart.', why: 'did + base verb, not the past form.' },
    { wrong: 'I do caring about you.', right: 'I do care about you.', why: 'do + base verb, not -ing.' }
  ],
  practice: [
    { t: 'mc', q: 'You think I don’t like your music? I ___ like it!', options: ['do', 'does', 'did'], a: 0, why: 'I + present → do.' },
    { t: 'gap', q: 'He forgot my birthday, but he ___ (send) me a message the next day.', a: ['did send'], why: 'Past → did + base verb.' },
    { t: 'error', parts: ['She', 'does knows', 'how to keep', 'a secret.'], wrong: 1, fix: 'does know', full: 'She does know how to keep a secret.', why: 'does + base verb (no -s).' },
    { t: 'rewrite', q: 'I really tried to call you! (use emphatic did)', start: 'I', a: ['I did try to call you'], why: 'did + base verb: did try.' },
    { t: 'mc', q: 'Which sentence is correct?', options: ['Max does love gaming.', 'Max does loves gaming.', 'Max do love gaming.'], a: 0, why: 'he / she → does + base verb.' },
    { t: 'gap', q: 'My sister ___ (look) just like my mum — everyone says so!', a: ['does look'], why: 'she + present → does + base verb.' }
  ]
},
{
  id: 'relative-prepositions',
  title: 'Relative Clauses with Prepositions',
  short: 'The person with whom I spoke (formal) vs the person I spoke with (informal).',
  unit: 3, introducedIn: 25, practisedIn: [26], revisedIn: [30], level: 'C1',
  what: 'Many verbs go with a preposition (talk to, rely on, belong to). In a relative clause, that preposition can go at the END (informal) or BEFORE whom / which (formal).',
  whatUa: 'Багато дієслів мають прийменник (talk to, rely on, belong to). У підрядному означальному реченні він може стояти В КІНЦІ (розмовний стиль) або ПЕРЕД whom / which (офіційний стиль).',
  when: [
    'Informal (speaking, chat): preposition at the end — often with no who / which at all.',
    'Formal (essays, speeches): preposition + whom (people) / which (things).',
    'Never: preposition + who, or preposition + that.'
  ],
  structure: [
    { label: 'Formal', formula: 'noun + preposition + whom / which + …', example: 'the person with whom I spoke' },
    { label: 'Informal', formula: 'noun + (who / that / which) + … + preposition', example: 'the person (who) I spoke with' }
  ],
  examples: [
    'She’s the friend **I can always rely on**.',
    'She’s the friend **on whom I can always rely**. (formal)',
    'This is the group chat **I was talking about**.',
    'The club **to which I belong** meets every Friday. (formal)',
    'That’s the girl **I went to camp with**.',
    'The coach, **with whom** we trained all summer, is leaving.'
  ],
  compare: {
    title: 'Informal vs Formal',
    cols: [
      { h: 'Informal', formula: 'the song I’m obsessed with', note: 'Natural in conversation.' },
      { h: 'Formal', formula: 'the song with which I am obsessed', note: 'Correct, but sounds very formal — good for essays.' }
    ]
  },
  mistakes: [
    { wrong: 'The person with who I spoke…', right: 'The person with whom I spoke…', why: 'After a preposition, use whom — not who.' },
    { wrong: 'The club to that I belong…', right: 'The club to which I belong… / The club (that) I belong to…', why: 'No preposition before that.' },
    { wrong: 'The friend on whom I rely on…', right: 'The friend on whom I rely…', why: 'Don’t use the preposition twice.' },
    { wrong: 'This is the film I told you.', right: 'This is the film I told you about.', why: 'Don’t forget the preposition at the end.' }
  ],
  practice: [
    { t: 'mc', q: 'She’s the teacher ___ I always talk to.', options: ['who', 'to whom', 'to who'], a: 0, why: 'Preposition at the end (talk to) → who / that / nothing before the clause.' },
    { t: 'mc', q: 'The friend ___ I shared my secret was very kind.', options: ['with whom', 'with who', 'whom with'], a: 0, why: 'Formal: preposition + whom.' },
    { t: 'error', parts: ['That’s the podcast', 'about that', 'I was telling', 'you.'], wrong: 1, fix: 'about which', full: 'That’s the podcast about which I was telling you.', why: 'No preposition before that → about which (or: the podcast I was telling you about).' },
    { t: 'rewrite', q: 'The team for which I play has won again. (make it informal)', start: 'The team', a: ['The team I play for has won again', 'The team that I play for has won again', 'The team which I play for has won again'], why: 'Informal: preposition goes to the end.' },
    { t: 'gap', q: 'This is the boy ___ whom I went to the concert.', a: ['with'], why: 'go with someone → with whom.' },
    { t: 'error', parts: ['The app', 'on which', 'I spend hours', 'on', 'is free.'], wrong: 3, fix: 'remove the second “on”', full: 'The app on which I spend hours is free.', why: 'The preposition is already before which — don’t repeat it.' }
  ]
},
{
  id: 'cleft-sentences',
  title: 'Cleft Sentences',
  short: 'It was Max who… / What I need is… / All I wanted was… — spotlight one part of your message.',
  unit: 3, introducedIn: 28, practisedIn: [29], revisedIn: [30], level: 'C1',
  what: 'Cleft sentences split one idea into two parts to put a spotlight on the most important information.',
  whatUa: 'Розщеплені (cleft) речення ділять думку на дві частини, щоб «підсвітити» найважливішу інформацію: It was Mia who…, What I need is…, All I wanted was…',
  when: [
    'To correct a misunderstanding: “It was Leo, not Max, who…”',
    'To emphasise what you want, need, feel or like: “What I love is…”',
    'All … is / was = the only thing: “All I wanted was an apology.”'
  ],
  structure: [
    { label: 'It-cleft', formula: 'It is / was + FOCUS + who / that + …', example: 'It was Max who started the rumour.' },
    { label: 'What-cleft', formula: 'What + subject + verb + is / was + FOCUS', example: 'What I need is a break.' },
    { label: 'All-cleft', formula: 'All + subject + verb + is / was + FOCUS', example: 'All I wanted was an apology.' }
  ],
  examples: [
    '**It was Max who** started the rumour, not Leo.',
    '**It’s** your honesty **that** I really respect.',
    '**What I need** right now **is** a long weekend.',
    '**What annoyed me was** that nobody told me.',
    '**All I wanted was** a simple “sorry”.',
    '**It wasn’t until** Friday **that** we patched things up.'
  ],
  compare: {
    title: 'One fact, three spotlights',
    cols: [
      { h: 'Normal', formula: 'Max started the rumour.', note: 'No special focus.' },
      { h: 'It-cleft', formula: 'It was Max who started the rumour.', note: 'Focus on WHO — Max, not anyone else.' },
      { h: 'What-cleft', formula: 'What Max started was a rumour.', note: 'Focus on WHAT he started.' }
    ]
  },
  mistakes: [
    { wrong: 'It was Mia which helped me.', right: 'It was Mia who helped me.', why: 'For people → who / that, not which.' },
    { wrong: 'What I need it is sleep.', right: 'What I need is sleep.', why: 'No extra “it”.' },
    { wrong: 'All what I wanted was an apology.', right: 'All I wanted was an apology.', why: 'No “what” after All.' }
  ],
  practice: [
    { t: 'mc', q: '___ was Leo who found my phone.', options: ['It', 'What', 'All'], a: 0, why: 'It-cleft: It was + person + who…' },
    { t: 'mc', q: '___ I love about summer is sleeping late.', options: ['What', 'It', 'That'], a: 0, why: 'What-cleft: What + subject + verb + is…' },
    { t: 'rewrite', q: 'Nora broke the window. (focus on Nora)', start: 'It was', a: ['It was Nora who broke the window', 'It was Nora that broke the window'], why: 'It was + FOCUS + who…' },
    { t: 'error', parts: ['All', 'what I wanted', 'was', 'a quiet weekend.'], wrong: 1, fix: 'I wanted', full: 'All I wanted was a quiet weekend.', why: 'No “what” after All.' },
    { t: 'rewrite', q: 'I need some sleep.', start: 'What I', a: ['What I need is some sleep', 'What I need is sleep'], why: 'What + I + need + is + FOCUS.' },
    { t: 'gap', q: 'It ___ my best friend who helped me last year.', a: ['was'], why: 'Past situation → It was.' }
  ]
},

/* ═════════════════════ UNIT 4 ═════════════════════ */
{
  id: 'nominalisation',
  title: 'Nominalisation',
  short: 'Turn verbs and adjectives into nouns: achieve → achievement, unique → uniqueness.',
  unit: 4, introducedIn: 32, practisedIn: [33], revisedIn: [40], level: 'C1',
  what: 'Nominalisation means turning a verb or an adjective into a noun. It makes your writing sound more formal and lets you talk about ideas as “things”.',
  whatUa: 'Номіналізація — це перетворення дієслова чи прикметника на іменник (achieve → achievement). Так текст звучить офіційніше, а дії та якості стають «предметами», про які можна говорити.',
  when: [
    'In essays, presentations, reviews and reports.',
    'To sound more formal and academic.',
    'To sum up an action as one idea: “His decision surprised everyone.”'
  ],
  structure: [
    { table: { head: ['Suffix', 'Examples'], rows: [
      ['verb + -tion / -sion', 'recognise → recognition · transform → transformation · decide → decision'],
      ['verb + -ment', 'achieve → achievement · develop → development · improve → improvement'],
      ['verb / adj + -ance / -ence', 'perform → performance · confident → confidence · independent → independence'],
      ['adjective + -ity', 'creative → creativity · curious → curiosity · popular → popularity'],
      ['adjective + -ness', 'unique → uniqueness · aware → awareness · kind → kindness']
    ]}},
    { label: 'Typical pattern', formula: 'the + noun + of + …', example: 'The transformation of our school took a year.' }
  ],
  examples: [
    'He **improved** a lot. → His **improvement** was amazing.',
    'She **decided** to quit — her **decision** shocked everyone.',
    'Winning the tournament was a huge **achievement** for our team.',
    'Young artists need more **recognition**.',
    'Her **creativity** really turns heads.',
    'I love the **uniqueness** of his sneaker designs.'
  ],
  compare: {
    title: 'Verb style vs Noun style',
    cols: [
      { h: 'Verb style (spoken)', formula: 'Our team performed brilliantly, so everyone was happy.', note: 'Natural in conversation.' },
      { h: 'Noun style (written)', formula: 'The team’s brilliant performance made everyone happy.', note: 'Shorter, more formal — great for essays.' }
    ]
  },
  mistakes: [
    { wrong: 'His achieve was amazing.', right: 'His achievement was amazing.', why: 'After his / the / a we need a noun.' },
    { wrong: 'The recognisation of young artists…', right: 'The recognition of young artists…', why: 'Learn the spelling: recognise → recognition.' },
    { wrong: 'I admire her unique.', right: 'I admire her uniqueness.', why: 'unique is an adjective — you need the noun.' }
  ],
  practice: [
    { t: 'mc', q: 'The ___ of the city park took two years.', options: ['transform', 'transformation', 'transforming'], a: 1, why: 'After “the … of” → a noun.' },
    { t: 'gap', q: 'achieve → ___', a: ['achievement'], why: 'verb + -ment.' },
    { t: 'gap', q: 'aware → ___', a: ['awareness'], why: 'adjective + -ness.' },
    { t: 'mc', q: 'Her ___ on stage was unforgettable.', options: ['perform', 'performance', 'performment'], a: 1, why: 'perform → performance (-ance).' },
    { t: 'rewrite', q: 'She decided to quit, and this surprised everyone.', start: 'Her decision', a: ['Her decision to quit surprised everyone'], why: 'decide → decision: the action becomes the subject.' },
    { t: 'error', parts: ['Everyone talks about', 'the popular', 'of the new', 'game.'], wrong: 1, fix: 'the popularity', full: 'Everyone talks about the popularity of the new game.', why: 'popular → popularity (-ity).' },
    { t: 'gap', q: 'curious → ___', a: ['curiosity'], why: 'adjective + -ity (curious → curiosity).' }
  ]
},
{
  id: 'advanced-conditionals',
  title: 'Advanced Conditionals',
  short: 'as long as, provided that, even if, suppose, what if — conditions without “if”.',
  unit: 4, introducedIn: 35, practisedIn: [36], revisedIn: [40], level: 'B2+',
  what: 'Instead of “if”, we can use other words to show conditions: as long as, provided that, on condition that, even if, suppose / supposing and what if. They work in all types of conditionals.',
  whatUa: 'Замість if можна вживати інші сполучники умови: as long as, provided that (за умови що), on condition that, even if (навіть якщо), suppose / supposing і what if (а що як). Вони працюють у всіх типах умовних речень.',
  when: [
    'as long as / provided (that) / on condition that = ONLY if (a strict condition). provided / on condition that sound more formal.',
    'even if = the result doesn’t change, whatever happens.',
    'suppose / supposing / what if = imagine a situation, often as a question.'
  ],
  structure: [
    { label: 'First Conditional', formula: 'As long as / Provided that + present → will …', example: 'As long as you finish your homework, you can play.' },
    { label: 'Second Conditional', formula: 'Suppose / What if + past simple → would …', example: 'What if you won the tournament?' },
    { label: 'Third Conditional', formula: 'Even if / Supposing + past perfect → would have + V3', example: 'Even if we had trained more, we would have lost.' },
    { label: 'Mixed Conditional', formula: 'Suppose + past perfect → would + base verb', example: 'Suppose you had moved to Canada — would you be happier now?' }
  ],
  examples: [
    'You can borrow my controller **as long as** you give it back tomorrow.',
    '**Provided that** it doesn’t rain, the match will go ahead.',
    'They let him join the team **on condition that** he came to every practice.',
    '**Even if** I studied all night, I wouldn’t understand this topic.',
    '**Suppose** you **got** a million followers — what would you post?',
    '**What if** we **had missed** the bus? We’d still be standing there!'
  ],
  compare: {
    title: 'if vs even if',
    cols: [
      { h: 'if', formula: 'If it rains, we’ll stay at home.', note: 'Rain → the plan changes.' },
      { h: 'even if', formula: 'Even if it rains, we’ll play.', note: 'Rain → the plan does NOT change.' },
      { h: 'as long as', formula: 'We’ll play as long as it doesn’t rain.', note: 'Only on this condition.' }
    ]
  },
  mistakes: [
    { wrong: 'As long as you will help me, I’ll finish.', right: 'As long as you help me, I’ll finish.', why: 'No will after as long as / provided that — use the present.' },
    { wrong: 'Even I study, I can’t remember it.', right: 'Even if I study, I can’t remember it.', why: 'Don’t drop “if” — even if.' },
    { wrong: 'Suppose you would win, what would you do?', right: 'Suppose you won, what would you do?', why: 'No would after suppose — use the past simple.' }
  ],
  practice: [
    { t: 'mc', q: 'You can come with us ___ you don’t tell my parents.', options: ['even if', 'as long as', 'unless'], a: 1, why: 'A strict condition → as long as.' },
    { t: 'mc', q: '___ he says sorry, I won’t forgive him this time.', options: ['Even if', 'Provided that', 'As long as'], a: 0, why: 'The result won’t change → even if.' },
    { t: 'gap', q: 'Provided that you ___ (finish) the project on time, you’ll get a good mark.', a: ['finish'], why: 'Provided that + present simple (no will).' },
    { t: 'error', parts: ['As long as', 'you will practise', 'every day,', 'you’ll improve.'], wrong: 1, fix: 'you practise', full: 'As long as you practise every day, you’ll improve.', why: 'No will after as long as.' },
    { t: 'mc', q: '___ you lost your phone on a trip — what would you do?', options: ['Even if', 'Suppose', 'Provided'], a: 1, why: 'Imagine a situation → Suppose + past simple.' },
    { t: 'rewrite', q: 'You can stay up late, but only if you do your chores first.', start: 'As long as', a: ['As long as you do your chores first, you can stay up late'], why: 'as long as = only if.' }
  ]
},
{
  id: 'reduced-relatives',
  title: 'Reduced Relative Clauses',
  short: 'The girl (who is) creating music… The song (that was) recorded yesterday…',
  unit: 4, introducedIn: 38, practisedIn: [39], revisedIn: [40], level: 'B2+',
  what: 'We can make relative clauses shorter by removing who / which / that + be. If the meaning is active → use -ing. If the meaning is passive → use V3.',
  whatUa: 'Підрядне означальне речення можна скоротити: прибрати who / which / that + be. Активне значення (хтось робить дію) → -ing. Пасивне значення (дію роблять з кимось / чимось) → V3.',
  when: [
    'To make writing shorter and smoother.',
    'In descriptions, news, captions and stories.',
    'Active: the person / thing DOES the action → -ing.',
    'Passive: something IS DONE to the person / thing → V3.'
  ],
  structure: [
    { label: 'Active (with be)', formula: 'who / that + is / was + V-ing → V-ing', example: 'The girl who is creating music → the girl creating music' },
    { label: 'Active (other verbs)', formula: 'who + verb → V-ing', example: 'Students who want to join → students wanting to join' },
    { label: 'Passive', formula: 'that / which + is / was + V3 → V3', example: 'The song that was recorded yesterday → the song recorded yesterday' }
  ],
  examples: [
    'The girl **creating** music in the corner is my sister.',
    'The song **recorded** yesterday is already online.',
    'Anyone **wanting** to join the club should talk to Ms Lee.',
    'The posters **made** by our class won first prize.',
    'Who’s the boy **sitting** next to Leo?',
    'Games **released** this year look amazing.'
  ],
  compare: {
    title: 'Active vs Passive reduction',
    cols: [
      { h: 'Active → -ing', formula: 'the player who is scoring → the player scoring', ex: 'The player scoring all the goals is new.', note: 'The player DOES it.' },
      { h: 'Passive → V3', formula: 'the goal that was scored → the goal scored', ex: 'The goal scored in the last minute won the cup.', note: 'The goal WAS DONE.' }
    ]
  },
  mistakes: [
    { wrong: 'The girl created music is my sister.', right: 'The girl creating music is my sister.', why: 'She is doing the action → -ing.' },
    { wrong: 'The photos taking at the party…', right: 'The photos taken at the party…', why: 'Photos don’t take — they ARE taken → V3.' },
    { wrong: 'The boy is sitting next to me is new.', right: 'The boy sitting next to me is new.', why: 'Remove “is” too.' }
  ],
  practice: [
    { t: 'mc', q: 'The boy ___ the guitar is in my class.', options: ['playing', 'played', 'is playing'], a: 0, why: 'He does the action → -ing.' },
    { t: 'mc', q: 'The cake ___ by my grandma was delicious.', options: ['making', 'made', 'is made'], a: 1, why: 'The cake was made → V3.' },
    { t: 'rewrite', q: 'The video that was posted last night has 10k views.', start: 'The video', a: ['The video posted last night has 10k views'], why: 'Passive → remove that was, keep V3.' },
    { t: 'error', parts: ['The students', 'took part', 'in the contest', 'got medals.'], wrong: 1, fix: 'taking part', full: 'The students taking part in the contest got medals.', why: 'Active → -ing.' },
    { t: 'gap', q: 'Anyone ___ (want) tickets should message me.', a: ['wanting'], why: 'who want → wanting.' },
    { t: 'rewrite', q: 'The girl who is dancing on stage is my best friend.', start: 'The girl', a: ['The girl dancing on stage is my best friend'], why: 'Active → remove who is, keep -ing.' }
  ]
},

/* ═════════════════════ UNIT 5 ═════════════════════ */
{
  id: 'participle-clauses',
  title: 'Participle Clauses',
  short: 'Feeling nervous, I… Having finished, she… Inspired by…, he… — short, stylish clauses.',
  unit: 5, introducedIn: 42, practisedIn: [43], revisedIn: [50], level: 'C1',
  what: 'Participle clauses are short clauses without a subject and a full verb. They start with -ing, having + V3, or V3 and make sentences shorter and more stylish. The subject of both parts must be the SAME.',
  whatUa: 'Дієприкметникові / дієприслівникові звороти — короткі частини речення без підмета: з -ing, having + V3 або V3. Вони роблять текст стислішим і «літературнішим». Важливо: підмет звороту = підмет головного речення!',
  when: [
    '-ing — two actions at the same time, or a reason.',
    'Having + V3 — one action was completed before the next.',
    'V3 / -ed — passive meaning (something was done to the subject).',
    'Always check: the subject of the clause = the subject of the main sentence.'
  ],
  structure: [
    { label: 'Same time / reason', formula: 'V-ing …, + main clause', example: 'Feeling nervous, I checked my notes again.' },
    { label: 'Completed earlier', formula: 'Having + V3 …, + main clause', example: 'Having finished the test, she left early.' },
    { label: 'Passive meaning', formula: 'V3 …, + main clause', example: 'Built in 1900, the school is very old.' },
    { label: 'Negative', formula: 'Not + V-ing / Not having + V3', example: 'Not knowing what to say, Leo just smiled.' }
  ],
  examples: [
    '**Walking** into the room, I felt everyone look at me.',
    '**Not knowing** what to say, Leo just smiled.',
    '**Having finished** the project, we finally went out for pizza.',
    '**Having failed** once, she knew exactly what to change.',
    '**Inspired** by her coach, Mia started training every day.',
    '**Written** in just one night, the song became the school anthem.'
  ],
  compare: {
    title: 'Full clause → participle clause',
    cols: [
      { h: 'Reason (-ing)', formula: 'Because I felt tired, I went to bed. → Feeling tired, I went to bed.', note: 'Same time / reason.' },
      { h: 'Earlier (having + V3)', formula: 'After she had saved the file, she closed it. → Having saved the file, she closed it.', note: 'First one action, then the other.' },
      { h: 'Passive (V3)', formula: 'The book, which was written in 1950, … → Written in 1950, the book …', note: 'Something was done to the subject.' }
    ]
  },
  mistakes: [
    { wrong: 'Walking to school, the rain started.', right: 'Walking to school, I got caught in the rain.', why: 'The subject must be the same — the rain wasn’t walking!' },
    { wrong: 'Having finish the test, I left.', right: 'Having finished the test, I left.', why: 'having + V3.' },
    { wrong: 'Inspiring by the film, he started drawing.', right: 'Inspired by the film, he started drawing.', why: 'Passive meaning (he was inspired) → V3.' }
  ],
  practice: [
    { t: 'mc', q: '___ that I was late, I ran to the bus stop.', options: ['Realising', 'Realised', 'Having realise'], a: 0, why: 'Reason / same time, active → -ing.' },
    { t: 'mc', q: '___ his homework, Leo went to play football.', options: ['Having finished', 'Finished', 'Having finish'], a: 0, why: 'Completed before the next action → Having + V3.' },
    { t: 'mc', q: '___ by her friends, Mia felt more confident.', options: ['Supporting', 'Supported', 'Having support'], a: 1, why: 'Mia was supported → passive → V3.' },
    { t: 'rewrite', q: 'Because I didn’t know the answer, I stayed quiet.', start: 'Not', a: ['Not knowing the answer, I stayed quiet'], why: 'Negative reason → Not + V-ing.' },
    { t: 'error', parts: ['Having', 'eat', 'dinner,', 'we watched a film.'], wrong: 1, fix: 'eaten', full: 'Having eaten dinner, we watched a film.', why: 'having + V3 (eaten).' },
    { t: 'gap', q: '___ (write) by a 15-year-old, the book became a bestseller.', a: ['Written'], why: 'The book was written → V3.' }
  ]
},
{
  id: 'but-for',
  title: 'Third Conditional with “But for”',
  short: 'But for your help, I would have failed. — what (or who) changed the past.',
  unit: 5, introducedIn: 45, practisedIn: [46], revisedIn: [50], level: 'C1',
  what: '“But for…” means “if it had not been for…”. It shows that one thing — a person, some help, an event — changed the result in the past. It is a short, formal way to build a Third Conditional.',
  whatUa: 'But for… = «якби не…». Показує, що щось (людина, допомога, подія) змінило результат у минулому. Це коротший і формальніший варіант третього умовного речення. Після but for — іменник, а не ціле речення.',
  when: [
    'To thank someone or explain what saved or changed a situation.',
    'In formal speaking and writing (speeches, essays, stories).',
    'After but for we use a NOUN (your help, the rain, my coach) — not a full clause.'
  ],
  structure: [
    { label: 'But for', formula: 'But for + noun → would (not) have + V3', example: 'But for your help, I would have failed.' },
    { label: 'If it hadn’t been for', formula: 'If it hadn’t been for + noun → would have + V3', example: 'If it hadn’t been for the rain, we would have won.' },
    { label: 'Had it not been for (most formal)', formula: 'Had it not been for + noun → would have + V3', example: 'Had it not been for my coach, I would have quit.' },
    { label: 'Connection with Third Conditional', formula: 'If + had + V3 → would have + V3', example: 'If you hadn’t helped me, I would have failed.' }
  ],
  examples: [
    '**But for** your help, I **would have failed** the test.',
    '**But for** the referee’s mistake, we **would have won** the final.',
    '**If it hadn’t been for** my sister, I **would never have found** my true vocation.',
    '**Had it not been for** the GPS, we **would have got** completely lost.',
    '**But for** that one comment, the video **wouldn’t have gone** viral.',
    '**If it hadn’t been for** the lag, I **would have beaten** him.'
  ],
  compare: {
    title: 'Same meaning, three levels of formality',
    cols: [
      { h: 'Third Conditional', formula: 'If you hadn’t helped me, I would have failed.', note: 'Neutral.' },
      { h: 'But for', formula: 'But for your help, I would have failed.', note: 'Short and formal — noun after but for.' },
      { h: 'Had it not been for', formula: 'Had it not been for your help, I would have failed.', note: 'Most formal (inversion).' }
    ]
  },
  mistakes: [
    { wrong: 'But for you helped me, I would have failed.', right: 'But for your help, I would have failed.', why: 'After but for → a noun, not a clause.' },
    { wrong: 'But for the rain, we would win.', right: 'But for the rain, we would have won.', why: 'Past result → would have + V3.' },
    { wrong: 'If it wasn’t been for my coach…', right: 'If it hadn’t been for my coach…', why: 'If it hadn’t been for (past perfect).' },
    { wrong: 'Had not it been for…', right: 'Had it not been for…', why: 'Word order: Had + it + not + been for.' }
  ],
  practice: [
    { t: 'mc', q: '___ my coach, I would have quit the team.', options: ['But for', 'But if', 'Even'], a: 0, why: 'But for + noun → would have + V3.' },
    { t: 'gap', q: 'But for the traffic jam, we ___ (arrive) on time.', a: ['would have arrived'], why: 'Past result → would have + V3.' },
    { t: 'mc', q: '___ it not been for her advice, I would have made a big mistake.', options: ['Had', 'If', 'Has'], a: 0, why: 'Had it not been for… (inversion).' },
    { t: 'rewrite', q: 'If you hadn’t helped me, I would have failed.', start: 'But for', a: ['But for your help, I would have failed', 'But for you, I would have failed'], why: 'But for + noun (your help).' },
    { t: 'error', parts: ['But for', 'you warned me,', 'I would have', 'missed the bus.'], wrong: 1, fix: 'your warning', full: 'But for your warning, I would have missed the bus.', why: 'After but for → a noun, not a clause.' },
    { t: 'gap', q: 'If it ___ been for the storm, the concert would have gone ahead.', a: ['hadn’t', 'had not'], why: 'If it hadn’t been for…' }
  ]
},
{
  id: 'concessive-clauses',
  title: 'Concessive Clauses',
  short: 'although, even though, despite, in spite of, however — contrast done right.',
  unit: 5, introducedIn: 48, practisedIn: [49], revisedIn: [50], level: 'B2',
  what: 'Concessive clauses show contrast: one thing is true, but something surprising also happens. The tricky part: different linkers need different structures after them.',
  whatUa: 'Допустові конструкції показують контраст: «хоча…, але все одно…». Головне — структура: після although / even though / while — ціле речення; після despite / in spite of — іменник або -ing; however / nevertheless / yet — на початку нового речення чи частини.',
  when: [
    'To contrast two ideas.',
    'To show that something happened in spite of a problem.',
    'In essays, stories and presentations — they make your English sound more advanced.'
  ],
  structure: [
    { label: 'Full clause', formula: 'Although / Even though / While + subject + verb', example: 'Although it was raining, we played.' },
    { label: 'Noun or -ing', formula: 'Despite / In spite of + noun / V-ing', example: 'Despite the rain, we played. / Despite being tired, …' },
    { label: 'With a clause', formula: 'Despite the fact that + subject + verb', example: 'Despite the fact that it was raining, we played.' },
    { label: 'New sentence', formula: 'Sentence. However, / Nevertheless, + sentence', example: 'It was raining. However, we played.' },
    { label: 'Same sentence', formula: '…, yet + subject + verb', example: 'It was raining, yet we played.' }
  ],
  examples: [
    '**Although** I was nervous, I sang the whole song.',
    '**Even though** we drifted apart, I still miss her.',
    '**Despite** the lag, we won the match.',
    '**In spite of** feeling tired, Leo finished his project.',
    'The test was really hard. **However**, most of us passed.',
    'She lost the first round, **yet** she came back stronger.'
  ],
  compare: {
    title: 'One idea, three structures',
    cols: [
      { h: 'Although + clause', formula: 'Although it was raining, we played.', note: 'Subject + verb after although.' },
      { h: 'Despite + noun / -ing', formula: 'Despite the rain, we played.', note: 'No subject + verb after despite.' },
      { h: 'However + new sentence', formula: 'It was raining. However, we played.', note: 'Two separate sentences.' }
    ]
  },
  mistakes: [
    { wrong: 'Despite it was raining, we played.', right: 'Despite the rain, we played. / Although it was raining, we played.', why: 'Despite + noun / -ing — not a full clause.' },
    { wrong: 'In spite of I was tired, I went.', right: 'In spite of being tired, I went.', why: 'In spite of + -ing.' },
    { wrong: 'Although I was tired, but I went.', right: 'Although I was tired, I went.', why: 'Don’t use although and but together.' },
    { wrong: 'Despite of the rain, we played.', right: 'Despite the rain / In spite of the rain, we played.', why: 'despite — without “of”.' }
  ],
  practice: [
    { t: 'mc', q: '___ the bad weather, the match went ahead.', options: ['Although', 'Despite', 'However'], a: 1, why: 'A noun follows → despite.' },
    { t: 'mc', q: '___ she was scared, she jumped into the pool.', options: ['Despite', 'In spite of', 'Although'], a: 2, why: 'A full clause follows (she was scared) → although.' },
    { t: 'gap', q: 'In spite of ___ (be) the youngest, she won.', a: ['being'], why: 'In spite of + -ing.' },
    { t: 'error', parts: ['Although', 'I studied a lot,', 'but', 'I failed the test.'], wrong: 2, fix: 'remove “but”', full: 'Although I studied a lot, I failed the test.', why: 'Don’t use although and but together.' },
    { t: 'rewrite', q: 'Although he was injured, he played the final.', start: 'Despite', a: ['Despite being injured, he played the final', 'Despite his injury, he played the final', 'Despite the fact that he was injured, he played the final'], why: 'Despite + -ing / noun / the fact that…' },
    { t: 'mc', q: 'The game was really expensive. ___, I bought it.', options: ['Despite', 'Although', 'Nevertheless'], a: 2, why: 'A new sentence after a full stop → Nevertheless / However.' }
  ]
}

/* Нова тема — скопіюйте будь-який об'єкт вище й поставте кому перед ним. */
];
