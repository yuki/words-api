import fs from "node:fs";
import path from "node:path";

type Language = "eu" | "es";

type WordIndex = {
  [language in Language]: {
    [length: number]: string[];
  };
};

const index: WordIndex = {
  eu: {},
  es: {}
};

function loadWords(language: Language, filename: string): void {
  const filePath = path.join(process.cwd(), "data", filename);

  const content = fs.readFileSync(filePath, "utf-8");

  const words = content
    .split(/\r?\n/)
    .map(word => word.trim())
    .filter(word => word.length > 0);

  for (const word of words) {
    const length = word.length;

    if (!index[language][length]) {
      index[language][length] = [];
    }

    index[language][length].push(word);
  }
}

loadWords("eu", "basque.txt");
loadWords("es", "spanish.txt");

export { index };