# Videos del curso

Material de producción de los videos animados del curso: un guion por módulo en español e inglés, las escenas, los datos de cada gráfico y las salidas reales de terminal que aparecen en pantalla.

Cada carpeta `NN-<módulo>` tiene:

- `guion.es.md` / `guion.en.md`: la narración, con un bloque `[mm:ss] → Exx` por escena.
- `escenas.json`: tipo de cada escena y texto en pantalla.
- `render/render.json`: datos de los gráficos (tablas, tarjetas, diagramas) y las palabras de la narración que activan cada elemento.
- `render/salidas/`: salidas reales de los laboratorios; `capturas.sh` las vuelve a generar. Lo que se ve en una terminal del video sale de aquí.
- `metadata.es.md` / `metadata.en.md`: título, descripción y capítulos de YouTube.
- `fuentes.md`: de dónde sale cada dato del guion.

Desde el módulo 02 cada módulo se publica en dos videos (`-p1` teoría, `-p2` laboratorio) y se explica con analogías y gráficos para que cualquiera lo entienda. Las reglas de estilo están en [VIDEO-KIT.md](VIDEO-KIT.md).

La narración usa una voz sintética (ElevenLabs). Los laboratorios citados son repos públicos de [criguex](https://github.com/criguex).

| Carpeta | Título | Estado |
|---|---|---|
| `01-m1` | Mentalidad QA: por qué rechacé un 76 sobre 100 | [▶ YouTube](https://youtu.be/s9gIMUDvWE0) |
| `02-m30` | WAR Paradigm: tu suite verde puede estar dormida | versión en un solo video (reemplazada por las dos partes) |
| `02-m30-p1` | 2 · ¿Qué es un mutante? WAR Paradigm explicado fácil | [▶ YouTube](https://youtu.be/cki3wr9xWo4) |
| `02-m30-p2` | 2.1 · Manos a la obra: tu primer mutante con WAR | [▶ YouTube](https://youtu.be/7Z0lHcEQEtM) |
| `03-m2` | Diseño de pruebas: el límite de 80 que nadie probó | guion listo |
| `04-m3` | Setup día 0: Node LTS, lockfile, npx y tu primer PR | guion listo |
| `05-m3b` | Obsidian para QA: el cuaderno que lee tu IA | guion listo |
| `06-m4` | TypeScript para QA: lo que el compilador no ve | guion listo |
| `07-m5` | Playwright + TypeScript E2E — framework desde cero | guion listo |
| `08-m6` | API & Contract Testing — tu especialidad futura | guion listo |
| `09-m7` | BDD — Gherkin, Cucumber & Serenity | guion listo |
| `10-m7b` | Ejecución disciplinada — ciclos, test data & known issues | guion listo |
| `11-m8` | Reportes & Trazabilidad — evidencia que se puede firmar | guion listo |
| `12-m8b` | Sign-off — certificar una historia, el cierre del método | guion listo |
| `13-m9` | m9 — CI/CD y Docker | guion listo |
| `14-m28` | m28 — Pipelines: anatomía, gates, qué significa un verde y pipelines de evidencia | guion listo |
| `15-m27` | m27 — Contenedores efímeros y entornos desechables | guion listo |
| `16-m10` | m10 — Performance y Cloud (k6 · JMeter · AWS) | guion listo |
| `17-m20` | m20 — Determinismo: mocks, record/replay y fixtures indexados por hash | guion listo |
| `18-m11` | m11 — QA aumentado con IA | guion listo |
| `19-m14` | m14 · QA asistida por IA I — el asistente prueba, la persona firma | guion listo |
| `20-m15` | m15 · Mutation testing — kill rate, sobrevivientes y Stryker/PIT | guion listo |
| `21-m29` | m29 · Ejecución de mutantes — generar, correr, clasificar y aprender de cada corrida | guion listo |
| `22-m21` | m21 · Mutantes que aprenden — ledger, priorización y mutantes que miden al auditor | guion listo |
| `23-m18` | m18 · Triaje de fallos de CI y selección de pruebas por impacto | guion listo |
| `24-m16` | m16 · Evaluar IA con un LLM como juez — DeepEval, Promptfoo, umbrales y falsos verdes | guion listo |
| `25-m17` | Calibrar un juez de IA: kappa, held-out y zona gris | guion listo |
| `26-m22` | Jueces de IA con probabilidad: fallas, flip rate y cascadas | guion listo |
| `27-m23` | QA con asistentes de IA: hooks, evidencia y firma humana | guion listo |
| `28-m19` | Prerregistro en QA: umbrales antes de los datos y huellas | guion listo |
| `29-m32` | QA de requisitos: 19 problemas antes de escribir código | guion listo |
| `30-m24` | Mutación numérica: controles, oráculo y prueba del arnés | guion listo |
| `31-m25` | m25 · Física de fluidos y estadística para el depurador | guion listo |
| `32-m26` | m26 · Verificar una prueba formal sin ser matemático | guion listo |
| `33-m31` | m31 · Prueba a ciegas con compromiso por hash | guion listo |
| `34-m12` | m12 · Capstone «Auditoría WAR» | guion listo |
| `35-m13` | m13 · Tu carrera QA+IA: posicionamiento | guion listo |
