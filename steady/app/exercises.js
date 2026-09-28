// Between-session exercises for each stage of the therapy path.
// Only calming, noticing and coping skills live here. Memory processing (the core
// of EMDR) and deeper gestalt work belong with a therapist, never in the app.

export const STAGE_INFO = {
  1: {
    name: 'EMDR',
    what: 'EMDR helps with painful memories and feelings you avoid. With a trained therapist, you bring a memory to mind while following eye movements or taps, until it loses its sting. It can also loosen negative beliefs, like "I\'m not good enough".',
    app: 'Before any memory work, EMDR therapists teach calming skills: a calm place to go to, and a container to put worries in until the next session. The app guides you through those.',
    check: ['Look for "EMDR UK accredited" (EMDR UK is the UK association).', 'Ask for a free 15 minute call first, to see if you get on.', 'Tell them about the sofa days, the sleep, the worry, the work-then-crash cycle and the drinking.'],
    exercises: ['calm-place', 'container'],
  },
  2: {
    name: 'Gestalt',
    what: 'Gestalt is a talking therapy about how your past shows up in how you feel and act now. It works through the relationship with the therapist and can be challenging. It starts with noticing what is happening right now.',
    app: 'The app gives you a daily "right now I notice" practice, the core of gestalt, and a place to note what comes up for your sessions.',
    check: ['Check they are UKCP registered, or trained at a recognised gestalt institute.', 'Ask for a free 15 minute call first.'],
    exercises: ['awareness'],
  },
  3: {
    name: 'DBT',
    what: 'DBT teaches practical skills for when feelings get overwhelming: calming your body fast, getting through a bad moment without making it worse, and doing the opposite of what low mood says.',
    app: 'The skills are made to be practised on your own, so the app guides you through them: STOP, TIPP and wise mind. On low days, the small activity becomes "opposite action".',
    check: ['Ask your GP or therapist about DBT skills. It is often taught in groups.', 'NHS Talking Therapies may be able to point you to DBT skills support.'],
    exercises: ['stop', 'tipp', 'wise-mind'],
  },
};

export const EXERCISES = {
  'calm-place': {
    stage: 1,
    title: 'Calm place',
    seconds: 120,
    lines: () => [
      'Think of a place where you feel calm and safe. Real or imagined: a beach, a room, a walk you know.',
      'What can you see there? The colours, the light.',
      'What can you hear? What is the air like on your skin?',
      'Notice where you feel the calm in your body.',
      'Give the place one word. Next time, the word can bring it back.',
    ],
    ask: 'The word for your calm place (optional)',
    why: 'EMDR therapists teach this before any memory work, so you have somewhere to go when feelings get big. Practising it now means it is ready when you need it.',
  },
  container: {
    stage: 1,
    title: 'Container',
    seconds: 90,
    lines: worries => [
      'Imagine a strong container: a safe, a chest, a box with a lock. Make it solid.',
      worries.length ? `Put each worry inside, one at a time: ${worries.join(', ')}.` : 'Put each worry inside, one at a time.',
      'Close it and lock it. Put it somewhere out of the way.',
      'They are not gone. You can take them out with your therapist. You do not have to carry them right now.',
    ],
    why: 'An EMDR skill for between sessions. It does not solve the worries. It lets you put them down for now, so they do not run your whole day.',
  },
  awareness: {
    stage: 2,
    title: 'Right now I notice',
    seconds: 120,
    lines: () => [
      'Say, out loud or in your head, "Right now I notice..." and finish it with something you can see or hear.',
      'Now something in your body. For example: "Right now I notice my shoulders are tight."',
      'Now what is in your head: "Right now I notice I am thinking about..."',
      'Keep going, one "right now" at a time. You do not need to change anything. Only notice.',
    ],
    ask: 'What did you notice? (optional, saved to your therapist notes)',
    why: 'Gestalt starts with noticing what is happening right now, instead of what should be happening. Your therapist builds on this. It also pulls you out of worrying about the future.',
  },
  stop: {
    stage: 3,
    title: 'STOP',
    seconds: 90,
    lines: () => [
      'S: Stop. Do not act yet. Freeze for a moment.',
      'T: Take a step back. One slow breath, with the out-breath longer than the in-breath.',
      'O: Observe. What is happening around you? What are you feeling and thinking?',
      'P: Proceed. What is one small thing that would help, and not make it worse?',
    ],
    why: 'A DBT skill for moments when a feeling is strong and you are about to act on it: work for hours, have a drink, pull away from people. It puts a gap between the feeling and what you do.',
  },
  tipp: {
    stage: 3,
    title: 'TIPP: calm your body fast',
    seconds: 120,
    lines: () => [
      'Temperature: splash cold water on your face, or hold something cold, for 30 seconds. Skip this if you have a heart condition.',
      'Paced breathing: in for 4, out for 6. Keep the out-breath longer.',
      'Paired muscle relaxation: squeeze your fists and shoulders for 5 seconds as you breathe in, then let go as you breathe out. Twice.',
      'Notice if the feeling has dropped, even a little.',
    ],
    why: 'A DBT skill for when anxiety is very high. It works on your body first, because you cannot think your way out when you are that wound up. Cold water and slow breathing calm your nervous system quickly.',
  },
  'wise-mind': {
    stage: 3,
    title: 'Wise mind',
    seconds: 90,
    lines: () => [
      'Breathe in slowly and say "wise" to yourself. Breathe out and say "mind".',
      'Ask: what do I need right now? Wait for an answer. Do not force it.',
      'Pick one small thing that answer points to.',
    ],
    why: 'DBT says you have an emotional mind and a logical mind. Wise mind is where they meet. It is a quick way to check what you actually need, rather than what the mood says.',
  },
};
