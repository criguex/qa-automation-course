# Módulo 8 · Reportes & Trazabilidad — evidencia que se puede firmar

Guion de narración en español (Colombia). Voz: Cristian, primera persona. Ritmo de referencia: 150 palabras por minuto. Las marcas `[mm:ss]` se calculan con ese ritmo; cada bloque indica su escena de `escenas.json`.

## 1. Gancho

**[00:00] → E01**

274 pruebas. 184 pasan. 90 fallan. Ese fue el resultado de la corrida completa de SpendWise el 17 de octubre. Si mi reporte se hubiera quedado en esa línea, nadie habría podido hacer nada con él. ¿Cuáles 90? ¿Son bugs del producto, pruebas rotas o el ambiente que se cayó? ¿A qué requisito corresponde cada una? ¿Dónde está la prueba de que pasó lo que digo que pasó?

Un contador no es evidencia. "512 passed, 3 failed" y nada más no te deja auditar, ni clasificar, ni certificar nada.

**[00:36] → E02**

Este es el módulo 8: reportes y trazabilidad. El mentor del curso lo dice así: un test que pasa y nadie ve, no existe. Hoy vas a integrar un reporte con evidencia a tu framework, a trazar requisito, caso y ejecución, y a saber qué parte de esa evidencia sobrevive cuando la empresa cambia de herramienta.

## 2. Explicado para un niño de 8 años

**[00:58] → E03**

El reporte es la foto de la tarea corregida. No basta con decirle a la profe "ya la hice". Hay que mostrar la hoja, con las respuestas y las marcas de lo que estuvo bien y lo que estuvo mal.

Y si una respuesta está mal, la hoja dice cuál pregunta era, qué escribiste y cuál era la respuesta correcta. Así puedes corregirla sin volver a hacer toda la tarea.

La trazabilidad es el número de cada pregunta. Gracias a ese número, la profe sabe que la pregunta 3 era de sumas y que la respondiste mal. Sin números, tiene una hoja llena de respuestas y no sabe a qué corresponde cada una.

## 3. Teoría

### Bloque 1 · Un reporte con evidencia

**[01:43] → E04**

Un buen reporte tiene tres niveles. El estado general. El detalle por caso: pasos, resultado, evidencia. Y la evidencia misma: capturas, video, trace, el request y el response.

¿Para quién? Para tres lectores distintos. El desarrollador necesita el detalle del fallo con evidencia, para reproducirlo. El líder o el dueño de producto necesita el estado por requisito. El manager necesita tendencia y riesgo. Un reporte de un solo nivel le falla a alguien: o ahoga al manager en stack traces, o deja al desarrollador sin datos. Por eso tiene que ser navegable.

**[02:20] → E05**

En Playwright la base ya viene. Mira la configuración de civica-playwright-challenge. Los reporters son cinco: list para la consola, html para el reporte navegable, junit para que CI lo lea, y dos reporters propios que escriben los ledgers de mutantes en la carpeta `ledger/`. Y en `use` está lo que se adjunta a cada prueba: trace en el primer retry, screenshot solo cuando falla, video que se conserva solo cuando falla.

restful-booker-quality-suite hace algo parecido según el ambiente: en CI, reporter line, html y junit en `test-results/junit.xml`; en local, list y html. Y el trace se conserva cuando falla.

**[03:00] → E06**

El reporte HTML de Playwright se abre con `npx playwright show-report`, o con `npm run report` en mis repos. Cada prueba fallida trae su error, sus pasos, y los adjuntos: la captura, el video y el trace. El trace es el que te deja reproducir el fallo paso a paso sin volver a correr nada.

**[03:22] → E07**

Y la evidencia no tiene que ser solo de Playwright. En spendwise, cada defecto de interfaz tiene una carpeta con un video con el puntero visible y los pasos numerados, una captura por paso, la captura final con el defecto marcado y un JSON con metadatos. Mira el de BUG-09: el título "Login desde ruta protegida no regresa a la ruta original", el rol, la ruta, la hora en que se grabó, reproducido true, lo esperado, "debe regresar a /expenses tras iniciar sesión", y lo real, "aterriza en /dashboard". Y los pasos, cada uno con su captura.

Con eso un desarrollador no te tiene que preguntar nada.

**[04:04] → E08**

