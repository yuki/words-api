import express from "express";
import cors from "cors";
import { index } from "./words.js";
import { parentPort } from "node:worker_threads";

const app = express();
app.use(cors());

const PORT = Number(process.env.PORT) || 10000;

app.get("/", (_req, res) => {
  res.json({
    title: "Words API",
    usage: {
      "/api/all": "Devuelve todas las palabras",
      "/api/word": {
        description: "Devuelve palabras aleatorias según los parámetros de consulta",
        parameters: {
          lang: "Código de idioma (eu o es). Por defecto 'es'.",
          length: "Longitud de las palabras (tiene que ser mayor que 3). Por defecto 6.",
          number: "Número de palabras a devolver (tiene que ser 1 o mayor). Por defecto 1."
        }
      },
      ejemplos: [
        "/api/word?lang=eu&length=6&number=3",
        "/api/word?lang=es&length=5&number=1"
      ]
    }
  });
});

app.get("/api/all", (_req, res) => {
  res.json(index);
});

app.get("/api/word", (req, res) => {
  const lang = req.query.lang as string || "es";
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});