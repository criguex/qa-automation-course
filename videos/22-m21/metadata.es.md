# Metadata ES · 22-m21

## Título
Mutantes que aprenden: ledger, prioridad y auditor

## Descripción
Hice fallar un mutante a propósito y la corrida siguiente no lo puso primero: Playwright vaciaba test-results/ al empezar y el ledger se borraba con la carpeta. Lo encontré preparando este video y se arregló en civica-playwright-challenge (commit b240008): el ledger vive en ledger/, olvida tras 5 corridas, cuenta los timeouts aparte, avisa si está corrupto y el CI lo trae de la corrida anterior de main. Vemos el motor completo: tres clases (equivalent, boundary, negative), un ledger que reordena sin cambiar veredictos, mutantes de seguridad que miden a un auditor (6/6, 1 equivalent excluded) y una relación metamórfica que hubo que corregir antes de implementarla.

Módulo 22 del curso de QA Automation (m21 · Mutantes que aprenden).

Capítulos
00:00 El loop que no recordaba
00:41 Explicado para un niño de 8 años: el portero
01:35 De la foto a la película: tres clases y prioritize()
02:38 El ledger es un reporter
04:28 Reordenar no puede cambiar el veredicto
05:26 Mutantes que miden al auditor
07:12 Relaciones metamórficas (la hoja de ruta corregida)
08:48 Laboratorio: runs 1, 2, 3 y el orden
09:58 Laboratorio: el auditor, 6/6 y un equivalente
11:02 Laboratorio: X-Frame-Options no siembra nada
12:49 Mutación WAR: ¿el ledger recordaba?
14:12 El arreglo (b240008) y su evidencia
15:50 El reto y la rúbrica
17:28 Mini-quiz
18:31 Cierre y siguiente módulo

## Tags
mutation testing, ledger, priorización de pruebas, Playwright, reporters de Playwright, auditoría de seguridad, headers de seguridad, metamorphic testing, civica-playwright-challenge, QA automation

## Texto de miniatura
El loop olvidaba

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m21
- Laboratorio: https://github.com/criguex/civica-playwright-challenge
- MUTATION-TESTING.md: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/MUTATION-TESTING.md
- AUDIT-POC.md: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/AUDIT-POC.md
- Playwright — reporters: https://playwright.dev/docs/test-reporters
- Chen et al. — Metamorphic Testing (ACM CSUR 2018): https://doi.org/10.1145/3143561
- Siguiente módulo: https://criguex.github.io/qa-automation-course/#/m18

Cristian Guerra · QA · Medellín