¿Cuándo capturas? No siempre y en todo paso, porque el reporte se vuelve inmanejable. Tampoco nunca. El criterio es probatorio: captura automática en cada fallo, y captura en los pasos clave que sirven como evidencia. Y para un fallo de API, lo que adjuntas es el curl exacto del request, el response completo, y lo esperado contra lo recibido. Con eso el desarrollador reproduce en segundos.

Una advertencia de seguridad que está escrita en spendwise: la evidencia no lleva contraseñas ni tokens. Las peticiones se guardan con `[REDACTED]` y `<TOKEN>` en su lugar. Y en CI esa suite corre sin trazas, porque las trazas de Playwright guardan cabeceras de autenticación. La evidencia no puede convertirse en una fuga.

**[04:52] → E09**

Toda esa evidencia termina en un solo lugar: `INFORME-QA-SpendWise.html`. Es un archivo de unos 16 megas con toda la evidencia embebida, y se abre sin el resto del repositorio. Adentro están los 47 defectos confirmados, 18 de severidad alta, 27 media y 2 baja, todos reproducidos el 17 de octubre. Cada uno con su captura, la regla que incumple, cómo se soluciona y su prueba automatizada. Y además 8 oportunidades de mejora, cada una con la razón por la que no es un defecto.

Esa última parte me importa. Un reporte que solo lista bugs invita a inflar la lista. Un reporte que también explica qué no es bug y por qué, muestra criterio.

### Bloque 2 · Clasificar los fallos

**[05:37] → E10**

Un fallo puede ser tres cosas: un bug del producto, una prueba rota, o un problema de ambiente o de datos. Cada categoría dispara una acción distinta. Reportar, arreglar la suite o arreglar el ambiente. Si las mezclas, las métricas mienten: si el 40 por ciento de tus rojos son de ambiente, tu suite no está mal; tu ambiente sí.

En el resumen final de spendwise hay un ejemplo concreto: la prueba E2E-06 se descartó como defecto después de corregir la sincronización y el locator; el producto sí mostraba el acceso denegado. Era una prueba rota, no un bug. Y la misma corrida dice: errores de infraestructura, cero; fallos sin clasificar, cero.

En el vault de war-paradigm esto es una regla de oro: cada fallo recibe un veredicto, bug del producto, bug de la prueba, ambiente o datos. Y nunca se "arregla" una prueba para que pase contra una respuesta equivocada.

**[06:38] → E11**

Cuando el veredicto es "bug del producto", la ficha tiene una forma. Mira `DEFECTS.md` de restful-booker. Cada defecto tiene severidad y prioridad, por qué es un defecto, lo esperado, lo real, el impacto y el curl para reproducirlo. RB-003, por ejemplo: severidad alta, prioridad P1. El servidor acepta 10,99 en el precio y lo guarda como 10, sin rechazarlo ni avisar. Impacto: cobros, facturas y conciliaciones con diferencias.

Y fíjate en esta honestidad en RB-002. Dice "causa probable": parece que el texto "false" se convierte con la función Boolean de JavaScript. Y aclara: es una hipótesis basada en evidencia, no una prueba sobre el código fuente. Un reporte que se puede firmar distingue lo que viste de lo que supones.

### Bloque 3 · Trazabilidad: de requisito a ejecución

**[07:26] → E12**

La cadena es esta: requisito, caso de prueba, ejecución, evidencia. Y tiene que ser bidireccional. Desde el requisito llegas a sus pruebas y a su estado. Desde cualquier prueba llegas al requisito que cubre. Las dos direcciones responden preguntas distintas: "¿qué cubre esta historia?" y "¿por qué existe esta prueba?". Las dos tienen que tener respuesta.

**[07:48] → E13**

En civica-playwright-challenge la trazabilidad está en el README, en una tabla. Requisito número 5, TC1, buscar y validar película: vive en `tests/mock/searchMovie.mock.spec.ts` y en `tests/e2e/searchMovie.e2e.spec.ts`. Requisito 6, TC2, navegar el Top 250 por el menú: en sus dos specs. Requisito 4, sin XPath ni CSS: en cada Page Object. Cada requisito del reto apunta a un archivo. Si alguien pregunta dónde se prueba algo, la respuesta está en una línea.

**[08:16] → E14**

En spendwise la cadena es más completa. El documento de casos tiene 26 casos base diseñados antes de ejecutar, priorizados por riesgo. Cada fila tiene el ID, la prioridad, la técnica, el resultado esperado, la prueba automatizada que lo ejecuta y el resultado. Por ejemplo, VAL-01, prioridad P0, valor límite: un monto de 0 se rechaza con 400. Lo automatiza la prueba VAL-01. Resultado: falla, BUG-01. Y en el plan de pruebas hay una matriz que amarra las reglas del enunciado, como RN-20 y el Anexo E, con el archivo que las cubre.

