# Fuentes · 34 · m12 · Capstone «Auditoría WAR»

Repos leídos en sus clones locales: `war-paradigm` @ `5dc5e92` (incluye `1b01c66`, del 2026-10-26), `scientific-qa-evidence` @ `c02e623`, `predictor-debugger` @ `03223f7`, `qa-automation-course` (`i18n/es/modules-30-35.json` → `m12`, `quiz-28-35.json`, `pages.json`). Rutas relativas a la raíz de cada repo.

## Afirmaciones del guion

| Escena | Afirmación | Fuente |
| --- | --- | --- |
| E01, E05, E14, E26 | El hook tenía 28 casos; una mutación WAR encontró que `git -c core.x=y push origin main` y `git --no-pager push origin main` pasaban con exit 0; el arreglo añadió pruebas que fallan con el hook anterior; quedaron 33; al preparar el curso se cerró `\git push` y se fijaron 6 límites conocidos (exit 0): hoy son 40 | Commit `war-paradigm@1b01c66` («fix(03): el hook bloquea push a main con opciones globales de git (-c, --no-pager, --git-dir)»), su mensaje y su diff en `experiments/03-second-brain/tests/hook.test.mjs`; `experiments/03-second-brain/README.md` («45 checks», «40 cases», §Known limits, commit `08438a2`); corridas propias abajo |
| E05 | «28 casos» como cifra del curso | `m12.theory` («Eje A · reglas en código») |
| E02 | Premisa del capstone: otra persona, máquina limpia, un comando, misma huella | `m12.mentor`; `pages.json`, `eval.s02` |
| E03 | Analogía del inspector de guardias | `m12.kid` |
| E04 | Los tres ejes | `m12.theory` |
| E05 | Hook `PreToolUse` sobre Bash, exit 2 bloquea, registro en `.claude/settings.json` | `war-paradigm/experiments/03-second-brain/README.md`, Part 2; `.claude/settings.json`; `hooks/block-push-to-main.sh` |
| E06 | 19 sesiones con llamadas, commits y SHA-256 de cada archivo de sesión; sección «What was not executed»; `jd_tts_a`, `jd_tts_b`, `tts_safety_fix` | `scientific-qa-evidence/docs/CODEX_WORK_LOG.md` |
| E06 | Cada commit nombra al agente con `Co-Authored-By`; la persona responde por cada afirmación | `scientific-qa-evidence/README.es.md`, «Cómo se usó la IA» |
| E07 | Mutantes como datos en `tests/scenarios.ts`; runner valida reset, login y línea base; solo KILLED y SURVIVED puntúan; INCONCLUSIVE, INVALID_BASELINE, INFRA_ERROR fuera; 5/7 con self-grant y viewer-create (hallado al preparar el curso); `MUTANT_LAB_STRICT=1` | `war-paradigm/experiments/02-mutants/README.md` |
| E08 | Contrato de self-grant y regla `editMember` | `war-paradigm/experiments/02-mutants/README.md` («Mutants are data, not scripts», «The finding») |
| E09 | Log ausente y log viejo dejan igual el procedimiento publicado; P6 atrapa solo el primero; el hash atrapa los dos | `scientific-qa-evidence/experiments/receipt-check/RESULTS.md` y `RESULTS2.md` |
| E10 | Workflow `verify`: `ubuntu-24.04`, `uv run --locked`, `grep -q "fingerprint: …"` por máquina | `predictor-debugger/.github/workflows/verify.yml` |
| E10 | Workflow `reproduce`: ronda 1 en 6 min 33 s con la descarga incluida, misma huella | `predictor-debugger/README.md`, «Reproducir», nivel b (run 40267731741) |
| E11 | Recompilación en la nube: «No es independiente» | `scientific-qa-evidence/evidence/lean-cloud-2026-10-23/README.md`, línea 18 |
| E11 | Las tres máquinas de predictor-debugger son del autor | `predictor-debugger/README.md`, «Límites» |
| E11 | «Reproducido» frente a «reproducido por un tercero» | `pages.json`, `eval.s03` (aviso «Ojo») |
| E12 | Cinco secciones del reporte honesto; cada número sale de un comando con su exit code | `m12.theory` («Reporte honesto») |
| E13 | Comandos del paso 1 y `exit=1` del modo estricto | `m12.hands`, paso 1 |
| E13 | Marcador de mutantes | `war-paradigm/experiments/02-mutants/README.md`, «What you will see» (copiado del README; no se corrió Playwright para este paquete) |
| E14 | Salida de `demo:03` y de la suite del hook | Corrida propia, abajo |
| E15 | Misma huella en macOS (Python 3.9.6) y en `python:3.12-slim` (Linux aarch64, Python 3.12.15) | Corrida propia, abajo; comando de `m12.hands`, paso 2 y `pages.json`, `eval.s04` |
| E16 | Estructura mínima del paquete | `m12.hands`, paso 3 |
| E17 | Paso 4: hook propio con suite de ataques, `receipts.jsonl`, diff revisado, trailer | `m12.hands`, paso 4 |
| E18 | Formato de `REPRODUCCION-<nombre>.md` | `m12.hands`, paso 5; `scientific-qa-evidence/docs/INDEPENDENT_REPRODUCTION.md` |
| E19 | Defensa de 30–45 min corriendo cada comando en vivo | `m12.hands`, paso 6 |
| E20 | Tres ataques al propio paquete; si solo detecta el log ausente se comporta como P6 | `m12.mut` |
| E21 | Criterios y entregable | `m12.crit`, `m12.deliver` |
| E22 | Rúbrica integrada de cuatro filas | `m12.rubm`; `pages.json`, `eval.s06` |
| E23–E25 | Preguntas 1, 3 y 6 del banco de m12 | `qa-automation-course/i18n/es/quiz-28-35.json`, `m12` |
| E26 | Siguiente: m13 (posición 35) | `qa-automation-course/course.json` |

