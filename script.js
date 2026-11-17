// SyRA: navegación y elementos opcionales, compatibles con páginas públicas y móviles.
const yearEl=document.getElementById('year');
if(yearEl) yearEl.textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
if(menu&&nav){
  menu.setAttribute('aria-expanded','false');
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));
}
const tips=[
 ['Verano: alimentos y agua bajo control','El calor aumenta la actividad de insectos. Cerrá alimentos, retirá residuos y eliminá agua acumulada.'],
 ['Otoño: anticiparse al ingreso de roedores','Revisá burletes, rejillas, depósitos y puntos de ingreso antes de detectar actividad.'],
 ['Invierno: inspeccionar áreas protegidas','Controlá depósitos, salas técnicas y espacios poco transitados. Las señales tempranas permiten intervenir mejor.'],
 ['Primavera: prevenir antes del aumento de actividad','Revisá exteriores, desagües y perímetros. Un monitoreo temprano evita que el problema avance.']
];
const m=new Date().getMonth(),i=m<=1||m===11?0:m<=4?1:m<=7?2:3;
const tipTitle=document.getElementById('tip-title'),tipText=document.getElementById('tip-text');
if(tipTitle) tipTitle.textContent=tips[i][0];
if(tipText) tipText.textContent=tips[i][1];
const quote=document.getElementById('quote');
if(quote)quote.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const msg=`Hola SyRA, soy ${d.get('name')||''}. Necesito orientación para ${d.get('place')||''} en ${d.get('city')||''}. Situación: ${d.get('need')||''}`;
  window.open(`https://wa.me/5492975942989?text=${encodeURIComponent(msg)}`,'_blank','noopener');
});