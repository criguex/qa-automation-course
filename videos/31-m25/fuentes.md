# Fuentes · 31 · m25 · Física de fluidos y estadística para el depurador

Repos leídos en sus clones locales: `predictor-debugger` @ `03223f7`, `agent-eval-jev` @ `1a4e3b0`, `qa-automation-course` (textos de `i18n/es/modules-30-35.json`, `quiz-28-35.json` y `pages.json`). Rutas relativas a la raíz de cada repo.

## Afirmaciones del guion

| Escena | Afirmación | Fuente |
| --- | --- | --- |
| E01 | P0 y P0f32 marcados por D2 en 21 de 210 pasos fuera de distribución, en las tres máquinas; los valores van de 3,32e-3 a 4,77e-3 contra τ = 3,31e-3 | `predictor-debugger/RESULTS.md`, «Out of distribution» |
| E01 | La causa es el trapecio del propio estadístico D2 sobre Δ = 0,1, que la caída más rápida de k₀ = 5 hace más grande; no el solver | `predictor-debugger/RESULTS.md`, «Ledgers» (explicación con `tools/fp_diagnostic.py`, residuo que cae ×3,96–3,98 por mitad de h) |
| E02 | P2 marcado en el 100 % de los pasos de prueba; ρ(D3, D4) = −0,185 (semilla 0, n = 400); D2 nunca se dispara en P2 | `predictor-debugger/RESULTS.md`, «E1, test split» |
| E03 | Analogía del globo, la energía y el árbitro | `qa-automation-course/i18n/es/modules-30-35.json`, `m25.kid` |
| E04 | Caja periódica [0, 2π]³, n = 32, ν = 0,05, sin forzamiento, RK4 con dt = 0,01, paso de predicción Δ = 0,1 (10 pasos del solver) | `predictor-debugger/DESIGN.md`, «System»; `round5/KIT.md`, «Las reglas del juego» |
| E04–E05 | Definiciones de D1, D2 (con la regla dura E(u₁) > E(u₀)) y D3 | `predictor-debugger/DESIGN.md`, «Debugger checks»; `pd/checks.py` |
| E05 | E = ½⟨\|u\|²⟩, Z = ½⟨\|ω\|²⟩, dE/dt = −2νZ | `predictor-debugger/DESIGN.md`, enmienda 5, «Checks» |
| E06 | D4 es el error contra la referencia y «not a debugger check: used only to judge the debugger» | `predictor-debugger/DESIGN.md`, «Debugger checks», fila D4 |
| E07 | Controles P0, P0f32, P1, P2, P3a (gradiente con ‖∇φ‖ = 5 % de ‖u‖), P3b (×1,05) | `predictor-debugger/DESIGN.md`, «Predictors» y enmienda 1 |
| E08 | Regla de umbral: τ = 10 × máximo de P0 y P0f32 en validación, piso 1e-12 | `predictor-debugger/DESIGN.md`, «Threshold rule» y enmienda 1 |
| E08 | τ D1 = 8,32e-7, τ D2 = 3,31e-3, τ D3 = 8,35e-2 | `predictor-debugger/RESULTS.md`, tabla de márgenes; `thresholds.json` |
| E08 | H1/H1b 0/400; H2, H3, H4 400/400 en Mac, WAR y GUERRA; huella EEC9-09E0-F77D | `predictor-debugger/RESULTS.md`, «Pre-registered hypotheses» |
| E08 | «A poor network is an acceptable result; a debugger that cannot tell the controls apart is a failure» | `predictor-debugger/DESIGN.md`, «Question» |
| E09 | One-step frente a rollout; mediana de D4 de 1,05 % (paso 1) a 4,8 % (paso 10); D1 y D3 planos | `predictor-debugger/DESIGN.md`, enmienda 4; `RESULTS.md`, «E2» |
| E10 | H14 falla: P2gbest 0,635 [0,413; 0,795] contra criterio ≥ 0,7 con IC inf. ≥ 0,5; ΣD3 cumple en tres de cuatro | `predictor-debugger/round3/RESULTS.md`, tabla de hipótesis, fila H14; `README.md`, «Rondas» |
| E10 | H17 pasa en las cuatro redes al transportar la dirección del defecto | `predictor-debugger/round4/RESULTS.md`, filas H17 y H17-D; `README.md`, «Rondas» |
| E11 | Spearman con rangos promedio para empates | `predictor-debugger/DESIGN.md`, enmienda 5, «Spearman ρ»; https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html |
| E12 | Bootstrap por trayectoria: 40 trayectorias con reemplazo, 2.000 réplicas, `default_rng(20261024)` | `predictor-debugger/round3/RESULTS.md`, nota «IC = bootstrap por trayectoria» |
| E12, E24 | 27/29 = 93,1 %, intervalo de Wilson 78–98 % | `agent-eval-jev/README.es.md`, tabla de resultados, fila «Compuesto: código + Jev, calibrado»; `reports/report.md` |
| E13 | `uv run --locked` fija Python 3.9 y numpy 1.26.4 | `predictor-debugger/README.md`, «Reproducir» |
| E13 | Salida de `verify.py --saved linux` | `predictor-debugger/logs/linux/verify_saved.log` (copiada tal cual) |
| E14 | Líneas de `statistics()` y `flags()` | `predictor-debugger/pd/checks.py` |
| E15 | Las tres trampas del ejercicio (energía ×1,05, gradiente agregado, fase corrida) y el uso del paso 1 del kit | `qa-automation-course/i18n/es/modules-30-35.json`, `m25.hands[1]`; `predictor-debugger/round5/KIT.md`, paso 1 |
| E19 | Pisos en `r3test`, signo +: D2 3,2e-3 · D2′ 3,2e-4 · D2″ 3,2e-6; D2″ sin marcas en los controles (H9) | `predictor-debugger/round3/RESULTS.md`, «Debilidad 1» y fila H9 |
| E19 | «Lo que quede por debajo se reporta como no detectado, no se esconde» | `predictor-debugger/round5/KIT.md`, «Lo que se va a reportar» |
| E20–E21 | Criterios, entregable, extra del nivel 4 | `qa-automation-course/i18n/es/modules-30-35.json`, `m25.crit`, `m25.deliver`, `m25.top` |
| E21 | Rúbrica de 4 niveles; apruebas con quiz ≥ 6/8 y reto en nivel 3 | `qa-automation-course/i18n/es/pages.json`, `eval.s02` y `eval.s05` |
| E22–E24 | Preguntas del quiz (3, 7 y 8 del banco de m25) | `qa-automation-course/i18n/es/quiz-28-35.json`, `m25` |
| E25 | Límites: caja 32³, no dice nada de Clay, de la prueba de OpenAI ni de turbulencia real | `predictor-debugger/DESIGN.md`, «Limits stated in advance» |
| E25 | Siguiente módulo: m26 (posición 32) | `qa-automation-course/course.json` |

