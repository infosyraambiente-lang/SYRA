/*
 SyRA-SIF · Puente Drive para titular
 No usa ChatGPT ni IA. Requiere despliegue manual y autorización de Google.
 Carpeta receptora ya creada en el Drive de SyRA.
*/
const ROOT_FOLDER_ID='1JJOd39JoFG7QyWR_7vEVVq6fvbPZtboD';
const EXPECTED_ORIGIN='https://infosyraambiente-lang.github.io';
const MAX_POINTS=250;
const MAX_PHOTOS=300;
const INDEX_HEADERS=['ID_VISITA','PERIODO','CLIENTE','TIPO_UNIDAD','CODIGO_UNIDAD','SERVICIO','OT_CLIENTE','FACTURA','FECHA','ESTADO','URL_CARPETA','ID_JSON','URL_PDF_MENSUAL','FOTOS','REVISION','RECIBIDO_UTC'];
function instalarSyra() {
  const props=PropertiesService.getScriptProperties();
  if(!props.getProperty('SYRA_TOKEN'))props.setProperty('SYRA_TOKEN',Utilities.getUuid()+'-'+Utilities.getUuid());
  let folder=DriveApp.getFolderById(ROOT_FOLDER_ID);
  if(!props.getProperty('INDEX_ID')) {
    let book=SpreadsheetApp.create('SyRA-SIF | Índice de capturas automáticas');
    DriveApp.getFileById(book.getId()).moveTo(folder);
    book.getSheets()[0].setName('VISITAS');
    book.getSheets()[0].appendRow(INDEX_HEADERS);
    props.setProperty('INDEX_ID',book.getId());
  }
  Logger.log('CÓDIGO PRIVADO DE CONEXIÓN (NO COMPARTIR): '+props.getProperty('SYRA_TOKEN'));
  Logger.log('Índice: https://docs.google.com/spreadsheets/d/'+props.getProperty('INDEX_ID')+'/edit');
}
function doGet() {return HtmlService.createHtmlOutput('SyRA-SIF: conexión de escritura. Abrí la aplicación SyRA para cargar los informes.').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);}
function doPost(e) {
  let attempt='',visitId='';
  try {
    let packet=JSON.parse((e.parameter&&e.parameter.payload)||'{}');
    attempt=String(packet.attempt||'').slice(0,100);
    visitId=String(packet.visita&&packet.visita.id||'').slice(0,100);
    let secret=PropertiesService.getScriptProperties().getProperty('SYRA_TOKEN');
    if(!secret||packet.key!==secret)throw Error('Autorización no válida');
    if(packet.accion==='ping')return responder_({ok:true,attempt,version:'syra-drive-20261120'});
    if(packet.accion!=='subir')throw Error('Acción desconocida');
    let v=packet.visita,photos=packet.fotos;
    if(!v||!/^[a-zA-Z0-9_-]{8,90}$/.test(v.id)||!v.cliente||!v.fecha||!Array.isArray(v.puntos)||v.puntos.length>MAX_POINTS)throw Error('Visita inválida');
    if(!Array.isArray(photos)||photos.length>MAX_PHOTOS)throw Error('Cantidad de fotografías fuera de rango');
    let result=guardar_(v,photos);
    return responder_({ok:true,attempt,visitId:v.id,revision:v.modificada||v.creada||'',url:result.folderUrl,monthlyPdf:result.pdfUrl||'',photos:result.photoCount});
  }catch(err){console.error(err);return responder_({ok:false,attempt,visitId,error:String(err&&err.message||err).slice(0,180)})}
}
function responder_(data) {
  // El formulario de la PWA utiliza un iframe oculto porque Apps Script no garantiza CORS para fetch.
  let json=JSON.stringify(Object.assign({syraSifAck:true},data)).replace(/</g,'\\u003c');
  let js='<script>try{window.top.postMessage('+json+','+JSON.stringify(EXPECTED_ORIGIN)+')}catch(e){}</script>';
  return HtmlService.createHtmlOutput(js).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function nombre_(s) {return String(s||'Sin identificar').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9_.-]+/g,'_').slice(0,70).replace(/^_+|_+$/g,'')||'sin_identificar'}
