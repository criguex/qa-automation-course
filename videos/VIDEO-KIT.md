# Kit de guiones: un video animado por módulo del curso

Fuente de cada módulo: `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/qa-automation-course/`
(`course.json` da el orden y el id; los textos en español están en `i18n/es/modules-*.json` y `i18n/es/quiz-*.json`). Curso publicado: https://criguex.github.io/qa-automation-course/

## Formato elegido por Cris (26-oct)
- Animado, sin cámara: escenas con la marca y voz en off. Sin persona a cuadro.
- Dos idiomas: un guion completo en español (Colombia, tuteo, natural) y otro en inglés. El inglés NO es traducción literal: se adapta para que suene nativo.
- Duración de 15 a 25 min por módulo. A unas 150 palabras por minuto, la narración lleva entre 2.300 y 3.700 palabras por idioma.
- Desde el 27-oct cada módulo se divide en 2 videos (`NN-<id>-p1` teoría para niños, `NN-<id>-p2` manos a la obra), cada uno de 9 a 13 min a 150 ppm. Explicado para niños: una analogía y un gráfico por concepto, frases cortas, cada término definido la primera vez. La carpeta `NN-<id>/` queda como fuente.

## Carpeta por módulo: `NN-<id>/` (NN = posición 01–35 en course.json)
- `guion.es.md` y `guion.en.md`: la narración completa, en bloques con marca de tiempo `[mm:ss]`. Cada bloque dice qué escena acompaña (`→ E07`).
- `escenas.json`: una lista de escenas `{id, inicio, fin, tipo, visual, texto_pantalla:{es,en}, assets, notas_animacion}`.
  - `tipo` es uno de: `titulo`, `animacion`, `diagrama`, `terminal`, `codigo`, `navegador`, `quiz`, `analogia`, `resumen`.
  - En `terminal` y `codigo`: solo comandos y salidas REALES copiados de los repos o del laboratorio del módulo, con la ruta de donde salen.
- `metadata.es.md` y `metadata.en.md`: título (60 caracteres o menos), descripción con capítulos (timestamps), 10 tags, texto de miniatura (4 palabras o menos) y enlaces al módulo del curso y a los repos.
- `fuentes.md`: cada afirmación con datos (números, resultados, versiones) va con su fuente (archivo del repo, sección o URL). Lo que no tiene fuente no entra al guion.

## Estructura del video
1. **Gancho (0:00–0:45).** Un problema real del módulo: un fallo, un falso verde o un mutante que sobrevive. Nada de "hola, bienvenidos".
2. **Explicado para un niño de 8 años (≈1 min).** La analogía del módulo, animada.
3. **Teoría** en 3 a 5 bloques con diagramas animados.
4. **Laboratorio paso a paso:** terminal y navegador con los comandos reales del módulo y del repo de Cris.
5. **Mutación WAR de la semana:** romper algo a propósito y ver si las pruebas lo notan.
6. **El reto y cómo se evalúa:** criterios verificables y rúbrica.
7. **Mini-quiz en pantalla:** 3 preguntas del banco del módulo, con pausa.
8. **Cierre:** resumen de 3 ideas y el siguiente módulo.

## Marca visual
- Paleta: navy #071B2B, deep #0D2638, panel #123448, grid #214456, mint #55DFBD (bien), coral #FB8176 (falla), gold #FFC56E (ojo), texto #F4F7F5 / #ABC0C8.
- Estados siempre con símbolo + palabra (✓ pasa, ✗ falla, ⚠ ojo).
- Firma en pantalla: `Cristian Guerra · QA · Medellín`.

## Reglas
- No inventar datos, métricas, resultados, clientes ni comandos. Todo sale del módulo, de los repos públicos de Cris o de la documentación oficial. Las cifras y avisos que ya están en el curso se citan tal cual, por ejemplo: "el CI de qa-eval-lab sin el secreto no evalúa el LLM".
- La voz es la de Cristian (primera persona), cercana y concreta, sin frases de relleno ni muletillas de IA.
- La producción (voz, render) NO se arranca: la fábrica de video está pausada. Por ahora solo se preparan los paquetes de contenido.
