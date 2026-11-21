// =========================================================
// Speak5 — Sample transcripts and seed history
// All sample data clearly typed; never presented as real user data.
// =========================================================

/** A transcript segment token */
export type TranscriptToken =
  | { kind: 'text'; text: string }
  | { kind: 'filler'; text: string }
  | { kind: 'keyterm'; text: string }
  | { kind: 'pause'; seconds: number }
  | { kind: 'highlight-start' }
  | { kind: 'highlight-end' };

/** Pre-parsed transcript for a sample attempt */
export interface SampleTranscript {
  id: string;
  tokens: TranscriptToken[];
  /** Total seconds speaking */
  durationSec: number;
  wordsPerMin: number;
  /** Summary theme label (what this attempt demonstrates) */
  theme: string;
}

// ---------------------------------------------------------------------------
// Baseline self-introduction
// ---------------------------------------------------------------------------

export const BASELINE_TRANSCRIPT: SampleTranscript = {
  id: 'sample-baseline',
  durationSec: 70,
  wordsPerMin: 0, // not rated
  theme: 'Add a concrete example',
  tokens: [
    { kind: 'text', text: 'Hello, so, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', I am a third-year B.Tech student, and ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' I am interested in backend development. ' },
    { kind: 'highlight-start' },
    { kind: 'text', text: 'I have done a few projects, and I like solving problems.' },
    { kind: 'highlight-end' },
    { kind: 'pause', seconds: 2.8 },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', in my free time I practice coding questions, and I like to learn new technologies. I have worked with Java, and I know some Python, and I have used databases in my projects. ' },
    { kind: 'pause', seconds: 2.4 },
    { kind: 'text', text: 'My goal is to become a good software engineer, so I am looking for an internship where I can learn from experienced people and contribute to real work. ' },
    { kind: 'filler', text: 'Basically' },
    { kind: 'text', text: ', I am a hard-working person and a quick learner, and I can work well in a team. ' },
    { kind: 'pause', seconds: 2.2 },
    { kind: 'text', text: 'I think I can do well if I get a chance, and I will give my best. ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', that is all about me. Thank you.' },
  ],
};

// ---------------------------------------------------------------------------
// Technical — REST API
// ---------------------------------------------------------------------------

