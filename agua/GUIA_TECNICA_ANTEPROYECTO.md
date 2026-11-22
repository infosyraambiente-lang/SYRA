# SyRA Agua · Anteproyecto técnico para revisión

**Versión:** 0.1 · **Fecha:** 22 de noviembre de 2026  
**Estado:** Modelo demostrativo con supuestos editables; no es un proyecto hidráulico ejecutivo.  
**Aplicación interactiva:** https://infosyraambiente-lang.github.io/SYRA/agua/

## 1. Objetivo

Evaluar el uso del agua de dos viviendas y sus espacios exteriores en Comodoro Rivadavia. Comparar césped y vegetación de bajo requerimiento hídrico; dimensionar cuatro zonas de riego por tiempos fijos sin sensores; generar un croquis con cobertura indicativa de rotores; obtener demanda por zona y punto de funcionamiento preliminar de bomba.

## 2. Terreno y superficies

| Componente | Dimensiones | Superficie |
|---|---|---:|
| Lote | 40 m × 40 m | 1.600 m² |
| Vivienda A | 6 m × 4,5 m | 27 m² |
| Vivienda B | 6 m × 4,5 m | 27 m² |
| Acceso y patios impermeables | Dos bloques demostrativos | 273 m² |
| Césped | 20 m × 20 m | 400 m² |
| Jardín adaptado / de baja demanda | Superficie verde restante | 873 m² |
| **TOTAL** | | **1.600 m²** |

La distribución de referencia del croquis es conceptual. Las dos viviendas se ubican en el cuadrante noroeste; el césped ocupa 20 × 20 m en el sudeste; el resto vegetal se reserva para coirones (*Pappostipa* spp.), arbustos nativos/adecuados, cubresuelos, cortavientos, rocas y acolchado. Las especies requieren evaluación de adaptación, exposición y densidad. La superficie ajardinada no significa que cada m² reciba idéntico riego.

## 3. Definiciones para explicar los cálculos