**[08:53] → E15**

Y la dirección de vuelta la cierra `full-run.json`. Para cada defecto, la lista de pruebas que lo demuestran. BUG-01: VAL-01 y MUT-EXP-07. BUG-02: VAL-02, VAL-03, MUT-EXP-08 y MUT-EXP-09. Y la lista de fallos sin defecto asignado está vacía. De un requisito llego al caso, del caso a la prueba, de la prueba a su resultado, y de cada rojo a su defecto con evidencia.

### Bloque 4 · La herramienta cambia, la cadena no

**[09:19] → E16**

En una empresa esa cadena vive en un gestor de pruebas. Xray, TestRail, Zephyr, qTest. El concepto es el mismo; escoges el que use tu equipo. Si cambias de empresa y pasas de Xray a TestRail, no cambia nada de fondo: la cadena requisito, caso, ejecución y evidencia es la misma.

¿Qué sobrevive al cambio de herramienta? Los IDs estables de requisitos y casos, la evidencia en formatos abiertos, como HTML, JSON, imágenes y video, y los enlaces entre ellos. Lo que no sobrevive es lo que solo existe dentro de la herramienta vieja. Por eso me gusta que la trazabilidad también quede en el repo, como en civica y en spendwise.

Los formatos de salida ayudan. Karate, en karate-api-testing, deja un reporte HTML con una página por feature y los logs de petición y respuesta, y además Cucumber JSON y XML de Surefire para que otras herramientas los consuman. Playwright deja JUnit XML. Son formatos abiertos: el día que cambies de gestor, la evidencia se puede volver a cargar.

**[10:27] → E17**

Sobre Allure. Es un estándar abierto muy usado, pero el principio aplica con cualquier reporter. Ninguno de mis repos públicos lo tiene integrado hoy. En la guía de crecimiento de civica está la receta: `npm i -D allure-playwright` y agregar `allure-playwright` al arreglo de reporters en `playwright.config.ts`. Lo que te da, según esa guía, es historial, tendencias y detalle por paso entre corridas.

El historial importa. Un test que falló una vez es ruido. Uno que falla en el 20 por ciento de las corridas es un patrón. Solo el historial distingue el uno del otro.

civica tiene una forma pequeña de historial sin Allure: el ledger de mutantes. Un reporter propio escribe `ledger/mutation-insights.json` después de cada corrida, y la siguiente corrida lo lee para ordenar los mutantes: primero los que fallaron en sus últimas cinco corridas, después los nuevos, después el resto. Es memoria entre corridas en un archivo JSON. Y fíjate dónde vive. Hasta hace poco civica lo escribía en `test-results/`, la carpeta que Playwright vacía al empezar cada corrida, así que en la práctica no recordaba nada. Lo encontré preparando el video de mutantes y se arregló en el commit b240008. La lección sirve para cualquier historial: guárdalo fuera de la carpeta de salida y comprueba con dos corridas que de verdad se acumula.

**[11:54] → E18**

Y un detalle que casi nadie revisa. En restful-booker-quality-suite, CI sube el reporte de Playwright como artefacto con `if: always()`, o sea también cuando falla, y con `retention-days: 14`. A los catorce días ese artefacto desaparece. Si tu evidencia de una certificación es "el reporte está en CI", en dos semanas no hay evidencia. De eso hablamos en el módulo 8b.

## 4. Laboratorio paso a paso

**[12:18] → E19**

Antes del laboratorio, mira la capa de arriba, la del manager. `EXECUTION_REPORT.md` de restful-booker es una sola página. Resumen ejecutivo: 43 chequeos, 8 defectos confirmados, 3 bloqueantes de release si se soporta XML, precios decimales y fechas. Alcance. Una tabla de resultado por gate de calidad. La decisión de release, con su recomendación. Y una sección que casi nadie escribe: lo que se excluyó a propósito, como carga, seguridad especializada e interfaz. Decir qué no probaste es parte de la evidencia.

**[12:50] → E20**

