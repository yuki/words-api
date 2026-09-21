
# API para palabras en castellano y euskera

Este proyecto es una pequeña API que devuelve palabras en euskera o castellano.

## Diccionarios

Dentro del directorio `data` están los dos diccionarios. Se han utilizado ficheros de distintos paquetes de GNU/Linux para obtener las palabras

FALTA rellenear cuáles han sido exáctamente.

## API

La API cuenta con los siguientes *endpoints*:

- `/api/all`: devuelve todas las palabras con el índice generado (por idiomas, y dentro de cada idioma por la longitud de palabra).
- `/api/word`: devuelve una palabra por defecto, pero acepta los siguientes parámetros:
  - "lang": para elegir idioma.
  - "length": para seleccionar palabras de esa longitud de letras.
  - "number": cuántas palabras queremos que nos devuelva.


## Ejecutar API

Para hacer funcionar la API necesitas tener instalado [Node.js](https://nodejs.org/).

```console
npm install
npm run dev
```

El acceso por defecto es [http://localhost:3003](http://localhost:3003).


## Ejemplos

A continuación varios ejemplos de peticiones:

- `http://localhost:3003/api/all`: devuelve todas las palabras
- `http://localhost:3003/api/word?lang=eu&length=4`: devuelve una palabra en euskera de 4 letras
- `http://localhost:3003/api/word?lang=eu&length=7&number=3`: devuelve 3 palabras en euskera de 7 letras
- `http://localhost:3003/api/word?lang=es&length=9&number=2`: devuelve dos palabra en castellano de 9 letras

