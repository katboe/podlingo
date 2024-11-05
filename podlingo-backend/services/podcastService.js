import config from '../config/config.js';
import crypto from 'crypto';
import fetch from 'node-fetch';
import Language from '../models/language.js';
import classifyPodcastLevel from '../utils/languageLevelClassifier.js';

class PodcastService {
  generateAuthHash() {
    const apiHeaderTime = Math.floor(Date.now() / 1000);
    const sha1Hash = crypto.createHash('sha1');
    const dataForHash = config.podcastIndex.apiKey + config.podcastIndex.apiSecret + apiHeaderTime;
    
    sha1Hash.update(dataForHash);
    return { 
      hashForHeader: sha1Hash.digest('hex'), 
      apiHeaderTime 
    };
  }

  async searchPodcasts(query, language, level) {
    const { hashForHeader, apiHeaderTime } = this.generateAuthHash();
    
    const selectedLanguage = await Language.findOne({ code: language });
    const nativeLanguageName = selectedLanguage?.nativeName || language;

    const response = await this.fetchFromPodcastIndex(query, nativeLanguageName, hashForHeader, apiHeaderTime);
    const filteredPodcasts = this.filterPodcasts(response.feeds, language, query);
    const classifiedPodcasts = await this.classifyPodcasts(filteredPodcasts, language);
    
    return this.filterByLevel(classifiedPodcasts, level);
  }

  // ... Additional methods for the service
}

export default new PodcastService(); 