## Corridas de laboratorio (hechas para este paquete)

Entorno: macOS arm64, `uv 0.11.18`, `uv run --locked` → Python 3.9.6 y numpy 1.26.4. Clon temporal de `predictor-debugger` @ `03223f7` en el scratchpad de la sesión; nada se escribió en el repo. Fecha: 2026-10-26.

### Predicciones, antes de correr (E15)

```text
exacto            ninguno
energia x1.05     D2 (seguro), D3 (probable)
gradiente 5%      D1 (seguro), D3 (probable)
fase corrida      D3 (solo D3)
2026-10-26T20:57:23Z
```

`shasum -a 256 predicciones.txt` → `b6a8f193335d081ee17eebc9d1cb9967f50e6f6258c26c93623251e434cdd210`. El archivo se escribió y se hasheó antes de crear `sabotajes.py`.

### `sabotajes.py` (E16)

Par exacto con la receta del paso 1 de `round5/KIT.md` (semilla 10001, k₀ = 3, un paso previo). El gradiente sigue la construcción de P3a en `pd/predictors.py` (`gradient_field`) con otra semilla de fase.

```python
import json
from pd import ROOT, flow, np
from pd.checks import statistics, flags, norm
from pd.initial import random_field, random_phases
from pd.data import advance

s = flow()
tau = json.loads((ROOT / "thresholds.json").read_text())["thresholds"]
u0 = advance(s, random_field(s, 10001, 3))
exacto = advance(s, u0)
phi = random_phases(s, np.random.default_rng(10002), 3, s.k2.shape) * s.mask
g = s.physical(1j * s.k * phi)
g = g * (0.05 * norm(exacto) / norm(g))
casos = {
    "exacto": exacto,
    "energia x1.05": 1.05 * exacto,
    "gradiente 5%": exacto + g,
    "fase corrida": np.roll(exacto, 1, axis=1),
}
print("tau", {c: f"{tau[c]:.3g}" for c in ("D1", "D2", "D3")})
for nombre, u1 in casos.items():
    st = statistics(s, u0, u1, exacto)
    fl = flags(st, tau)
    marcas = [c for c in ("D1", "D2", "D3") if fl[c]] or ["ninguno"]
    print(f"{nombre:<14} D1={st['D1']:.2e} D2={st['D2']:.2e} D3={st['D3']:.2e} D4={st['D4']:.2e}  marcado por: {', '.join(marcas)}")
```

