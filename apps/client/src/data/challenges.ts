// =========================================================
// Speak5 — Challenge, framework, and goal structured data
// Ported from the approved Cadence prototype.
// =========================================================

import {
  TECH_A1_TRANSCRIPT,
  TECH_A2_TRANSCRIPT,
  BEH_A1_TRANSCRIPT,
  BEH_A2_TRANSCRIPT,
  GD_A1_TRANSCRIPT,
  GD_A2_TRANSCRIPT,
  GEN_A1_TRANSCRIPT,
  GEN_A2_TRANSCRIPT,
  type SampleTranscript,
} from './sampleContent';

// ---------------------------------------------------------------------------
// Goals
// ---------------------------------------------------------------------------

export type GoalId = 'interview' | 'gd' | 'tech' | 'general';

export interface Goal {
  id: GoalId;
  label: string;
  description: string;
}

export const GOALS: Goal[] = [
  { id: 'interview', label: 'Interview answers',                description: 'Behavioral and HR questions' },
  { id: 'gd',        label: 'Group discussions',               description: 'Make and defend a point' },
  { id: 'tech',      label: 'Technical explanations',          description: 'Explain clearly to non-experts' },
  { id: 'general',   label: 'Presentations and everyday speaking', description: 'Intros, stories, general talks' },
];

export const GOAL_LABELS: Record<GoalId, string> = {
  interview: 'interview answers',
  gd:        'group discussions',
  tech:      'technical explanations',
  general:   'everyday speaking',
};

// ---------------------------------------------------------------------------
// Comfort levels
// ---------------------------------------------------------------------------

export type ComfortId = 'nerv' | 'unsure' | 'ok' | 'comf';

export interface ComfortLevel {
  id: ComfortId;
  label: string;
  description: string;
}

export const COMFORT_LEVELS: ComfortLevel[] = [
  { id: 'nerv',   label: 'Nervous',     description: 'I avoid speaking when I can' },
  { id: 'unsure', label: 'Unsure',      description: 'It depends on the situation' },
  { id: 'ok',     label: 'Okay',        description: 'I manage, but it is not smooth' },
  { id: 'comf',   label: 'Comfortable', description: 'I want to sharpen how I explain' },
];

// ---------------------------------------------------------------------------
// Duration options
// ---------------------------------------------------------------------------

export type DurationMin = 2 | 5 | 10;

export interface DurationOption {
  minutes: DurationMin;
  tagline: string;
}

export const DURATION_OPTIONS: DurationOption[] = [
  { minutes: 2,  tagline: 'Quick daily habit' },
  { minutes: 5,  tagline: 'Room to build a full answer' },
  { minutes: 10, tagline: 'Deep practice sessions' },
];

// ---------------------------------------------------------------------------
// Thinking frameworks
// ---------------------------------------------------------------------------

export type FrameworkId = 'tech' | 'beh' | 'gd' | 'gen';

export interface FrameworkStep {
  name: string;
  description: string;
  example: string;
}

export interface Framework {
  id: FrameworkId;
  name: string;
  heading: string;
  exampleTitle: string;
  steps: FrameworkStep[];
}

