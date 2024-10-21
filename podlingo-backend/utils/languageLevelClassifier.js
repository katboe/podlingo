import LanguageLevelKeywords from '../models/languageLevelKeywords.js'; // Import the model

const classifyPodcastLevel = async  (title, description, languageCode) => {
    // Default classification if keywords are not found
    let classification = 'C1';

    try {
        // Fetch keywords from the database for the specified language code and English
        const [keywordsDataForLang, keywordsDataForEnglish] = await Promise.all([
            LanguageLevelKeywords.find({ language: languageCode }),
            LanguageLevelKeywords.find({ language: 'en' }),
          ]);


        // Function to organize keywords by level
        const organizeKeywordsByLevel = (keywordsData) => {
            const keywordsByLevel = {};
            keywordsData.forEach(({ level, words }) => {
            if (!keywordsByLevel[level]) {
                keywordsByLevel[level] = [];
            }
            keywordsByLevel[level] = [...keywordsByLevel[level], ...words]; // Append words
            });
            return keywordsByLevel;
        };

        // Combine keywords from both languages
        const languageKeywords = organizeKeywordsByLevel(keywordsDataForLang);
        const englishKeywords = organizeKeywordsByLevel(keywordsDataForEnglish);

        // Merge the two keyword objects (language-specific + English)
        Object.keys(englishKeywords).forEach((level) => {
        if (languageKeywords[level]) {
            languageKeywords[level] = [...languageKeywords[level], ...englishKeywords[level]];
        } else {
            languageKeywords[level] = englishKeywords[level];
        }
        });

        // Check for keywords against the title and description
        for (const level in languageKeywords) {
            // Check if any keyword for the level is present in the title or description
            const levelKeywords = languageKeywords[level];
            
            if (!levelKeywords) {
                console.warn(`No keywords found for level: ${level}`);
                continue; // Skip if no keywords found for this level
            }

            const hasKeyword = levelKeywords.some(keyword => 
                title.toLowerCase().includes(keyword) || 
                description.toLowerCase().includes(keyword)
            );

            if (hasKeyword) {
                classification = level;
                break; // Stop at the first found level
            }
        }
    } catch (error) {
        console.error('Error fetching keywords:', error);
        // You may want to handle the error appropriately
    }
  
    return classification;
  };

export default classifyPodcastLevel;