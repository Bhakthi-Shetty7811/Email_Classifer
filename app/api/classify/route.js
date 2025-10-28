import OpenAI from 'openai';

export async function POST(req) {
  try {
    const body = await req.json();
    const { emails, openaiKey } = body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No emails to classify', emails: [] }),
        { status: 400 }
      );
    }

    const results = [];
    const cache = new Map();
    let openai = null;

    // Initialize OpenAI only if key is provided
    if (openaiKey && openaiKey.startsWith('sk-')) {
      openai = new OpenAI({ apiKey: openaiKey });
    } else {
      console.warn('⚠️ No valid API key found. Running in MOCK MODE.');
    }

    for (const email of emails) {
      try {
        // Use cache if classification already done
        if (cache.has(email.id)) {
          results.push({ ...email, category: cache.get(email.id) });
          continue;
        }

        let category = 'General';

        // 🧠 If OpenAI key is valid → call API
        if (openai) {
          const prompt = `
You are an email classifier that must always respond with exactly one category from:
[Important, Promotional, Social, Marketing, Spam, General]

Rules:
- Important: Work-related, finance, or personal messages.
- Promotional: Offers, coupons, or discounts.
- Marketing: Brand newsletters or campaigns.
- Social: Social media or community notifications.
- Spam: Scam or irrelevant mail.
- General: Everything else.

Return only the category name.

Email Subject: ${email.subject || '(no subject)'}
Email Snippet: ${email.snippet || '(no snippet)'}
          `;

          const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            messages: [{ role: 'user', content: prompt }],
          });

          category =
            completion.choices?.[0]?.message?.content?.trim() || 'General';
        } else {
          // 🧩 Mock classification (for testing when no/expired key)
          const fallback = ['Important', 'Promotional', 'Social', 'Marketing', 'Spam', 'General'];
          category = fallback[Math.floor(Math.random() * fallback.length)];
        }

        cache.set(email.id, category);
        results.push({ ...email, category });
      } catch (innerErr) {
        console.warn('⚠️ Inner classification error:', innerErr.message);
    
        let quotaErrorCount = 0;
        if (
          innerErr.status === 429 ||
          innerErr.code === 'insufficient_quota' ||
          innerErr.message.includes('quota') ||
          innerErr.message.includes('limit')
        ) {
          console.warn('💡 Quota exceeded — switching to MOCK fallback.');
          const fallback = ['Important', 'Promotional', 'Social', 'Marketing', 'Spam', 'General'];
          const randomCategory = fallback[Math.floor(Math.random() * fallback.length)];
          results.push({ ...email, category: randomCategory });
        } else {
          results.push({ ...email, category: 'General' });
        }
      }
    }

    return new Response(JSON.stringify({ emails: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Classification error:', error);
    return new Response(
      JSON.stringify({ error: error.message, emails: [] }),
      { status: 500 }
    );
  }
}