export const TECH_A1_TRANSCRIPT: SampleTranscript = {
  id: 'sample-tech-a1',
  durationSec: 74,
  wordsPerMin: 115,
  theme: 'Explain terms before using them',
  tokens: [
    { kind: 'highlight-start' },
    { kind: 'text', text: 'So, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', ' },
    { kind: 'keyterm', text: 'REST API' },
    { kind: 'text', text: ' is ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' an ' },
    { kind: 'keyterm', text: 'architectural style' },
    { kind: 'text', text: ' for designing web services. In this, the client and the server communicate over ' },
    { kind: 'keyterm', text: 'HTTP' },
    { kind: 'text', text: ' using methods like ' },
    { kind: 'keyterm', text: 'GET, POST, PUT and DELETE' },
    { kind: 'text', text: '.' },
    { kind: 'highlight-end' },
    { kind: 'pause', seconds: 2.6 },
    { kind: 'text', text: 'REST is stateless, which means every request from the client must carry all the information that the server needs, because the server does not store any session between two requests. The data is usually exchanged in JSON format, and every resource is identified by a URL, for example slash users slash one two three. ' },
    { kind: 'pause', seconds: 2.2 },
    { kind: 'filler', text: 'Basically' },
    { kind: 'text', text: ', the server exposes endpoints, and the client calls these endpoints to read or change the resources. ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', the main advantage is that it is simple and scalable, because the servers are stateless, so we can add more servers easily. It is also language independent, so a mobile app or a website can use it. And, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', there are status codes like two hundred for success and four hundred and four for not found. ' },
    { kind: 'pause', seconds: 3.1 },
    { kind: 'text', text: 'So that is ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' how REST API works, and it is used everywhere in industry, like in microservices and mobile applications.' },
  ],
};

export const TECH_A2_TRANSCRIPT: SampleTranscript = {
  id: 'sample-tech-a2',
  durationSec: 57,
  wordsPerMin: 126,
  theme: 'Name a trade-off',
  tokens: [
    { kind: 'highlight-start' },
    { kind: 'text', text: 'Imagine you are in a restaurant. You do not walk into the kitchen. You tell the waiter what you want, the waiter carries your request to the kitchen, and brings your food back. An API works the same way: it is the waiter between an app and a server.' },
    { kind: 'highlight-end' },
    { kind: 'pause', seconds: 1.4 },
    { kind: 'text', text: 'REST is simply the agreed way of placing that order, so everyone speaks the same language. Here is how it works. The app sends a request to an address, called a URL, along with an action: GET to fetch something, POST to add something, DELETE to remove something. The server replies with the data, usually in a simple text format called JSON, and a code that says how it went. For example, when you open a weather app, it quietly asks a server, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', give me today\'s weather for my city. The server sends back the temperature and the forecast, and the app shows it on your screen. Another example: when you place an order on a food delivery app, the app sends a request and the server saves your order. ' },
    { kind: 'pause', seconds: 2.1 },
    { kind: 'text', text: 'One idea keeps this reliable: the server does not remember you between requests, so every request carries everything it needs, like giving your table number each time you call the waiter. That is why one server can handle thousands of people at once. So REST is a simple, common way for apps to talk to servers, and the next time your app loads something, it is ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' a waiter fetching it.' },
  ],
};

// ---------------------------------------------------------------------------
// Behavioural — Hard bug
// ---------------------------------------------------------------------------

export const BEH_A1_TRANSCRIPT: SampleTranscript = {
  id: 'sample-beh-a1',
  durationSec: 75,
  wordsPerMin: 108,
  theme: 'End with the result',
  tokens: [
    { kind: 'text', text: 'So, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', in my second year we built a college event app as a team project. I was handling the backend, and ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' the login was failing for some users and not for others. ' },
    { kind: 'pause', seconds: 2.4 },
    { kind: 'text', text: 'I checked the logs, and I tried changing a few things in the code, and I asked a friend, and ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', we also searched online for a long time. It was taking a lot of time and it was ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' very stressful. ' },
    { kind: 'pause', seconds: 2.1 },
    { kind: 'text', text: 'Then after some days I found that the problem was in how I was saving the session, and I changed it. ' },
    { kind: 'highlight-start' },
    { kind: 'text', text: 'After that it was working fine, and ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', I ' },
    { kind: 'keyterm', text: 'learned a lot' },
    { kind: 'text', text: ' from this project.' },
    { kind: 'highlight-end' },
    { kind: 'pause', seconds: 2.7 },
    { kind: 'text', text: 'Thank you.' },
  ],
};

export const BEH_A2_TRANSCRIPT: SampleTranscript = {
  id: 'sample-beh-a2',
  durationSec: 59,
  wordsPerMin: 124,
  theme: 'Say what made it hard',
  tokens: [
    { kind: 'text', text: 'In my second year, our college event app had a bug two days before the demo: login failed for about one in five users. I owned the backend, so it was mine to fix. ' },
    { kind: 'pause', seconds: 1.6 },
    { kind: 'text', text: 'I stopped changing code and started reading the logs. Every failure was a user on mobile data, and that pointed me to how I was saving sessions. I had tied them to an IP address, and mobile IPs keep changing. I moved the session to a token stored on the device and wrote a test for that case. ' },
    { kind: 'pause', seconds: 2.2 },
    { kind: 'highlight-start' },
    { kind: 'text', text: 'The result: login worked for everyone in testing, we demoed on time, and the team kept my test in the project.' },
    { kind: 'highlight-end' },
    { kind: 'text', text: ' ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', what I took from it is to read the evidence before touching the code.' },
  ],
};

// ---------------------------------------------------------------------------
// Group discussion — Remote vs in-office
// ---------------------------------------------------------------------------

export const GD_A1_TRANSCRIPT: SampleTranscript = {
  id: 'sample-gd-a1',
  durationSec: 67,
  wordsPerMin: 118,
  theme: 'Back a reason with an example',
  tokens: [
    { kind: 'text', text: 'So, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', I think remote internships are ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ' as valuable as in-office ones. ' },
    { kind: 'pause', seconds: 1.8 },
    { kind: 'highlight-start' },
    { kind: 'text', text: 'The main reason is that learning depends on the person, so if the intern is serious then the place does not matter, and the skills will come anyway.' },
    { kind: 'highlight-end' },
    { kind: 'pause', seconds: 2.5 },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', also remote internships save time and money, because there is no travel, and the student can work from home. And ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ', many companies are now working remotely only, so it is the future. ' },
    { kind: 'pause', seconds: 2.2 },
    { kind: 'text', text: 'So in my opinion both are the same, and the intern should choose what is comfortable. ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', that is my point.' },
  ],
};

export const GD_A2_TRANSCRIPT: SampleTranscript = {
  id: 'sample-gd-a2',
  durationSec: 58,
  wordsPerMin: 130,
  theme: 'Answer the counterpoint',
  tokens: [
    { kind: 'text', text: 'I think remote internships are as valuable as in-office ones, if they are set up well. ' },
    { kind: 'pause', seconds: 1.5 },
    { kind: 'text', text: 'My reason is that most of what an intern learns comes from doing real tasks and getting feedback, and both can happen online. For example, a friend of mine interned remotely at a startup, shipped a small feature in her second week, and got code review comments within a day. ' },
    { kind: 'highlight-start' },
    { kind: 'text', text: 'She learned more from those reviews than from sitting next to someone who was too busy to look at her code.' },
    { kind: 'highlight-end' },
    { kind: 'pause', seconds: 2.3 },
    { kind: 'text', text: 'Saving time and money is a bonus, but it is not the main point. ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', so my claim stands: the value is in the tasks and the feedback, not in the building.' },
  ],
};

// ---------------------------------------------------------------------------
// Storytelling — Hard way
// ---------------------------------------------------------------------------

export const GEN_A1_TRANSCRIPT: SampleTranscript = {
  id: 'sample-gen-a1',
  durationSec: 70,
  wordsPerMin: 108,
  theme: 'Start with the moment',
  tokens: [
    { kind: 'text', text: 'So, ' },
    { kind: 'filler', text: 'um' },
    { kind: 'text', text: ', today I want to talk about, ' },
    { kind: 'filler', text: 'basically' },
    { kind: 'text', text: ', something I learned the hard way, which is about time management. ' },
    { kind: 'pause', seconds: 2.2 },
    { kind: 'highlight-start' },
    { kind: 'text', text: 'I think time management is very important for students, and I did not have it in my first year, so I faced some problems.' },
    { kind: 'highlight-end' },
    { kind: 'text', text: ' ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', there were exams, and assignments, and also a lab record, and I kept postponing everything. ' },
    { kind: 'pause', seconds: 2.6 },
    { kind: 'text', text: 'Then one week everything came together, and I had three submissions in two days. I stayed awake the whole night and I still missed one. ' },
    { kind: 'pause', seconds: 2.0 },
    { kind: 'filler', text: 'Basically' },
    { kind: 'text', text: ', after that I started planning my week on Sunday, and it helped a lot. So the lesson is that we should manage our time.' },
  ],
};

export const GEN_A2_TRANSCRIPT: SampleTranscript = {
  id: 'sample-gen-a2',
  durationSec: 56,
  wordsPerMin: 122,
  theme: 'Tell the listener what to do',
  tokens: [
    { kind: 'highlight-start' },
    { kind: 'text', text: 'It was two in the morning, and I was still writing a lab record that was due at nine.' },
    { kind: 'highlight-end' },
    { kind: 'text', text: ' I had two more submissions that week and no plan for any of them. ' },
    { kind: 'pause', seconds: 1.8 },
    { kind: 'text', text: 'In my first year I kept postponing everything because the deadlines felt far away, until they all arrived together. That week I stayed awake the whole night and still missed one submission. ' },
    { kind: 'pause', seconds: 2.4 },
    { kind: 'text', text: 'After that I started planning my week every Sunday, writing three things that must be done and when. ' },
    { kind: 'filler', text: 'Um' },
    { kind: 'text', text: ', since then I have not missed a deadline. The lesson I keep is to make the deadline feel close on the day I start.' },
  ],
};

// ---------------------------------------------------------------------------
// Seed history (demo / sample practice history)
// ---------------------------------------------------------------------------

export interface SeedSession {
  id: string;
  when: string;
  cat: string;
  title: string;
  durationSec: number;
  words: number;
  fillers: number;
  pauses: number;
  theme: string;
  kind: 'attempt' | 'baseline';
  excerpt: string;
  wentWell: string;
  improve: string;
}

export const SEED_HISTORY: SeedSession[] = [
  {
    id: 'sd1', when: 'Sep 28', cat: 'Self-introduction', title: 'Tell me about yourself',
    durationSec: 84, words: 152, fillers: 10, pauses: 3, theme: 'Add a concrete example',
    kind: 'baseline',
    excerpt: 'Hello, so, um, I am a third-year student and I am interested in backend development…',
    wentWell: 'A clear opening and a steady pace.',
    improve: 'Back up your interests with one concrete example.',
  },
  {
    id: 'sd2', when: 'Oct 1', cat: 'Interview answer', title: 'Tell me about a time you worked in a team',
    durationSec: 128, words: 246, fillers: 9, pauses: 4, theme: 'State your point first',
    kind: 'attempt',
    excerpt: '…so the project was about a college event app, and we were four members, and I was handling the database part…',
    wentWell: 'You gave a real situation with detail.',
    improve: 'Say the result in your first sentence, then explain how you got there.',
  },
  {
    id: 'sd3', when: 'Oct 3', cat: 'Group discussion', title: 'Should attendance be compulsory in college?',
    durationSec: 112, words: 226, fillers: 8, pauses: 3, theme: 'State your point first',
    kind: 'attempt',
    excerpt: '…I think attendance should not be compulsory, because learning is not only inside the classroom…',
    wentWell: 'You took a side clearly.',
    improve: 'Open with your claim before the background.',
  },
  {
    id: 'sd4', when: 'Oct 5', cat: 'Technical explanation', title: 'Explain what a database index is',
    durationSec: 126, words: 248, fillers: 7, pauses: 2, theme: 'Explain terms before using them',
    kind: 'attempt',
    excerpt: '…an index is like the page numbers at the back of a book, so the database does not read every row…',
    wentWell: 'Your book analogy made the idea easy to picture.',
    improve: 'Define B-tree and lookup in plain words before using them.',
  },
  {
    id: 'sd5', when: 'Oct 7', cat: 'Interview answer', title: 'Describe a deadline you almost missed',
    durationSec: 134, words: 276, fillers: 6, pauses: 2, theme: 'Add a concrete example',
    kind: 'attempt',
    excerpt: '…two days before submission our deployment failed, and I stayed back to find the cause…',
    wentWell: 'Strong, specific story with a real stake.',
    improve: 'Add one concrete number or outcome in the result.',
  },
  {
    id: 'sd6', when: 'Oct 8', cat: 'Technical explanation', title: 'Explain how a search engine finds a page',
    durationSec: 121, words: 255, fillers: 5, pauses: 2, theme: 'Explain terms before using them',
    kind: 'attempt',
    excerpt: '…imagine a librarian who has already noted down every word in every book…',
    wentWell: 'You opened with a picture before the terms.',
    improve: 'Explain "crawler" the first time you say it.',
  },
  {
    id: 'sd7', when: 'Oct 9', cat: 'Group discussion', title: 'Is it better to join a startup or a large company first?',
    durationSec: 118, words: 241, fillers: 5, pauses: 1, theme: 'Add a counterpoint',
    kind: 'attempt',
    excerpt: '…I would join a startup first because you learn many roles quickly, for example…',
    wentWell: 'Claim, reason and example were all there.',
    improve: 'Answer the best objection before you finish.',
  },
];
