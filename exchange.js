export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Missing code' });

    const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code })
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) return res.status(400).json(tokenData);

    return res.status(200).json(tokenData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}