## Corridas propias (2026-10-26)

### Hook antes y después de `1b01c66` (E01)

Hook anterior extraído con `git show 1b01c66^:experiments/03-second-brain/hooks/block-push-to-main.sh`; hook actual del árbol en `5dc5e92`. Repo git temporal en la rama `feature/x`, `CLAUDE_PROJECT_DIR` apuntando a él. Entrada: `{"tool_name":"Bash","tool_input":{"command":"<comando>"}}` por stdin.

```text
old | git push origin main | exit=2
old | git -c core.x=y push origin main | exit=0
old | git --no-pager push origin main | exit=0
new | git push origin main | exit=2
new | git -c core.x=y push origin main | exit=2
new | git --no-pager push origin main | exit=2
```

Suite del hook en el árbol de `1b01c66^` (extraído con `git archive`): `ℹ tests 28 · pass 28 · fail 0`. En `5dc5e92`: `ℹ tests 33 · pass 33 · fail 0`. En `08438a2`: `ℹ tests 40 · pass 40 · fail 0`; con esa suite, el hook de `1b01c66~1` falla 5 (`-c`, `--no-pager`, `--git-dir`, `--work-tree` y `\git`) y el de `5dc5e92` falla 1 (`\git`).

### `npm run demo:03` y la suite (E14)

Desde `war-paradigm/experiments/03-second-brain` (equivale a `node tests/demo.mjs`):

```text
  $ git push origin main                     ✘ BLOCKED (exit 2)
      blocked by hook: block-push-to-main.sh — a push to 'main' is not allowed. Push a feature branch and open a pull request.
  $ git push --force origin HEAD:main        ✘ BLOCKED (exit 2)
      blocked by hook: block-push-to-main.sh — a push to 'main' is not allowed. Push a feature branch and open a pull request.
  $ npm test && git push origin master       ✘ BLOCKED (exit 2)
      blocked by hook: block-push-to-main.sh — a push to 'master' is not allowed. Push a feature branch and open a pull request.
  $ git push origin feature/mutants          ✓ allowed (exit 0)
  $ git push -u origin feature/mutants       ✓ allowed (exit 0)
  $ git pull origin main                     ✓ allowed (exit 0)
```

`node --test tests/hook.test.mjs` → `ℹ tests 40`, `ℹ pass 40`, `ℹ fail 0`. (`npm test` en esa carpeta corre además `vault-links.test.mjs`: 45 pruebas en total.)

### Reproducción en limpio (E15)

Clon de `scientific-qa-evidence` @ `c02e623`, imagen `python:3.12-slim` ya presente en la máquina:

```text
$ docker run --rm -v "$PWD":/w -w /w python:3.12-slim python3 verificar.py
Versión de los datos: 26791fe6546f   Sistema: Linux aarch64   Python 3.12.15
  1/6  [OK]  Archivos intactos (SHA-256)  (0.8 s)
  2/6  [OK]  Corridas numéricas guardadas, iguales entre Mac y Linux  (0.1 s)
  3/6  [OK]  Volver a correr las 84 variantes numéricas  (0.4 s)
  4/6  [OK]  README, CLAIMS y registros dicen lo mismo  (0.1 s)
  5/6  [OK]  Recibos de los controles Mathlib  (0.0 s)
  6/6  [OK]  Comprobación de recibos en los paquetes publicados  (0.2 s)
Resultado: las 6 comprobaciones salieron OK en tu computador.
Tu huella: C5F0-F1A8-2F4D
exit=0
```

Mismo commit en macOS arm64, Python 3.9.6: `Tu huella: C5F0-F1A8-2F4D`, `exit=0` (salida completa en `32-m26/fuentes.md`).

## No verificado para este paquete

- `npm run demo:02` y `npm run test:strict` no se corrieron (lanzan Playwright y un servidor; se evitó abrir navegadores en la máquina compartida). El marcador sale del README del experimento y el `exit=1` del modo estricto, del texto del módulo.
- El estado de los workflows de GitHub Actions (verde o rojo hoy) no se consultó; se citan los archivos de workflow y la corrida documentada en el README.
- Si el commit `1b01c66` ya está publicado en GitHub: el clon dice estar al día con `origin/main`, pero no se consultó el remoto.
