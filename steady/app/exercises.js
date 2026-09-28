// Self-help skills for each stage of the path: EMDR, then gestalt, then DBT.
// Deliberately left out: EMDR processing of painful past memories. Alone, it can
// open up more than can be closed again. Everything here calms, notices,
// strengthens or plans.
//
// Exercise types:
//   guided:    lines to follow with a timer
//   write:     prompts with a text box each; answers saved to My notes
//   belief:    strengthen a positive belief with butterfly-hug tapping (EMDR resourcing)
//   checklist: tick what applies

export const STAGE_INFO = {
  1: {
    name: 'EMDR skills',
    what: 'EMDR works on difficult feelings and the negative beliefs that come with them, like "I\'m not good enough". These skills calm you when feelings get big, and strengthen the beliefs you would rather have, using slow left-right tapping (the butterfly hug).',
    note: 'The part of EMDR where you go back into painful memories is not here. Done alone it can open up more than you can close again. If a memory like that comes up in any exercise, stop and go to your calm place.',
    exercises: ['calm-place', 'container', 'butterfly', 'belief'],
  },
  2: {
    name: 'Gestalt skills',
    what: 'Gestalt is about noticing what is happening in you right now, and owning it, rather than being run by old patterns. These exercises build awareness, put your feelings into "I" words, and let the parts of you that argue have a proper conversation.',
    note: 'These can stir things up. You can stop any exercise at any point. Afterwards, look around and name five things you can see.',
    exercises: ['awareness', 'i-statements', 'two-voices', 'unsent-letter'],
  },
  3: {
    name: 'DBT skills',
    what: 'DBT teaches practical skills for when feelings get overwhelming: calming your body fast, getting through a bad moment without making it worse, checking whether a feeling fits the facts, looking after your body, and asking for what you need.',
    note: 'These are made to be practised on your own, a little and often.',
    exercises: ['stop', 'tipp', 'wise-mind', 'opposite-action', 'check-facts', 'please', 'dear-man'],
  },
};

const BUTTERFLY = 'Cross your arms over your chest, fingertips resting just below your collarbones. Tap left, right, left, right, slowly, like a calm heartbeat.';

export const NEGATIVE_BELIEFS = {
  "I'm not good enough": "I'm good enough, and I do good work",
  "I'm a fraud": 'I earned my place',
  "I'm selfish": 'I care about my family, even when I am struggling',
  "I can't cope": 'I can cope, one step at a time',
  "I'm a failure": 'I have done things that worked, and I can again',
};