- **ETo (mm/día):** evapotranspiración de referencia calculada con condiciones meteorológicas; 1 mm equivale a 1 L/m².
- **Kc del césped:** coeficiente que transforma ETo en demanda de un césped de referencia: \`ETc = ETo × Kc\`. **Kc = 1 no es un máximo físico universal.** Tomar 0,8 como referencia de un césped residencial de estación fría es razonable como primer escenario, pero debe revisarse por estación y cultivar.
- **KL del jardín:** coeficiente paisajístico: \`ETL = ETo × KL\`. En el método clásico WUCOLS \`KL = factor especie × factor densidad × factor microclima\`. El valor 0,4 elegido **no está demostrado específicamente para Pappostipa en Comodoro**. Es un escenario editable.
- **Pe:** lluvia efectiva durante el mes calculado, **no** el total anual dividido por doce; depende de la precipitación, infiltración, escorrentía y oportunidad respecto del riego.
- **Ea:** eficiencia de aplicación. En el ejemplo, aspersión 0,75; goteo 0,90. La eficiencia real depende del viento, presión, solapes, mantenimiento y uniformidad.
- **Suelo franco-arenoso:** supuesto del predio; se debe medir capacidad de retención e infiltración real.

Para el clima de Comodoro, el Instituto Geográfico Nacional informa 240 mm/año de precipitación media histórica y aproximadamente 704 mm/año de evapotranspiración potencial en la serie estudiada. **La ETP anual no es automáticamente la ETo estacional** para programar un jardín. Los 220 mm/año quedan como cifra de escenario comunicada por el titular y se contrastarán con la serie y localidad concreta.

## 4. Hipótesis climáticas de un mes de verano

- ETo ilustrativa: **5,0 mm/día**; no equivale a una medición oficial del mes.
- Duración del mes: **30 días**.
- Lluvia efectiva hipotética: **10 mm/mes**.
- Césped: **Kc = 0,8**.
- Jardín adaptado: **KL = 0,4**.
- Aspersión: **Ea = 0,75**.
- Goteo: **Ea = 0,90**.

**Césped:** \`ETc = 5 × 0,8 = 4 mm/día\`. Demanda mensual = \`4 × 30 = 120 mm\`. Restando Pe = \`120 − 10 = 110 mm netos\`. Volumen neto = \`110 L/m² × 400 m² = 44.000 L\`. Para obtener esa lámina con eficiencia del 75%: \`44.000 / 0,75 = 58.667 L\` = **58,7 m³/mes brutos**.

**Jardín:** \`ETL = 5 × 0,4 = 2 mm/día\`. Demanda mensual = \`2 × 30 = 60 mm\`. Restando Pe = \`60 − 10 = 50 mm netos\`. Volumen neto = \`50 × 873 = 43.650 L\`. Con eficiencia del 90%: \`43.650 / 0,90 = 48.500 L\` = **48,5 m³/mes brutos**.

**Exterior total = 58,7 + 48,5 = 107,2 m³/mes.**

**Comparación sobre los mismos 1.273 m² verdes:** si todo fuese césped con idénticas hipótesis: \`(110 mm × 1.273 m²) / 0,75 = 186,7 m³/mes\`. El escenario mixto requeriría **79,5 m³/mes menos**, un ahorro aproximado de **42,6% del agua de riego** respecto de todo césped. No es un ahorro medido: depende de los coeficientes, lluvias y eficiencias introducidos.

## 5. Viviendas, inodoros, lluvia y cisterna

- Cuatro habitantes × 150 L/persona/día × 30 días = **18,0 m³/mes** de consumo interior de referencia.
- Total de ambas viviendas y riego: **107,2 + 18 = 125,2 m³/mes**.
- Inodoros: cuatro habitantes × cinco descargas diarias × (10 − 4,5 L por descarga) = 110 L/día de ahorro; **3,3 m³/mes** menos. Este ahorro se **resta** del consumo interior inicial, que ya incluía el inodoro. Total modificado estimado **121,9 m³/mes**.
- Una cisterna de 10.000 L equivale a unos **2,4 días de autonomía** ante ese consumo total de referencia sin nuevo abastecimiento. La autonomía varía de acuerdo con la época y demanda.
- Captación hipotética de los 54 m² de techo con lluvia anual de 220 mm y rendimiento de captación del 80%: \`54 × 0,220 × 0,8 = 9,5 m³/año\`. No cubre la demanda del riego; sirve como aporte complementario sujeto a filtración y usos permitidos.

La instalación debe contemplar provisión desde la fuente real (red/cisterna u otra debidamente autorizada), disponibilidad horaria, corte por falta de agua, reserva y separación del sistema potable. Una perforación no se presupone viable: requiere estudio hidrogeológico, calidad, permisos y costos.

## 6. Diseño de emisores en césped: patrones de 90° y 180°

Para enseñanza se ubica un rectángulo de césped de **20 × 20 m** y se divide en **dos sectores de 20 × 10 m**. Cada sector tiene seis rotores en retícula de 10 m: cuatro esquinas de 90° y dos bordes medios de 180°. En la franja común hay cabezales próximos orientados hacia cada lado. Total: **12 cabezales**. Alcance nominal supuesto: 10 m, con solape de cobertura de cabeza a cabeza.

**Ejemplo matemático de precipitación uniforme:**
- Cuatro rotores a 90° × **0,25 m³/h** cada uno = **1,0 m³/h**.
- Dos rotores a 180° × **0,50 m³/h** cada uno = **1,0 m³/h**.
- Caudal del sector = **2,0 m³/h = 33,3 L/min**.
- Pluviometría media: \`2,0 m³/h × 1.000 / 200 m² = 10 mm/h\`.

**Precaución esencial:** los valores de 0,25 y 0,50 m³/h representan la **proporción necesaria para igualar la precipitación entre arcos**, no una boquilla Hunter seleccionada y validada. En un rotor convencional, cambiar de arco NO garantiza cambiar proporcionalmente el caudal. Hay que seleccionar boquillas de caudal compatible a presión y radio similares, según la tabla real del fabricante, medir lluvia con vasos y confirmar uniformidad. No presupuestar automáticamente «cualquier» PGP Ultra.

En Comodoro el viento puede requerir radios de trabajo más cortos, retícula más densa, boquillas de ángulo bajo y cambios de ubicación para no mojar paredes, ventanas y pavimentos. Los difusores spray producen gotas finas y pueden sufrir más deriva; los rotores y boquillas rotativas tienen perfiles distintos de tamaño de gota, alcance, intensidad y presión: elegir por datos, no sólo por familia comercial.

## 7. Diseño de goteo del jardín

Se separan 873 m² de jardín en **dos estaciones de 436,5 m²**.

Modelo didáctico:
- 120 plantas por estación.
- Dos goteros por planta.
- 4 L/h por gotero.
- Caudal de cada estación = \`120 × 2 × 4 = 960 L/h = 0,96 m³/h\`.
- Total instalado = **240 plantas y 480 goteros**.
- Consumo mensual de cada mitad = \`48,5 / 2 = 24,25 m³/mes\`.

Es un patrón de plantación muy espaciado (3,64 m² de jardín por planta, en promedio). Ajustar por especie, tamaño de copa, textura del suelo, bulbo húmedo, plantas de reposición y necesidad real de riego tras establecimiento. No calcular 4 L/h como si cada gotero abasteciera homogéneamente toda la superficie.

## 8. Programación por tiempos fijos (sin sensor de humedad)

El controlador X-Core puede abrir válvulas **secuencialmente**, no es necesario abrir las cuatro a la vez. Ejemplo para 30 días:

| Estación | Sector | Caudal | Frecuencia | Tiempo aproximado por arranque |
|---|---|---:|---|---:|
| 1 | Jardín A, goteo | 0,96 m³/h | 3 veces/semana | 118 min |
| 2 | Jardín B, goteo | 0,96 m³/h | 3 veces/semana | 118 min |
| 3 | Césped A, rotores | 2,00 m³/h | 5 veces/semana | 41 min |
| 4 | Césped B, rotores | 2,00 m³/h | 5 veces/semana | 41 min |

La frecuencia de 3/semana es un **ejemplo de reparto volumétrico**, no prueba de que los coirones establecidos necesiten tres riegos semanales.

Fórmula general: \`minutos por arranque = (volumen mensual de un sector / [días/7 × riegos/semana]) / caudal del sector × 60\`.

Programa A: estaciones 1 y 2 de forma sucesiva, lunes/miércoles/sábado, comienzo propuesto 00:30; duración total aproximada 236 minutos. Programa B: estaciones 3 y 4 de forma sucesiva, martes/jueves/viernes/sábado/domingo, comienzo propuesto 06:00; duración total aproximada 82 minutos. Los sábados, A termina antes de que comience B. Los días y horas deben revisarse por viento, restricciones locales y cambios estacionales. Configurar un solo inicio por programa; duplicar inicios puede volver a regar todo el recorrido.

**Suelo:** contenido de agua aprovechable (TAW) supuesto = 110 mm/m. Fracción fácilmente agotable \`p = 0,5\` provisional. Con raíz efectiva de césped 0,20 m, \`RAW = 110 × 0,20 × 0,5 = 11 mm\`; a ETc de 4 mm/día, agotamiento en **2,75 días**. Para jardín y raíz 0,35 m, \`RAW = 19,25 mm\`; a 2 mm/día, agotamiento en **9,6 días**. Estos valores no consideran la geometría del bulbo húmedo ni son intervalos recomendados automáticamente: deben contrastarse con suelo real, arraigo y estado vegetal.

## 9. Selección de electroválvulas

Cuatro estaciones requieren cuatro solenoides, típicamente de 24 VCA, uno por válvula. La PGV Hunter 1″ declara un rango de caudal de 0,05–9 m³/h; el caudal del goteo (0,96) y de los rotores (2,0) se encuentra dentro del rango publicado. A unos 1–2,5 m³/h, la tabla PGV indica pérdidas del orden de 0,11–0,13 bar, que deben incorporarse al balance de presión.

El programador funciona a 220 V en su versión de Argentina, pero energiza la **bobina de baja tensión** de la electroválvula. Si el suministro requiere una bomba eléctrica, emplear relé de arranque/contactor adecuado, disyuntor, térmica y protección por falta de agua. El circuito de potencia no debe conectarse directamente a las salidas de estaciones.

## 10. Bomba, presión, filtro y cañerías

Como sólo opera **una estación**, el caudal de diseño simultáneo es \`max(0,96; 2,0) = 2,0 m³/h\`, no 5,92 m³/h (sumatoria de todas las estaciones).

Para el ejemplo se asume una conducción principal denominada comercialmente «1 pulgada» pero con **26 mm de diámetro interior real hipotético**, 45 m en el tramo crítico, factor de fricción Darcy f = 0,025, presión requerida de 3 bar en rotor, desnivel de 5 m, pérdida filtro 2 m, válvula 1,5 m y accesorios 1,5 m.

- Caudal en SI: \`Q = 2 / 3.600 = 0,000556 m³/s\`.
- Velocidad: \`v = 4Q/(πD²) = 1,05 m/s\`.
- Pérdida longitudinal: \`hf = f (L/D)(v²/2g) = 2,41 m\`.
- Presión rotor: \`3 bar × 10,197 = 30,59 m\`.
- Altura manométrica total: \`H = 30,59 + 5 + 2 + 1,5 + 1,5 + 2,41 = 43,0 m c.a.\`.
- Presión aproximada de impulsión: **4,22 bar**.
- Potencia hidráulica: \`ρ g Q H ≈ 0,234 kW\`.
- Si el rendimiento global (motor + bomba) fuese 45 %, potencia eléctrica ideal aproximada \`0,234/0,45 = 0,52 kW\`. **No seleccionar una bomba simplemente por watts o HP:** se necesita su curva real para confirmar 2,0 m³/h a 43 m y su desempeño a 0,96 m³/h para goteo.

Secuencia: fuente/cisterna → protección contra trabajo en seco → bomba, si es necesaria → válvula de retención → filtración → colector → cuatro electroválvulas → ramales PE (diámetros según pérdidas calculadas) → conexiones de ½″, codos, tees, uniones y emisores. En goteo debe haber filtración fina adecuada, **regulación de presión independiente**, limpieza/purgas y control de velocidades. Diámetro comercial de 1″ **no** equivale siempre a 26 mm de diámetro interior.

**Materiales por confirmar para cotización ejecutiva:** 4 electroválvulas 1″, 1 programador cuatro estaciones, 12 rotores con boquillas seleccionadas por arco, al menos 12 conexiones individuales para sus derivaciones, 480 goteros como modelo de partida, reductores, reguladores, filtros, uniones, codos, tees, colector, cable eléctrico, relé bomba, gabinete, tuberías en metros según plano y ensayos de caudal/presión. No asignar un número de codos o metros de tubo si las longitudes reales no están relevadas.

## 11. Precios parciales publicados en Argentina

Referencias online consultadas en noviembre de 2026:
- X-Core Hunter 4 estaciones (XC-401i-ARG): **$183.500 ARS** (PDA Campo y Jardín).
- PGV Hunter de 1″: **$46.500 ARS/unidad** (Punto Riego), cuatro unidades: **$186.000**.
- PGP Ultra Hunter: **$28.000 ARS/unidad** (Punto Riego), doce unidades: **$336.000**.

**Subtotal sólo esos equipos: $705.500 ARS**. No incluye perforación, caños, cisterna, bomba, filtro, uniones, cableado, automatismo de bomba, obras civiles, asesoramiento, instalación ni logística. Verificar stock, disponibilidad, compatibilidad y precio final antes de formular propuesta comercial.

## 12. Aspectos que debe corregir el responsable técnico antes de aprobar

1. ETo real por mes calculada con estación/serie confiable (FAO Penman–Monteith) y distribución intraanual de lluvia efectiva.
2. Especies definitivas, requerimiento hídrico por etapa de establecimiento y densidad del jardín; validar KL (0,2, 0,3, 0,4 o el que corresponda), no asumirlo fijo por nombre de género.
3. Análisis de suelo franco-arenoso: infiltración real, agua aprovechable, salinidad, profundidad efectiva, suelo compactado y pendiente.
4. Medición de viento local y topografía para decidir radios, retícula, arcos, boquillas y posición de rotores; prueba de uniformidad.
5. Fichas técnicas de emisores: presión nominal, radio a esa presión, caudal real por boquilla, arco, precipitación y desempeño con viento.
6. Selección de diámetros y accesorios por caudal y pérdida de carga en cada tramo. Revisar curvas de bomba para los sectores de 2,0 y 0,96 m³/h.
7. Disponibilidad, costo y calidad del suministro de agua; autonomía de cisterna; tratamiento de la captación pluvial y prevención de conexiones cruzadas con agua potable.
8. Costos en Comodoro Rivadavia, mantenimiento y ajuste del programa estacional.

## 13. Fuentes principales

- [FAO-56, coeficiente de cultivo](https://www.fao.org/4/x0490e/x0490e0b.htm)
- [FAO-56, disponibilidad de agua y estrés](https://www.fao.org/4/X0490e/x0490e0e.htm)
- [Universidad de California, Kc frente al factor de plantas de paisaje](https://ucanr.edu/site/center-landscape-urban-horticulture/plant-factor-or-crop-coefficient-whats-difference)
- [WUCOLS – Universidad de California](https://wucols.ucdavis.edu/)
- [Hunter, pluviometría compatible para rotores](https://www.hunterirrigation.com/support/residential-rotors-matched-precipitation-rates)
- [Hunter, X-Core – inicios y funcionamiento secuencial](https://www.hunterirrigation.com/support/x-core-why-does-my-system-turn-again)
- [Hunter, PGV 1″ – caudales y pérdidas](https://www.hunterirrigation.com/en-metric/irrigation-product/valves/1-pgv)
- [Instituto Geográfico Nacional, Comodoro Rivadavia – clima](https://www.ign.gob.ar/odc-14-Paredes)
- [PDA Campo y Jardín – programadores Hunter](https://www.pdaweb.com.ar/productos/?brand=Hunter)
- [Punto Riego – válvulas y rotores](https://www.puntoriego.com.ar/productos/)

**Estado de integración:** el módulo «SyRA Agua» es independiente de SyRA-SIF y de SyRA Gestión; los registros quedan en el navegador o en un archivo exportado por el usuario. No existe aún sincronización validada de propuestas, presupuestos ni resultados al sistema financiero.
