import { google } from 'googleapis'

function decodeBase64(data) {
  if (!data) return ''
  return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8')
}

// ✅ Recursive function to extract text/html or text/plain from nested parts
function getBodyFromParts(parts) {
  if (!parts || parts.length === 0) return ''

  for (const part of parts) {
    if (part.mimeType === 'text/html' && part.body?.data) {
      return decodeBase64(part.body.data)
    } else if (part.mimeType === 'text/plain' && part.body?.data) {
      return decodeBase64(part.body.data)
    } else if (part.parts) {
      const nested = getBodyFromParts(part.parts)
      if (nested) return nested
    }
  }
  return ''
}

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 15,
    })

    const messages = res.data.messages || []

    const emails = await Promise.all(
      messages.map(async (msg) => {
        const fullMsg = await gmail.users.messages.get({
          userId: 'me',
          id: msg.id,
          format: 'full',
        })

        const headers = fullMsg.data.payload.headers
        const subject = headers.find((h) => h.name === 'Subject')?.value || '(No Subject)'
        const from = headers.find((h) => h.name === 'From')?.value || '(Unknown Sender)'
        const snippet = fullMsg.data.snippet || ''

        // ✅ Extract full body (handles all nested parts)
        let body = ''
        const payload = fullMsg.data.payload

        if (payload.parts) {
          body = getBodyFromParts(payload.parts)
        } else if (payload.body?.data) {
          body = decodeBase64(payload.body.data)
        }

        return {
          id: msg.id,
          subject,
          from,
          snippet,
          body,
        }
      })
    )

    return new Response(JSON.stringify({ emails }), { status: 200 })
  } catch (error) {
    console.error('Error fetching emails:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    )
  }
}
