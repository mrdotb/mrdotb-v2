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

export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    const request = await createSubscriber(input.email, context.env.GROUP_ID, context.env.MAILERLITE_API_TOKEN)

    if (![200, 201].includes(request.status)) {
      return new Response('Could not subscribe', { status: 422})
    }

    return new Response('ok', { status: 201})
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}
