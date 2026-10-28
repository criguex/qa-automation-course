# Fuentes · 33 · m31 · Prueba a ciegas con compromiso por hash

Repos leídos en sus clones locales: `predictor-debugger` @ `03223f7`, `scientific-qa-evidence` @ `c02e623`, `qa-automation-course` (`i18n/es/modules-30-35.json` → `m31`, `quiz-28-35.json`, `pages.json`). Rutas relativas a la raíz de cada repo.

## Afirmaciones del guion

| Escena | Afirmación | Fuente |
| --- | --- | --- |
| E01 | En las rondas 1 a 4 el autor inventó las trampas y el detective; la ronda 5 pregunta si atrapa trampas que no diseñó, sin marcar como malas las correctas | `predictor-debugger/round5/KIT.md`, «Qué se prueba»; `m31.mentor` |
| E01, E17 | Mini-ronda: 8 correctos aceptados, 8 trampas detectadas, 4 de ×1,0001 escapadas | Corrida propia, ver abajo |
| E02, E18 | `revelar.py` sale con 1 y «el hash no coincide» al cambiar una etiqueta o la sal | Corrida propia, ver abajo; `m31.mut` |
| E03 | Analogía del sobre sellado | `qa-automation-course/i18n/es/modules-30-35.json`, `m31.kid` |
| E04 | Definición de correcto y de trampa; «Se vale leer el código del depurador y apuntar justo debajo de sus umbrales» | `predictor-debugger/round5/KIT.md`, «Las reglas del juego» |
| E05 | Compromiso: `shasum -a 256 etiquetas.json`, mandar solo el hash antes de entregar nada | `predictor-debugger/round5/KIT.md`, paso 4 |
| E05 | Concepto de esquema de compromiso | https://en.wikipedia.org/wiki/Commitment_scheme |
| E06 | Campo `sal` de 32 caracteres hex; formato de `etiquetas.json` (etiqueta, tipo, magnitud) | `predictor-debugger/round5/KIT.md`, paso 3; `m31.theory` («La sal») |
| E07 | Hash en `round5/compromisos/<usuario>.txt`, hora de GitHub, mensaje como respaldo, issue opcional | `predictor-debugger/round5/KIT.md`, paso 4 |
| E07 | ≥ 100 pares, `pares/<id>.npz`, ids con `secrets.token_hex(4)`, proporción libre y secreta, `pares.sha256` | `predictor-debugger/round5/KIT.md`, pasos 2 y 5 |
| E08 | Regla de decisión y umbrales congelados y subidos con hora antes de abrir; veredictos antes de la revelación | `predictor-debugger/round5/KIT.md`, pasos 6 y 7 |
| E08, E20 | Orden en `git log` como criterio | `m31.crit` |
| E09 | Falsas alarmas (esperado 0), detectadas por tipo y tamaño, piso medido en la ronda 3, «lo que quede por debajo se reporta como no detectado, no se esconde» | `predictor-debugger/round5/KIT.md`, «Lo que se va a reportar» |
| E10 | `openssl rand -hex 16` fuera de la sesión del asistente; solo se publica el SHA-256; reglas 1–4; el asistente tenía acceso al disco | `scientific-qa-evidence/experiments/blind-faults/SEED_COMMITMENT.md` |
| E11 | Línea base 3/21, protocolo 15/21 | `scientific-qa-evidence/experiments/blind-faults/STATUS.md`, fila «Blind checks on 21 cases» |
| E11 | Cuatro rondas de revisión: 7 + 3 + 0 + 7 = 17 problemas | `scientific-qa-evidence/experiments/blind-faults/review_rounds.json`; `README.es.md`, «Benchmark de fallos a ciegas» |
| E11 | F2 mal etiquetado, costo no medido, defectos del evaluador v1, v1 conservada con fe de erratas, benchmark de regresión, retiro del «0 falsas alarmas» | `scientific-qa-evidence/experiments/blind-faults/RESULTS.md`, «Errata and reframing», puntos 1–4 |
| E12 | Hash de la semilla `6ab9f825…614d5e`, publicado antes de asignar; 32 hex + salto de línea | `scientific-qa-evidence/experiments/blind-faults/SEED_COMMITMENT.md`; corrida propia |
| E13 | Receta de reproducción de la asignación y resultado `identical` | `scientific-qa-evidence/experiments/blind-faults/RESULTS.md`, «Reproduce the assignment»; corrida propia |
| E14 | Código de `preparar.py` | `m31.hands`, paso 3 (copiado del módulo; completo abajo) |
| E16 | `thresholds.json` con SHA-256 `77bfdca0…ad32eb` es el de la ronda 1 | `predictor-debugger/RESULTS.md`, primer párrafo |
| E16 | «Es el depurador de la ronda 1, no el de la ronda 5» | `m31.hands`, paso 4 |
| E17 | Ruido detectado solo por D1 | Corrida propia (`veredictos.json` cruzado con `etiquetas.json`), ver abajo |
| E19–E20 | Ejercicio en parejas, opciones, criterios y nivel 4 | `m31.hands` (ejercicio verificable), `m31.crit`, `m31.deliver`, `m31.top`; `pages.json`, `eval.s05` |
| E19 | Mutantes declarados como datos en `tests/scenarios.ts` | `war-paradigm/experiments/02-mutants/README.md`, «Mutants are data, not scripts» |
| E21–E23 | Preguntas 2, 3 y 5 del banco de m31 | `qa-automation-course/i18n/es/quiz-28-35.json`, `m31` |
| E24 | Siguiente: m12, capstone (posición 34) | `qa-automation-course/course.json` |

