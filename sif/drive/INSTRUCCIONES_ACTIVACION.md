# SyRA-SIF · Activación de Drive (una sola vez)

**Situación:** el sistema funciona sin ChatGPT ni IA. El programa de campo guarda datos y fotos en el celular; la carpeta de Drive ya existe. **El envío automático no está activado hasta completar esta autorización de Google.**

## Activación simple (cuenta del titular de SyRA)
1. En una computadora, con tu cuenta de Google abierta, ingresá a https://script.new.
2. Abrí este archivo con el código preparado: https://github.com/infosyraambiente-lang/SYRA/blob/main/sif/drive/Code.gs . Copiá **todo** su contenido.
3. En el proyecto nuevo de Google Apps Script, borrá el texto inicial de `Código.gs`, pegá el código completo y pulsá **Guardar**. Llamá al proyecto «SyRA-SIF Drive».
4. Arriba seleccioná la función `instalarSyra` y pulsá **Ejecutar**. Google te pedirá autorización para crear archivos y trabajar en Drive. Es una autorización necesaria, realizada **dentro de tu cuenta**, nunca desde ChatGPT. Revisá los permisos que solicita el script.
5. Abrí el **Registro de ejecución** y copiá el código que aparece después de «CÓDIGO PRIVADO DE CONEXIÓN». No lo compartas por mensajes ni lo publiques en redes.
6. En Apps Script, elegí **Implementar → Nueva implementación → Aplicación web**. Seleccioná **Ejecutar como: Yo** y, para esta conexión inicial por formulario externo, **Quién tiene acceso: Cualquier persona**. Pulsá Implementar y copiá la URL que termina en `/exec`.
7. Abrí SyRA-SIF desde el ícono de tu celular y desplegá **Configurar conexión**. Pegá solamente la URL `/exec` y el código privado. Pulsá **Guardar y verificar conexión**. Debe mostrar «Conexión Google verificada».
8. A partir de entonces, cada intervención que cierres se almacenará en el celular y, mientras la aplicación esté abierta y tenga internet, se intentará enviar a Drive. **No** se considerará subida hasta recibir la confirmación. Si no hay señal, la visita seguirá local y se reintentará al abrir con conexión.

Acceso a la aplicación: https://infosyraambiente-lang.github.io/SYRA/sif/campo.html

Carpeta en Drive: https://drive.google.com/drive/folders/1JJOd39JoFG7QyWR_7vEVVq6fvbPZtboD

## Funcionamiento y trazabilidad

- Una orden del cliente (opcional) puede abarcar muchos tráilers, galpones y oficinas.
- Cada unidad tiene su código; cada intervención tiene su identificador, servicio, fotos, observaciones y referencia a factura.
- La aplicación admite diagnósticos, monitoreos, desinsectaciones, desinfecciones, desodorizaciones y el procedimiento integral de tráiler.
- Al subir una visita, el servicio crea carpeta privada por período, cliente, OT, unidad y visita; conserva fotos codificadas, orden/factura adjunta y JSON; registra el movimiento en una hoja índice y **intenta** regenerar el PDF mensual consolidado.
- El PDF mensual permanece **BORRADOR** mientras exista intervención no aprobada técnicamente. La revisión indicada por un operario no constituye firma digital ni control de rol.
- El PDF es un formato técnico inicial basado en la estructura de Don Luis/Crudo, **no reproducción exacta aún verificada visualmente** de sus plantillas aprobadas.
- El historial anterior sigue disponible en **Versión anterior** mediante `legacy-demo.html`, sin borrar bases de datos locales.

## Precauciones importantes

Esta primera conexión utiliza un código secreto de acceso en el dispositivo y un Apps Script que corre con los permisos del titular. El acceso `Cualquier persona` permite recibir solicitudes desde la aplicación, pero la autenticación por código **no sustituye cuentas individuales, permisos por operario/RT, auditoría fuerte ni controles de seguridad aptos para vender el software a terceros**. Mantener el código secreto. Si se pierde el teléfono, revocar el código en Apps Script y volver a configurarlo.

El sistema **no emite facturas fiscales**, no envía WhatsApp automáticamente y no garantiza que una firma o aprobación de RT sea auténtica. La aprobación y entrega al cliente deben comprobarse. No borrar datos de Chrome ni desinstalar sin verificar el respaldo en Drive y exportar una copia JSON.

**Pendientes antes de declarar producción completa:** autorizar y desplegar el Apps Script; comprobar la confirmación de una subida real; comprobar el PDF generado y los dos logos en un documento real; verificar el teléfono Android, cámara y dictado; implementar identidades/roles para técnicos y RT y autorización robusta para comercializar el sistema.