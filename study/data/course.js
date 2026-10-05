/* ═══════════════════════════════════════════════════════════════
   COURSE MAP — юніти й уроки курсу Advanced Kids
   Цей файл описує ЛИШЕ структуру курсу. Слова — у vocabulary-data.js,
   граматика — у grammar-data.js. Посилання на сторінки уроків платформа
   бере зі списку LESSONS у index.html: якщо уроку там ще немає, номер
   уроку просто показується текстом (без посилання).

   kind:
     'vocab'          — урок з новою лексикою
     'grammar'        — граматичний урок
     'revision'       — повторення двох попередніх уроків (reviews: [від, до])
     'unit-revision'  — повторення всього юніту
     'course-review'  — фінальне повторення курсу

   Урок 52+ — просто допишіть рядок у потрібний юніт (або новий юніт).
   ═══════════════════════════════════════════════════════════════ */

window.AK_COURSE = {
  units: [
    { n: 1, title: 'Identity & Self-Expression', lessons: [
      { n: 1,  kind: 'vocab',         title: 'Wearing a Mask?' },
      { n: 2,  kind: 'grammar',       title: 'Perfect Tenses' },
      { n: 3,  kind: 'revision',      title: 'Revision', reviews: [1, 2] },
      { n: 4,  kind: 'vocab',         title: 'Labels and Boxes' },
      { n: 5,  kind: 'grammar',       title: 'The Night Everything Went Wrong' },
      { n: 6,  kind: 'revision',      title: 'The Unlabelled Room', reviews: [4, 5] },
      { n: 7,  kind: 'vocab',         title: 'Inner Critic / Self-Talk' },
      { n: 8,  kind: 'grammar',       title: 'Modal Verbs in the Past' },
      { n: 9,  kind: 'revision',      title: 'Revision', reviews: [7, 8] },
      { n: 10, kind: 'unit-revision', title: 'Unit 1 Revision', reviews: [1, 9] }
    ]},
    { n: 2, title: 'Digital Life & Social Media Pressure', lessons: [
      { n: 11, kind: 'vocab',         title: 'Filters and FOMO' },
      { n: 12, kind: 'grammar',       title: 'Causative Structures' },
      { n: 13, kind: 'revision',      title: 'The Post That Disappeared', reviews: [11, 12] },
      { n: 14, kind: 'vocab',         title: 'Likes Don’t Equal Love' },
      { n: 15, kind: 'grammar',       title: 'If Only I Had Known…' },
      { n: 16, kind: 'revision',      title: 'The Hype Detector', reviews: [14, 15] },
      { n: 17, kind: 'vocab',         title: 'Algorithm & Screen Time' },
      { n: 18, kind: 'grammar',       title: 'Who Actually Said That?' },
      { n: 19, kind: 'revision',      title: 'Revision', reviews: [17, 18] },
      { n: 20, kind: 'unit-revision', title: 'Unit 2 Revision', reviews: [11, 19] }
    ]},
    { n: 3, title: 'Relationships, Belonging & Conflict', lessons: [
      { n: 21, kind: 'vocab',         title: 'Real Ones Only' },
      { n: 22, kind: 'grammar',       title: 'Emphatic do / does / did' },
      { n: 23, kind: 'revision',      title: 'Revision', reviews: [21, 22] },
      { n: 24, kind: 'vocab',         title: 'Belonging & Being Left Out' },
      { n: 25, kind: 'grammar',       title: 'Relative Clauses with Prepositions' },
      { n: 26, kind: 'revision',      title: 'Revision', reviews: [24, 25] },
      { n: 27, kind: 'vocab',         title: 'Conflict & Repair' },
      { n: 28, kind: 'grammar',       title: 'Cleft Sentences' },
      { n: 29, kind: 'revision',      title: 'Revision', reviews: [27, 28] },
      { n: 30, kind: 'unit-revision', title: 'Unit 3 Revision', reviews: [21, 29] }
    ]},
    { n: 4, title: 'Obsessions, Gaming & Flow State', lessons: [
      { n: 31, kind: 'vocab',         title: 'My Weird Obsession' },
      { n: 32, kind: 'grammar',       title: 'Nominalisation' },
      { n: 33, kind: 'revision',      title: 'Revision', reviews: [31, 32] },
      { n: 34, kind: 'vocab',         title: 'Game On' },
      { n: 35, kind: 'grammar',       title: 'Advanced Conditionals' },
      { n: 36, kind: 'revision',      title: 'Revision', reviews: [34, 35] },
      { n: 37, kind: 'vocab',         title: 'Flow State / Passion Pulse' },
      { n: 38, kind: 'grammar',       title: 'Reduced Relative Clauses' },
      { n: 39, kind: 'revision',      title: 'Revision', reviews: [37, 38] },
      { n: 40, kind: 'unit-revision', title: 'Unit 4 Revision', reviews: [31, 39] }
    ]},
    { n: 5, title: 'Future, Identity, Growth & Resilience', lessons: [
      { n: 41, kind: 'vocab',         title: 'What’s the Plan? / Finding Your Path' },
      { n: 42, kind: 'grammar',       title: 'Participle Clauses' },
      { n: 43, kind: 'revision',      title: 'Revision', reviews: [41, 42] },
      { n: 44, kind: 'vocab',         title: 'Personality & Strengths' },
      { n: 45, kind: 'grammar',       title: 'Third Conditional with “But for”' },
      { n: 46, kind: 'revision',      title: 'Revision', reviews: [44, 45] },
      { n: 47, kind: 'vocab',         title: 'Grit & Growth / Overcoming Setbacks' },
      { n: 48, kind: 'grammar',       title: 'Concessive Clauses' },
      { n: 49, kind: 'revision',      title: 'Revision', reviews: [47, 48] },
      { n: 50, kind: 'unit-revision', title: 'Unit 5 Revision', reviews: [41, 49] },
      { n: 51, kind: 'course-review', title: 'Final Course Review', reviews: [1, 50] }
    ]}
  ]
};
