import fetch from 'node-fetch';
import crypto from 'crypto';
import config from '../config/config.js';
import { API } from '../constants/index.js';

const generateAuthHash = () => {
  const apiHeaderTime = Math.floor(Date.now() / 1000);
  const sha1Hash = crypto.createHash('sha1');
  sha1Hash.update(config.podcastIndex.apiKey + config.podcastIndex.apiSecret + apiHeaderTime);
  return { hashForHeader: sha1Hash.digest('hex'), apiHeaderTime };
};

const searchPodcasts = async (query, language) => {
  const { hashForHeader, apiHeaderTime } = generateAuthHash();
  const response = await fetch(
    `https://api.podcastindex.org/api/${API.PODCAST_INDEX_VERSION}/search/byterm?q=${query}+${language}&max=${API.MAX_RESULTS}`,
    {
      headers: {
        'X-Auth-Date': apiHeaderTime.toString(),
        'X-Auth-Key': config.podcastIndex.apiKey,
        'Authorization': hashForHeader,
        'User-Agent': 'PodlingoApp/1.0',
      },
    }
  );
  if (!response.ok) throw new Error(`Podcast API error: ${response.statusText}`);
  return (await response.json()).feeds || [];
};

export default { searchPodcasts }; 