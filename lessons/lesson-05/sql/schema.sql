-- ═══════════════════════════════════════════════════════════════════════
--  Lesson 5 — Inversion for Emphasis
--  Опційне збереження відповідей учнів.
--  Виконайте цей файл у Supabase → SQL Editor, потім поставте
--  SAVE_ANSWERS: true у window.LESSON_CONFIG всередині index.html.
--
--  Для самого live-режиму (broadcast) ці таблиці НЕ потрібні.
-- ═══════════════════════════════════════════════════════════════════════

create table if not exists public.lesson_answers (
  id            bigserial primary key,
  created_at    timestamptz not null default now(),
  lesson        text        not null,            -- 'lesson5-inversion'
  room          text        not null,            -- код кімнати, напр. '4821'
  chapter       text,                            -- 'ch1', 'listen', 'premiere'…
  task          text,                            -- 'p1', 'a1', 'aw0'…
  kind          text        not null,            -- 'vote' | 'text' | 'award'
  student_id    text,                            -- випадковий id сесії, не персональні дані
  student_name  text,                            -- ім'я, яке учень ввів сам
  value         text                             -- відповідь або номер варіанта
);

create index if not exists lesson_answers_room_idx
  on public.lesson_answers (room, created_at desc);

-- ── Доступ ─────────────────────────────────────────────────────────────
-- anon-ключ (він лежить у index.html і в посиланнях учнів) може ЛИШЕ
-- вставляти рядки. Читання — тільки з панелі Supabase або сервісним ключем.
alter table public.lesson_answers enable row level security;

drop policy if exists "anon can insert answers" on public.lesson_answers;
create policy "anon can insert answers"
  on public.lesson_answers
  for insert
  to anon
  with check (
    lesson = 'lesson5-inversion'
    and length(coalesce(value, '')) <= 500
    and length(coalesce(student_name, '')) <= 40
  );

-- Читання для залогінених користувачів проєкту (якщо колись зробите кабінет).
-- drop policy if exists "authenticated can read answers" on public.lesson_answers;
-- create policy "authenticated can read answers"
--   on public.lesson_answers for select to authenticated using (true);

-- ── Корисні запити ─────────────────────────────────────────────────────
-- Усе з однієї кімнати:
--   select created_at, chapter, task, student_name, value
--     from lesson_answers where room = '4821' order by created_at;
--
-- Розподіл голосів по завданню:
--   select value, count(*) from lesson_answers
--    where room = '4821' and task = 'p1' group by value order by 2 desc;
--
-- Усі речення, які учні написали в Make it dramatic:
--   select student_name, value from lesson_answers
--    where room = '4821' and kind = 'text' and task = 'a1';
--
-- Прибрати старі дані (наприклад, старші за 90 днів):
--   delete from lesson_answers where created_at < now() - interval '90 days';
