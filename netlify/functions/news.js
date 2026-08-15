exports.handler = async (event) => {
  const source = event.queryStringParameters?.source || 'rfi';

  const urls = {
    rfi: 'https://www.rfi.fr/fr/rss',
    cnn: 'http://rss.cnn.com/rss/edition.rss',
    miami: 'https://www.miamiherald.com/news/?format=rss'
  };

  const url = urls[source] || urls.rfi;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'PRO-MAX-FM/1.0' }
    });

    if (!res.ok) throw new Error('Fetch failed '+res.status);

    const text = await res.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300'
      },
      body: text
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Error: ' + e.message
    };
  }
};