## Corridas propias (2026-10-26)

Entorno: macOS arm64, `uv 0.11.18`, `uv run --locked` → Python 3.9.6, numpy 1.26.4. Clon temporal de `predictor-debugger` @ `03223f7` en el scratchpad; clon de `scientific-qa-evidence` @ `c02e623`. Los tres scripts del laboratorio se extrajeron literalmente de `m31.hands` (pasos 3, 4 y 5) del curso.

### Pasos 1 y 2 (E12, E13)

```text
$ shasum -a 256 semilla-experimento.txt
6ab9f825a6e0102f06589795a3f3afb81b954ec054362e7e0352018547614d5e  semilla-experimento.txt
$ mkdir <dir> && cp protocol_lib.py assign.py <dir>/
$ (cd <dir> && python3 assign.py --seed-file "$OLDPWD/semilla-experimento.txt" --out cases)
{
  "seed_sha256": "6ab9f825a6e0102f06589795a3f3afb81b954ec054362e7e0352018547614d5e",
  "cases": 21,
  "out": "cases",
  "key": "key.json (keep private until results are recorded)"
}
$ diff <dir>/key.json key.json && diff -r <dir>/cases cases && echo identical
identical
```

`<dir>` fue una carpeta del scratchpad, no `/tmp/repro`.

### Paso 3 · `preparar.py` (E14, E15)

```python
import json, secrets, sys
from pathlib import Path
import numpy as np
from pd import flow
from pd.initial import random_field
from pd.data import advance

s = flow()
out = Path(sys.argv[1]); (out / "pares").mkdir(parents=True, exist_ok=True)
trampas = {
    "correcto": lambda u: u,
    "float32": lambda u: u.astype(np.float32).astype(np.float64),
    "energia x1.05": lambda u: 1.05 * u,
    "energia x1.0001": lambda u: 1.0001 * u,
    "ruido 1e-3": lambda u: u + 1e-3 * np.random.default_rng(secrets.randbits(32)).standard_normal(u.shape),
}
etiquetas = {"sal": secrets.token_hex(16), "pares": {}}
for tipo, f in trampas.items():
    for _ in range(4):
        seed = 10001 + secrets.randbelow(10**6)
        u0 = advance(s, random_field(s, seed, 3))
        exacto = advance(s, u0)
        u1 = f(exacto)
        pid = secrets.token_hex(4)
        np.savez(out / "pares" / f"{pid}.npz", u0=u0, u1=u1)
        mag = float(np.linalg.norm(u1 - exacto) / np.linalg.norm(exacto))
        etiqueta = "correcto" if tipo in ("correcto", "float32") else "trampa"
        etiquetas["pares"][pid] = {"etiqueta": etiqueta, "tipo": tipo, "magnitud": mag}
(out / "etiquetas.json").write_text(json.dumps(etiquetas, indent=1))
```

