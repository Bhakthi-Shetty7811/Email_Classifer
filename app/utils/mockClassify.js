// Small deterministic mock classifier for demo when OpenAI key is missing/rate-limited.
// Uses simple keyword heuristics + fallback to randomized stable choice.
const keywords = {
  Important: ['invoice', 'meeting', 'schedule', 'urgent', 'project', 'task', 'password'],
  Promotions: ['sale', 'discount', 'coupon', 'offer', 'deal'],
  Social: ['friend', 'liked', 'comment', 'follow', 'invitation'],
  Marketing: ['newsletter', 'update', 'release', 'announcement'],
  Spam: ['lottery', 'win', 'prize', 'congratulations']
}

export function mockClassify(snippet) {
  if (!snippet) return 'General'
  const s = snippet.toLowerCase()
  for (const [cat, kws] of Object.entries(keywords)) {
    for (const kw of kws) {
      if (s.includes(kw)) return cat
    }
  }
  // fallback: choose deterministic based on string hash
  const hash = Array.from(s).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const choices = ['General','Promotions','Social','Marketing','Important','Spam']
  return choices[hash % choices.length]
}