Laboratorio. Abre war-paradigm, experimento 02, y corre `npm run test:mutants`. Además del marcador en la consola, el reporter escribe `test-results/mutant-evidence.json`. Según el README, ese JSON registra para cada escenario su ID, el status HTTP esperado y el observado, la fase, la razón, la revisión de Git y los hashes SHA-256 de la app, del escenario, del runner, de la prueba y del lockfile. También registra `randomSeed: null`, porque la corrida no usa nada aleatorio.

¿Por qué tanto? Porque con eso alguien puede verificar, meses después, que el resultado corresponde exactamente a ese código. Esa es evidencia que se puede firmar.

Después corre `npm run report` y abre el reporte HTML de Playwright de la misma corrida.

**[13:37] → E21**

Ahora en tu framework. Si partes de civica, la configuración ya adjunta captura, video y trace cuando una prueba falla, y CI sube `playwright-report/` como artefacto. Tu tarea es mapear tu suite a casos: cada prueba con un ID que aparezca en su título, como VAL-01 en spendwise, y una tabla que diga qué requisito cubre cada ID. Si tu equipo usa un gestor de pruebas, ese ID es el que enlazas allá. Si no, simula el flujo con una tabla en el repo.

Para el primer criterio, que el reporte se abra sin tu máquina, copia el patrón del workflow de civica. Hay tres pasos de subida: los reportes de auditoría justo después de su suite, porque las corridas siguientes vacían `test-results/`; y al final, el reporte HTML en `playwright-report/` y el ledger de mutantes, que se guarda noventa días porque la corrida siguiente de main lo descarga. Los tres con la condición `if: ${{ !cancelled() }}`. Eso quiere decir que suben aunque una suite haya fallado, que es justo cuando más los necesitas. Un workflow que solo sube el reporte cuando todo pasa te deja sin evidencia el día que la necesitas.

Y revisa que el JUnit quede en una ruta fija, como `test-results/junit.xml` en civica. El README de civica lo dice: ese archivo es para los tableros de CI. Es un formato estándar, y por eso es el primero que revisas cuando conectes un gestor de pruebas.

## 5. Mutación WAR de la semana

**[15:12] → E22**

El reporte también se prueba. Esta semana siembras un fallo a propósito y compruebas que aparece en el reporte con su evidencia.

En una copia de civica, por ejemplo, cambia el título esperado en la prueba principal de búsqueda: en vez de "Inception", pon otra palabra. Corre `npm test` y después `npm run report`. Lo que debes ver: la prueba en rojo, el mensaje con lo esperado y lo recibido, y la captura y el video adjuntos, porque la configuración los guarda cuando falla. Si el fallo aparece sin captura, o no aparece en el reporte que publica tu CI, tu reporte tiene un hueco. Y vuelve a dejar la prueba como estaba.

## 6. El reto y cómo se evalúa

**[15:57] → E23**

El entregable: un reporte con evidencia publicado, y una suite trazada en un gestor de pruebas, o una simulación del flujo.

Los criterios. Uno: el reporte se abre sin tu máquina, como artefacto o como archivo único. Dos: cada prueba fallida trae captura o trace. Tres: cada caso tiene enlace a su requisito.

Y el nivel más alto: siembras un fallo y muestras que aparece en el reporte con su evidencia.

## 7. Mini-quiz

**[16:26] → E24**

Tres preguntas. Pausa si quieres.

Primera. El reporte dice "512 passed, 3 failed" y nada más. ¿Qué le falta? A, colores. B, detalle por caso: pasos, evidencia, categoría del fallo y a qué requisito responde cada prueba. C, un gráfico de torta. D, el logo de la empresa.

**[16:52] → E25**

Es la B. Un contador no es evidencia.

Segunda. Cambias de empresa y usan TestRail en vez de Xray. ¿Qué cambia en tu método? Nada de fondo: la cadena requisito, caso, ejecución y evidencia es la misma. Cambia la herramienta.

Tercera. ¿Qué significa trazabilidad bidireccional? Que desde el requisito llegas a sus pruebas y su estado, y desde cualquier prueba llegas al requisito que cubre.

## 8. Cierre

**[17:26] → E26**

Tres ideas. Una: un reporte es detalle por caso con evidencia, no un contador. Dos: cada fallo se clasifica, producto, prueba o ambiente, porque cada uno pide una acción distinta. Tres: la cadena requisito, caso, ejecución y evidencia es el estándar; la herramienta es lo de menos.

En el módulo 8b cerramos el método: cómo certificar una historia con evidencia y trazabilidad, y por qué esa firma la pone un humano.
