export const createSubscriber = (email, groupId, token) => {
  const url = `https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`
  const body = JSON.stringify({ email, type: 'unconfirmed' })
  const options = {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-Apikey': token
    }
  }
  return fetch(url, options)
}

export default async function handler(req, res) {
  const body = req.body

  if (body.email === undefined || body.email === '') {
    return res.status(422).json({ error: 'Email is not defined', ok: false })
  }

  const request = await createSubscriber(body.email, process.env.GROUP_ID, process.env.MAILERLITE_API_TOKEN)

  if (![200, 201].includes(request.status)) {
    return res.status(422).json({ error: 'Could not subscribe', ok: false })
  }

  return res.status(200).json({ ok: true })
}