function folder_(parent,name){let it=parent.getFoldersByName(name);return it.hasNext()?it.next():parent.createFolder(name)}
function file_(folder,name,contents,mime){let it=folder.getFilesByName(name);if(it.hasNext()){let f=it.next();f.setContent(contents);return f}return folder.createFile(name,contents,mime)}
function imageBlob_(data,name) {
  if(typeof data!=='string'||!/^data:image\/(jpeg|jpg|png|webp);base64,/.test(data))throw Error('Imagen no válida');
  let parts=data.split(','),mime=parts[0].slice(5).split(';')[0];
  return Utilities.newBlob(Utilities.base64Decode(parts[1]),mime,name);
}
function index_() {
  let id=PropertiesService.getScriptProperties().getProperty('INDEX_ID');
  if(!id)throw Error('Ejecutá instalarSyra una vez antes de publicar la conexión');
  return SpreadsheetApp.openById(id).getSheetByName('VISITAS');
}
function guardar_(v,photos) {
  const lock=LockService.getScriptLock();lock.waitLock(30000);
  try{
    const root=DriveApp.getFolderById(ROOT_FOLDER_ID);
    let month=String(v.fecha).slice(0,7);
    let client=nombre_(v.cliente);
    let folderClient=folder_(folder_(root,month),client);
    let ref=v.otAplica?'OT_'+nombre_(v.otNumero):'SIN_OT';
    let folderOrder=folder_(folderClient,ref);
    let unit=nombre_((v.unidadTipo||'Establecimiento')+'_'+(v.unidadNumero||v.sede||'Principal'));
    let folderUnit=folder_(folderOrder,unit);
    let folderVisit=folder_(folderUnit,v.id);
    let folderPhotos=folder_(folderVisit,'FOTOS_CODIFICADAS');
    let count=0;
    photos.forEach((f,i)=>{
      if(!f||typeof f.id!=='string'||typeof f.data!=='string')return;
      const code=nombre_(f.codigo||'EVIDENCIA');
      const fname=nombre_(f.id)+'_'+code+'.jpg';
      let existing=folderPhotos.getFilesByName(fname);
      if(!existing.hasNext()){folderPhotos.createFile(imageBlob_(f.data,fname));count++}
    });
    // Historial raw auditable; incluye IDs y datos de OT. Las fotos quedan en archivos independientes.
    let copia=JSON.parse(JSON.stringify(v));
    if(copia.adjuntos){for(let tipo of ['orden','factura']){if(copia.adjuntos[tipo])delete copia.adjuntos[tipo].datos}}
    let json=file_(folderVisit,'VISITA_'+v.id+'.json',JSON.stringify({formato:'syra-sif-v2',visita:copia,fotos:photos.map(f=>({id:f.id,punto:f.punto,codigo:f.codigo,nombre:f.nombre,fecha:f.fecha}))},null,2),'application/json');
    if(v.adjuntos){
      for(let tipo of ['orden','factura']){
        let a=v.adjuntos[tipo];
        if(a&&a.datos&&/^data:(application\/pdf|image\/)/.test(a.datos)){
          let name=tipo.toUpperCase()+'_'+nombre_(a.nombre||tipo);
          if(!folderVisit.getFilesByName(name).hasNext()){
            let binary=Utilities.base64Decode(a.datos.split(',')[1]);
            folderVisit.createFile(Utilities.newBlob(binary,a.tipo||'application/octet-stream',name));
          }
        }
      }
    }
    let sheet=index_(),row=encontrarFila_(sheet,v.id);
    let rowData=[v.id,month,v.cliente,v.unidadTipo||'Establecimiento',v.unidadNumero||'',v.tipoServicio||'',v.otAplica?v.otNumero:'',v.factura||'',v.fecha,v.aprobacion||'Pendiente de RT',folderVisit.getUrl(),json.getId(),'',photos.length,v.modificada||v.creada||'',new Date().toISOString()];
    if(row){sheet.getRange(row,1,1,rowData.length).setValues([rowData])}else{sheet.appendRow(rowData);row=sheet.getLastRow()}
    SpreadsheetApp.flush();
    let pdfUrl='';
    try {
      pdfUrl=consolidarMensual_(sheet,folderClient,month,v.cliente);
      sheet.getRange(row,13).setValue(pdfUrl);
    } catch(err) {
      console.error('Respaldo confirmado; PDF mensual no generado: '+err.message);
      // El respaldo en Drive se confirma incluso si la creación del PDF requiere revisión.
    }
    return {folderUrl:folderVisit.getUrl(),pdfUrl,photoCount:photos.length};
  }finally{lock.releaseLock()}
}
function encontrarFila_(sh,id){let n=sh.getLastRow();if(n<2)return 0;let ids=sh.getRange(2,1,n-1,1).getValues();let ix=ids.findIndex(r=>r[0]===id);return ix<0?0:ix+2}
function consolidarMensual_(sheet,folderClient,periodo,cliente) {
  let rows=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,INDEX_HEADERS.length).getValues():[];
  let matches=rows.filter(r=>r[1]===periodo&&r[2]===cliente&&r[11]).sort((a,b)=>String(a[8]).localeCompare(String(b[8]))||String(a[0]).localeCompare(String(b[0])));
  if(!matches.length)return '';
  let reports=folder_(folderClient,'INFORME_MENSUAL'),historico=folder_(reports,'HISTORICO_REVISIONES');
  let doc=DocumentApp.create('BORRADOR · Informe técnico ambiental '+cliente+' · '+periodo);
  let df=DriveApp.getFileById(doc.getId());df.moveTo(reports);
  let body=doc.getBody();body.clear();
  let head=body.appendTable([['SyRA','Cliente']]);
  try {let logo=UrlFetchApp.fetch('https://raw.githubusercontent.com/infosyraambiente-lang/SYRA/main/logosolo.png').getBlob();let im=head.getCell(0,0).clear().appendImage(logo);im.setHeight(54).setWidth(54)} catch(err){head.getCell(0,0).setText('SyRA')}
  let first=JSON.parse(DriveApp.getFileById(matches[0][11]).getBlob().getDataAsString()).visita;
  if(first&&first.logoCliente){try{let im=head.getCell(0,1).clear().appendImage(imageBlob_(first.logoCliente,'cliente.png'));im.setHeight(54)}catch(err){head.getCell(0,1).setText('Cliente')}}else{head.getCell(0,1).setText(cliente)}
  body.appendParagraph('INFORME TÉCNICO AMBIENTAL DE MONITOREO MENSUAL').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Cliente: '+cliente+' | Período: '+periodo);
  let allApproved=matches.every(r=>r[9]==='Aprobado por RT');
  body.appendParagraph(allApproved?'ESTADO: APROBADO (DECLARADO POR RT)':'BORRADOR · PENDIENTE DE REVISIÓN Y APROBACIÓN TÉCNICA');
  body.appendParagraph('Documento único del período: '+matches.length+' intervenciones. Evidencias originales y anexos en carpetas codificadas de Drive.');body.appendParagraph('RESUMEN EJECUTIVO').setHeading(DocumentApp.ParagraphHeading.HEADING2);body.appendParagraph('Se presentan las intervenciones efectivamente registradas, hallazgos, lecturas de dispositivos, acciones realizadas y recomendaciones por unidad. No interpretar ausencia de captura como ausencia absoluta de plagas.');
  matches.forEach((row,i)=>{
    let raw=JSON.parse(DriveApp.getFileById(row[11]).getBlob().getDataAsString()),v=raw.visita;
    body.appendParagraph((i+1)+'. '+(v.tipoServicio||'Servicio')+' | '+(v.unidadTipo||'Establecimiento')+' '+(v.unidadNumero||'')+' | '+v.fecha).setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Visita '+v.id+' | Sede '+v.sede+' | Operario '+(v.operario||'No informado')+' | OT '+(v.otAplica?v.otNumero:'No aplica')+' | Factura '+(v.factura||'Pendiente'));
    body.appendParagraph('REGISTRO DE CAMPO / PLANILLA DE MONITOREO').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    let table=body.appendTable([['Punto','Tipo / lugar','Resultado','Observación y acciones','Capturas']]);
    (v.puntos||[]).forEach(p=>{
      table.appendTableRow().appendTableCell(String(p.codigo||''));
      let tr=table.getRow(table.getNumRows()-1);
      tr.appendTableCell(String((p.tipo||'')+' / '+(p.ubicacion||'')));
      tr.appendTableCell(String(p.resultado||'Sin revisar'));
      tr.appendTableCell(String((p.obs||'')+' '+(p.accion||'')));
      tr.appendTableCell(String((p.conteos||[]).map(c=>c.especie+': '+c.cantidad).join('; ')));
    });
    if(v.trailer){
      body.appendParagraph('TRATAMIENTO SANITARIO POR ETAPAS').setHeading(DocumentApp.ParagraphHeading.HEADING3);
      const labels={t_inspeccion:'Inspección',t_desinsectacion:'Desinsectación',t_productoI:'Insecticida',t_regI:'Registro insecticida',t_metodoI:'Método insecticida',t_loteI:'Lote/dosis',t_limpieza:'Limpieza',t_desinfeccion:'Desinfección',t_productoD:'Desinfectante',t_regD:'Registro desinfectante',t_metodoD:'Método desinfectante',t_loteD:'Lote/dosis/tiempo de contacto',t_desodorizacion:'Desodorización',t_productoO:'Producto y método',t_reingreso:'Reingreso',t_observaciones:'Observaciones'};
      Object.keys(labels).forEach(k=>{if(v.trailer[k])body.appendParagraph(labels[k]+': '+v.trailer[k])});
    }
    body.appendParagraph('INTERPRETACIÓN TÉCNICA: '+(v.interpretacion||'Pendiente'));
    body.appendParagraph('RECOMENDACIONES Y CONCLUSIONES: '+(v.recomendaciones||'Pendiente'));
    // Fotos de evidencia hasta 2 por punto dentro del informe; originales completos en Drive.
    
    let folderUrl=row[10],folderId=(String(folderUrl).match(/[-\w]{25,}/)||[])[0];
    if(folderId) {
      let fldr=DriveApp.getFolderById(folderId),phs=fldr.getFoldersByName('FOTOS_CODIFICADAS');
      if(phs.hasNext()) {
        let it=phs.next().getFiles(),allPhotos=[];
        while(it.hasNext())allPhotos.push(it.next());
        (v.puntos||[]).forEach(p=>{
          let code=nombre_(p.codigo||'');
          let selection=allPhotos.filter(f=>f.getName().endsWith('_'+code+'.jpg')).slice(0,3);
          if(selection.length)body.appendParagraph('Evidencia: '+String(p.codigo||'')).setHeading(DocumentApp.ParagraphHeading.HEADING3);
          selection.forEach(f=>{
            try{let img=body.appendImage(f.getBlob());let w=img.getWidth(),h=img.getHeight();if(w>260){img.setWidth(260);img.setHeight(Math.round(h*260/w))}}
            catch(err){console.warn('Foto no incrustada '+err.message)}
          });
        });
      }
    }
  });
  doc.saveAndClose();
  let name='SyRA_Informe_Mensual_'+periodo+'_'+nombre_(cliente)+'.pdf';
  let it=reports.getFilesByName(name);
  while(it.hasNext())it.next().moveTo(historico);
  let pdf=reports.createFile(df.getAs(MimeType.PDF).setName(name));
  df.moveTo(historico);
  return pdf.getUrl();
}
