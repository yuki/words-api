import express from "express";
import { index } from "./words.js";

const app = express();

const PORT = process.env.PORT || 3003;

app.get("/", (_req, res) => {
  res.json({
    message: "Words API"
  });
});

app.get("/api/all", (_req, res) => {
  res.json(index);
});

app.get("/api/word", (req, res) => {
  const lang = req.query.lang as string;
  const length = Number(req.query.length) || 6;
  const number = Number(req.query.number) || 1;

  if (lang !== "eu" && lang !== "es") {
    res.status(400).json({
      error: "Idioma no váido. Usa 'eu' o 'es'."
    });
    return;
  }

  if (!Number.isInteger(length) || length <= 3) {
    res.status(400).json({
      error: "length tiene que ser un entero mayor que 3."
    });
    return;
  }

  if (!Number.isInteger(number) || number <= 0) {
    res.status(400).json({
      error: "number tiene que ser 1 o mayor."
    });
    return;
  }

  const words = index[lang][length];

  if (!words) {
    res.json([]);
    return;
  }

  const count = Math.min(number, words.length);

  const positions = new Set<number>();
  
  while (positions.size < count) {
    const position = Math.floor(Math.random() * words.length);
    positions.add(position);
  }
  
  const result = [...positions].map(position => words[position]);

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});