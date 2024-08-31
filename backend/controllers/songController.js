import axios from 'axios';

const BASE_URL = 'https://radio.nugs.net/currentsong';

const sidMap = {
    '1': '1',
    '2': '2',
    '4': '4'
};

export const getCurrentSong = async (req, res) => {
    const streamId = req.query.id || '2';
    const sid = sidMap[streamId];

    if (!sid) {
        return res.status(400).json({ error: 'Invalid stream ID. Use 1 for nugs.net, 2 for LivePhish, or 4 for Pearl Jam.' });
    }

    const songUrl = `${BASE_URL}?sid=${sid}`;

    try {
        const response = await axios.get(songUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
            }
        });

        res.set('Content-Type', 'text/plain');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching current song:', error.message);
        res.status(500).json({ error: 'Failed to fetch current song information' });
    }
};