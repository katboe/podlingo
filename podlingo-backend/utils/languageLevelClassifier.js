// /utils/languageLevelClassifier.js very preliminary
const classifyPodcastLevel = (description) => {
    // Implement your logic here
    const simpleWords = ['hello', 'goodbye', 'yes', 'no']; // Example A1 words
    const complexWords = ['abstruse', 'perplexing', 'esoteric']; // Example C2 words

    let level = 'A1'; // Default level

    // Basic checks for vocabulary
    const words = description.split(' ');
    const simpleWordCount = words.filter(word => simpleWords.includes(word.toLowerCase())).length;
    const complexWordCount = words.filter(word => complexWords.includes(word.toLowerCase())).length;

    if (complexWordCount > 5) {
        level = 'C2';
    } else if (complexWordCount > 3) {
        level = 'C1';
    } else if (simpleWordCount > 5) {
        level = 'A2';
    } else {
        level = 'B1'; // Default to B1 if no conditions met
    }

    return level;
};

export default classifyPodcastLevel;