export const FRAMEWORKS: Record<FrameworkId, Framework> = {
  tech: {
    id: 'tech',
    name: 'Explain it',
    heading: 'Four moves for explaining something new',
    exampleTitle: 'Explaining a cache',
    steps: [
      { name: 'Concept',    description: 'Say what it is in one plain sentence.',          example: 'A cache is a small shelf of things you use often.' },
      { name: 'How it works', description: 'Walk through it in two or three steps.',       example: 'Before walking to the store room, you check the shelf. If it is there, you are done. If not, you fetch it and keep a copy on the shelf.' },
      { name: 'Example',    description: 'Show it once with something familiar.',           example: 'Your phone keeps recent photos ready, so the gallery opens instantly.' },
      { name: 'Trade-off',  description: 'Name one strength and one limit.',               example: 'It is fast, but the shelf is small and can be out of date.' },
    ],
  },
  beh: {
    id: 'beh',
    name: 'Tell the story',
    heading: 'Three moves for telling a story',
    exampleTitle: 'Fixing a slow class portal',
    steps: [
      { name: 'Situation', description: 'Set the scene in one or two sentences.', example: 'The class portal took eight seconds to load before an exam.' },
      { name: 'Action',    description: 'Say what you did, and why.',             example: 'I measured it, found one query running two hundred times, and cached it.' },
      { name: 'Result',    description: 'End with what changed.',                 example: 'It loaded in under two seconds, and it stayed up on exam day.' },
    ],
  },
  gd: {
    id: 'gd',
    name: 'Make your case',
    heading: 'Four moves for making your case',
    exampleTitle: 'Laptops in class',
    steps: [
      { name: 'Claim',        description: 'State your side first.',                    example: 'Laptops should be allowed in class, with rules.' },
      { name: 'Reason',       description: 'Give your strongest reason.',               example: 'Notes are faster to take and easier to search later.' },
      { name: 'Example',      description: 'Make it concrete.',                         example: 'In my lab, the students who typed notes found formulas in seconds before the test.' },
      { name: 'Counterpoint', description: 'Answer the best objection.',                example: 'Some get distracted, so screens go down during discussion.' },
    ],
  },
  gen: {
    id: 'gen',
    name: 'Open with the moment',
    heading: 'Three moves for a short story',
    exampleTitle: 'The forgotten ID card',
    steps: [
      { name: 'Moment',        description: 'Start inside the scene, not the topic.',   example: 'The bus pulled away, and my ID card was still on my desk at home.' },
      { name: 'What happened', description: 'Two or three events, in order.',           example: 'I ran back, missed my viva slot, and waited until the afternoon.' },
      { name: 'Takeaway',      description: 'End with one sentence to remember.',       example: 'Now I pack my bag the night before.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Feedback rows
// ---------------------------------------------------------------------------

export type FeedbackRating = 'good' | 'warn';

export interface FeedbackRow {
  dimension: string;
  observation: string;
  rating: FeedbackRating;
}

// ---------------------------------------------------------------------------
// Coaching
// ---------------------------------------------------------------------------

export interface CoachingContent {
  heading: string;
  why: string;
  steps: { name: string; description: string }[];
  revisedSentence: string;
  cues: string[];
}

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

export interface ComparisonRow {
  dimension: string;
  observation: string;
  rating: FeedbackRating;
}

export interface ComparisonContent {
  heading: string;
  label: string;
  rows: ComparisonRow[];
  progressNote: string;
  nextFocus: string;
}

// ---------------------------------------------------------------------------
// Challenge
// ---------------------------------------------------------------------------

export type ChallengeId = 'tech' | 'beh' | 'gd' | 'gen';

export interface Challenge {
  id: ChallengeId;
  goalId: GoalId;
  category: string;
  title: string;
  prompt: string;
  frameworkId: FrameworkId;
  shortSignal: string;
  signal: string;
  trains: string;
  tags: string[];
  homeTitle: string;
  attempt1: SampleTranscript;
  attempt2: SampleTranscript;
  feedback: {
    heading: string;
    wentWell: string;
    priorityTitle: string;
    priorityBody: string;
    rows: FeedbackRow[];
    note: string;
  };
  coaching: CoachingContent;
  comparison: ComparisonContent;
}

export const CHALLENGES: Record<ChallengeId, Challenge> = {
  tech: {
    id: 'tech',
    goalId: 'tech',
    category: 'Technical explanation',
    title: 'Explain how a REST API works',
    prompt: 'Explain how a REST API works to a first-year student who has never written code.',
    frameworkId: 'tech',
    homeTitle: 'Explain a REST API simply',
    shortSignal: 'Your baseline named projects without one example.',
    signal: 'Your baseline mentioned projects without one concrete example. This challenge trains explaining with one.',
    trains: 'Explaining for an audience that knows less than you',
    tags: ['Audience: first-year student', 'Method: Concept, How it works, Example, Trade-off'],
    attempt1: TECH_A1_TRANSCRIPT,
    attempt2: TECH_A2_TRANSCRIPT,
    feedback: {
      heading: 'Clear facts. Now make them easy to picture.',
      wentWell: 'You answered the question in your first sentence, and you covered the key pieces: HTTP methods, statelessness, JSON and status codes.',
      priorityTitle: 'Start with plain words before technical terms',
      priorityBody: 'Your first two sentences use {jn} terms a first-year student would not know, before giving any picture of what an API does.',
      rows: [
        { dimension: 'Relevance',               observation: 'On topic',                        rating: 'good' },
        { dimension: 'Structure',               observation: 'Concept and mechanism, no example', rating: 'warn' },
        { dimension: 'Reasoning',               observation: 'Statelessness explained clearly',  rating: 'good' },
        { dimension: 'Examples',                observation: 'One URL, no everyday example',     rating: 'warn' },
        { dimension: 'Clarity for this audience', observation: 'Jargon comes first',             rating: 'warn' },
      ],
      note: 'Coaching covers how you explain, not whether every technical detail is correct.',
    },
    coaching: {
      heading: 'Plain words first',
      why: 'A first-year student listens for a picture before vocabulary. Four unfamiliar terms in two sentences asks them to keep up with words, and they stop following your idea.',
      steps: [
        { name: 'Say it with something familiar', description: 'A place, an object or a daily routine.' },
        { name: 'Then attach the technical name', description: 'The term now has something to hold on to.' },
        { name: 'Show it once with an example',   description: 'One real situation they have seen.' },
      ],
      revisedSentence: 'An API is a waiter between an app and a server: the app places an order and the server brings the data back.',
      cues: ['Picture first, using something familiar', 'Then name the technical term', 'Add one everyday example'],
    },
    comparison: {
      heading: 'The picture now comes first',
      label: 'How you opened',
      rows: [
        { dimension: 'Plain-language idea first', observation: 'First technical term moved from sentence 1 to sentence 4.', rating: 'good' },
        { dimension: 'Everyday examples',         observation: 'From a URL pattern only to a weather app and a food delivery app.', rating: 'good' },
        { dimension: 'Trade-off',                 observation: 'Strengths appear in both. Neither attempt names a limit.', rating: 'warn' },
      ],
      progressNote: 'The plain-language idea now comes first.',
      nextFocus: 'name one limit of what you are explaining. It was missing in both attempts.',
    },
  },

  beh: {
    id: 'beh',
    goalId: 'interview',
    category: 'Interview answer',
    title: 'Tell me about a time you had to debug a hard problem',
    prompt: 'Tell me about a time you had to debug a hard problem.',
    frameworkId: 'beh',
    homeTitle: 'Tell me about a hard bug you fixed',
    shortSignal: 'Your baseline had no story behind your interests.',
    signal: 'Your baseline listed interests without one story behind them. A real story with a clear result is what interviewers remember.',
    trains: 'Telling one real story with a clear ending',
    tags: ['Audience: interviewer', 'Method: Situation, Action, Result'],
    attempt1: BEH_A1_TRANSCRIPT,
    attempt2: BEH_A2_TRANSCRIPT,
    feedback: {
      heading: 'A real story. Now end it with the result.',
      wentWell: 'You picked a real situation and you owned the backend, which is what an interviewer wants to hear. You also said what you tried.',
      priorityTitle: 'Finish with what changed',
      priorityBody: 'Your answer ends on "learned a lot", but the result of your fix is never stated. An interviewer is left to guess whether it worked.',
      rows: [
        { dimension: 'Relevance',  observation: 'On topic',                         rating: 'good' },
        { dimension: 'Structure',  observation: 'Situation and action, no clear result', rating: 'warn' },
        { dimension: 'Reasoning',  observation: 'Cause found, but not why it was hard', rating: 'warn' },
        { dimension: 'Examples',   observation: 'One real project, with detail',     rating: 'good' },
        { dimension: 'Clarity for this audience', observation: 'Easy to follow, vague ending', rating: 'warn' },
      ],
      note: 'Coaching covers how you tell the story, not whether every detail is accurate.',
    },
    coaching: {
      heading: 'Close with the result',
      why: 'Interviewers remember how a story ends. If the ending is only "it worked out", they cannot tell how big your part was.',
      steps: [
        { name: 'Say what changed',         description: 'One sentence: what was broken, and what is true now.' },
        { name: 'Add one detail that proves it', description: 'A number, a date or a reaction from the team.' },
        { name: 'Stop there',               description: 'End on the result and skip "that is all".' },
      ],
      revisedSentence: 'After my fix, login worked for every user in testing, we demoed on time, and the team kept my test.',
      cues: ['Say the result in one sentence', 'Add one detail that proves it', 'End there, without "that is all"'],
    },
    comparison: {
      heading: 'The ending now says what changed',
      label: 'How you ended',
      rows: [
        { dimension: 'Result stated',    observation: 'Attempt 1 ends on "learned a lot". Attempt 2 says login worked for everyone and the demo was on time.', rating: 'good' },
        { dimension: 'One action, not a list', observation: 'From "tried a few things" to one clear decision: read the logs, then fix the session.', rating: 'good' },
        { dimension: 'Why it was hard', observation: 'Neither attempt says what made the bug hard to find.', rating: 'warn' },
      ],
      progressNote: 'The result now comes in the last sentence.',
      nextFocus: 'say what made the problem hard to find. It was missing in both attempts.',
    },
  },

  gd: {
    id: 'gd',
    goalId: 'gd',
    category: 'Group discussion',
    title: 'Remote internships as valuable as in-office ones',
    prompt: '"Remote internships are as valuable as in-office ones." Take a side and defend it.',
    frameworkId: 'gd',
    homeTitle: 'Remote or in-office internships?',
    shortSignal: 'Your baseline made points without one example.',
    signal: 'Your baseline made points without one concrete example behind them. This challenge trains backing a side with one.',
    trains: 'Defending a side with a reason and an example',
    tags: ['Audience: a group', 'Method: Claim, Reason, Example, Counterpoint'],
    attempt1: GD_A1_TRANSCRIPT,
    attempt2: GD_A2_TRANSCRIPT,
    feedback: {
      heading: 'A clear side. Now show it with one example.',
      wentWell: 'You took a side in your first sentence and gave more than one reason. That makes your position easy to follow.',
      priorityTitle: 'Back your reason with one real example',
      priorityBody: 'Your main reason is that learning depends on the person, but there is no situation to picture. "The skills will come anyway" is a claim, not evidence.',
      rows: [
        { dimension: 'Relevance',  observation: 'Takes a side',                                  rating: 'good' },
        { dimension: 'Structure',  observation: 'Claim and reasons, no example, no counterpoint', rating: 'warn' },
        { dimension: 'Reasoning',  observation: 'Reasons stated, not shown',                     rating: 'warn' },
        { dimension: 'Examples',   observation: 'None given',                                    rating: 'warn' },
        { dimension: 'Clarity for this audience', observation: 'Easy to follow',                 rating: 'good' },
      ],
      note: 'Coaching covers how you build the argument, not which side you chose.',
    },
    coaching: {
      heading: 'One reason, one example',
      why: 'In a group discussion people remember the example, not the reason. An example also lets others check your point, which is harder to wave away.',
      steps: [
        { name: 'State the reason in one line', description: 'Short enough to say in one breath.' },
        { name: 'Say "for example" and name a real case', description: 'A person, a place or something you have seen.' },
        { name: 'Link it back to your claim', description: 'End the point where it started.' },
      ],
      revisedSentence: 'My reason is that interns learn from real tasks and feedback. For example, a friend shipped a small feature in her second week and got code review within a day.',
      cues: ['Give your reason in one line', 'Say "for example" and name a real case', 'Link it back to your claim'],
    },
    comparison: {
      heading: 'The reason now has an example',
      label: 'How you backed your reason',
      rows: [
        { dimension: 'Reason backed by an example', observation: 'Attempt 1 states the reason. Attempt 2 adds a real case with a timeline.', rating: 'good' },
        { dimension: 'Claim stays first',           observation: 'Both attempts open with your side.',                                     rating: 'good' },
        { dimension: 'Counterpoint',                observation: 'Neither attempt answers the best objection, such as less mentoring.',     rating: 'warn' },
      ],
      progressNote: 'The reason is now backed by a real example.',
      nextFocus: 'answer the best objection to your side. It was missing in both attempts.',
    },
  },

  gen: {
    id: 'gen',
    goalId: 'general',
    category: 'Storytelling',
    title: 'Tell a story you learned the hard way',
    prompt: 'Tell a short story about something you learned the hard way.',
    frameworkId: 'gen',
    homeTitle: 'A story you learned the hard way',
    shortSignal: 'Your baseline stayed general, with no one moment.',
    signal: 'Your baseline stayed general. This challenge trains starting with one specific moment.',
    trains: 'Opening with a moment people can picture',
    tags: ['Audience: a classroom', 'Method: Moment, What happened, Takeaway'],
    attempt1: GEN_A1_TRANSCRIPT,
    attempt2: GEN_A2_TRANSCRIPT,
    feedback: {
      heading: 'A real story. Now start inside it.',
      wentWell: 'You chose a real experience and told it in order, including what it cost you. Your closing lesson is clear.',
      priorityTitle: 'Start with the moment, not the topic',
      priorityBody: 'Your first sentences announce a topic, "time management", before the story starts. Listeners wait several sentences to find out what happened to you.',
      rows: [
        { dimension: 'Relevance',  observation: 'On topic',                                rating: 'good' },
        { dimension: 'Structure',  observation: 'Topic first, story later',                rating: 'warn' },
        { dimension: 'Reasoning',  observation: 'Lesson follows from the story',           rating: 'good' },
        { dimension: 'Examples',   observation: 'One real week',                           rating: 'good' },
        { dimension: 'Clarity for this audience', observation: 'Generic opening',          rating: 'warn' },
      ],
      note: 'Coaching covers how you structure and open the story, not what you chose to share.',
    },
    coaching: {
      heading: 'Start with the moment',
      why: 'People listen when they are inside a scene. A topic sentence asks them to wait before anything happens.',
      steps: [
        { name: 'Drop them into the scene', description: 'A time, a place, one detail.' },
        { name: 'Tell what happened, in order', description: 'Two or three events, no more.' },
        { name: 'End on one takeaway', description: 'One sentence they can repeat.' },
      ],
      revisedSentence: 'It was two in the morning, and I was still writing a lab record that was due at nine.',
      cues: ['Open with a time and a place', 'Tell two or three events in order', 'End on one takeaway'],
    },
    comparison: {
      heading: 'The story now starts in the moment',
      label: 'How you opened',
      rows: [
        { dimension: 'Starts inside the scene', observation: 'Attempt 1 opens with the topic. Attempt 2 opens at two in the morning with a lab record due.', rating: 'good' },
        { dimension: 'Events in order',         observation: 'Both attempts tell what happened in sequence.',                                              rating: 'good' },
        { dimension: 'A line for the listener', observation: 'Neither attempt says what the listener could do differently.',                               rating: 'warn' },
      ],
      progressNote: 'The story now opens inside the scene.',
      nextFocus: 'tell the listener what they could do differently. It was missing in both attempts.',
    },
  },
};

/** Ordered list used for recommendation rotation */
export const CHALLENGE_ORDER: ChallengeId[] = ['beh', 'gd', 'tech', 'gen'];