```text
tau {'D1': '8.32e-07', 'D2': '0.00331', 'D3': '0.0835'}
exacto         D1=6.81e-16 D2=2.34e-04 D3=6.20e-03 D4=0.00e+00  marcado por: ninguno
energia x1.05  D1=6.99e-16 D2=9.72e-02 D3=5.34e-01 D4=5.00e-02  marcado por: D2, D3
gradiente 5%   D1=6.11e-02 D2=2.48e-03 D3=5.21e-01 D4=5.00e-02  marcado por: D1, D3
fase corrida   D1=6.80e-16 D2=2.34e-04 D3=3.99e+00 D4=3.71e-01  marcado por: D3
```

### `piso.py` (E18)

Mismo par exacto; multiplica la velocidad por f.

```python
import json
from pd import ROOT, flow
from pd.checks import statistics, flags
from pd.initial import random_field
from pd.data import advance

s = flow()
tau = json.loads((ROOT / "thresholds.json").read_text())["thresholds"]
u0 = advance(s, random_field(s, 10001, 3))
exacto = advance(s, u0)
for f in (1.0001, 1.001, 1.01, 1.05):
    st = statistics(s, u0, f * exacto, exacto)
    fl = flags(st, tau)
    print(f"energia x{f:<7} D2={st['D2']:.2e} E1>E0={st['E1'] > st['E0']}  marcado={fl['any']}")
```

```text
energia x1.0001  D2=4.23e-04 E1>E0=False  marcado=False
energia x1.001   D2=2.13e-03 E1>E0=False  marcado=False
energia x1.01    D2=1.92e-02 E1>E0=False  marcado=True
energia x1.05    D2=9.72e-02 E1>E0=False  marcado=True
```

La conversión de E19 («más o menos el doble») es aritmética: multiplicar u por f multiplica la energía por f², y f² − 1 ≈ 2(f − 1) para f cercano a 1. El barrido de la ronda 3 define la magnitud como E(u₁′) − E(u₁) = m·E₀.

### `bootstrap_demo.py` (E17)

Datos sintéticos: 40 trayectorias × 10 pasos, cada trayectoria con su propio nivel.

```python
import numpy as np

rng = np.random.default_rng(20261024)
trayectorias, pasos = 40, 10
nivel = rng.normal(0.0, 1.0, size=(trayectorias, 1))
datos = nivel + 0.2 * rng.normal(size=(trayectorias, pasos))

def intervalo(muestras):
    return np.percentile(muestras, [2.5, 97.5])

por_pasos = [rng.choice(datos.ravel(), size=datos.size).mean() for _ in range(2000)]
por_trayectorias = [datos[rng.integers(0, trayectorias, trayectorias)].mean() for _ in range(2000)]
a, b = intervalo(por_pasos)
c, d = intervalo(por_trayectorias)
print(f"media {datos.mean():.3f}")
print(f"bootstrap por pasos        [{a:.3f}; {b:.3f}]  ancho {b - a:.3f}")
print(f"bootstrap por trayectorias [{c:.3f}; {d:.3f}]  ancho {d - c:.3f}")
```

```text
media -0.172
bootstrap por pasos        [-0.264; -0.081]  ancho 0.183
bootstrap por trayectorias [-0.458; 0.111]  ancho 0.569
```

### Wilson (E17)

Desde la raíz de `agent-eval-jev` @ `1a4e3b0`:

```text
$ python3 -c "from agenteval.metrics import wilson_interval; print(wilson_interval(27, 29))"
(0.7803505240414808, 0.9808791359020055)
```

## Lo que no entra al guion

- Los tiempos de recálculo por máquina y la reproducción en la nube no se narran; están en `predictor-debugger/README.md` si se quieren añadir.
- No se recalcularon las rondas 1–4 desde `data-v1` para este paquete (unos 20 GB); la escena E13 usa el log publicado.