```text
$ uv run --locked python preparar.py ronda          (11 s de reloj)
$ shasum -a 256 ronda/etiquetas.json > compromiso.txt
$ cat compromiso.txt
4ef6b894ee42a218c74aad018d00fdc7b9b0ce5bd9713f738069b3f6ae03f4b6  ronda/etiquetas.json
$ ls ronda/pares | wc -l
      20
```

Magnitudes registradas en `etiquetas.json`: correcto 0; float32 2,52e-8 a 2,56e-8; energía ×1,05 5,00e-2; energía ×1,0001 1,00e-4; ruido 3,84e-3 a 3,87e-3. Sal de 32 caracteres. Como la sal, las semillas y los ids son aleatorios, otra corrida dará otros hashes e ids.

### Paso 4 · `revisar.py` (E16)

Script literal de `m31.hands`, paso 4. La carpeta se pasó como `ronda/pares` (el módulo escribe `pares`).

```text
$ shasum -a 256 revisar.py thresholds.json
dea1b9a02da470ae6d78138242ecd6dbf623ae15bc51650f050fb97cae26ea04  revisar.py
77bfdca0156fc677a4f044caeedcb65b4ae717b582bc329d8f39234abfad32eb  thresholds.json
$ uv run --locked python revisar.py ronda/pares > veredictos.json
```

Cruce de veredictos con etiquetas (chequeos que marcaron cada tipo): energía ×1,05 → D2 y D3 (4/4); ruido 1e-3 → solo D1 (4/4); correcto, float32 y energía ×1,0001 → ninguno.

### Paso 5 · `revelar.py` (E17)

```text
$ uv run --locked python revelar.py ronda/etiquetas.json compromiso.txt veredictos.json; echo "exit=$?"
correcto           aceptado bien  4
energia x1.0001    escapó         4
energia x1.05      detectada      4
float32            aceptado bien  4
ruido 1e-3         detectada      4
exit=0
```

Coincide con lo que describe el propio módulo para su corrida de prueba (`m31.hands`, paso 5).

### Mutación (E02, E18)

1. Se cambió en `ronda/etiquetas.json` la primera aparición de `"etiqueta": "trampa"` por `"etiqueta": "correcto"`:

```text
el hash no coincide: 89168671f90683a71750696092c04ee4b0805b08bcf21524a1cf10ce2920ffaa != 4ef6b894ee42a218c74aad018d00fdc7b9b0ce5bd9713f738069b3f6ae03f4b6
exit=1
```

2. Se restauró la copia original y se reemplazó solo el valor de `sal` por otros 32 caracteres hex aleatorios:

```text
el hash no coincide: 43c1409c7f809d64b21a1cf89a8ce998e1e54f5ad56d2b1a7d685dfe75ed08d7 != 4ef6b894ee42a218c74aad018d00fdc7b9b0ce5bd9713f738069b3f6ae03f4b6
exit=1
```

3. Restaurado: `shasum -a 256 -c compromiso.txt` → `ronda/etiquetas.json: OK`.

## No verificado para este paquete

- La mini-ronda se corrió con una sola persona haciendo de A y de B: sirve para mostrar la mecánica, no es una prueba a ciegas real.
- No se comprobó en GitHub que exista la carpeta `round5/compromisos/` (el kit dice que se crea al recibir el primer hash).
