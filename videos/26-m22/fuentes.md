# Fuentes · m22

Rutas relativas a los clones de `brand/`. Commits leídos: war-paradigm `5dc5e92`, laya-server `bf88c61`, jev-ci-triage `a41f0fb`. Las salidas se capturaron el 2026-10-26; las mutaciones y las pruebas nuevas se hicieron en copias de trabajo, nunca en los clones.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | La prueba de la "funcionalidad que falta" volvió con 0.69, 0.71, 0.78 y 0.84; umbral 0.75; en algunas llamadas habría quedado como flaky, lo cual es incorrecto; la clase no cambió | `jev-ci-triage/README.es.md`, sección de límites ("Misma entrada, confianza distinta") y línea 90 |
| 2 | "En dos de esas llamadas": 0.78 y 0.84 superan 0.75 | Conteo directo sobre los cuatro valores de la fila 1 |
| 3 | Regresión de accesibilidad 0.61, 0.62 y 0.91 | `jev-ci-triage/README.es.md`, mismo párrafo |
| 4 | Tres políticas: fail-closed (aserciones, playwright-jev), fail-open (triaje, jev-ci-triage), fail-safe (selección, jev-test-impact) | `qa-automation-course/i18n/es/modules-24-29.json` → `m22.theory[0]` |
| 5 | Mapeo yes / no / ambiguous, umbral 0.8, ambiguo falla por defecto, "Nothing unverified ever passes", equipos sin clave en rojo | `playwright-jev/docs/adr/0001-three-valued-verdicts-fail-closed.md` |
| 6 | Clases regression, flaky, environment, test-data, unknown; reglas primero; umbral 0.75; `unknown · unverified` con el error HTTP | `jev-ci-triage/README.es.md` (tabla de clases y "Cómo leer el reporte") |
| 7 | 17 de 126 llamadas HTTP con éxito por 429 | `jev-ci-triage/README.es.md`, "Disponibilidad" |
| 8 | jev-test-impact: si Jev falla corren todas las pruebas; batería completa cada noche | `jev-test-impact/README.es.md`, "La regla de oro" |
| 9 | Definición de flip rate; fijar modelo, temperatura y versión del prompt | `m22.theory[2]`; `quiz-20-27.json` → `m22` preguntas 5 y 6 |
| 10 | Salida de `npm run demo:01` (pinned 86/84/87 STABLE; unpinned 83/74/REJECTED 76, UNSTABLE, tres advertencias) | Ejecución real en copia de war-paradigm; coincide con `experiments/01-ai-verdict/README.md` §5 |
| 11 | Run 3: AC-1 y AC-3 fallan, 76 sobre gate 70 y REJECTED | Ejecución real; `experiments/01-ai-verdict/README.md` §4-5 |
| 12 | "Same input, N runs. Scores may move; the VERDICT may not." | `war-paradigm/experiments/01-ai-verdict/src/stability.ts` |
| 13 | Los seis runs son fixtures escritos a mano | `experiments/01-ai-verdict/README.md`, "What is real, what is recorded" |
| 14 | Siete reglas de redacción (Bearer/Basic, secretos con nombre, prefijos, JWT, correo, 13-19 dígitos, rutas Users/home) | `jev-ci-triage/src/redact.ts` |
| 15 | Salida del redactor con `[redacted-number]at` sin espacio | Ejecución real con `npx tsx` sobre la cadena de `jev-ci-triage/tests/text.test.ts`; `npx vitest run tests/text.test.ts` → 4 passed |
| 16 | Laya: modelo abierto, ~2 GB de RAM, solo CPU, contrato de Jev, lee como máximo 512 tokens (~350 palabras) | `laya-server/README.es.md`, "Qué es" y "Por qué" |
| 17 | Reglas de la cascada: > 1500 caracteres a la nube, umbral 0.8, `escalate: true` si la nube falla o no hay cascada | `laya-server/src/policy.mjs`; `laya-server/README.es.md` (tabla de variables); `m22.theory[5]` |
| 18 | Error de la nube → `reason: ${r.reason}+upstream_error`, `escalate: true` | `laya-server/src/server.mjs` línea 64 |
| 19 | `npm test` → 7 casos, 7 pass | Ejecución real en el clon de laya-server; `laya-server/README.es.md`, "Pruebas" |
| 20 | Dos casos nuevos (1500 exactos y 1501 sin cascada) → 9 pass | Escritos y ejecutados en una copia de trabajo; no están en el repo |
| 21 | El camino de CASCADE_URL caído vive en server.mjs y no tiene prueba | Lectura de `laya-server/test/policy.test.mjs` (solo importa `policy.mjs`) |
| 22 | Modo sombra; "Nadie ha medido todavía la calidad de Laya en español: esa medición va antes de confiar en ella" | `laya-server/README.es.md`, "Un ejemplo real" |
| 23 | laya-server no tiene CI | `m22.theory[6]`; el clon no tiene carpeta `.github` |
| 24 | Mutación: temperatura 0 → 1 en `fixtures/runs/pinned/run-1.json`; demo sigue STABLE con advertencia; pruebas 2 failed, 25 passed (base: 27 passed, 1 skipped) | Ejecución real en copia de war-paradigm, revertida con `git checkout -- .` |
| 25 | Reto, criterios y nivel máximo | `m22.hands`, `m22.crit`, `m22.top` |
| 26 | Preguntas del quiz | `qa-automation-course/i18n/es/quiz-20-27.json` → `m22`, preguntas 1, 4 y 7 |
| 27 | Siguiente módulo: m23 | `course.json` (posición 27); `modules-24-29.json` → `m23.title` |
