/* SyRA Agua · Anteproyecto de riego · 22-11-2026 · sin dependencias remotas ni IA */
'use strict';
const $=id=>document.getElementById(id);
const keys=['proyecto','cesped','personas','domestico','fuente','descargas','inodoroBase','inodoroEfic','cisterna','lluviaAnual','dias','eto','kc','kl','pe','ea','eg','awc','inf','plantas','goteros','qgot','qrot','fjar','fces','rzces','rzjar','diametro','longitud','bar','estatica','filtro','valvula','otras','friccion'];
const n=id=>{let v=Number($(id)?.value);return Number.isFinite(v)?v:0};
const fmt=(v,d=1)=>Number.isFinite(v)?v.toLocaleString('es-AR',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';
const ars=v=>Number.isFinite(v)?'$ '+v.toLocaleString('es-AR',{maximumFractionDigits:0}):'—';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const table=(cols,rows)=>'<div class="scroll"><table><thead><tr>'+cols.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const areaTotal=1600,casas=54,duro=273,verde=1273;
function dibujar(){
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" role="img" aria-label="Lote modelo de cuarenta por cuarenta metros, con dos casas, jardín de bajo consumo y césped con doce rotores en dos zonas">';
 s+='<defs><clipPath id="zona3"><rect x="280" y="245" width="200" height="100"/></clipPath><clipPath id="zona4"><rect x="280" y="345" width="200" height="100"/></clipPath></defs>';
 s+='<rect width="800" height="520" fill="#fcfdfb"/><g stroke="#8ca69e" stroke-width="2"><rect x="80" y="45" width="400" height="400" fill="#e3e4bf"/></g>';
 s+='<rect x="80" y="45" width="400" height="50" fill="#c6d0d6"/><rect x="80" y="195" width="200" height="36.5" fill="#c6d0d6"/>';
 s+='<rect x="110" y="105" width="60" height="45" rx="2" fill="#a7bbd7" stroke="#54738b"/><rect x="190" y="105" width="60" height="45" rx="2" fill="#a7bbd7" stroke="#54738b"/>';
 s+='<rect x="280" y="245" width="200" height="100" fill="#a2cf8c" stroke="#78a367"/><rect x="280" y="345" width="200" height="100" fill="#8cc17e" stroke="#78a367"/>';
 const positions=[ [130,176],[210,176],[322,140],[375,192],[130,270],[200,282],[250,345],[140,365] ];
 for(const [x,y] of positions)s+='<circle cx="'+x+'" cy="'+y+'" r="8" fill="#5b8461" stroke="#edf3e8" stroke-width="2"/>';
 for(const [z,yy,c] of [['zona3',[245,345],'#2272b2'],['zona4',[345,445],'#6c55ab']]){
  s+='<g clip-path="url(#'+z+')">';
  for(const y of yy)for(const x of [280,380,480])s+='<circle cx="'+x+'" cy="'+y+'" r="100" fill="'+c+'" fill-opacity=".08" stroke="'+c+'" stroke-opacity=".55" stroke-width="1.6"/>';
  s+='</g>';
  for(const y of yy)for(const x of [280,380,480])s+='<circle cx="'+x+'" cy="'+y+'" r="4.4" fill="'+c+'" stroke="#fff" stroke-width="1.2"/>';
 }
 s+='<g font-family="system-ui,Arial,sans-serif" font-size="14" fill="#173d4c" font-weight="700"><text x="105" y="133">Casa 1</text><text x="185" y="163">Casa 2</text><text x="335" y="295">Césped Z3</text><text x="335" y="405">Césped Z4</text><text x="101" y="77">Acceso 200 m²</text><text x="97" y="217">Patio 73 m²</text><text x="104" y="326">Jardín de bajo</text><text x="104" y="344">consumo</text><text x="107" y="360">Z1 y Z2</text></g>';
 s+='<g font-family="system-ui,Arial,sans-serif" font-size="13" fill="#506c77"><text x="260" y="28">40 m →</text><text x="38" y="252" transform="rotate(-90 38 252)">40 m →</text><text x="520" y="60">Cisterna y bomba:</text><text x="520" y="80">ubicación a verificar</text><text x="520" y="115">4 estaciones:</text><text x="520" y="137">Z1 · goteo norte</text><text x="520" y="159">Z2 · goteo sur</text><text x="520" y="181">Z3 · rotores sector 1</text><text x="520" y="203">Z4 · rotores sector 2</text><text x="520" y="255">Círculos = alcance</text><text x="520" y="277">de 10 m supuesto</text><text x="520" y="320">Patrón nominal:</text><text x="520" y="342">90° en esquinas</text><text x="520" y="364">180° en bordes</text><text x="520" y="430">No es un plano ejecutivo.</text></g>';
 s+='</svg>';
 $('drawing').innerHTML=s;
}
function calcular(){
 const a=clamp(n('cesped'),0,1273), j=verde-a,days=clamp(n('dias'),1,31),eto=Math.max(0,n('eto')),kc=n('kc'),kl=n('kl'),pe=Math.max(0,n('pe')),ea=Math.max(.01,n('ea')),eg=Math.max(.01,n('eg'));
 $('jardin').value=fmt(j,0)+' m²';$('legendGarden').textContent=fmt(873,0);
 const lam=(k)=>Math.max(0,eto*k*days-pe);
 const vol=(m2,k,ef)=>m2*lam(k)/(1000*ef);
 const vc=vol(a,kc,ea),vj=vol(j,kl,eg),dom=n('personas')*n('domestico')*days/1000, total=vc+vj+dom;
 const allGrass=vol(verde,kc,ea),allXeric=vol(verde,kl,eg),ahorro=allGrass-(vc+vj);
 const wcAhorro=Math.max(0,(n('inodoroBase')-n('inodoroEfic'))*n('descargas')*n('personas')*days/1000);
 $('wcMetrics').innerHTML='<div><strong>'+fmt(wcAhorro,1)+' m³/mes</strong><span>Ahorro del inodoro eficiente</span></div>';

 const etaCes=eto*kc,etaJar=eto*kl;
 const lluviaRecuperable=casas*n('lluviaAnual')/1000*.8;
 $('lluviaTecho').innerHTML='<div><strong>'+fmt(lluviaRecuperable,1)+' m³/año</strong><span>Potencial teórico de captación de las dos cubiertas (rendimiento supuesto 80 %)</span></div>';

 $('balanceMetrics').innerHTML=[
  ['ETc césped',fmt(etaCes,2)+' mm/día'],['ETL jardín',fmt(etaJar,2)+' mm/día'],['Riego del predio',fmt(vc+vj,1)+' m³/mes'],['Total con viviendas',fmt(total,1)+' m³/mes']
 ].map(([t,v])=>'<div><strong>'+v+'</strong><span>'+t+'</span></div>').join('');
 $('tablaBalance').innerHTML=table(['Uso','Lámina neta','Volumen bruto'],[
 ['Césped ('+fmt(a,0)+' m²)',fmt(lam(kc),1)+' mm',fmt(vc,1)+' m³/mes'],
 ['Jardín ('+fmt(j,0)+' m²)',fmt(lam(kl),1)+' mm',fmt(vj,1)+' m³/mes'],
 ['Uso interno ('+n('personas')+' pers.)','—',fmt(dom,1)+' m³/mes'],
 ['TOTAL antes de cambiar el inodoro','—','<b>'+fmt(total,1)+' m³/mes</b>'],['TOTAL con inodoro eficiente','—','<b>'+fmt(total-wcAhorro,1)+' m³/mes</b>']]);
 $('comparacion').innerHTML=table(['Escenario exterior','m³/mes'],[
 ['Todo césped ('+verde+' m²)',fmt(allGrass,1)],
 ['Mixto: césped + jardín',fmt(vc+vj,1)],
 ['Todo jardín adaptado',fmt(allXeric,1)],
 ['Ahorro mixto vs. todo césped','<b>'+fmt(ahorro,1)+' ('+fmt(allGrass>0?100*ahorro/allGrass:0,1)+'%)</b>']]);
 const p=n('plantas'),g=n('goteros'),qg=n('qgot'),qd=p*g*qg/1000,qr=n('qrot'),qmax=Math.max(qd,qr);
 const frJar=Math.max(1,n('fjar')),frCes=Math.max(1,n('fces')), freqJar=days/7*frJar,freqCes=days/7*frCes;
 const minsJ=qd>0?(vj/2)/(freqJar*qd)*60:0,minsC=qr>0?(vc/2)/(freqCes*qr)*60:0,pr=a>0?qr*1000/(a/2):0;
 const awc=n('awc'),rawC=awc*n('rzces')*.5,rawJ=awc*n('rzjar')*.5, intervalC=etaCes>0?rawC/etaCes:0,intervalJ=etaJar>0?rawJ/etaJar:0;
 $('tablaRiego').innerHTML=table(['Estación','Sector','Caudal previsto','Frecuencia','Minutos por riego'],[
 ['1','Goteo jardín A: '+fmt(j/2,0)+' m²',fmt(qd,2)+' m³/h',frJar+' / semana',fmt(minsJ,0)+' min'],
 ['2','Goteo jardín B: '+fmt(j/2,0)+' m²',fmt(qd,2)+' m³/h',frJar+' / semana',fmt(minsJ,0)+' min'],
 ['3','Rotores césped A: '+fmt(a/2,0)+' m²',fmt(qr,2)+' m³/h',frCes+' / semana',fmt(minsC,0)+' min'],
 ['4','Rotores césped B: '+fmt(a/2,0)+' m²',fmt(qr,2)+' m³/h',frCes+' / semana',fmt(minsC,0)+' min']]);
 $('tablaRiego').innerHTML+='<p><b>Caudal simultáneo máximo previsto:</b> '+fmt(qmax,2)+' m³/h ('+fmt(qmax*1000/60,1)+' L/min), si corre una estación a la vez. <b>Tasa media del sector de césped:</b> '+fmt(pr,1)+' mm/h. Infiltración de referencia: '+fmt(n('inf'),1)+' mm/h. '+(pr>n('inf')?'<b>Atención: la tasa supera la infiltración supuesta; dividir en ciclos o rediseñar.</b>':'La tasa media no supera la infiltración supuesta, pero debe comprobarse en campo.')+'</p>';
 $('tablaRiego').innerHTML+='<p class="muted">Reserva fácilmente aprovechable (RAW = capacidad de agua disponible × raíz × 0,5), estimación sin lluvia: césped '+fmt(rawC,1)+' mm → '+fmt(intervalC,1)+' días; jardín '+fmt(rawJ,1)+' mm → '+fmt(intervalJ,1)+' días. El valor de p = 0,5 es un supuesto, no una recomendación universal para especies nativas.</p>';
 if(minsJ>240||minsC>240)$('tablaRiego').innerHTML+='<p class="warning">La duración supera cuatro horas por estación: se debe modificar la sectorización, frecuencia o caudal. No se puede copiar tal cual al X-Core.</p>';
 if(a!==400){if(!$('drawing').querySelector('p.warning'))$('drawing').insertAdjacentHTML('afterbegin','<p class="warning">La cobertura dibujada representa solamente el diseño base de 400 m² de césped. Al cambiar la superficie es obligatorio recalcular las posiciones y cantidad de rotores.</p>');}
 else{let w=$('drawing').querySelector('p.warning');if(w)w.remove();}
 const D=n('diametro')/1000,Q=qmax/3600,v=D>0?4*Q/(Math.PI*D*D):0, hf=D>0?n('friccion')*(n('longitud')/D)*(v*v/(2*9.81)):0;
 const pHead=n('bar')*10.197,ht=pHead+n('estatica')+n('filtro')+n('valvula')+n('otras')+hf,kw=1000*9.81*Q*ht/1000,etaPump=.45;
 $('bombaMetrics').innerHTML=[['Caudal crítico',fmt(qmax,2)+' m³/h'],['Velocidad troncal',fmt(v,2)+' m/s'],['Pérdida por fricción',fmt(hf,1)+' m c.a.'],['Altura total requerida',fmt(ht,1)+' m c.a.']].map(([t,val])=>'<div><strong>'+val+'</strong><span>'+t+'</span></div>').join('');
 $('descripcionHidraulica').innerHTML='<p>Presión en emisor: '+fmt(pHead,1)+' m + desnivel '+fmt(n('estatica'),1)+' m + filtro '+fmt(n('filtro'),1)+' m + válvula '+fmt(n('valvula'),1)+' m + accesorios '+fmt(n('otras'),1)+' m + fricción '+fmt(hf,1)+' m = <b>'+fmt(ht,1)+' m de columna de agua</b> (aprox. '+fmt(ht/10.197,2)+' bar en impulsión). Potencia hidráulica '+fmt(kw,2)+' kW; con rendimiento global supuesto del 45 %, potencia eléctrica aproximada '+fmt(kw/etaPump,2)+' kW. Elegir bomba sólo después de comparar su curva Q–H, tensión, punto operativo real y protecciones.</p><p class="muted">Conducción «1 pulgada» y conexiones «media pulgada» son denominaciones comerciales; el diámetro interior real depende del material y presión nominal. Para el modelo se utiliza D='+fmt(n('diametro'),0)+' mm y L='+fmt(n('longitud'),0)+' m en tramo crítico. Accesorios de PE, cruces, tees y codos deben presupuestarse según plano definitivo.</p>';
 $('descripcionHidraulica').innerHTML+='<p class="muted"><b>Para goteo:</b> válvula reductora y regulador de presión, filtro apropiado para goteros, purga en extremos y verificación de presión mínima de la bomba cuando funciona sólo un sector de '+fmt(qd,2)+' m³/h. <b>PGV 1″:</b> el fabricante declara 0,05–9 m³/h y aproximadamente 0,11–0,13 bar de pérdida alrededor de los caudales de este ejemplo. La pérdida editada de válvula incluye margen preliminar.</p>';
 const items=[['Programador Hunter X-Core XC-401i',1,183500,'https://www.pdaweb.com.ar/productos/?brand=Hunter'],['Electroválvulas Hunter PGV 1″ 24 VCA',4,46500,'https://www.puntoriego.com.ar/productos/'],['Rotores Hunter PGP Ultra (cuerpo)',12,28000,'https://www.puntoriego.com.ar/productos/']];
 $('presupuesto').innerHTML=table(['Equipo de referencia','Cantidad','Precio unitario','Subtotal'],items.map(([label,cant,price,url])=>['<a href="'+url+'" target="_blank" rel="noopener">'+label+'</a>',cant,ars(price),ars(price*cant)]).concat([['<b>Subtotal parcial</b>','—','—','<b>'+ars(items.reduce((sum,x)=>sum+x[1]*x[2],0))+'</b>']]));
 $('presupuesto').innerHTML+='<p class="tip">Aún no cotizados: <b>bomba, filtro, colector, tuberías 1″ y ramales, uniones, codos, tees, conexiones ½″, goteros (aprox. '+fmt(2*p*g,0)+'), cableado, relé de bomba, gabinete, accesorios, cisterna, transporte e instalación</b>. Tampoco se verificó el modelo específico de boquilla de PGP Ultra que aporte la relación de caudales 90°/180° requerida para igual precipitación.</p>';
 const reservaDias=n('cisterna')/1000/(total/days||1);
 $('balanceMetrics').innerHTML+='<div><strong>'+fmt(reservaDias,1)+' días</strong><span>Autonomía teórica de cisterna (sin ingreso adicional)</span></div>';
}
function datos(){const out={version:'SyRA-Agua-0.1',tipo:'anteproyecto',fecha:new Date().toISOString(),inputs:{}};for(const id of keys)out.inputs[id]=$(id).value;return out;}
function restore(){try{const d=JSON.parse(localStorage.getItem('syra-agua-borrador-01'));if(d?.inputs)for(const k of keys)if(d.inputs[k]!==undefined)$(k).value=d.inputs[k];}catch(e){console.warn('No se pudo leer guardado',e)}}
function init(){
 restore();dibujar();for(const k of keys)$(k)?.addEventListener('input',calcular);
 $('save').onclick=()=>{try{localStorage.setItem('syra-agua-borrador-01',JSON.stringify(datos()));alert('Anteproyecto guardado en este navegador. Exportá JSON para una copia externa.')}catch(e){alert('No se pudo guardar: '+e.message)}};
 $('reset').onclick=()=>{if(confirm('¿Restablecer el ejemplo original? No se borrará el respaldo exportado.')){localStorage.removeItem('syra-agua-borrador-01');location.reload()}};
 $('export').onclick=()=>{const blob=new Blob([JSON.stringify(datos(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='SyRA_Agua_anteproyecto_'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
 $('print').onclick=()=>window.print();
 if('serviceWorker'in navigator&&location.protocol==='https:')navigator.serviceWorker.register('./sw.js').catch(console.warn);
 calcular();
}
document.addEventListener('DOMContentLoaded',init);