export const EXERCISES = {
  // ---------- Stage 1: EMDR skills ----------
  'calm-place': {
    stage: 1, type: 'guided', title: 'Calm place', seconds: 150,
    lines: () => [
      'Think of a place where you feel calm and safe. Real or imagined: a beach, a room, a walk you know.',
      'What can you see there? The colours, the light.',
      'What can you hear? What is the air like on your skin?',
      'Notice where you feel the calm in your body.',
      `${BUTTERFLY} Do 6 to 8 slow taps while you hold the place in mind. Only keep going if it feels good.`,
      'Give the place one word. Next time, the word can bring it back.',
    ],
    ask: 'The word for your calm place (optional)',
    why: 'In EMDR this is always built first, so you have somewhere to go when feelings get big. The slow tapping helps the calm feeling stick.',
  },
  container: {
    stage: 1, type: 'guided', title: 'Container', seconds: 90,
    lines: worries => [
      'Imagine a strong container: a safe, a chest, a box with a lock. Make it solid.',
      worries.length ? `Put each worry inside, one at a time: ${worries.join(', ')}.` : 'Put each worry inside, one at a time.',
      'Close it and lock it. Put it somewhere out of the way.',
      'They are not gone. You can take them out later, at a time you choose. You do not have to carry them right now.',
    ],
    why: 'An EMDR skill for when worry is running everything. It does not solve the worries. It lets you put them down for now, so they do not run your whole day.',
  },
  butterfly: {
    stage: 1, type: 'guided', title: 'Butterfly hug for a feeling', seconds: 120,
    lines: () => [
      'Notice the feeling you have right now, and where it sits in your body. Only what is here today, not an old memory.',
      BUTTERFLY,
      'Tap slowly for about 30 seconds while you breathe out longer than you breathe in. Just notice the feeling. Do not try to change it.',
      'Stop, take a breath, and notice: has anything shifted?',
      'Do one or two more rounds if it is helping.',
      'If the feeling gets stronger, or an old painful memory comes up, stop and go to your calm place instead.',
    ],
    why: 'The butterfly hug is an EMDR technique made for people to use on themselves. Slow left-right tapping often takes the edge off a strong feeling. It is used here only for what you feel today, never to dig into the past.',
  },
  belief: {
    stage: 1, type: 'belief', title: 'Strengthen a better belief',
    why: 'EMDR works on the negative beliefs that sit under difficult feelings, like "I\'m not good enough". Here you pick the belief you would rather have, hold a real memory of it being true, and tap to help it sink in. You rate how true it feels before and after, so you can watch it change over weeks.',
  },

  // ---------- Stage 2: Gestalt skills ----------
  awareness: {
    stage: 2, type: 'guided', title: 'Right now I notice', seconds: 120,
    lines: () => [
      'Say, out loud or in your head, "Right now I notice..." and finish it with something you can see or hear.',
      'Now something in your body. For example: "Right now I notice my shoulders are tight."',
      'Now what is in your head: "Right now I notice I am thinking about..."',
      'Keep going, one "right now" at a time. You do not need to change anything. Only notice.',
    ],
    ask: 'What did you notice? (optional, saved to My notes)',
    why: 'Gestalt starts with noticing what is happening right now, instead of what should be happening. It also pulls you out of worrying about the future.',
  },
  'i-statements': {
    stage: 2, type: 'write', title: '"I" statements',
    intro: 'We often talk about feelings as if they happen to us: "it\'s overwhelming", "you can\'t win", "things are getting on top of me". Gestalt asks you to own them.',
    prompts: [
      'Write one or two things you have been saying or thinking, the way you usually say them.',
      'Now rewrite them starting with "I". For example "it\'s overwhelming" becomes "I feel overwhelmed". "You can\'t win" becomes "I feel I can\'t win".',
      'Read the "I" version out loud. What do you notice?',
    ],
    why: 'Saying "I" puts you back in charge of your feelings. It is harder to change something that is just "happening" than something you can see you are doing or feeling.',
  },
  'two-voices': {
    stage: 2, type: 'write', title: 'Two voices',
    intro: 'Part of you criticises ("you\'re selfish", "you\'re a fraud"). Another part takes the criticism. In gestalt, you let them speak to each other properly, instead of the critic always winning.',
    prompts: [
      'The critic: write what it says to you, in its own words. Say "you".',
      'The other part: answer the critic. How does it feel to be spoken to like that? What does it want to say back?',
      'The critic again: what does it say now? What is it afraid will happen?',
      'The other part again: answer.',
      'Step back. What does each side need? Is there anything they agree on?',
    ],
    why: 'In gestalt this is done with two chairs. Writing it works too. Often the critic turns out to be trying to protect you, just badly. Hearing both sides softens the fight.',
  },
  'unsent-letter': {
    stage: 2, type: 'write', title: 'Unsent letter',
    intro: 'Something unfinished keeps pulling at you: a person, a job, a time in your life. Write to it. You will never send this.',
    prompts: [
      'Who or what is it to? (a person, your job, your younger self, anything)',
      'Write the letter. Say what you never got to say. No need for it to be fair or tidy.',
      'Read it back. What do you feel now, and where in your body?',
    ],
    why: 'Gestalt calls this unfinished business. Feelings that never got said keep leaking into the present. Saying them, even on paper, can let them settle. Stop at any point if it gets too much.',
  },

  // ---------- Stage 3: DBT skills ----------
  stop: {
    stage: 3, type: 'guided', title: 'STOP', seconds: 90,
    lines: () => [
      'S: Stop. Do not act yet. Freeze for a moment.',
      'T: Take a step back. One slow breath, with the out-breath longer than the in-breath.',
      'O: Observe. What is happening around you? What are you feeling and thinking?',
      'P: Proceed. What is one small thing that would help, and not make it worse?',
    ],
    why: 'A DBT skill for moments when a feeling is strong and you are about to act on it: work for hours, have a drink, pull away from people. It puts a gap between the feeling and what you do.',
  },
  tipp: {
    stage: 3, type: 'guided', title: 'TIPP: calm your body fast', seconds: 120,
    lines: () => [
      'Temperature: splash cold water on your face, or hold something cold, for 30 seconds. Skip this if you have a heart condition.',
      'Intense movement: if you can, walk fast or do star jumps for a minute.',
      'Paced breathing: in for 4, out for 6. Keep the out-breath longer.',
      'Paired muscle relaxation: squeeze your fists and shoulders for 5 seconds as you breathe in, then let go as you breathe out. Twice.',
    ],
    why: 'A DBT skill for when anxiety is very high. It works on your body first, because you cannot think your way out when you are that wound up.',
  },
  'wise-mind': {
    stage: 3, type: 'guided', title: 'Wise mind', seconds: 90,
    lines: () => [
      'Breathe in slowly and say "wise" to yourself. Breathe out and say "mind".',
      'Ask: what do I need right now? Wait for an answer. Do not force it.',
      'Pick one small thing that answer points to.',
    ],
    why: 'DBT says you have an emotional mind and a logical mind. Wise mind is where they meet. It is a quick way to check what you actually need, rather than what the mood says.',
  },
  'opposite-action': {
    stage: 3, type: 'write', title: 'Opposite action',
    intro: 'Every feeling comes with an urge. Low mood says hide. Anxiety says avoid. Guilt says withdraw. When the urge makes things worse, DBT says do the opposite, on purpose, all the way.',
    prompts: [
      'What are you feeling? (for example: low, anxious, guilty, ashamed)',
      'What is it urging you to do? (for example: stay on the sofa, cancel, not reply)',
      'What is the opposite? Make it small and specific. (for example: reply yes to the walk)',
      'Do it now, or say when. Afterwards, note what happened.',
    ],
    why: 'Acting against the urge is one of the most reliable ways DBT has to shift a feeling. The feeling follows the action, not the other way round.',
  },
  'check-facts': {
    stage: 3, type: 'write', title: 'Check the facts',
    intro: 'Feelings are real, but sometimes they are reacting to a story rather than to what happened.',
    prompts: [
      'What feeling do you want to check? How strong, 0 to 10?',
      'What actually happened? Only what a camera would have seen.',
      'What are you telling yourself about it?',
      'What other explanations are there?',
      'Does the feeling, and how strong it is, fit the facts? If not, what would fit?',
    ],
    why: 'A DBT skill for when a feeling is bigger than the situation. It is not about talking yourself out of it. It is about seeing if the feeling is answering the facts or an old fear.',
  },
  please: {
    stage: 3, type: 'checklist', title: 'Look after your body (PLEASE)',
    intro: 'DBT says a body that is run down makes every feeling harder to manage. Tick what is true today.',
    items: [
      'I am taking care of any illness or pain, and my medication as prescribed',
      'I have eaten something proper today',
      'I have not had alcohol today',
      'I slept a normal amount, not much more or much less',
      'I have moved my body today, even a short walk',
      'I did one thing today that makes me feel capable',
    ],
    why: 'PLEASE stands for treating PhysicaL illness, balanced Eating, Avoiding mood-altering drugs, balanced Sleep, Exercise, and building mastery. None of it is about willpower. It lowers how hard the feelings hit.',
  },
  'dear-man': {
    stage: 3, type: 'write', title: 'Say no, or ask (DEAR MAN)',
    intro: 'For when a new demand lands at work and you want to say no, or ask for what you need, without over-explaining or giving in.',
    prompts: [
      'Describe: the facts of the situation, no opinions. ("The report is due Friday and the team has two people off.")',
      'Express: how you feel about it, in "I" words. ("I am worried we cannot do it properly.")',
      'Assert: what you are asking for, or saying no to, plainly. ("I need the deadline moved to next Wednesday.")',
      'Reinforce: why it is good for them too. ("That way you get something you can use.")',
      'Stay Mindful, Appear confident, Negotiate: what could you offer if they push back?',
    ],
    why: 'A DBT script for asking and refusing. It fits your pattern of taking work back yourself. Writing it before the conversation makes it much easier to say.',
  },
};

// Which exercise a check-in gets at each stage. Low days never get one.
export function pickExercise(stage, state, c = {}) {
  if (stage === 3) {
    if (state === 'spiral') return c.anxiety >= 8 ? 'tipp' : c.imposter ? 'check-facts' : 'stop';
    if (state === 'push') return 'stop';
    return 'please';
  }
  if (stage === 2) {
    if (state === 'spiral') return c.imposter ? 'two-voices' : 'awareness';
    return 'awareness';
  }
  if (state === 'spiral') return c.worry ? 'container' : c.imposter ? 'belief' : c.anxiety >= 8 ? 'butterfly' : 'calm-place';
  return 'belief';
}
