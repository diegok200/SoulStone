import { useState, useEffect } from 'react'
import './App.css'

// ================================
// PALETA ESOTÉRICA — púrpura, negro, dorado
// ================================
const C = {
  bg: '#0D0B1A',
  bgCard: '#17142A',
  bgSoft: '#1F1B35',
  bgGlass: 'rgba(255,255,255,0.05)',
  rose: '#C9748F',
  roseDark: '#A0506A',
  roseLight: 'rgba(201,116,143,0.15)',
  purple: '#8B5CF6',
  purpleDark: '#6D28D9',
  purpleLight: 'rgba(139,92,246,0.15)',
  teal: '#2DD4BF',
  tealDark: '#0F9080',
  tealLight: 'rgba(45,212,191,0.15)',
  amber: '#F59E0B',
  amberDark: '#D97706',
  amberLight: 'rgba(245,158,11,0.15)',
  blue: '#60A5FA',
  blueDark: '#2563EB',
  blueLight: 'rgba(96,165,250,0.15)',
  green: '#34D399',
  greenLight: 'rgba(52,211,153,0.15)',
  coral: '#FB7185',
  coralLight: 'rgba(251,113,133,0.15)',
  gold: '#FFD700',
  goldDark: '#B8860B',
  goldLight: 'rgba(255,215,0,0.12)',
  burgundy: '#7B2D8B',
  text: '#F5F0FF',
  textMid: '#C4B5D4',
  textSoft: '#7A6B8A',
  border: 'rgba(255,215,0,0.2)',
  borderSoft: 'rgba(139,92,246,0.25)',
  success: '#10B981',
}

const animCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
  * { font-family: 'Montserrat', sans-serif !important; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0}to{opacity:1} }
  @keyframes bounceIn { 0%{transform:scale(0.3);opacity:0}50%{transform:scale(1.08)}70%{transform:scale(0.95)}100%{transform:scale(1);opacity:1} }
  @keyframes slideLeft { from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)} }
  @keyframes confettiFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(120px) rotate(720deg);opacity:0} }
  @keyframes floatUp { 0%{transform:translateY(0);opacity:1}100%{transform:translateY(-60px);opacity:0} }
  @keyframes pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.06)} }
  @keyframes moonGlow { 0%,100%{box-shadow:0 0 20px rgba(255,215,0,0.2)}50%{box-shadow:0 0 50px rgba(255,215,0,0.5),0 0 80px rgba(139,92,246,0.3)} }
  @keyframes goldShimmer { 0%{background-position:-200% 0}100%{background-position:200% 0} }
  @keyframes starTwinkle { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)} }
  @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.02)} }
  .fadeUp{animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both}
  .bounceIn{animation:bounceIn 0.6s cubic-bezier(.34,1.56,.64,1) both}
  .slideLeft{animation:slideLeft 0.45s cubic-bezier(.22,1,.36,1) both}
  .pulse{animation:pulse 2s infinite}
  .fadeIn{animation:fadeIn 0.4s ease both}
  .moonGlow{animation:moonGlow 3s infinite}
  .orbFloat{animation:orbFloat 4s ease-in-out infinite}
  .starTwinkle{animation:starTwinkle 2s ease-in-out infinite}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(255,215,0,0.3);border-radius:4px}
`

// ================================
// FASES DE LA LUNA
// ================================
function getLunaHoy() {
  const hoy = new Date()
  const lunaNueva = new Date('2025-01-29')
  const diff = (hoy - lunaNueva) / (1000*60*60*24)
  const ciclo = 29.53
  const fase = ((diff % ciclo) + ciclo) % ciclo
  if (fase < 1.85) return { nombre:'Luna Nueva 🌑', emoji:'🌑', porcentaje:0, color:C.purple, descripcion:'El velo entre mundos es más delgado. Es el momento más poderoso para sembrar intenciones. Lo que pides hoy al universo tiene fuerza multiplicada.', consejo:'Escribe en tu Grimorio tus 3 deseos más profundos para este ciclo. Sostenlos como verdades, no como peticiones.' }
  if (fase < 7.38) return { nombre:'Luna Creciente 🌒', emoji:'🌒', porcentaje:25, color:C.teal, descripcion:'La energía lunar crece con cada hora. Las intenciones que sembraste comienzan a despertar. El universo está organizando las piezas.', consejo:'Toma una acción concreta hacia tu deseo. El universo necesita que te muevas para poder moverse contigo.' }
  if (fase < 9.22) return { nombre:'Cuarto Creciente 🌓', emoji:'🌓', porcentaje:50, color:C.rose, descripcion:'Punto de poder y decisión. Si encuentras resistencia, es porque estás en el umbral correcto. Las brujas saben que la puerta más pesada lleva al mejor tesoro.', consejo:'Nombra el obstáculo en voz alta y di: "Te veo. No me detendrás."' }
  if (fase < 14.77) return { nombre:'Gibosa Creciente 🌔', emoji:'🌔', porcentaje:75, color:C.amber, descripcion:'La magia está casi completa. Refinamiento y confianza. Tu energía personal está en uno de sus puntos más altos del mes.', consejo:'Revisa tus intenciones. Ajusta, no abandones. La cosecha está cerca.' }
  if (fase < 16.61) return { nombre:'Luna Llena 🌕', emoji:'🌕', porcentaje:100, color:C.gold, descripcion:'La noche más poderosa del mes. La luna llena ilumina todo lo que está oculto y amplifica toda energía — la tuya incluida. Los rituales realizados hoy tienen diez veces más potencia.', consejo:'Enciende una vela, sostén tu piedra aliada y di en voz alta lo que manifiestas. El universo escucha con claridad absoluta esta noche.' }
  if (fase < 22.15) return { nombre:'Gibosa Menguante 🌖', emoji:'🌖', porcentaje:75, color:C.teal, descripcion:'Tiempo de compartir tu luz. Lo que has cosechado es semilla para otras almas. Tu sabiduría tiene valor sagrado.', consejo:'Comparte algo de valor hoy — conocimiento, amor, tiempo. Lo que fluye no se estanca.' }
  if (fase < 24.0) return { nombre:'Cuarto Menguante 🌗', emoji:'🌗', porcentaje:50, color:C.purple, descripcion:'El ciclo pide liberación. Esto no es pérdida — es alquimia. Transformas lo viejo en espacio para lo nuevo.', consejo:'Escribe en un papel algo que quieres soltar. Quémalo o rómpelo. El ritual sella la liberación.' }
  return { nombre:'Luna Menguante 🌘', emoji:'🌘', porcentaje:25, color:C.burgundy, descripcion:'El ciclo sagrado llega a su final. Descansa. Integra. La oscuridad antes de la luna nueva no es vacío — es gestación.', consejo:'Descansa más de lo usual hoy. Tu cuerpo y tu alma están procesando la magia del ciclo.' }
}

// ================================
// ARQUETIPOS según signo + elemento
// ================================
function getArquetipo(signo, elemento, objetivo) {
  const arquetipos = {
    Fuego: { titulo:'Guardiana del Fuego', desc:'Tu alma nació para iluminar. Tienes el poder de transformar cualquier situación con tu energía vital.', simbolo:'🔥' },
    Tierra: { titulo:'Sacerdotisa de la Tierra', desc:'Tu sabiduría viene de las raíces. Construyes lo eterno con paciencia y propósito sagrado.', simbolo:'🌿' },
    Aire: { titulo:'Mensajera de los Vientos', desc:'Tu mente es un portal. Las ideas que recibes no son tuyas — son del universo pasando a través de ti.', simbolo:'🌬️' },
    Agua: { titulo:'Hija de la Luna', desc:'Tu intuición es tu brújula más precisa. Sientes lo que otros no pueden ver. Eso es un don sagrado.', simbolo:'🌊' },
  }
  return arquetipos[elemento] || arquetipos.Agua
}

// ================================
// DATOS — lenguaje esotérico
// ================================
const OBJETIVOS = [
  {
    id:'amor', emoji:'💗', titulo:'Amor y relaciones',
    color:C.rose, colorLight:C.roseLight, colorDark:C.roseDark,
    desc:'Abre tu corazón al amor que mereces.',
    piedra:{
      nombre:'Cuarzo Rosa', emoji:'💗',
      voz:'"Hermana, el amor que buscas afuera ya vive en ti. Soy tu espejo — lo que ves en mí es lo que puedes darte a ti misma."',
      marketing:'La piedra del amor incondicional. Durante siglos las sacerdotisas la usaron para sanar corazones rotos y atraer uniones sagradas. Su vibración abre el chakra del corazón y disuelve las barreras que el miedo construyó.',
      afirmacion:'"El amor sagrado que merezco fluye hacia mí ahora."',
      rituales:[
        { texto:'Escribe 3 cosas sagradas que amas de ti misma', mensaje:'💗 Lo que acabas de escribir es magia pura. El universo tomó nota. Guarda esta lista — es tu amuleto en los días difíciles.' },
        { texto:'Invoca conexión enviando un mensaje desde el corazón', mensaje:'❤️ La energía que enviaste ya regresa hacia ti multiplicada. Así funciona la ley del espejo.' },
        { texto:'Medita 5 min visualizando amor fluyendo hacia ti', mensaje:'🌸 La visualización con emoción es el lenguaje del universo. Tu Cuarzo Rosa acaba de amplificar esa señal.' },
        { texto:'Ofrece una sonrisa como ritual de apertura energética', mensaje:'✨ Un gesto de amor es un hechizo. Acabas de cambiar el campo energético de alguien hoy.' },
      ]
    }, libre:true,
  },
  {
    id:'abundancia', emoji:'✨', titulo:'Abundancia y prosperidad',
    color:C.amber, colorLight:C.amberLight, colorDark:C.amberDark,
    desc:'Activa el flujo de prosperidad en tu vida.',
    piedra:{
      nombre:'Citrino', emoji:'💛',
      voz:'"Soy la piedra de los comerciantes y las reinas. La escasez es una ilusión — yo te ayudo a recordar que eres hija de un universo infinitamente abundante."',
      marketing:'El Citrino no acumula energía negativa — la transforma. Las alquimistas lo llamaban "la piedra del sol" porque irradia prosperidad constante. Activa tu chakra del plexo solar y desbloquea la mente de la abundancia.',
      afirmacion:'"Soy un canal abierto para la prosperidad del universo."',
      rituales:[
        { texto:'Visualiza tu templo de abundancia por 5 minutos', mensaje:'💛 Lo que acabas de ver en tu mente ya existe en el plano energético. El Citrino lo está anclando en tu realidad.' },
        { texto:'Invoca 3 portales de prosperidad que no habías visto', mensaje:'📝 La abundancia siempre estuvo ahí — acabas de sintonizarte en su frecuencia.' },
        { texto:'Contempla tus recursos con ojos de gratitud sagrada', mensaje:'🙏 La gratitud es el imán más poderoso del universo. Acabas de multiplicar lo que tienes.' },
        { texto:'Absorbe una enseñanza sagrada sobre prosperidad', mensaje:'📚 El conocimiento es poder alquímico. Una semilla de sabiduría se convierte en bosque.' },
      ]
    }, libre:false,
  },
  {
    id:'bienestar', emoji:'🌿', titulo:'Bienestar y vitalidad',
    color:C.teal, colorLight:C.tealLight, colorDark:C.tealDark,
    desc:'Honra el templo sagrado de tu cuerpo.',
    piedra:{
      nombre:'Aventurina', emoji:'💚',
      voz:'"Tu cuerpo es tierra sagrada. Cada célula tuya es un universo. Cuando me sostienes, recuerdo a tu cuerpo su propia magia."',
      marketing:'La Aventurina verde vibra con la energía del corazón de la tierra. Las chamanas la usaban para activar la fuerza vital y sanar el cuerpo físico. Su color es el del chakra del corazón y el del renacimiento eterno.',
      afirmacion:'"Mi cuerpo es un templo sagrado y lo honro con amor."',
      rituales:[
        { texto:'Realiza 10 respiraciones sagradas de purificación', mensaje:'🌬️ Cada respiración consciente es un ritual. Tu sistema nervioso ha sido bendecido. Vuelve a esto cuando el mundo se sienta demasiado.' },
        { texto:'Camina 15 minutos en comunión con la naturaleza', mensaje:'🌿 La tierra te recargó. Cada paso fue un intercambio sagrado de energía.' },
        { texto:'Consagra tu cuerpo con 8 vasos de agua lunar', mensaje:'💧 El agua lleva tu intención a cada célula. Acabas de sanar desde adentro.' },
        { texto:'Ofrenda a tu templo un alimento de la tierra', mensaje:'🍎 Cada elección consciente es un acto de magia. Tu cuerpo siente la diferencia vibratoria.' },
      ]
    }, libre:false,
  },
  {
    id:'paz', emoji:'🧘', titulo:'Paz y serenidad interior',
    color:C.purple, colorLight:C.purpleLight, colorDark:C.purpleDark,
    desc:'Encuentra el centro sagrado en el silencio.',
    piedra:{
      nombre:'Amatista', emoji:'💜',
      voz:'"Soy la guardiana del umbral entre lo visible y lo invisible. En mi presencia, la mente ansiosa encuentra su hogar en el silencio."',
      marketing:'La Amatista ha sido la piedra de los oráculos, las sacerdotisas y los videntes desde la antigüedad. Purifica el espacio energético, calma el sistema nervioso y abre el tercer ojo. Su color púrpura es el del mundo espiritual.',
      afirmacion:'"En el silencio sagrado encuentro mi poder más profundo."',
      rituales:[
        { texto:'Entra al santuario interior — medita 5 minutos en silencio', mensaje:'🧘 El silencio que acabas de crear es más poderoso que mil palabras. Tu Amatista guardó ese espacio sagrado.' },
        { texto:'Conjura gratitud — escribe 3 bendiciones de hoy', mensaje:'💜 Acabas de reescribir tu realidad. La gratitud es alquimia del alma.' },
        { texto:'Ritual de desconexión — silencia el mundo exterior 1 hora', mensaje:'✨ El descanso digital es un acto de resistencia sagrada en este mundo. Tu energía se está restaurando.' },
        { texto:'Invoca la paz a través de un acto que nutre tu alma', mensaje:'🌙 Sabes lo que te da paz — ese conocimiento es sabiduría antigua viviendo en ti.' },
      ]
    }, libre:false,
  },
  {
    id:'crecimiento', emoji:'🌱', titulo:'Crecimiento y evolución',
    color:C.blue, colorLight:C.blueLight, colorDark:C.blueDark,
    desc:'Despierta a la versión más elevada de ti.',
    piedra:{
      nombre:'Lapislázuli', emoji:'💎',
      voz:'"Las reinas del Egipto antiguo me usaban para ver con claridad divina. En mí vive la sabiduría de todas las vidas que ya viviste."',
      marketing:'El Lapislázuli es la piedra de los faraones y las sacerdotisas de Isis. Activa el tercer ojo, expande la conciencia y conecta con la sabiduría del alma. Su azul profundo con destellos dorados es el cielo nocturno hecho mineral.',
      afirmacion:'"Cada día despierto a una versión más elevada de mi ser eterno."',
      rituales:[
        { texto:'Absorbe 10 páginas de un texto sagrado o transformador', mensaje:'📚 Las palabras que entraron hoy se convertirán en sabiduría que no sabías que necesitabas.' },
        { texto:'Invoca una habilidad que tu alma pide despertar', mensaje:'🌱 Tu cerebro creció literalmente hoy. Eso es evolución del alma en tiempo real.' },
        { texto:'Contempla la lección oculta en tu experiencia reciente', mensaje:'💎 La reflexión convierte la experiencia en sabiduría. Acabas de hacer alquimia con tu propia vida.' },
        { texto:'Cruza un umbral — haz algo que tu yo de ayer no haría', mensaje:'🚀 El crecimiento vive exactamente donde termina la comodidad. Acabas de expandir quién eres.' },
      ]
    }, libre:false,
  },
  {
    id:'espiritual', emoji:'🔮', titulo:'Despertar espiritual',
    color:'#8B5CF6', colorLight:'rgba(139,92,246,0.15)', colorDark:'#5B21B6',
    desc:'Responde al llamado de tu alma.',
    piedra:{
      nombre:'Obsidiana Sagrada', emoji:'🖤',
      voz:'"Soy el espejo del alma. Lo que ves en mí, lo que sientes al tocarme — esa es la verdad que has estado evitando y que más necesitas abrazar."',
      marketing:'La Obsidiana es la piedra del chamán y la bruja. Formada por el fuego de la tierra, corta lo falso con precisión divina. Protege, limpia el campo áurico y te conecta con tu propósito sagrado en esta encarnación.',
      afirmacion:'"Soy una con el universo. Mi propósito sagrado se revela ahora."',
      rituales:[
        { texto:'Entra en meditación profunda — viaja a tu mundo interior', mensaje:'🌌 Lo que encontraste en ese silencio profundo es un mensaje del universo. No lo descartes — escríbelo.' },
        { texto:'Inscribe en tu Grimorio una revelación de tu alma', mensaje:'✨ Las palabras que escribiste hoy vinieron de algo más antiguo y sabio que tu mente consciente.' },
        { texto:'Comunión sagrada con la naturaleza — ofrece tu presencia', mensaje:'🌿 La tierra te reconoció hoy. Hubo un intercambio de energía que no siempre se ve pero siempre se siente.' },
        { texto:'Ritual de gratitud cósmica — ofrenda al universo', mensaje:'🙏 Lo que das con devoción regresa multiplicado en formas que el universo elige. El ciclo está completo.' },
      ]
    }, libre:false,
  },
]

const NIVELES = [
  { nombre:'Iniciada', titulo:'Iniciada del Cuarzo', emoji:'🌱', min:0, max:149 },
  { nombre:'Aprendiz', titulo:'Aprendiz de la Amatista', emoji:'💜', min:150, max:399 },
  { nombre:'Guardiana', titulo:'Guardiana del Lapislázuli', emoji:'💎', min:400, max:799 },
  { nombre:'Sacerdotisa', titulo:'Sacerdotisa de la Esmeralda', emoji:'💚', min:800, max:1499 },
  { nombre:'Maestra', titulo:'Maestra del Citrino Dorado', emoji:'✨', min:1500, max:2499 },
  { nombre:'Oráculo', titulo:'Oráculo del Diamante Eterno', emoji:'💍', min:2500, max:Infinity },
]

const EMOCIONES = [
  { id:'excited', emoji:'🌟', label:'Encendida', color:'#FFD600', shape:'circle' },
  { id:'joyful', emoji:'🌸', label:'Radiante', color:C.rose, shape:'blob' },
  { id:'grateful', emoji:'💜', label:'Agradecida', color:C.purple, shape:'square' },
  { id:'energized', emoji:'⚡', label:'Poderosa', color:C.green, shape:'star' },
  { id:'calm', emoji:'🌊', label:'Serena', color:C.teal, shape:'circle' },
  { id:'confused', emoji:'🌀', label:'En transición', color:C.blue, shape:'hex' },
  { id:'tired', emoji:'🌙', label:'En descanso', color:'#7B1FA2', shape:'circle' },
  { id:'stressed', emoji:'🌪️', label:'En tormenta', color:C.coral, shape:'blob' },
  { id:'sad', emoji:'🌧️', label:'En duelo', color:'#1565C0', shape:'circle' },
  { id:'anxious', emoji:'🦋', label:'Transformando', color:C.amber, shape:'blob' },
  { id:'hopeful', emoji:'🌅', label:'Despertando', color:'#F4511E', shape:'star' },
  { id:'loved', emoji:'💗', label:'Amada', color:'#E91E63', shape:'heart' },
]

// ================================
// MICRO-TEXTOS MÁGICOS
// ================================
const MICRO_TEXTOS = {
  apertura: [
    'El universo te esperaba hoy, {nombre} ✨',
    'Las piedras sintieron tu llegada, {nombre} 🔮',
    'La magia comienza cuando tú llegas, {nombre} 💫',
    'Bienvenida a tu templo, {nombre} 🌙',
  ],
  ritual_completado: [
    'Esta energía ya está en movimiento 🌀',
    'El universo tomó nota ✨',
    'Tu intención fue escuchada 🔮',
    'La magia que activaste no se detiene 💫',
    'Lo que sembraste ya está creciendo 🌱',
  ],
  entrar_aquelarre: [
    'Tu presencia eleva la vibración del grupo ✨',
    'El círculo se completa con tu llegada 🔮',
    'Juntas somos más poderosas 🌙',
  ],
  grimorio: [
    'Las palabras que escribes aquí son conjuros 🖊️',
    'Tu Grimorio guarda la magia de tu alma 📖',
    'Cada entrada es un hechizo de autoconocimiento ✨',
  ],
  luna_llena: [
    'Esta noche tu intención tiene diez veces más poder 🌕',
    'La luna llena amplifica todo lo que sientes ahora 💫',
  ],
}

function getMicroTexto(tipo, nombre) {
  const textos = MICRO_TEXTOS[tipo] || ['✨']
  const texto = textos[new Date().getDay() % textos.length]
  return texto.replace('{nombre}', nombre || '')
}

function getNivel(xp) { return NIVELES.find(n => xp >= n.min && xp <= n.max) || NIVELES[0] }

function calcularSigno(fechaStr) {
  if (!fechaStr) return { signo:'Desconocido', emoji:'⭐', elemento:'Aire' }
  const f = new Date(fechaStr), m = f.getMonth()+1, d = f.getDate()
  if ((m===3&&d>=21)||(m===4&&d<=19)) return {signo:'Aries',emoji:'♈',elemento:'Fuego'}
  if ((m===4&&d>=20)||(m===5&&d<=20)) return {signo:'Tauro',emoji:'♉',elemento:'Tierra'}
  if ((m===5&&d>=21)||(m===6&&d<=20)) return {signo:'Géminis',emoji:'♊',elemento:'Aire'}
  if ((m===6&&d>=21)||(m===7&&d<=22)) return {signo:'Cáncer',emoji:'♋',elemento:'Agua'}
  if ((m===7&&d>=23)||(m===8&&d<=22)) return {signo:'Leo',emoji:'♌',elemento:'Fuego'}
  if ((m===8&&d>=23)||(m===9&&d<=22)) return {signo:'Virgo',emoji:'♍',elemento:'Tierra'}
  if ((m===9&&d>=23)||(m===10&&d<=22)) return {signo:'Libra',emoji:'♎',elemento:'Aire'}
  if ((m===10&&d>=23)||(m===11&&d<=21)) return {signo:'Escorpio',emoji:'♏',elemento:'Agua'}
  if ((m===11&&d>=22)||(m===12&&d<=21)) return {signo:'Sagitario',emoji:'♐',elemento:'Fuego'}
  if ((m===12&&d>=22)||(m===1&&d<=19)) return {signo:'Capricornio',emoji:'♑',elemento:'Tierra'}
  if ((m===1&&d>=20)||(m===2&&d<=18)) return {signo:'Acuario',emoji:'♒',elemento:'Aire'}
  return {signo:'Piscis',emoji:'♓',elemento:'Agua'}
}

function numerossuerte(fechaStr, signo) {
  const s = fechaStr ? new Date(fechaStr).getDate() : 7, h = new Date().getDate()
  const n1 = ((s+h*3)%36)+1, n2 = ((s*2+h)%36)+1, n3 = ((s+h+signo.length)%36)+1
  return [n1, n2===n1?n2+1:n2, n3===n1||n3===n2?n3+2:n3]
}

function getTransitosDia() {
  const d = new Date().getDay()
  const t = [
    {planeta:'🌙 Luna',posicion:'en Escorpio',explicacion:'La Luna en Escorpio abre el velo entre mundos. Tu intuición está en su punto más agudo — las señales que recibas hoy son reales. Escúchalas.'},
    {planeta:'☿ Mercurio',posicion:'directo en Tauro',explicacion:'Mercurio directo desteje las confusiones del pasado. Las palabras que pronuncies hoy tienen peso de conjuro. Habla solo lo que quieres crear.'},
    {planeta:'♀ Venus',posicion:'trino con el Sol',explicacion:'Venus y el Sol danzan juntos — la armonía es el tema del día. Las relaciones que nutras hoy florecerán. Es un portal de amor abierto.'},
    {planeta:'♂ Marte',posicion:'en cuadratura',explicacion:'Marte en tensión es fuego en busca de dirección. Esa inquietud que sientes no es ansiedad — es energía de transformación pidiendo ser usada.'},
    {planeta:'♃ Júpiter',posicion:'expandiendo tu destino',explicacion:'Júpiter abre puertas que estaban selladas. Las "coincidencias" de hoy no son casuales — son el universo respondiendo a tus intenciones anteriores.'},
  ]
  return [t[d%5], t[(d+1)%5], t[(d+2)%5]]
}

// ================================
// COMPONENTES
// ================================
function Confetti({ active }) {
  if (!active) return null
  const pieces = Array.from({length:20},(_,i)=>({
    id:i, color:[C.gold,'#FFD700',C.purple,C.rose,C.teal,'#C084FC','#F9A8D4'][i%7],
    left:`${Math.random()*90+5}%`, delay:`${Math.random()*0.4}s`,
    size:`${Math.random()*8+4}px`, shape:Math.random()>0.5?'50%':'2px',
  }))
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,pointerEvents:'none',zIndex:9999}}>
      {pieces.map(p=>(
        <div key={p.id} style={{position:'absolute',left:p.left,top:'20px',width:p.size,height:p.size,borderRadius:p.shape,background:p.color,animation:`confettiFall 1.4s ${p.delay} ease-in both`}}/>
      ))}
    </div>
  )
}

function FloatXP({ puntos, visible }) {
  if (!visible) return null
  return (
    <div style={{position:'fixed',top:'24px',right:'16px',background:`linear-gradient(135deg, ${C.gold}, ${C.amber})`,color:'#0D0B1A',padding:'10px 20px',borderRadius:'24px',fontSize:'15px',fontWeight:'800',zIndex:9998,animation:'floatUp 1.2s ease both',boxShadow:`0 4px 20px rgba(255,215,0,0.5)`,pointerEvents:'none'}}>
      +{puntos} vibración ✨
    </div>
  )
}

function ScoreCircular({ valor, max, color, label, size=110 }) {
  const [displayed, setDisplayed] = useState(0)
  const r = (size/2)-14, circ = 2*Math.PI*r
  const dash = Math.min(displayed/max,1)*circ
  useEffect(()=>{
    let start=0; const step=valor/30
    const timer=setInterval(()=>{
      start+=step
      if(start>=valor){setDisplayed(valor);clearInterval(timer)}
      else setDisplayed(Math.round(start))
    },30)
    return()=>clearInterval(timer)
  },[valor])
  return (
    <div style={{textAlign:'center',position:'relative',width:size,height:size}}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color+'33'} strokeWidth="8"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:'stroke-dasharray 0.05s linear'}}/>
      </svg>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
        <div style={{fontSize:size>100?'24px':'16px',fontWeight:'800',color:C.text}}>{displayed}</div>
        <div style={{fontSize:'9px',color:C.textSoft,fontWeight:'600'}}>{label}</div>
      </div>
    </div>
  )
}

function BarraProgreso({ valor, max, color, altura=8 }) {
  const [width, setWidth] = useState(0)
  const pct = Math.min(Math.round((valor/max)*100),100)
  useEffect(()=>{const t=setTimeout(()=>setWidth(pct),100);return()=>clearTimeout(t)},[pct])
  return (
    <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'20px',height:altura,overflow:'hidden'}}>
      <div style={{width:`${width}%`,height:altura,borderRadius:'20px',background:`linear-gradient(90deg, ${color}, ${color}CC)`,transition:'width 0.8s cubic-bezier(.22,1,.36,1)',boxShadow:`0 0 8px ${color}66`}}/>
    </div>
  )
}

function GlassCard({ children, color, delay=0, style={}, onClick }) {
  const [visible, setVisible] = useState(false)
  useEffect(()=>{const t=setTimeout(()=>setVisible(true),delay);return()=>clearTimeout(t)},[delay])
  return (
    <div onClick={onClick} style={{
      background:C.bgCard, borderRadius:'20px', padding:'1.25rem', marginBottom:'1rem',
      border:`1px solid ${color||C.border}`,
      boxShadow:`0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
      opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(20px)',
      transition:`opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      cursor:onClick?'pointer':'default', ...style,
    }}>
      {children}
    </div>
  )
}

function EmocionShape({ emocion, seleccionada, onClick }) {
  const shapes = {circle:'50%',blob:'60% 40% 70% 30% / 50% 60% 40% 50%',square:'22%',hex:'30% 70% 30% 70% / 70% 30% 70% 30%',triangle:'40% 40% 50% 50%',star:'50% 20% 50% 20% / 20% 50% 20% 50%',heart:'50% 50% 40% 40%'}
  const sel = seleccionada===emocion.id
  return (
    <div onClick={()=>onClick(emocion.id)} style={{textAlign:'center',cursor:'pointer'}}>
      <div style={{width:'56px',height:'56px',margin:'0 auto 6px',background:sel?emocion.color:emocion.color+'33',borderRadius:shapes[emocion.shape]||'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',transition:'all 0.25s cubic-bezier(.34,1.56,.64,1)',transform:sel?'scale(1.18)':'scale(1)',border:`2px solid ${sel?emocion.color:'rgba(255,255,255,0.1)'}`,boxShadow:sel?`0 0 20px ${emocion.color}66`:'none'}}>
        {emocion.emoji}
      </div>
      <div style={{fontSize:'10px',color:sel?C.text:C.textSoft,fontWeight:sel?'700':'400',transition:'all 0.2s'}}>{emocion.label}</div>
    </div>
  )
}

// ================================
// ONBOARDING
// ================================
function PantallaBienvenida({ onSiguiente }) {
  return (
    <div style={{minHeight:'100vh',background:`radial-gradient(ellipse at top, #2D1B69 0%, #0D0B1A 60%)`,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem',position:'relative',overflow:'hidden'}}>
      {/* Estrellas decorativas */}
      <div style={{position:'absolute',top:'15%',left:'10%',fontSize:'0.6rem',color:C.gold,animation:'starTwinkle 1.5s infinite'}}>✦</div>
      <div style={{position:'absolute',top:'25%',right:'15%',fontSize:'0.8rem',color:C.purple,animation:'starTwinkle 2s 0.5s infinite'}}>✦</div>
      <div style={{position:'absolute',top:'60%',left:'8%',fontSize:'0.5rem',color:C.rose,animation:'starTwinkle 2.5s 1s infinite'}}>✦</div>
      <div style={{position:'absolute',top:'70%',right:'10%',fontSize:'0.7rem',color:C.teal,animation:'starTwinkle 1.8s 0.3s infinite'}}>✦</div>
      <div style={{position:'absolute',top:'40%',left:'5%',fontSize:'0.4rem',color:C.gold,animation:'starTwinkle 3s 0.8s infinite'}}>✦</div>

      <div style={{textAlign:'center',maxWidth:'400px',width:'100%',position:'relative',zIndex:1}}>
        <div className="bounceIn orbFloat" style={{fontSize:'5rem',marginBottom:'1rem',filter:'drop-shadow(0 0 30px rgba(255,215,0,0.6))'}}>🔮</div>
        <h1 className="fadeUp" style={{fontSize:'40px',fontWeight:'900',color:C.gold,marginBottom:'6px',letterSpacing:'-0.5px',textShadow:'0 0 30px rgba(255,215,0,0.4)',animationDelay:'0.2s'}}>SoulStone</h1>
        <p className="fadeUp" style={{fontSize:'14px',color:C.textMid,marginBottom:'0.5rem',letterSpacing:'0.15em',textTransform:'uppercase',animationDelay:'0.3s'}}>Tu guía espiritual sagrada</p>
        <div className="fadeUp" style={{width:'60px',height:'1px',background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)`,margin:'1rem auto',animationDelay:'0.35s'}}/>
        <div className="fadeUp" style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap',margin:'1rem 0 2rem',animationDelay:'0.4s'}}>
          {['Rituales diarios ✦','Carta astral ✦','Aquelarre'].map((t,i)=>(
            <span key={i} style={{background:'rgba(255,215,0,0.08)',color:C.gold,fontSize:'11px',padding:'5px 14px',borderRadius:'20px',border:`1px solid rgba(255,215,0,0.25)`,fontWeight:'600',letterSpacing:'0.05em'}}>{t}</span>
          ))}
        </div>
        <button className="fadeUp" style={{...e.botonDorado,animationDelay:'0.5s'}} onClick={onSiguiente}>
          Las piedras te llaman →
        </button>
        <p className="fadeUp" style={{fontSize:'11px',color:C.textSoft,marginTop:'1rem',letterSpacing:'0.1em',animationDelay:'0.6s'}}>✦ EL UNIVERSO TE ESPERABA ✦</p>
      </div>
    </div>
  )
}

function PantallaNombre({ onSiguiente }) {
  const [nombre, setNombre] = useState('')
  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <div style={{maxWidth:'420px',width:'100%',textAlign:'center'}}>
        <div style={e.stepIndicator}>Iniciación 1 de 6</div>
        <div className="bounceIn" style={{fontSize:'3.5rem',marginBottom:'1rem',filter:'drop-shadow(0 0 20px rgba(255,215,0,0.4))'}}>🌟</div>
        <h2 className="fadeUp" style={e.pregunta}>¿Por qué nombre te conoce el universo?</h2>
        <p className="fadeUp" style={e.descripcion}>El nombre es la primera magia. Con él, tu piedra aliada aprenderá a reconocerte.</p>
        <input className="fadeUp" style={e.input} type="text" placeholder="Tu nombre sagrado..." value={nombre}
          onChange={ev=>setNombre(ev.target.value)}
          onKeyDown={ev=>ev.key==='Enter'&&nombre.trim()&&onSiguiente(nombre.trim())} autoFocus/>
        <button style={{...e.botonDorado,opacity:nombre.trim()?1:0.5}} onClick={()=>nombre.trim()&&onSiguiente(nombre.trim())}>
          El universo me conoce como {nombre||'...'} →
        </button>
      </div>
    </div>
  )
}

function PantallaFecha({ nombre, onSiguiente }) {
  const [fecha, setFecha] = useState('')
  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <div style={{maxWidth:'420px',width:'100%',textAlign:'center'}}>
        <div style={e.stepIndicator}>Iniciación 2 de 6</div>
        <div className="bounceIn" style={{fontSize:'3.5rem',marginBottom:'1rem',filter:'drop-shadow(0 0 20px rgba(139,92,246,0.5))'}}>🌙</div>
        <h2 className="fadeUp" style={e.pregunta}>¿Bajo qué luna llegaste a este mundo, {nombre}?</h2>
        <p className="fadeUp" style={e.descripcion}>La posición de los astros en tu nacimiento es tu mapa del alma. Con ella trazamos tu carta sagrada.</p>
        <input className="fadeUp" style={e.input} type="date" value={fecha} onChange={ev=>setFecha(ev.target.value)}/>
        <button style={{...e.botonDorado,opacity:fecha?1:0.5}} onClick={()=>fecha&&onSiguiente(fecha)}>
          Esta fue mi luna de llegada →
        </button>
      </div>
    </div>
  )
}

function PantallaHora({ nombre, onSiguiente }) {
  const [hora, setHora] = useState(''), [noSabe, setNoSabe] = useState(false)
  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <div style={{maxWidth:'420px',width:'100%',textAlign:'center'}}>
        <div style={e.stepIndicator}>Iniciación 3 de 6</div>
        <div className="bounceIn" style={{fontSize:'3.5rem',marginBottom:'1rem'}}>⏰</div>
        <h2 className="fadeUp" style={e.pregunta}>¿A qué hora cruzaste el umbral?</h2>
        <p className="fadeUp" style={e.descripcion}>La hora exacta revela tu ascendente — la máscara sagrada que usas en este mundo y tu camino de vida.</p>
        {!noSabe&&<input className="fadeUp" style={e.input} type="time" value={hora} onChange={ev=>setHora(ev.target.value)}/>}
        <div style={e.checkboxFila}>
          <input type="checkbox" id="noSabe" checked={noSabe} onChange={ev=>setNoSabe(ev.target.checked)} style={{marginRight:'8px',width:'18px',height:'18px',accentColor:C.gold}}/>
          <label htmlFor="noSabe" style={{color:C.textMid,fontSize:'14px',fontWeight:'500'}}>El misterio de mi hora permanece oculto</label>
        </div>
        <button style={e.botonDorado} onClick={()=>onSiguiente(noSabe?null:hora||null)}>
          {noSabe?'Continuar en el misterio →':'Esta fue mi hora sagrada →'}
        </button>
      </div>
    </div>
  )
}

function PantallaCiudad({ nombre, onSiguiente }) {
  const [ciudad, setCiudad] = useState('')
  return (
    <div style={{minHeight:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <div style={{maxWidth:'420px',width:'100%',textAlign:'center'}}>
        <div style={e.stepIndicator}>Iniciación 4 de 6</div>
        <div className="bounceIn" style={{fontSize:'3.5rem',marginBottom:'1rem'}}>🌍</div>
        <h2 className="fadeUp" style={e.pregunta}>¿En qué tierra sagrada naciste?</h2>
        <p className="fadeUp" style={e.descripcion}>El lugar de tu nacimiento ancla tu carta astral en la geografía energética de la tierra.</p>
        <input className="fadeUp" style={e.input} type="text" placeholder="Ciudad, País..." value={ciudad}
          onChange={ev=>setCiudad(ev.target.value)}
          onKeyDown={ev=>ev.key==='Enter'&&ciudad.trim()&&onSiguiente(ciudad.trim())} autoFocus/>
        <button style={{...e.botonDorado,opacity:ciudad.trim()?1:0.5}} onClick={()=>ciudad.trim()&&onSiguiente(ciudad.trim())}>
          Allí comenzó mi historia →
        </button>
      </div>
    </div>
  )
}

function PantallaCheckIn({ nombre, onSiguiente }) {
  const [emocion, setEmocion] = useState('')
  return (
    <div style={{minHeight:'100vh',background:C.bg,padding:'2rem 1rem'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={e.stepIndicator}>Iniciación 5 de 6</div>
        <h2 className="fadeUp" style={{...e.pregunta,textAlign:'center'}}>¿Cómo habita tu alma hoy, {nombre}?</h2>
        <p className="fadeUp" style={{...e.descripcion,textAlign:'center'}}>No hay respuesta incorrecta. Tu estado emocional guía la sabiduría que recibirás.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.5rem'}}>
          {EMOCIONES.map((em,i)=>(
            <div key={em.id} style={{animation:`fadeUp 0.4s ${i*0.04}s both`}}>
              <EmocionShape emocion={em} seleccionada={emocion} onClick={setEmocion}/>
            </div>
          ))}
        </div>
        <button style={{...e.botonDorado,opacity:emocion?1:0.5}} onClick={()=>emocion&&onSiguiente(emocion)}>
          {emocion?`Hoy mi alma está ${EMOCIONES.find(em=>em.id===emocion)?.label.toLowerCase()} →`:'Elige el estado de tu alma'}
        </button>
      </div>
    </div>
  )
}

function PantallaObjetivo({ nombre, onSiguiente }) {
  const [objetivo, setObjetivo] = useState('')
  const objSel = OBJETIVOS.find(o=>o.id===objetivo)
  return (
    <div style={{minHeight:'100vh',background:C.bg,padding:'2rem 1rem'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={e.stepIndicator}>Iniciación 6 de 6</div>
        <div className="bounceIn" style={{fontSize:'2.5rem',textAlign:'center',marginBottom:'0.5rem'}}>✦</div>
        <h2 className="fadeUp" style={{...e.pregunta,textAlign:'center'}}>¿Cuál es tu llamado sagrado?</h2>
        <p className="fadeUp" style={{...e.descripcion,textAlign:'center'}}>
          Tu intención primaria determina qué piedra aliada el universo te asigna. <strong style={{color:C.gold}}>Tu primera piedra es un regalo.</strong>
        </p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem',marginBottom:'1rem'}}>
          {OBJETIVOS.map((obj,i)=>(
            <div key={obj.id} onClick={()=>setObjetivo(obj.id)}
              style={{animation:`fadeUp 0.4s ${i*0.07}s both`,
                background:objetivo===obj.id?obj.color:'rgba(255,255,255,0.03)',
                border:`1px solid ${objetivo===obj.id?obj.color:C.border}`,
                borderRadius:'16px',padding:'1rem',cursor:'pointer',
                transition:'all 0.3s cubic-bezier(.34,1.56,.64,1)',
                transform:objetivo===obj.id?'scale(1.04)':'scale(1)',
                boxShadow:objetivo===obj.id?`0 8px 24px ${obj.color}44,0 0 40px ${obj.color}22`:'none',
              }}>
              <div style={{fontSize:'1.8rem',marginBottom:'6px'}}>{obj.emoji}</div>
              <div style={{fontSize:'13px',fontWeight:'700',color:objetivo===obj.id?'#fff':C.text}}>{obj.titulo}</div>
              <div style={{fontSize:'11px',color:objetivo===obj.id?'rgba(255,255,255,0.8)':C.textMid,marginTop:'3px'}}>{obj.piedra.nombre}</div>
              <div style={{display:'inline-block',fontSize:'10px',fontWeight:'700',marginTop:'6px',background:objetivo===obj.id?'rgba(255,255,255,0.2)':(obj.libre?C.tealLight:C.goldLight),color:objetivo===obj.id?'#fff':(obj.libre?C.teal:C.gold),padding:'2px 8px',borderRadius:'20px'}}>
                {obj.libre?'✦ Regalo del universo':'✦ Sagrado premium'}
              </div>
            </div>
          ))}
        </div>
        {objSel&&(
          <div className="bounceIn" style={{background:`linear-gradient(135deg, ${objSel.color}33, rgba(255,215,0,0.1))`,border:`1px solid ${objSel.color}66`,borderRadius:'16px',padding:'1.25rem',marginBottom:'1rem',textAlign:'center'}}>
            <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'8px'}}>✦ TU PIEDRA ALIADA ✦</div>
            <div style={{fontSize:'3rem',marginBottom:'6px',filter:`drop-shadow(0 0 15px ${objSel.color}88)`}}>{objSel.piedra.emoji}</div>
            <div style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'6px'}}>{objSel.piedra.nombre}</div>
            <div style={{fontSize:'12px',color:C.textMid,fontStyle:'italic',lineHeight:'1.6',marginBottom:'10px'}}>{objSel.piedra.afirmacion}</div>
            <div style={{background:'rgba(0,0,0,0.3)',borderRadius:'12px',padding:'0.75rem',borderLeft:`3px solid ${objSel.color}`}}>
              <div style={{fontSize:'12px',color:C.textMid,fontStyle:'italic',lineHeight:'1.6'}}>{objSel.piedra.voz}</div>
            </div>
          </div>
        )}
        <button style={{...e.botonDorado,opacity:objetivo?1:0.5}} onClick={()=>objetivo&&onSiguiente(objetivo)}>
          {objetivo?`Acepto el llamado de ${objSel?.piedra.nombre} →`:'Descubre tu piedra aliada'}
        </button>
      </div>
    </div>
  )
}

function PantallaCartaAstral({ perfil, onEntrar }) {
  const { signo, emoji, elemento } = calcularSigno(perfil.fecha)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const arquetipo = getArquetipo(signo, elemento, perfil.objetivo)
  return (
    <div style={{minHeight:'100vh',background:`radial-gradient(ellipse at center, ${objData?.color||C.purple}33 0%, #0D0B1A 70%)`,display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <div style={{maxWidth:'420px',width:'100%',textAlign:'center'}}>
        <div className="bounceIn" style={{fontSize:'4rem',marginBottom:'0.5rem',filter:'drop-shadow(0 0 30px rgba(255,215,0,0.6))'}}>🔮</div>
        <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.2em',marginBottom:'8px'}}>✦ TU ALMA FUE REVELADA ✦</div>
        <h2 className="fadeUp" style={{fontSize:'24px',fontWeight:'800',color:C.text,marginBottom:'4px'}}>Bienvenida, {perfil.nombre}</h2>

        {/* Arquetipo */}
        <div className="fadeUp" style={{background:'rgba(255,215,0,0.08)',border:`1px solid ${C.gold}44`,borderRadius:'14px',padding:'0.85rem',marginBottom:'1rem',display:'inline-block'}}>
          <span style={{fontSize:'1.3rem'}}>{arquetipo.simbolo}</span>
          <span style={{fontSize:'14px',fontWeight:'700',color:C.gold,marginLeft:'8px'}}>{arquetipo.titulo}</span>
        </div>

        <div className="fadeUp" style={{background:'rgba(255,255,255,0.04)',backdropFilter:'blur(10px)',borderRadius:'20px',padding:'1.25rem',marginBottom:'1rem',border:`1px solid ${C.border}`}}>
          <div style={{display:'flex',justifyContent:'space-around',marginBottom:'1rem'}}>
            {[{label:'Signo sagrado',val:`${emoji} ${signo}`},{label:'Elemento',val:elemento},{label:'Tierra natal',val:perfil.ciudad}].map((item,i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontSize:'13px',fontWeight:'700',color:C.text}}>{item.val}</div>
                <div style={{fontSize:'10px',color:C.textSoft,marginTop:'2px',letterSpacing:'0.05em'}}>{item.label}</div>
              </div>
            ))}
          </div>
          {objData&&(
            <div className="bounceIn" style={{background:`linear-gradient(135deg, ${objData.color}22, rgba(255,215,0,0.08))`,borderRadius:'14px',padding:'1rem',textAlign:'center',border:`1px solid ${objData.color}44`}}>
              <div style={{fontSize:'3rem',marginBottom:'6px',filter:`drop-shadow(0 0 20px ${objData.color}88)`}}>{objData.piedra.emoji}</div>
              <div style={{fontSize:'16px',fontWeight:'800',color:C.text}}>{objData.piedra.nombre}</div>
              <div style={{fontSize:'12px',color:C.textMid,marginTop:'6px',fontStyle:'italic',lineHeight:'1.6',padding:'0.5rem',background:'rgba(0,0,0,0.3)',borderRadius:'10px',borderLeft:`3px solid ${objData.color}`}}>
                {objData.piedra.voz}
              </div>
            </div>
          )}
        </div>
        <button className="bounceIn" style={e.botonDorado} onClick={onEntrar}>
          ✨ Entrar a mi templo sagrado
        </button>
      </div>
    </div>
  )
}

// ================================
// MI ALTAR (Home)
// ================================
function PantallaHome({ perfil, xp, setXp }) {
  const { signo, emoji, elemento } = calcularSigno(perfil.fecha)
  const nivel = getNivel(xp)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const transitos = getTransitosDia()
  const numeros = numerossuerte(perfil.fecha, signo)
  const luna = getLunaHoy()
  const arquetipo = getArquetipo(signo, elemento, perfil.objetivo)
  const siguienteNivel = NIVELES[NIVELES.indexOf(nivel)+1]
  const scoreEspiritual = Math.min(Math.round((xp/300)*8+2),10)
  const microTexto = getMicroTexto('apertura', perfil.nombre)

  const favoreceMap = {
    amor:{tema:'❤️ Amor y conexiones sagradas',texto:'Venus abre el portal del corazón hoy. Las conversaciones que inicies desde la autenticidad crearán vínculos que trascienden lo ordinario.'},
    abundancia:{tema:'💰 Flujo de prosperidad',texto:'Mercurio directo desbloquea acuerdos y negociaciones. El universo está alineando recursos para ti — mantén los ojos abiertos a las señales.'},
    bienestar:{tema:'🌿 Vitalidad del templo',texto:'Los tránsitos activan tu fuerza vital. Tu cuerpo es receptivo a cualquier ritual de salud que inicies hoy — el efecto será multiplicado.'},
    paz:{tema:'🧘 Santuario interior',texto:'La energía de hoy favorece la quietud sagrada. Cada momento de silencio que te regales hoy es medicina para el alma.'},
    crecimiento:{tema:'🌱 Expansión del ser',texto:'El día es fértil para aprender y evolucionar. Lo que absorbes hoy se integra en capas más profundas de tu conciencia.'},
    espiritual:{tema:'✨ Portal espiritual',texto:'Tu intuición está en su punto más elevado hoy. Las señales que el universo te envíe son mensajes directos. No los descartes como coincidencias.'},
  }
  const favorece = favoreceMap[perfil.objetivo]||favoreceMap.paz
  const consejos = [
    'Hoy tu energía pide descanso sagrado. Honra esa llamada — la quietud también es poder.',
    'Tu campo energético social está expandido. Cada persona que encuentres hoy es un espejo del universo.',
    'Los planetas piden pausa antes de decidir. La respuesta correcta llegará cuando dejes de buscarla.',
    'La naturaleza te llama. Aunque sea tocar una planta — hay un intercambio energético que necesitas hoy.',
    'Tu tercer ojo está especialmente activo. Confía en los sueños, las imágenes y los impulsos de hoy.',
    'Es tiempo de soltar un ciclo. El universo no puede llenarte si no creas el espacio.',
    'La magia creativa fluye con fuerza extraordinaria hoy. Lo que creates tendrá una vibración especial.',
  ]
  const consejo = consejos[new Date().getDay()%consejos.length]

  return (
    <div style={e.seccion}>
      {/* Micro-texto de bienvenida */}
      <div className="fadeIn" style={{textAlign:'center',fontSize:'12px',color:C.gold,letterSpacing:'0.1em',marginBottom:'1.25rem',fontWeight:'600'}}>
        ✦ {microTexto} ✦
      </div>

      {/* Header con arquetipo */}
      <div className="fadeUp" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.25rem'}}>
        <div>
          <h2 style={{fontSize:'22px',fontWeight:'800',color:C.text,marginBottom:'2px'}}>{perfil.nombre} {objData?.emoji}</h2>
          <p style={{color:C.gold,fontSize:'12px',fontWeight:'600',letterSpacing:'0.05em'}}>{arquetipo.simbolo} {arquetipo.titulo}</p>
          <p style={{color:C.textSoft,fontSize:'11px',marginTop:'2px'}}>{emoji} {signo} · {nivel.emoji} {nivel.nombre}</p>
        </div>
        <div className="pulse" style={{background:`radial-gradient(circle, ${objData?.color||C.purple}44, transparent)`,borderRadius:'50%',width:'52px',height:'52px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',border:`1px solid ${objData?.color||C.purple}55`}}>
          {objData?.piedra.emoji}
        </div>
      </div>

      {/* Vibración del alma (Score) */}
      <GlassCard color={C.gold+'44'} delay={0}>
        <div style={{display:'flex',alignItems:'center',gap:'1.25rem'}}>
          <ScoreCircular valor={scoreEspiritual} max={10} color={C.gold} label="Vibración" size={90}/>
          <div style={{flex:1}}>
            <div style={{fontSize:'13px',fontWeight:'700',color:C.gold,marginBottom:'4px',letterSpacing:'0.05em'}}>VIBRACIÓN DEL ALMA</div>
            <div style={{fontSize:'12px',color:C.textMid,marginBottom:'10px'}}>
              {scoreEspiritual>=8?'✨ Frecuencia altísima — los astros te favorecen':scoreEspiritual>=5?'💫 Energía en ascenso — sigue el camino':'🌱 La semilla está germinando'}
            </div>
            <div style={{fontSize:'11px',color:C.textSoft,marginBottom:'6px'}}>{xp} vibración · {siguienteNivel?`${siguienteNivel.min-xp} para ${siguienteNivel.nombre}`:'✦ Vibración máxima'}</div>
            <BarraProgreso valor={xp-nivel.min} max={(siguienteNivel?.min||nivel.max+1)-nivel.min} color={C.gold} altura={6}/>
          </div>
        </div>
      </GlassCard>

      {/* Stats sagrados */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.6rem',marginBottom:'1rem'}}>
        {[
          {icon:'🔥',val:'1',label:'Días de racha',color:C.rose},
          {icon:'✨',val:String(xp),label:'Vibración',color:C.gold},
          {icon:objData?.piedra.emoji||'💗',val:objData?.piedra.nombre||'Piedra',label:'Tu aliada',color:objData?.color||C.purple},
        ].map((s,i)=>(
          <div key={i} className="fadeUp" style={{animation:`fadeUp 0.4s ${i*0.08+0.2}s both`,background:`${s.color}22`,border:`1px solid ${s.color}44`,borderRadius:'16px',padding:'0.85rem',textAlign:'center'}}>
            <div style={{fontSize:'1.3rem',marginBottom:'2px'}}>{s.icon}</div>
            <div style={{fontSize:i===2?'10px':'18px',fontWeight:'800',color:s.color}}>{s.val}</div>
            <div style={{fontSize:'10px',color:C.textSoft,fontWeight:'600',marginTop:'2px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Voz de la piedra */}
      <GlassCard color={objData?.color+'44'||C.purple+'44'} delay={100} style={{background:`linear-gradient(135deg, ${objData?.color||C.purple}22, rgba(255,215,0,0.05))`,borderLeft:`3px solid ${objData?.color||C.purple}`}}>
        <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
          <div style={{fontSize:'2rem',filter:`drop-shadow(0 0 12px ${objData?.color||C.purple}88)`}}>{objData?.piedra.emoji}</div>
          <div>
            <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>✦ TU {(objData?.piedra.nombre||'PIEDRA').toUpperCase()} TE DICE:</div>
            <p style={{color:C.textMid,fontSize:'13px',fontStyle:'italic',lineHeight:'1.7',fontWeight:'500',margin:0}}>{objData?.piedra.voz}</p>
          </div>
        </div>
      </GlassCard>

      {/* FASE DE LA LUNA */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem',marginTop:'0.5rem'}}>
        <h3 style={{fontSize:'16px',fontWeight:'800',color:C.text}}>🌙 Portal lunar de hoy</h3>
        {luna.porcentaje===100&&<span style={{fontSize:'11px',color:C.gold,fontWeight:'700',animation:'starTwinkle 1s infinite'}}>✦ LUNA LLENA</span>}
      </div>
      <GlassCard color={luna.color+'66'} delay={150} style={{background:`linear-gradient(135deg, rgba(13,7,33,0.95), rgba(29,16,55,0.95))`,border:`1px solid ${luna.color}44`}}>
        <div style={{display:'flex',gap:'1.25rem',alignItems:'center'}}>
          <div style={{textAlign:'center',flexShrink:0}}>
            <div className="moonGlow" style={{fontSize:'4rem',lineHeight:'1',display:'block',marginBottom:'8px'}}>{luna.emoji}</div>
            <div style={{fontSize:'10px',color:luna.color,fontWeight:'700',letterSpacing:'0.05em'}}>{luna.nombre.split(' ').slice(0,-1).join(' ')}</div>
            <div style={{background:'rgba(255,255,255,0.08)',borderRadius:'20px',height:'4px',marginTop:'6px',width:'56px',overflow:'hidden'}}>
              <div style={{width:`${luna.porcentaje}%`,height:'4px',borderRadius:'20px',background:luna.color,boxShadow:`0 0 8px ${luna.color}`}}/>
            </div>
          </div>
          <div style={{flex:1}}>
            <p style={{fontSize:'12px',color:C.textMid,lineHeight:'1.6',marginBottom:'8px',fontWeight:'500'}}>{luna.descripcion}</p>
            <div style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'8px 10px',borderLeft:`2px solid ${luna.color}`}}>
              <div style={{fontSize:'10px',color:luna.color,fontWeight:'700',marginBottom:'3px',letterSpacing:'0.05em'}}>✦ RITUAL LUNAR:</div>
              <div style={{fontSize:'11px',color:C.textMid,fontWeight:'500'}}>{luna.consejo}</div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* CARTA ASTRAL */}
      <h3 style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'0.75rem'}}>🔮 Tu carta sagrada</h3>
      <GlassCard color={C.purple+'66'} delay={200} style={{background:`linear-gradient(135deg, #1A0533, #0D0B1A)`,border:`1px solid ${C.purple}44`}}>
        <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'1rem'}}>
          <div style={{width:'54px',height:'54px',borderRadius:'50%',background:`${C.purple}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',border:`2px solid ${C.purple}55`,boxShadow:`0 0 20px ${C.purple}44`}}>
            {emoji}
          </div>
          <div>
            <div style={{fontSize:'17px',fontWeight:'800',color:C.text}}>{signo}</div>
            <div style={{fontSize:'12px',color:C.purple,fontWeight:'600'}}>{arquetipo.titulo}</div>
            <div style={{fontSize:'11px',color:C.textSoft,marginTop:'2px'}}>{elemento} · {perfil.ciudad}</div>
          </div>
        </div>
        <p style={{fontSize:'12px',color:C.textMid,lineHeight:'1.6',fontStyle:'italic',margin:'0 0 1rem',padding:'0.75rem',background:'rgba(139,92,246,0.1)',borderRadius:'10px',borderLeft:`2px solid ${C.purple}`}}>
          "{arquetipo.desc}"
        </p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
          {[{label:'Llamado sagrado',val:objData?.titulo},{label:'Piedra aliada',val:`${objData?.piedra.emoji} ${objData?.piedra.nombre}`},{label:'Hora natal',val:perfil.hora||'Misterio guardado'},{label:'Ascendente',val:perfil.hora?'Revelado':'Agrega tu hora'}].map((item,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.04)',borderRadius:'10px',padding:'8px 10px'}}>
              <div style={{fontSize:'10px',color:C.textSoft,marginBottom:'2px',fontWeight:'600',letterSpacing:'0.05em'}}>{item.label.toUpperCase()}</div>
              <div style={{fontSize:'12px',fontWeight:'700',color:C.text}}>{item.val}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* NÚMEROS SAGRADOS */}
      <h3 style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'0.75rem'}}>✦ Tus números sagrados de hoy</h3>
      <div style={{display:'flex',gap:'0.75rem',marginBottom:'1.25rem'}}>
        {numeros.map((n,i)=>(
          <div key={i} className="bounceIn" style={{flex:1,background:`linear-gradient(135deg, ${[C.rose,C.purple,C.gold][i]}33, ${[C.rose,C.purple,C.gold][i]}11)`,border:`1px solid ${[C.rose,C.purple,C.gold][i]}66`,borderRadius:'18px',padding:'1.25rem 0.5rem',textAlign:'center',boxShadow:`0 0 20px ${[C.rose,C.purple,C.gold][i]}33`,animation:`bounceIn 0.5s ${i*0.12}s both`}}>
            <div style={{fontSize:'30px',fontWeight:'900',color:[C.rose,C.purple,C.gold][i],textShadow:`0 0 20px ${[C.rose,C.purple,C.gold][i]}88`}}>{n}</div>
            <div style={{fontSize:'10px',color:C.textSoft,fontWeight:'700',marginTop:'3px',letterSpacing:'0.05em'}}>SAGRADO {i+1}</div>
          </div>
        ))}
      </div>

      {/* FAVORECE HOY */}
      <GlassCard color={objData?.color+'44'||C.rose+'44'} delay={250} style={{background:`linear-gradient(135deg, ${objData?.color||C.rose}22, ${C.gold}11)`,border:`1px solid ${objData?.color||C.rose}44`}}>
        <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>✦ EL UNIVERSO HOY TE FAVORECE EN:</div>
        <div style={{fontSize:'15px',fontWeight:'800',color:C.text,marginBottom:'8px'}}>{favorece.tema}</div>
        <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',margin:0,fontWeight:'500'}}>{favorece.texto}</p>
      </GlassCard>

      {/* TRÁNSITOS */}
      <h3 style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'0.75rem'}}>🪐 Mensajes planetarios de hoy</h3>
      {transitos.map((t,i)=>(
        <GlassCard key={i} color={[C.rose,C.purple,C.gold][i]+'44'} delay={i*80} style={{background:`${[C.rose,C.purple,C.gold][i]}11`,border:`1px solid ${[C.rose,C.purple,C.gold][i]}44`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <span style={{fontSize:'14px',fontWeight:'800',color:[C.rose,C.purple,C.gold][i]}}>{t.planeta}</span>
            <span style={{background:`${[C.rose,C.purple,C.gold][i]}22`,color:[C.rose,C.purple,C.gold][i],fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'20px',border:`1px solid ${[C.rose,C.purple,C.gold][i]}44`}}>{t.posicion}</span>
          </div>
          <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',margin:0,fontWeight:'500'}}>{t.explicacion}</p>
        </GlassCard>
      ))}

      {/* CONSEJO */}
      <GlassCard color={C.teal+'44'} delay={350} style={{background:`linear-gradient(135deg, ${C.teal}22, ${C.purple}11)`,border:`1px solid ${C.teal}44`}}>
        <div style={{fontSize:'11px',color:C.teal,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>✦ LOS ASTROS TE SUSURRAN HOY:</div>
        <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',fontStyle:'italic',margin:0,fontWeight:'500'}}>"{consejo}"</p>
      </GlassCard>
    </div>
  )
}

// ================================
// RITUALES (Misiones)
// ================================
function PantallaMisiones({ perfil, xp, setXp }) {
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const nivel = getNivel(xp)
  const [rituales, setRituales] = useState(
    (objData?.piedra.rituales||[]).map(m=>({...m,hecho:false,mostrarMensaje:false}))
  )
  const [confetti, setConfetti] = useState(false)
  const [floatXP, setFloatXP] = useState({visible:false,puntos:0})
  const completadas = rituales.filter(r=>r.hecho).length
  const microTexto = getMicroTexto('ritual_completado', perfil.nombre)

  const activarEnergia = (i) => {
    const nuevos = [...rituales]
    if (!nuevos[i].hecho) {
      nuevos[i].hecho = true
      nuevos[i].mostrarMensaje = true
      setRituales(nuevos)
      setXp(prev=>prev+40)
      setFloatXP({visible:true,puntos:40})
      setTimeout(()=>setFloatXP({visible:false,puntos:0}),1500)
      if (nuevos.every(r=>r.hecho)) {
        setTimeout(()=>{
          setConfetti(true)
          setXp(prev=>prev+100)
          setFloatXP({visible:true,puntos:100})
          setTimeout(()=>{setConfetti(false);setFloatXP({visible:false,puntos:0})},2500)
        },400)
      }
    }
  }

  return (
    <div style={e.seccion}>
      <Confetti active={confetti}/>
      <FloatXP puntos={floatXP.puntos} visible={floatXP.visible}/>

      <h2 className="fadeUp" style={e.tituloPantalla}>✦ Rituales de hoy</h2>

      {/* Progreso */}
      <GlassCard color={C.gold+'44'} delay={0}>
        <div style={{display:'flex',alignItems:'center',gap:'1.25rem'}}>
          <ScoreCircular valor={completadas} max={rituales.length} color={C.gold} label="Rituales" size={85}/>
          <div style={{flex:1}}>
            <div style={{fontSize:'13px',fontWeight:'700',color:C.gold,marginBottom:'4px',letterSpacing:'0.05em'}}>ENERGÍA ACTIVADA</div>
            <div style={{fontSize:'12px',color:C.textMid,marginBottom:'8px'}}>{completadas} de {rituales.length} rituales completados</div>
            <BarraProgreso valor={completadas} max={rituales.length} color={C.gold} altura={8}/>
            {completadas===rituales.length&&<div style={{fontSize:'12px',color:C.gold,marginTop:'6px',fontWeight:'700'}}>✦ +100 vibración extra ganada</div>}
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem',marginBottom:'1rem'}}>
        <div style={{background:`${C.rose}22`,border:`1px solid ${C.rose}44`,borderRadius:'16px',padding:'0.85rem',textAlign:'center'}}>
          <div style={{fontSize:'1.2rem'}}>✨</div>
          <div style={{fontSize:'18px',fontWeight:'800',color:C.rose}}>{xp}</div>
          <div style={{fontSize:'10px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.05em'}}>VIBRACIÓN TOTAL</div>
        </div>
        <div style={{background:`${C.purple}22`,border:`1px solid ${C.purple}44`,borderRadius:'16px',padding:'0.85rem',textAlign:'center'}}>
          <div style={{fontSize:'1.2rem'}}>{nivel.emoji}</div>
          <div style={{fontSize:'13px',fontWeight:'800',color:C.purple}}>{nivel.nombre}</div>
          <div style={{fontSize:'10px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.05em'}}>TU RANGO SAGRADO</div>
        </div>
      </div>

      {/* Voz de la piedra sobre los rituales */}
      <GlassCard color={objData?.color+'44'} delay={80} style={{borderLeft:`3px solid ${objData?.color||C.purple}`}}>
        <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>✦ {(objData?.piedra.nombre||'TU PIEDRA').toUpperCase()} TE GUÍA HOY:</div>
        <p style={{fontSize:'13px',color:C.textMid,fontStyle:'italic',lineHeight:'1.6',margin:0}}>{objData?.piedra.afirmacion}</p>
      </GlassCard>

      {/* Lista de rituales */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
        <h3 style={{fontSize:'15px',fontWeight:'800',color:C.text}}>Rituales de {objData?.titulo}</h3>
        <span style={{background:`${C.gold}22`,color:C.gold,fontSize:'10px',fontWeight:'700',padding:'4px 10px',borderRadius:'20px',border:`1px solid ${C.gold}44`,letterSpacing:'0.05em'}}>+100 si activas todo</span>
      </div>

      {rituales.map((r,i)=>(
        <div key={i} style={{animation:`fadeUp 0.4s ${i*0.08+0.1}s both`}}>
          <div style={{
            background:r.hecho?`${objData?.color||C.purple}33`:'rgba(255,255,255,0.03)',
            border:`1px solid ${r.hecho?(objData?.color||C.purple)+'66':C.border}`,
            borderRadius:'18px',padding:'1rem',marginBottom:'0.4rem',
            display:'flex',alignItems:'center',gap:'12px',
            boxShadow:r.hecho?`0 0 20px ${objData?.color||C.purple}33`:'none',
            transition:'all 0.4s cubic-bezier(.34,1.56,.64,1)',
          }}>
            <div style={{width:'42px',height:'42px',borderRadius:'12px',flexShrink:0,background:r.hecho?`${objData?.color||C.purple}44`:'rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',border:`1px solid ${r.hecho?(objData?.color||C.purple)+'66':'rgba(255,255,255,0.1)'}`,transition:'all 0.3s'}}>
              {r.hecho?'✦':['🌬️','🌿','❤️','🔮'][i%4]}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:r.hecho?objData?.color||C.purple:C.text}}>{r.texto}</div>
              <div style={{fontSize:'11px',color:C.gold,marginTop:'2px',fontWeight:'600'}}>+40 vibración</div>
            </div>
            <button onClick={()=>activarEnergia(i)} style={{padding:'7px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',cursor:r.hecho?'default':'pointer',background:r.hecho?`${objData?.color||C.purple}33`:'transparent',color:r.hecho?objData?.color||C.purple:C.gold,border:`1px solid ${r.hecho?(objData?.color||C.purple)+'66':C.gold+'66'}`,transition:'all 0.2s',letterSpacing:'0.05em'}}>
              {r.hecho?'✦ Activado':'Invocar'}
            </button>
          </div>
          {r.mostrarMensaje&&(
            <div className="slideLeft" style={{background:`${C.teal}22`,border:`1px solid ${C.teal}44`,borderRadius:'14px',padding:'0.85rem 1rem',marginTop:'-0.3rem',marginBottom:'0.6rem',borderTopLeftRadius:'4px',borderTopRightRadius:'4px'}}>
              <p style={{fontSize:'13px',color:C.teal,lineHeight:'1.6',margin:0,fontStyle:'italic',fontWeight:'500'}}>{r.mensaje}</p>
            </div>
          )}
        </div>
      ))}

      {completadas===rituales.length&&(
        <div className="bounceIn" style={{background:`linear-gradient(135deg, ${C.gold}22, ${C.purple}22)`,border:`1px solid ${C.gold}44`,borderRadius:'20px',padding:'1.5rem',textAlign:'center',marginTop:'0.5rem',boxShadow:`0 0 40px ${C.gold}22`}}>
          <div style={{fontSize:'2.5rem',marginBottom:'8px'}}>🔮</div>
          <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'8px'}}>✦ CICLO SAGRADO COMPLETO ✦</div>
          <div style={{fontSize:'15px',fontWeight:'800',color:C.text,marginBottom:'4px'}}>Todos tus rituales fueron activados</div>
          <div style={{fontSize:'13px',color:C.textMid}}>La energía que invocaste hoy está en movimiento en el universo</div>
        </div>
      )}

      {/* Tránsito relacionado */}
      <div style={{marginTop:'1.5rem'}}>
        <h3 style={{fontSize:'14px',fontWeight:'800',color:C.text,marginBottom:'0.75rem',letterSpacing:'0.05em'}}>🪐 ENERGÍA ASTRAL PARA TUS RITUALES</h3>
        <GlassCard color={C.amber+'44'} delay={0} style={{background:`${C.amber}11`,border:`1px solid ${C.amber}44`}}>
          <div style={{fontSize:'12px',fontWeight:'700',color:C.amber,marginBottom:'6px'}}>{getTransitosDia()[0].planeta} · {getTransitosDia()[0].posicion}</div>
          <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',margin:0,fontWeight:'500'}}>{getTransitosDia()[0].explicacion}</p>
        </GlassCard>
      </div>
    </div>
  )
}

// ================================
// GRIMORIO (Journal)
// ================================
function PantallaJournal({ perfil, xp, setXp }) {
  const [entradas, setEntradas] = useState([])
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('general')
  const [confetti, setConfetti] = useState(false)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const { signo, elemento } = calcularSigno(perfil.fecha)
  const transitos = getTransitosDia()

  const categorias = [
    {id:'general',emoji:'📖',label:'Reflexión',color:C.purple},
    {id:'trabajo',emoji:'⚗️',label:'Alquimia',color:C.blue},
    {id:'relaciones',emoji:'🌹',label:'Vínculos',color:C.rose},
    {id:'suenos',emoji:'🌙',label:'Sueños',color:'#7B1FA2'},
    {id:'miedo',emoji:'🦋',label:'Sombras',color:C.amber},
    {id:'logro',emoji:'✦',label:'Victorias',color:C.teal},
  ]

  const generarGuia = (texto) => {
    const lower = texto.toLowerCase()
    const t = transitos[0]
    const ctx = `Con ${t.planeta} ${t.posicion} hoy`
    const esTrabajo = lower.includes('trabajo')||lower.includes('entrevista')||lower.includes('jefe')||lower.includes('proyecto')
    const esAmor = lower.includes('amor')||lower.includes('pareja')||lower.includes('relación')||lower.includes('senti')
    const esMiedo = lower.includes('miedo')||lower.includes('ansiedad')||lower.includes('nervios')||lower.includes('preocup')
    const esLogro = lower.includes('logré')||lower.includes('conseguí')||lower.includes('pude')||lower.includes('terminé')
    const p=objData?.piedra.emoji||'💗', pn=objData?.piedra.nombre||'tu piedra aliada', af=objData?.piedra.afirmacion||''

    if(esTrabajo&&esMiedo) return `${ctx}, los planetas favorecen la autenticidad sobre la perfección.\n\nTu ${pn} ${p} te recuerda: ya llegaste hasta aquí por algo que el universo vio en ti mucho antes de que tú lo creyeras. No necesitas ser perfecta — necesitas ser real.\n\nLos astros de hoy sugieren confiar en tu primera respuesta intuitiva. Es la voz del alma, no del miedo.`
    if(esTrabajo) return `${ctx}, el universo está moviendo piezas invisibles a tu favor.\n\nAntes de ese momento sagrado, sostén tu ${pn} ${p}, respira 3 veces y repite tu afirmación: ${af}\n\nLo que percibes como preparación es en realidad una ceremonia de activación.`
    if(esAmor&&esMiedo) return `${ctx}, Venus abre un portal de comunicación auténtica.\n\nTu ${pn} ${p} te dice: el amor que temes perder por ser honesta no era real. El amor verdadero crece con la verdad.\n\nEl universo te protege. Di lo que tu corazón necesita decir.`
    if(esAmor) return `${ctx}, el campo del amor está amplificado.\n\nTu corazón sabe lo que necesita. Tu ${pn} ${p} está amplificando esa frecuencia ahora mismo.\n\nConfía en lo que sientes — los astros respaldan las decisiones que vienen del amor verdadero.`
    if(esMiedo) return `${ctx}, la energía cósmica es perfecta para transmutar el miedo en claridad.\n\nEl miedo que describes no es debilidad — es energía de transformación buscando su dirección. Tu ${pn} ${p} lo absorbe y lo convierte.\n\nInhala 4 tiempos, retén 4, exhala 4. Repite: ${af}`
    if(esLogro) return `${ctx}, los astros celebran junto a ti.\n\nCada logro que alcanzas es evidencia de que el universo conspiró a tu favor. Tu ${pn} ${p} amplificó esa energía de victoria.\n\nCelebra hoy con la misma intensidad con la que trabajaste. La celebración es parte del ritual.`
    return `${ctx}, hay una resonancia especial entre los planetas y lo que describes.\n\nTu ${pn} ${p} ha registrado estas palabras en el campo energético. Lo que escribes en tu Grimorio tiene el poder de un conjuro.\n\nRecuerda tu afirmación sagrada: ${af}`
  }

  const guardar = () => {
    if(!texto.trim()) return
    const catData = categorias.find(c=>c.id===categoria)
    setEntradas(prev=>[{id:Date.now(),texto:texto.trim(),categoria,catData,fecha:new Date().toLocaleDateString('es-ES'),hora:new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}),guia:generarGuia(texto),transito:transitos[0]},...prev])
    setTexto('')
    setXp(prev=>prev+25)
    setConfetti(true)
    setTimeout(()=>setConfetti(false),2500)
  }

  return (
    <div style={e.seccion}>
      <Confetti active={confetti}/>
      <div style={{textAlign:'center',marginBottom:'1.25rem'}}>
        <h2 className="fadeUp" style={{...e.tituloPantalla,marginBottom:'4px'}}>📖 Grimorio del Alma</h2>
        <p style={{fontSize:'11px',color:C.gold,letterSpacing:'0.1em',fontWeight:'600'}}>✦ LAS PALABRAS QUE ESCRIBES AQUÍ SON CONJUROS ✦</p>
      </div>

      <GlassCard color={C.amber+'44'} delay={0} style={{background:`${C.amber}11`,border:`1px solid ${C.amber}44`}}>
        <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'8px'}}>🪐 ENERGÍA ASTRAL EN ESTE MOMENTO:</div>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
          {transitos.map((t,i)=>(
            <span key={i} style={{background:`${[C.rose,C.purple,C.amber][i]}22`,color:[C.rose,C.purple,C.amber][i],fontSize:'11px',fontWeight:'600',padding:'4px 10px',borderRadius:'20px',border:`1px solid ${[C.rose,C.purple,C.amber][i]}44`}}>{t.planeta} {t.posicion}</span>
          ))}
        </div>
        <div style={{fontSize:'11px',color:C.textSoft,marginTop:'6px',fontStyle:'italic'}}>La guía que recibirás incorporará esta energía cósmica</div>
      </GlassCard>

      <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap',marginBottom:'0.75rem'}}>
        {categorias.map(c=>(
          <button key={c.id} onClick={()=>setCategoria(c.id)} style={{padding:'6px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',cursor:'pointer',background:categoria===c.id?`${c.color}33`:'rgba(255,255,255,0.03)',color:categoria===c.id?c.color:C.textSoft,border:`1px solid ${categoria===c.id?c.color+'66':C.border}`,transition:'all 0.2s',letterSpacing:'0.05em'}}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <textarea style={{...e.input,minHeight:'130px',resize:'vertical',fontFamily:'Montserrat, sans-serif',lineHeight:'1.7'}}
        placeholder={`Inscribe aquí tu conjuro, ${perfil.nombre}... Lo que describes, lo que sientes, lo que viene. Las estrellas escuchan. (+25 vibración)`}
        value={texto} onChange={ev=>setTexto(ev.target.value)}/>
      <button style={e.botonDorado} onClick={guardar}>
        Invocar la guía de {objData?.piedra.nombre} {objData?.piedra.emoji}
      </button>

      {entradas.length===0&&(
        <div style={{textAlign:'center',padding:'2.5rem',color:C.textSoft}}>
          <div style={{fontSize:'3rem',marginBottom:'8px',opacity:0.5}}>📖</div>
          <p style={{fontSize:'13px',fontWeight:'500',color:C.textSoft}}>Tu Grimorio aguarda la primera inscripción</p>
          <p style={{fontSize:'11px',color:C.textSoft,marginTop:'4px',letterSpacing:'0.05em'}}>✦ Las páginas en blanco son portales ✦</p>
        </div>
      )}

      {entradas.map((entrada,idx)=>(
        <GlassCard key={entrada.id} color={entrada.catData?.color+'44'} delay={idx*60}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'28px',height:'28px',borderRadius:'8px',background:`${entrada.catData?.color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',border:`1px solid ${entrada.catData?.color}44`}}>{entrada.catData?.emoji}</div>
              <span style={{fontSize:'11px',color:C.textSoft,fontWeight:'500'}}>{entrada.fecha} · {entrada.hora}</span>
            </div>
            <span style={{background:`${entrada.catData?.color}22`,color:entrada.catData?.color,fontSize:'10px',fontWeight:'700',padding:'3px 8px',borderRadius:'20px',border:`1px solid ${entrada.catData?.color}44`,letterSpacing:'0.05em'}}>{entrada.catData?.label.toUpperCase()}</span>
          </div>
          <span style={{background:`${C.amber}22`,color:C.amber,fontSize:'11px',fontWeight:'600',padding:'3px 10px',borderRadius:'20px',display:'inline-block',marginBottom:'10px',border:`1px solid ${C.amber}44`}}>
            🪐 {entrada.transito?.planeta} {entrada.transito?.posicion}
          </span>
          <p style={{fontSize:'14px',color:C.text,lineHeight:'1.7',marginBottom:'12px',fontStyle:'italic',fontWeight:'500',padding:'0.75rem',background:'rgba(255,255,255,0.03)',borderRadius:'10px',borderLeft:`2px solid ${entrada.catData?.color||C.purple}`}}>
            "{entrada.texto}"
          </p>
          <div style={{background:`linear-gradient(135deg, ${objData?.color||C.purple}22, ${C.gold}11)`,border:`1px solid ${objData?.color||C.purple}44`,borderRadius:'14px',padding:'1rem'}}>
            <div style={{fontSize:'11px',fontWeight:'700',color:C.gold,marginBottom:'8px',letterSpacing:'0.1em'}}>✦ {(objData?.piedra.nombre||'TU PIEDRA').toUpperCase()} TE RESPONDE:</div>
            <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.7',fontStyle:'italic',whiteSpace:'pre-line',margin:0,fontWeight:'500'}}>{entrada.guia}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

// ================================
// GABINETE DE CRISTALES (Piedras)
// ================================
function PantallaPiedras({ perfil }) {
  const [seleccionada, setSeleccionada] = useState(null)
  const objActual = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  return (
    <div style={e.seccion}>
      <div style={{textAlign:'center',marginBottom:'1.25rem'}}>
        <h2 className="fadeUp" style={{...e.tituloPantalla,marginBottom:'4px'}}>💎 Gabinete de Cristales</h2>
        <p style={{fontSize:'11px',color:C.gold,letterSpacing:'0.1em',fontWeight:'600'}}>✦ CADA PIEDRA ES UN PORTAL DE ENERGÍA ✦</p>
      </div>
      <p className="fadeUp" style={{fontSize:'13px',color:C.textMid,marginBottom:'1.25rem',fontWeight:'500',textAlign:'center'}}>
        Tu primera piedra aliada es un regalo sagrado del universo. Las demás esperan ser invocadas.
      </p>

      {objActual&&(
        <GlassCard color={C.gold+'66'} delay={0} style={{background:`linear-gradient(135deg, ${objActual.color}33, ${C.gold}11)`,border:`1px solid ${C.gold}44`}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <div style={{fontSize:'3.5rem',filter:`drop-shadow(0 0 20px ${objActual.color}88)`}}>{objActual.piedra.emoji}</div>
            <div style={{flex:1}}>
              <span style={{background:`${C.gold}22`,color:C.gold,fontSize:'10px',fontWeight:'700',padding:'3px 10px',borderRadius:'20px',border:`1px solid ${C.gold}44`,letterSpacing:'0.1em'}}>✦ PIEDRA ALIADA ACTIVA</span>
              <div style={{fontSize:'17px',fontWeight:'800',color:C.text,marginTop:'6px'}}>{objActual.piedra.nombre}</div>
              <div style={{fontSize:'12px',color:objActual.color,fontWeight:'600',marginTop:'2px'}}>{objActual.titulo}</div>
            </div>
          </div>
          <div style={{background:'rgba(0,0,0,0.3)',borderRadius:'12px',padding:'0.75rem',marginTop:'1rem',borderLeft:`3px solid ${objActual.color}`}}>
            <div style={{fontSize:'12px',color:C.textMid,fontStyle:'italic',lineHeight:'1.6'}}>{objActual.piedra.voz}</div>
          </div>
        </GlassCard>
      )}

      {OBJETIVOS.map((obj,i)=>{
        const esActiva = obj.id===perfil.objetivo
        const abierta = seleccionada?.id===obj.id
        return (
          <div key={obj.id} className="fadeUp" style={{animation:`fadeUp 0.4s ${i*0.06}s both`}}>
            <div onClick={()=>setSeleccionada(abierta?null:obj)} style={{
              background:abierta||esActiva?`${obj.color}22`:'rgba(255,255,255,0.02)',
              border:`1px solid ${esActiva?C.gold+'66':abierta?obj.color+'66':C.border}`,
              borderRadius:'18px',padding:'1rem 1.25rem',marginBottom:'0.75rem',cursor:'pointer',
              transition:'all 0.3s cubic-bezier(.22,1,.36,1)',
              boxShadow:abierta||esActiva?`0 0 30px ${obj.color}22`:'none',
            }}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'52px',height:'52px',borderRadius:'14px',background:`${obj.color}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',flexShrink:0,border:`1px solid ${obj.color}44`,filter:`drop-shadow(0 0 8px ${obj.color}44)`}}>{obj.piedra.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:'6px',flexWrap:'wrap',marginBottom:'3px'}}>
                    <span style={{fontSize:'14px',fontWeight:'800',color:C.text}}>{obj.piedra.nombre}</span>
                    {esActiva&&<span style={{background:`${C.gold}22`,color:C.gold,fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',border:`1px solid ${C.gold}44`}}>✦ Aliada</span>}
                    {!esActiva&&obj.libre&&<span style={{background:`${C.teal}22`,color:C.teal,fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',border:`1px solid ${C.teal}44`}}>Regalo</span>}
                    {!obj.libre&&!esActiva&&<span style={{background:`${C.gold}11`,color:C.gold,fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',border:`1px solid ${C.gold}33`}}>✦ Sagrado</span>}
                  </div>
                  <div style={{fontSize:'12px',color:C.textSoft,fontWeight:'500'}}>{obj.titulo}</div>
                </div>
                <div style={{fontSize:'16px',color:C.textSoft}}>{abierta?'∧':'∨'}</div>
              </div>

              {abierta&&(
                <div className="fadeIn" style={{marginTop:'1rem',paddingTop:'1rem',borderTop:`1px solid ${C.border}`}}>
                  {/* Voz de la piedra */}
                  <div style={{background:`${obj.color}11`,borderRadius:'12px',padding:'0.85rem',marginBottom:'12px',borderLeft:`3px solid ${obj.color}`}}>
                    <div style={{fontSize:'10px',color:obj.color,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>✦ {obj.piedra.nombre.toUpperCase()} TE DICE:</div>
                    <p style={{fontSize:'13px',color:C.textMid,fontStyle:'italic',lineHeight:'1.6',margin:0}}>{obj.piedra.voz}</p>
                  </div>
                  <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.7',marginBottom:'12px',fontWeight:'500'}}>{obj.piedra.marketing}</p>
                  <div style={{background:'rgba(255,255,255,0.03)',borderRadius:'12px',padding:'0.85rem',marginBottom:'12px',border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:'10px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'4px'}}>✦ AFIRMACIÓN SAGRADA:</div>
                    <div style={{fontSize:'13px',color:C.text,fontStyle:'italic',fontWeight:'600'}}>{obj.piedra.afirmacion}</div>
                  </div>
                  <div style={{fontSize:'11px',fontWeight:'700',color:C.textSoft,marginBottom:'8px',letterSpacing:'0.1em'}}>✦ RITUALES QUE DESBLOQUEA:</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginBottom:'14px'}}>
                    {obj.piedra.rituales.map((r,i)=>(
                      <div key={i} style={{background:`${obj.color}11`,borderRadius:'10px',padding:'8px 10px',fontSize:'11px',color:C.textMid,fontWeight:'500',border:`1px solid ${obj.color}22`}}>✦ {r.texto}</div>
                    ))}
                  </div>
                  {!esActiva&&<button style={{...e.botonDorado,background:obj.libre?`linear-gradient(135deg, ${obj.color}, ${obj.colorDark})`:`linear-gradient(135deg, ${C.gold}AA, ${C.amber})`}}>
                    {obj.libre?`Invocar ${obj.piedra.nombre}`:`Despertar ${obj.piedra.nombre} · $2.99 🔮`}
                  </button>}
                </div>
              )}
            </div>
          </div>
        )
      })}

      <GlassCard color={C.gold+'44'} delay={400} style={{background:`linear-gradient(135deg, ${C.gold}11, ${C.purple}11)`,border:`1px solid ${C.gold}44`}}>
        <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
          <div style={{fontSize:'2.5rem',filter:'drop-shadow(0 0 15px rgba(255,215,0,0.5))'}}>✨</div>
          <div style={{flex:1}}>
            <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'4px'}}>✦ CAMINO DEL ALMA COMPLETO</div>
            <div style={{fontSize:'15px',fontWeight:'800',color:C.text,marginBottom:'4px'}}>Plan Alma Sagrada — $9.99/mes</div>
            <div style={{fontSize:'12px',color:C.textMid,lineHeight:'1.6',marginBottom:'12px'}}>Todos los cristales + carta astral completa + Grimorio ilimitado + Aquelarre premium</div>
            <button style={e.botonDorado}>Despertar mi Alma completa →</button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

// ================================
// AQUELARRE (Círculos)
// ================================
function PantallaCirculos({ perfil, xp, setXp }) {
  const [vista, setVista] = useState('lobby')
  const [tabCirculo, setTabCirculo] = useState('energia')
  const [toast, setToast] = useState('')
  const [juegoActivo, setJuegoActivo] = useState(null)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const { signo } = calcularSigno(perfil.fecha)
  const transitos = getTransitosDia()
  const mostrarToast = (msg) => {setToast(msg);setTimeout(()=>setToast(''),2800)}
  const ganarXP = (puntos,msg) => {setXp(prev=>prev+puntos);mostrarToast(msg||`+${puntos} vibración ✨`)}
  const miembros = [
    {iniciales:(perfil.nombre||'TU').substring(0,2).toUpperCase(),nombre:perfil.nombre+' (tú)',piedra:objData?.piedra.emoji+' '+objData?.piedra.nombre,signo,color:C.rose},
    {iniciales:'VM',nombre:'Valeria M.',piedra:'💗 Cuarzo Rosa',signo:'Libra',color:C.purple},
    {iniciales:'MS',nombre:'Marco S.',piedra:'💜 Amatista',signo:'Piscis',color:C.teal},
  ]

  if(juegoActivo) return <SimulacionJuego juego={juegoActivo} perfil={perfil} miembros={miembros} transitos={transitos} onSalir={(xpG)=>{setJuegoActivo(null);if(xpG)ganarXP(xpG,`¡Rito completado! +${xpG} vibración`)}}/>

  if(vista==='lobby') return (
    <div style={e.seccion}>
      {toast&&<div style={e.toast}>{toast}</div>}
      <div style={{textAlign:'center',marginBottom:'1.25rem'}}>
        <h2 className="fadeUp" style={{...e.tituloPantalla,marginBottom:'4px'}}>🔮 El Aquelarre</h2>
        <p style={{fontSize:'11px',color:C.gold,letterSpacing:'0.1em',fontWeight:'600'}}>✦ JUNTAS SOMOS MÁS PODEROSAS ✦</p>
      </div>
      <p className="fadeUp" style={{fontSize:'13px',color:C.textMid,marginBottom:'1.25rem',fontWeight:'500',textAlign:'center'}}>
        {getMicroTexto('entrar_aquelarre', perfil.nombre)}
      </p>
      <GlassCard color={C.teal+'66'} delay={0} style={{background:`linear-gradient(135deg, ${C.teal}22, ${C.purple}11)`,border:`1px solid ${C.teal}44`,cursor:'pointer'}} onClick={()=>setVista('sala')}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:'15px',fontWeight:'800',color:C.text,marginBottom:'3px'}}>🌿 Círculo del Valle Sagrado</div>
            <div style={{fontSize:'12px',color:C.textSoft,fontWeight:'500'}}>3 almas · Resonancia 87%</div>
          </div>
          <span style={{background:`${C.teal}22`,color:C.teal,fontSize:'11px',fontWeight:'700',padding:'5px 12px',borderRadius:'20px',border:`1px solid ${C.teal}44`,letterSpacing:'0.05em'}}>● ACTIVO</span>
        </div>
      </GlassCard>
      <button style={e.botonDorado} onClick={()=>setVista('sala')}>✦ Convocar nuevo círculo</button>
      <button style={{...e.botonDorado,background:'transparent',color:C.gold,border:`1px solid ${C.gold}44`,marginTop:'0.5rem',boxShadow:'none'}} onClick={()=>mostrarToast('Ingresa el código sagrado del círculo')}>
        Unirme con código sagrado
      </button>
      <GlassCard color={C.border} delay={200} style={{marginTop:'0.25rem'}}>
        <div style={{fontSize:'12px',color:C.textMid,lineHeight:'2',fontWeight:'500'}}>
          <div>✦ <span style={{fontWeight:'700',color:C.text}}>Camino libre:</span> Círculos de 3 almas, 2 ritos, chat sagrado</div>
          <div>🔮 <span style={{fontWeight:'700',color:C.gold}}>Alma sagrada:</span> 20 almas, todos los ritos, rituales, viaje</div>
        </div>
      </GlassCard>
    </div>
  )

  return (
    <div style={e.seccion}>
      {toast&&<div style={e.toast}>{toast}</div>}
      <button onClick={()=>setVista('lobby')} style={{background:'none',border:'none',color:C.gold,fontSize:'13px',cursor:'pointer',marginBottom:'1rem',padding:0,fontWeight:'700',letterSpacing:'0.05em'}}>
        ← Mi aquelarre
      </button>
      <GlassCard color={C.teal+'44'} delay={0}>
        <div style={{fontSize:'15px',fontWeight:'800',color:C.text,marginBottom:'4px'}}>🌿 Círculo del Valle Sagrado</div>
        <div style={{fontSize:'12px',color:C.textSoft,marginBottom:'0.75rem',fontWeight:'500'}}>
          Código: <strong style={{color:C.gold,letterSpacing:'0.12em'}}>LUNA42</strong>
        </div>
        {miembros.map((m,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0',borderBottom:i<miembros.length-1?`1px solid ${C.border}`:'none'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:C.success,flexShrink:0,boxShadow:`0 0 6px ${C.success}`}}/>
            <div style={{width:'38px',height:'38px',borderRadius:'50%',background:`${m.color}33`,color:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'800',flexShrink:0,border:`1px solid ${m.color}55`}}>{m.iniciales}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:'13px',fontWeight:'700',color:C.text}}>{m.nombre}</div>
              <div style={{fontSize:'11px',color:C.textSoft,fontWeight:'500'}}>{m.signo} · {m.piedra}</div>
            </div>
          </div>
        ))}
      </GlassCard>

      <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap',marginBottom:'1rem'}}>
        {[{id:'energia',label:'⚡ Energía'},{id:'juegos',label:'🎲 Ritos'},{id:'ritual',label:'🕯️ Ritual'},{id:'chat',label:'💬 Voces'}].map(t=>(
          <button key={t.id} onClick={()=>setTabCirculo(t.id)} style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',cursor:'pointer',background:tabCirculo===t.id?`${C.gold}22`:'rgba(255,255,255,0.03)',color:tabCirculo===t.id?C.gold:C.textSoft,border:`1px solid ${tabCirculo===t.id?C.gold+'66':C.border}`,transition:'all 0.25s',letterSpacing:'0.05em'}}>{t.label}</button>
        ))}
      </div>

      {tabCirculo==='energia'&&(
        <div>
          <GlassCard color={C.purple+'44'} delay={0} style={{background:`linear-gradient(135deg, #1A0533, #0D0B1A)`,border:`1px solid ${C.purple}44`}}>
            <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>🔮 EL ORÁCULO DEL CÍRCULO REVELA:</div>
            <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',fontStyle:'italic',margin:0,fontWeight:'500'}}>"Con {transitos[0].planeta} {transitos[0].posicion} hoy, este círculo despierta una energía colectiva poco común. La suma de sus piedras sagradas crea un campo de protección que el universo reconoce."</p>
          </GlassCard>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
            {[{icon:'⚡',val:'87%',label:'Resonancia total',color:C.rose},{icon:'🌊',val:'92%',label:'Afinidad elemental',color:C.teal},{icon:'🌙',val:'79%',label:'Armonía lunar',color:C.purple},{icon:'💎',val:'94%',label:'Vibración de piedras',color:C.gold}].map((c,i)=>(
              <div key={i} className="bounceIn" style={{background:`${c.color}22`,border:`1px solid ${c.color}44`,borderRadius:'16px',padding:'1rem',textAlign:'center',boxShadow:`0 0 20px ${c.color}22`,animation:`bounceIn 0.5s ${i*0.1}s both`}}>
                <div style={{fontSize:'1.4rem',marginBottom:'4px'}}>{c.icon}</div>
                <div style={{fontSize:'22px',fontWeight:'900',color:c.color,textShadow:`0 0 15px ${c.color}66`}}>{c.val}</div>
                <div style={{fontSize:'10px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.05em'}}>{c.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tabCirculo==='juegos'&&<JuegosCirculo miembros={miembros} perfil={perfil} transitos={transitos} onIniciar={setJuegoActivo} mostrarToast={mostrarToast}/>}
      {tabCirculo==='ritual'&&<RitualGrupal miembros={miembros} ganarXP={ganarXP}/>}
      {tabCirculo==='chat'&&<ChatGrupal perfil={perfil} objData={objData} ganarXP={ganarXP}/>}
    </div>
  )
}

function JuegosCirculo({ miembros, perfil, transitos, onIniciar, mostrarToast }) {
  const juegos = [
    {id:'verdad',emoji:'💜',nombre:'Verdad Sagrada',propósito:'Crear confianza profunda entre almas. Cada verdad compartida fortalece el vínculo energético del círculo.',desc:'La piedra elige el alma que responde. Preguntas que van al corazón.',instrucciones:'La app selecciona un miembro y le hace una pregunta sagrada. 60 segundos para responder desde el alma.',libre:true,xp:60,color:C.purple},
    {id:'sincro',emoji:'🌀',nombre:'Sincronía de Almas',propósito:'Medir y elevar la coherencia energética del círculo. El campo colectivo se expande con cada coincidencia.',desc:'¿Cuántas almas piensan lo mismo en el silencio sagrado?',instrucciones:'Todas cierran los ojos 30 segundos. Piensan en una palabra, color y número. Al abrir, revelan juntas.',libre:true,xp:50,color:C.teal},
    {id:'oraculo',emoji:'🃏',nombre:'Oráculo de las Cartas',propósito:'Activar la sabiduría colectiva usando la carta astral de cada alma como espejo sagrado.',desc:'Cada alma recibe una carta astral. El círculo interpreta el mensaje colectivo.',instrucciones:'La app asigna una carta según tu signo. Cada una lee en voz alta y el círculo interpreta.',libre:false,xp:80,color:C.rose},
    {id:'mantra',emoji:'🎵',nombre:'Mantra Colectivo',propósito:'Unificar todas las almas en una sola vibración. El sonido compartido eleva la frecuencia del círculo.',desc:'Mantra sagrado generado para este círculo específico.',instrucciones:'El mantra se recita 3 veces: en susurro, en voz normal, en voz plena. Luego 30 segundos de silencio sagrado.',libre:false,xp:70,color:C.amber},
  ]
  return (
    <div>
      <p style={{fontSize:'12px',color:C.textSoft,marginBottom:'1rem',lineHeight:'1.6',fontWeight:'500',textAlign:'center',letterSpacing:'0.05em'}}>✦ CADA RITO TIENE UN PROPÓSITO ENERGÉTICO SAGRADO ✦</p>
      {juegos.map((j,i)=>(
        <GlassCard key={j.id} color={j.color+'44'} delay={i*70} style={{background:`${j.color}${j.libre?'22':'11'}`,border:`1px solid ${j.color}${j.libre?'66':'33'}`}}>
          <div style={{display:'flex',gap:'12px'}}>
            <div style={{width:'50px',height:'50px',borderRadius:'14px',background:`${j.color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0,border:`1px solid ${j.color}44`}}>{j.emoji}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'4px',flexWrap:'wrap'}}>
                <span style={{fontSize:'14px',fontWeight:'800',color:C.text}}>{j.nombre}</span>
                {j.libre?<span style={{background:`${C.teal}22`,color:C.teal,fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',border:`1px solid ${C.teal}44`,letterSpacing:'0.05em'}}>LIBRE</span>:<span style={{background:`${C.gold}11`,color:C.gold,fontSize:'10px',fontWeight:'700',padding:'2px 8px',borderRadius:'20px',border:`1px solid ${C.gold}33`,letterSpacing:'0.05em'}}>SAGRADO</span>}
              </div>
              <div style={{fontSize:'12px',color:C.textSoft,marginBottom:'8px',fontWeight:'500'}}>{j.desc}</div>
              <div style={{background:`${j.color}11`,borderRadius:'10px',padding:'7px 10px',marginBottom:'8px',border:`1px solid ${j.color}22`}}>
                <div style={{fontSize:'10px',fontWeight:'700',color:j.color,marginBottom:'2px',letterSpacing:'0.08em'}}>✦ PROPÓSITO SAGRADO:</div>
                <div style={{fontSize:'12px',color:C.textMid,lineHeight:'1.4',fontWeight:'500'}}>{j.propósito}</div>
              </div>
              <div style={{fontSize:'11px',color:C.textSoft,fontStyle:'italic',marginBottom:'10px'}}>📋 {j.instrucciones}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:'11px',fontWeight:'700',color:j.color,letterSpacing:'0.05em'}}>+{j.xp} vibración grupal</span>
                <button style={{padding:'7px 16px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',cursor:'pointer',background:`${j.libre?j.color:C.gold}22`,color:j.libre?j.color:C.gold,border:`1px solid ${j.libre?j.color:C.gold}66`,transition:'all 0.2s',letterSpacing:'0.05em'}}
                  onClick={()=>j.libre?onIniciar(j):mostrarToast('🔮 Camino del Alma — $9.99/mes')}>
                  {j.libre?'✦ Iniciar rito':'🔮 Sagrado'}
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

function SimulacionJuego({ juego, perfil, miembros, transitos, onSalir }) {
  const [fase, setFase] = useState('intro')
  const [turno, setTurno] = useState(0)
  const [respuesta, setRespuesta] = useState('')
  const [respuestas, setRespuestas] = useState([])
  const [sincroRevelado, setSincroRevelado] = useState(false)
  const preguntas = [`Con ${transitos[0].planeta} ${transitos[0].posicion} hoy: ¿Qué es lo que más te cuesta soltar en este momento de tu camino?`,'¿Cuándo fue la última vez que fuiste completamente honesta contigo misma sobre algo que importaba?','¿Qué versión de ti misma estás ocultando del mundo por miedo al rechazo?','¿Qué necesitas perdonarte para que tu alma pueda seguir avanzando?','¿Qué luz ves en las almas de este círculo que ellas mismas no ven?']
  const retroBots = ['Lo que acabas de nombrar ya está siendo transformado por el universo. Gracias por tu valentía sagrada.','Tu verdad resuena en todas las almas de este círculo. La vulnerabilidad es el portal a la conexión real.','Eso requiere un coraje que no todos tienen. Los astros de hoy respaldan exactamente esta honestidad.']
  const sincroData = {palabras:['Luz','Agua','Silencio'],colores:['Azul','Verde','Dorado'],numeros:[7,3,11]}

  if(fase==='intro') return (
    <div style={e.seccion}>
      <button onClick={()=>onSalir(null)} style={{background:'none',border:'none',color:C.gold,fontSize:'13px',cursor:'pointer',marginBottom:'1rem',padding:0,fontWeight:'700',letterSpacing:'0.05em'}}>← Volver a los ritos</button>
      <GlassCard color={juego.color+'44'} delay={0} style={{background:`linear-gradient(135deg, ${juego.color}22, ${C.purple}11)`,border:`1px solid ${juego.color}44`}}>
        <div style={{textAlign:'center',marginBottom:'1rem'}}>
          <div className="bounceIn" style={{fontSize:'3.5rem',marginBottom:'8px',filter:`drop-shadow(0 0 20px ${juego.color}88)`}}>{juego.emoji}</div>
          <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'6px'}}>✦ RITO SAGRADO ✦</div>
          <div style={{fontSize:'20px',fontWeight:'800',color:C.text,marginBottom:'8px'}}>{juego.nombre}</div>
        </div>
        <div style={{background:`${juego.color}11`,borderRadius:'12px',padding:'0.85rem',marginBottom:'1rem',border:`1px solid ${juego.color}33`}}>
          <div style={{fontSize:'10px',fontWeight:'700',color:juego.color,letterSpacing:'0.1em',marginBottom:'4px'}}>✦ PROPÓSITO SAGRADO:</div>
          <div style={{fontSize:'13px',color:C.textMid,fontWeight:'500'}}>{juego.propósito}</div>
        </div>
        <div style={{background:`${C.gold}11`,borderRadius:'12px',padding:'0.85rem',marginBottom:'1rem',border:`1px solid ${C.gold}22`}}>
          <div style={{fontSize:'10px',fontWeight:'700',color:C.gold,letterSpacing:'0.1em',marginBottom:'4px'}}>🪐 ENERGÍA DEL MOMENTO:</div>
          <div style={{fontSize:'12px',color:C.textMid,fontWeight:'500'}}>{transitos[0].planeta} {transitos[0].posicion}</div>
        </div>
        <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',marginBottom:'1rem',fontWeight:'500'}}>📋 {juego.instrucciones}</p>
        <div style={{fontSize:'12px',color:C.textSoft,marginBottom:'1rem',fontWeight:'500'}}>Almas presentes: {miembros.map(m=>m.nombre).join(', ')}</div>
      </GlassCard>
      <button style={e.botonDorado} onClick={()=>setFase('jugando')}>✦ Iniciar el rito sagrado</button>
    </div>
  )

  if(juego.id==='verdad'&&fase==='jugando') {
    const actual=miembros[turno%miembros.length], esMiTurno=turno%miembros.length===0
    return (
      <div style={e.seccion}>
        <GlassCard color={C.purple+'44'} delay={0} style={{background:`linear-gradient(135deg, #1A0533, #0D0B1A)`,border:`1px solid ${C.purple}44`}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
            <div style={{fontSize:'12px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.05em'}}>TURNO {turno+1} DE {miembros.length}</div>
            <div style={{display:'flex',gap:'4px'}}>{miembros.map((_,i)=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:i<turno?C.success:i===turno%miembros.length?C.gold:C.border,boxShadow:i===turno%miembros.length?`0 0 8px ${C.gold}`:'none'}}/>)}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'1rem'}}>
            <div style={{width:'44px',height:'44px',borderRadius:'50%',background:`${actual.color}33`,color:actual.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'800',border:`2px solid ${actual.color}55`,boxShadow:`0 0 15px ${actual.color}44`}}>{actual.iniciales}</div>
            <div>
              <div style={{fontSize:'15px',fontWeight:'800',color:C.text}}>{actual.nombre}</div>
              <div style={{fontSize:'12px',color:C.textSoft}}>{actual.piedra}</div>
            </div>
          </div>
          <div style={{background:`${C.purple}22`,borderRadius:'14px',padding:'1rem',textAlign:'center',marginBottom:'1rem',border:`1px solid ${C.purple}44`}}>
            <div style={{fontSize:'10px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'6px'}}>✦ PREGUNTA SAGRADA:</div>
            <div style={{fontSize:'14px',color:C.text,lineHeight:'1.6',fontStyle:'italic',fontWeight:'600'}}>{preguntas[turno%preguntas.length]}</div>
          </div>
          {esMiTurno?(
            <>
              <textarea style={{...e.input,minHeight:'90px',resize:'vertical',fontFamily:'Montserrat, sans-serif'}} placeholder="Habla desde el alma, sin filtros..." value={respuesta} onChange={ev=>setRespuesta(ev.target.value)}/>
              <button style={{...e.botonDorado,background:`linear-gradient(135deg, ${C.purple}, ${C.purpleDark})`}} onClick={()=>{
                if(!respuesta.trim())return
                setRespuestas(prev=>[...prev,{miembro:actual.nombre,texto:respuesta,retro:retroBots[turno%retroBots.length]}])
                setRespuesta('')
                if(turno+1>=miembros.length)setFase('resultado')
                else setTurno(p=>p+1)
              }}>✦ Entregar mi verdad sagrada</button>
            </>
          ):(
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:'13px',color:C.textSoft,marginBottom:'12px',fontWeight:'500'}}>{actual.nombre} está hablando desde su alma... Escucha en silencio sagrado.</div>
              <button style={{...e.botonDorado,background:'transparent',color:C.gold,border:`1px solid ${C.gold}44`,boxShadow:'none'}}
                onClick={()=>{setRespuestas(prev=>[...prev,{miembro:actual.nombre,texto:'(verdad de voz)',retro:retroBots[turno%retroBots.length]}]);if(turno+1>=miembros.length)setFase('resultado');else setTurno(p=>p+1)}}>
                ✓ {actual.nombre} ha completado su verdad
              </button>
            </div>
          )}
        </GlassCard>
        {respuestas.map((r,i)=>(
          <GlassCard key={i} color={C.teal+'44'} delay={i*50} style={{background:`${C.teal}11`,border:`1px solid ${C.teal}44`}}>
            <div style={{fontSize:'11px',fontWeight:'800',color:C.teal,marginBottom:'4px',letterSpacing:'0.05em'}}>{r.miembro.toUpperCase()}</div>
            {r.texto!=='(verdad de voz)'&&<div style={{fontSize:'13px',color:C.text,fontStyle:'italic',marginBottom:'8px',fontWeight:'500',padding:'0.5rem',background:'rgba(255,255,255,0.03)',borderRadius:'8px',borderLeft:`2px solid ${C.teal}`}}>"{r.texto}"</div>}
            <div style={{fontSize:'12px',color:C.teal,fontWeight:'600'}}>{r.retro}</div>
          </GlassCard>
        ))}
      </div>
    )
  }

  if(juego.id==='sincro'&&fase==='jugando') return (
    <div style={e.seccion}>
      <GlassCard color={C.teal+'44'} delay={0} style={{background:`linear-gradient(135deg, ${C.teal}22, ${C.blue}11)`,border:`1px solid ${C.teal}44`}}>
        <div style={{textAlign:'center',marginBottom:'1rem'}}>
          <div className="bounceIn" style={{fontSize:'3rem',marginBottom:'8px',filter:`drop-shadow(0 0 15px ${C.teal}88)`}}>🌀</div>
          <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'6px'}}>✦ SINCRONÍA DE ALMAS ✦</div>
          <div style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'8px'}}>El silencio sagrado</div>
          <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',fontWeight:'500'}}>Cierra los ojos. En el silencio, piensa en una palabra, un color y un número del 1 al 20. Cuando abras los ojos, revela junto a las demás almas.</p>
        </div>
        {!sincroRevelado?(
          <>
            <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem'}}>
              {['Una palabra','Un color','Un número'].map((p,i)=>(
                <input key={i} style={{...e.input,flex:1,marginBottom:0,textAlign:'center',fontSize:'12px',fontWeight:'600'}} placeholder={p}/>
              ))}
            </div>
            <button style={{...e.botonDorado,background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`}} onClick={()=>setSincroRevelado(true)}>👁 Revelar juntas</button>
          </>
        ):(
          <>
            {miembros.map((m,i)=>(
              <div key={i} className="fadeUp" style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 0',borderBottom:i<miembros.length-1?`1px solid ${C.border}`:'none',animation:`fadeUp 0.4s ${i*0.1}s both`}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:`${m.color}33`,color:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'800',border:`1px solid ${m.color}55`}}>{m.iniciales}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'13px',fontWeight:'700',color:C.text}}>{m.nombre}</div>
                  <div style={{fontSize:'12px',color:C.textSoft,fontWeight:'500'}}>"{sincroData.palabras[i]}" · {sincroData.colores[i]} · {sincroData.numeros[i]}</div>
                </div>
              </div>
            ))}
            <div className="bounceIn" style={{background:`${C.gold}11`,border:`1px solid ${C.gold}44`,borderRadius:'14px',padding:'1rem',marginTop:'1rem',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'4px'}}>✨</div>
              <div style={{fontSize:'14px',fontWeight:'800',color:C.gold,marginBottom:'4px',letterSpacing:'0.05em'}}>2 COINCIDENCIAS SAGRADAS</div>
              <div style={{fontSize:'13px',color:C.textMid,fontWeight:'500'}}>67% de sincronía — el campo energético de este círculo es poderoso</div>
            </div>
            <button style={{...e.botonDorado,background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,marginTop:'1rem'}} onClick={()=>setFase('resultado')}>Ver la revelación final →</button>
          </>
        )}
      </GlassCard>
    </div>
  )

  if(fase==='resultado') return (
    <div style={e.seccion}>
      <GlassCard color={C.gold+'44'} delay={0} style={{background:`linear-gradient(135deg, ${C.gold}22, ${C.purple}11)`,border:`1px solid ${C.gold}44`}}>
        <div style={{textAlign:'center'}}>
          <div className="bounceIn" style={{fontSize:'3.5rem',marginBottom:'8px'}}>🔮</div>
          <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'8px'}}>✦ RITO COMPLETADO ✦</div>
          <div style={{fontSize:'20px',fontWeight:'800',color:C.text,marginBottom:'8px'}}>{juego.nombre}</div>
          <div style={{background:`${C.purple}22`,borderRadius:'12px',padding:'0.85rem',marginBottom:'1rem',border:`1px solid ${C.purple}44`}}>
            <div style={{fontSize:'10px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'4px'}}>✦ LO QUE ESTE RITO INVOCÓ:</div>
            <div style={{fontSize:'13px',color:C.textMid,fontWeight:'500'}}>{juego.propósito}</div>
          </div>
          <div style={{fontSize:'32px',fontWeight:'900',color:C.gold,textShadow:`0 0 20px ${C.gold}66`}}>+{juego.xp}</div>
          <div style={{fontSize:'12px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.1em',marginTop:'4px'}}>VIBRACIÓN GANADA POR EL CÍRCULO</div>
        </div>
      </GlassCard>
      <button style={e.botonDorado} onClick={()=>onSalir(juego.xp)}>✦ Sellar el rito y recibir vibración</button>
    </div>
  )
  return null
}

function RitualGrupal({ miembros, ganarXP }) {
  const [paso, setPaso] = useState(0)
  const pasos = [
    {emoji:'🕯️',titulo:'Encender la llama sagrada',desc:'La llama representa la presencia de cada alma en este círculo. Enciende una vela o activa una luz.'},
    {emoji:'💎',titulo:'Invocar tu piedra aliada',desc:'Sostén tu piedra en la mano izquierda. Cierra los ojos 30 segundos. Siente cómo responde a tu calor.'},
    {emoji:'🌬️',titulo:'La respiración del círculo',desc:'Todas al unísono: inhala 4 tiempos, retén 2, exhala 4. Repite 3 veces. El círculo respira como un solo ser.'},
    {emoji:'🙏',titulo:'Pronunciar la intención sagrada',desc:'Cada alma dice en voz alta por qué está aquí y qué invoca para este círculo.'},
    {emoji:'✦',titulo:'Sellar el pacto del círculo',desc:'Todas juntas pronuncian: "Nuestras energías se unen. El círculo está completo y es poderoso."'},
  ]
  const done = paso>=pasos.length
  return (
    <div>
      <GlassCard color={C.purple+'44'} delay={0}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
          <div>
            <div style={{fontSize:'14px',fontWeight:'800',color:C.text}}>🕯️ Ritual de luna llena</div>
            <div style={{fontSize:'11px',color:C.textSoft,marginTop:'2px',letterSpacing:'0.05em'}}>SINCRONIZADO CON TODAS LAS ALMAS</div>
          </div>
          <div style={{fontSize:'12px',fontWeight:'700',color:C.purple,letterSpacing:'0.05em'}}>{paso}/{pasos.length}</div>
        </div>
        <BarraProgreso valor={paso} max={pasos.length} color={C.purple} altura={6}/>
      </GlassCard>
      {!done?(
        <GlassCard color={C.purple+'44'} delay={100} style={{background:`linear-gradient(135deg, #1A0533, #0D0B1A)`,border:`1px solid ${C.purple}44`}}>
          <div style={{textAlign:'center'}}>
            <div className="bounceIn" style={{fontSize:'3rem',marginBottom:'8px',filter:`drop-shadow(0 0 15px ${C.purple}88)`}}>{pasos[paso].emoji}</div>
            <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'6px'}}>PASO {paso+1} DE {pasos.length}</div>
            <div style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'8px'}}>{pasos[paso].titulo}</div>
            <p style={{fontSize:'13px',color:C.textMid,lineHeight:'1.6',marginBottom:'1rem',fontWeight:'500'}}>{pasos[paso].desc}</p>
            <div style={{fontSize:'12px',color:C.textSoft,marginBottom:'1rem',fontWeight:'500'}}>
              {miembros.map((m,i)=><span key={i} style={{marginRight:'8px',color:C.teal,fontWeight:'600'}}>✦ {m.nombre.split(' ')[0]}</span>)}
            </div>
          </div>
          <button style={{...e.botonDorado,background:`linear-gradient(135deg, ${C.purple}, ${C.purpleDark})`}} onClick={()=>setPaso(p=>p+1)}>
            ✦ Completé este paso sagrado
          </button>
        </GlassCard>
      ):(
        <GlassCard color={C.gold+'44'} delay={0} style={{background:`linear-gradient(135deg, ${C.gold}11, ${C.purple}11)`,border:`1px solid ${C.gold}44`}}>
          <div style={{textAlign:'center'}}>
            <div className="bounceIn moonGlow" style={{fontSize:'3rem',marginBottom:'8px'}}>🌕</div>
            <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'8px'}}>✦ RITUAL SAGRADO COMPLETO ✦</div>
            <div style={{fontSize:'16px',fontWeight:'800',color:C.text,marginBottom:'8px'}}>El círculo fue sellado</div>
            <p style={{fontSize:'13px',color:C.textMid,marginBottom:'1rem',fontWeight:'500',fontStyle:'italic'}}>La energía que invocaron juntas permanece activa. El universo la reconoció.</p>
            <button style={e.botonDorado} onClick={()=>ganarXP(80,'🌕 Ritual sellado +80 vibración ✨')}>
              ✦ Recibir la vibración sagrada
            </button>
          </div>
        </GlassCard>
      )}
      <p style={{fontSize:'11px',color:C.textSoft,textAlign:'center',marginTop:'0.75rem',letterSpacing:'0.05em'}}>🔮 Rituales avanzados en el Camino del Alma</p>
    </div>
  )
}

function ChatGrupal({ perfil, objData, ganarXP }) {
  const [mensajes, setMensajes] = useState([
    {de:'Valeria M.',texto:'💗 Presente y lista para el rito',out:false},
    {de:'Marco S.',texto:'Este lugar sagrado es increíble 🌿',out:false},
  ])
  const [texto, setTexto] = useState('')
  const enviar = (msg) => {
    const t=msg||texto.trim(); if(!t)return
    setMensajes(p=>[...p,{de:perfil.nombre,texto:t,out:true}])
    setTexto(''); ganarXP(10,'+10 vibración ✨')
  }
  return (
    <div>
      <div style={{background:'rgba(255,255,255,0.02)',border:`1px solid ${C.border}`,borderRadius:'18px',padding:'1rem',minHeight:'180px',marginBottom:'0.75rem'}}>
        {mensajes.map((m,i)=>(
          <div key={i} style={{marginBottom:'0.6rem',display:'flex',flexDirection:'column',alignItems:m.out?'flex-end':'flex-start'}}>
            {!m.out&&<div style={{fontSize:'11px',color:C.textSoft,marginBottom:'2px',marginLeft:'4px',fontWeight:'600',letterSpacing:'0.05em'}}>{m.de.toUpperCase()}</div>}
            <div style={{padding:'9px 14px',borderRadius:'18px',fontSize:'13px',maxWidth:'80%',fontWeight:'500',background:m.out?`${C.purple}44`:C.bgSoft,color:m.out?C.text:C.text,borderBottomRightRadius:m.out?'4px':'18px',borderBottomLeftRadius:m.out?'18px':'4px',border:m.out?`1px solid ${C.purple}66`:`1px solid ${C.border}`}}>
              {m.texto}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.5rem'}}>
        <input style={{...e.input,flex:1,marginBottom:0}} placeholder="Habla al círculo..." value={texto} onChange={ev=>setTexto(ev.target.value)} onKeyDown={ev=>ev.key==='Enter'&&enviar()}/>
        <button style={{...e.botonDorado,width:'auto',padding:'0 1.25rem',marginTop:0}} onClick={()=>enviar()}>→</button>
      </div>
      <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
        {['💗 Presente','✨ Invoco energía','🙏 Gratitud sagrada','🌬️ Respirando'].map(q=>(
          <button key={q} onClick={()=>enviar(q)} style={{padding:'6px 12px',borderRadius:'20px',fontSize:'11px',cursor:'pointer',fontWeight:'600',background:'rgba(255,255,255,0.03)',color:C.textSoft,border:`1px solid ${C.border}`,letterSpacing:'0.03em'}}>{q}</button>
        ))}
      </div>
    </div>
  )
}

// ================================
// MI ESENCIA (Perfil)
// ================================
function PantallaPerfil({ perfil, xp }) {
  const { signo, emoji } = calcularSigno(perfil.fecha)
  const nivel = getNivel(xp)
  const siguiente = NIVELES[NIVELES.indexOf(nivel)+1]
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const { elemento } = calcularSigno(perfil.fecha)
  const arquetipo = getArquetipo(signo, elemento, perfil.objetivo)
  return (
    <div style={e.seccion}>
      <div style={{textAlign:'center',marginBottom:'1.25rem'}}>
        <h2 className="fadeUp" style={{...e.tituloPantalla,marginBottom:'4px'}}>✦ Mi Esencia</h2>
        <p style={{fontSize:'11px',color:C.gold,letterSpacing:'0.1em',fontWeight:'600'}}>{arquetipo.simbolo} {arquetipo.titulo.toUpperCase()}</p>
      </div>

      <GlassCard color={C.gold+'44'} delay={0} style={{background:`linear-gradient(145deg, ${objData?.color||C.purple}22, ${C.gold}11)`,border:`1px solid ${C.gold}33`}}>
        <div style={{textAlign:'center'}}>
          <div className="bounceIn orbFloat" style={{width:'80px',height:'80px',borderRadius:'50%',background:`${objData?.color||C.purple}22`,border:`2px solid ${C.gold}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.8rem',margin:'0 auto 0.75rem',boxShadow:`0 0 30px ${C.gold}22`}}>
            {nivel.emoji}
          </div>
          <div style={{fontSize:'22px',fontWeight:'800',color:C.text}}>{perfil.nombre}</div>
          <div style={{fontSize:'12px',color:C.gold,marginTop:'4px',fontWeight:'700',letterSpacing:'0.1em'}}>{arquetipo.titulo.toUpperCase()}</div>
          <div style={{fontSize:'11px',color:C.textSoft,marginTop:'4px'}}>{emoji} {signo} · {perfil.ciudad}</div>
          <div style={{fontSize:'14px',fontWeight:'800',color:C.text,marginTop:'8px'}}>{nivel.emoji} {nivel.titulo} · {xp} vibración</div>
          <div style={{margin:'12px 0 6px'}}><BarraProgreso valor={xp-nivel.min} max={(siguiente?.min||nivel.max+1)-nivel.min} color={C.gold} altura={6}/></div>
          <div style={{fontSize:'11px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.05em'}}>
            {siguiente?`${siguiente.min-xp} vibración para ${siguiente.nombre}`:'✦ VIBRACIÓN MÁXIMA ALCANZADA'}
          </div>
        </div>
      </GlassCard>

      {/* Arquetipo */}
      <GlassCard color={objData?.color+'44'} delay={80} style={{borderLeft:`3px solid ${objData?.color||C.purple}`}}>
        <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'8px'}}>✦ TU ARQUETIPO SAGRADO:</div>
        <p style={{fontSize:'13px',color:C.textMid,fontStyle:'italic',lineHeight:'1.6',margin:0,fontWeight:'500'}}>{arquetipo.desc}</p>
      </GlassCard>

      {/* Scores */}
      <GlassCard color={C.border} delay={120}>
        <div style={{fontSize:'11px',color:C.gold,fontWeight:'700',letterSpacing:'0.1em',marginBottom:'1rem',textAlign:'center'}}>✦ VIBRACIÓN GENERAL DEL ALMA</div>
        <div style={{display:'flex',justifyContent:'space-around'}}>
          {[{val:Math.min(Math.round(xp/30),10),label:'Vibración',color:C.gold},{val:7,label:'Rituales',color:C.purple},{val:8,label:'Constancia',color:C.teal}].map((s,i)=>(
            <ScoreCircular key={i} valor={s.val} max={10} color={s.color} label={s.label} size={88}/>
          ))}
        </div>
      </GlassCard>

      {/* Rangos sagrados */}
      <h3 style={{fontSize:'14px',fontWeight:'800',color:C.text,marginBottom:'0.75rem',letterSpacing:'0.05em'}}>✦ TUS RANGOS SAGRADOS</h3>
      <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'1.25rem'}}>
        {NIVELES.map((n,i)=>(
          <div key={i} className="bounceIn" style={{padding:'7px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',animation:`bounceIn 0.5s ${i*0.08}s both`,background:xp>=n.min?`${[C.rose,C.purple,C.blue,C.teal,C.amber,C.gold][i]}22`:'rgba(255,255,255,0.03)',color:xp>=n.min?[C.rose,C.purple,C.blue,C.teal,C.amber,C.gold][i]:C.textSoft,border:`1px solid ${xp>=n.min?[C.rose,C.purple,C.blue,C.teal,C.amber,C.gold][i]+'44':C.border}`,boxShadow:xp>=n.min?`0 0 15px ${[C.rose,C.purple,C.blue,C.teal,C.amber,C.gold][i]}22`:'none',letterSpacing:'0.05em'}}>
            {n.emoji} {n.nombre}
          </div>
        ))}
      </div>

      <GlassCard color={C.border} delay={300}>
        {[
          {label:'Llamado sagrado',val:objData?.titulo},
          {label:'Piedra aliada',val:`${objData?.piedra.emoji} ${objData?.piedra.nombre}`},
          {label:'Camino',val:'Iniciada (Libre)'},
          {label:'Racha sagrada',val:'1 luna 🌙'},
          {label:'Vibración total',val:`${xp} ✨`},
        ].map((item,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
            <span style={{fontSize:'12px',color:C.textSoft,fontWeight:'600',letterSpacing:'0.05em'}}>{item.label.toUpperCase()}</span>
            <span style={{fontSize:'13px',fontWeight:'700',color:C.text}}>{item.val}</span>
          </div>
        ))}
      </GlassCard>

      <GlassCard color={C.gold+'44'} delay={400} style={{background:`linear-gradient(135deg, ${C.gold}11, ${C.purple}11)`,border:`1px solid ${C.gold}44`}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:'2rem',marginBottom:'6px',filter:'drop-shadow(0 0 15px rgba(255,215,0,0.5))'}}>✨</div>
          <div style={{fontSize:'11px',color:C.gold,letterSpacing:'0.15em',marginBottom:'6px'}}>✦ CAMINO DEL ALMA SAGRADA ✦</div>
          <div style={{fontSize:'15px',fontWeight:'800',color:C.text,marginBottom:'4px'}}>Plan Alma — $9.99/mes</div>
          <div style={{fontSize:'12px',color:C.textMid,lineHeight:'1.6',marginBottom:'12px',fontWeight:'500'}}>Todos los cristales · Carta astral completa · Grimorio ilimitado · Aquelarre premium</div>
          <button style={e.botonDorado}>Despertar mi Alma completa →</button>
        </div>
      </GlassCard>
    </div>
  )
}

// ================================
// APP PRINCIPAL
// ================================
export default function App() {
  const [pantalla, setPantalla] = useState(0)
  const [perfil, setPerfil] = useState({nombre:'',fecha:'',hora:null,ciudad:'',objetivo:'',emocion:''})
  const [tabActivo, setTabActivo] = useState('altar')
  const [xp, setXp] = useState(0)

  const siguiente = (campo, valor) => {
    if(campo) setPerfil(prev=>({...prev,[campo]:valor}))
    setPantalla(prev=>prev+1)
  }

  const tabs = [
    {id:'altar',emoji:'🏛️',label:'Mi Altar'},
    {id:'rituales',emoji:'✦',label:'Rituales'},
    {id:'grimorio',emoji:'📖',label:'Grimorio'},
    {id:'cristales',emoji:'💎',label:'Cristales'},
    {id:'aquelarre',emoji:'🔮',label:'Aquelarre'},
    {id:'esencia',emoji:'✨',label:'Mi Esencia'},
  ]

  if(pantalla<8) return (
    <div style={{minHeight:'100vh',background:C.bg}}>
      <style>{animCSS}</style>
      {pantalla===0&&<PantallaBienvenida onSiguiente={()=>siguiente(null,null)}/>}
      {pantalla===1&&<PantallaNombre onSiguiente={v=>siguiente('nombre',v)}/>}
      {pantalla===2&&<PantallaFecha nombre={perfil.nombre} onSiguiente={v=>siguiente('fecha',v)}/>}
      {pantalla===3&&<PantallaHora nombre={perfil.nombre} onSiguiente={v=>siguiente('hora',v)}/>}
      {pantalla===4&&<PantallaCiudad nombre={perfil.nombre} onSiguiente={v=>siguiente('ciudad',v)}/>}
      {pantalla===5&&<PantallaCheckIn nombre={perfil.nombre} onSiguiente={v=>siguiente('emocion',v)}/>}
      {pantalla===6&&<PantallaObjetivo nombre={perfil.nombre} onSiguiente={v=>siguiente('objetivo',v)}/>}
      {pantalla===7&&<PantallaCartaAstral perfil={perfil} onEntrar={()=>setPantalla(8)}/>}
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:C.bg,paddingBottom:'75px'}}>
      <style>{animCSS}</style>
      <div style={{maxWidth:'500px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div key={tabActivo} className="slideLeft">
          {tabActivo==='altar'&&<PantallaHome perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='rituales'&&<PantallaMisiones perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='grimorio'&&<PantallaJournal perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='cristales'&&<PantallaPiedras perfil={perfil}/>}
          {tabActivo==='aquelarre'&&<PantallaCirculos perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='esencia'&&<PantallaPerfil perfil={perfil} xp={xp}/>}
        </div>
      </div>

      {/* Menú inferior esotérico */}
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(13,11,26,0.95)',backdropFilter:'blur(20px)',borderTop:`1px solid rgba(255,215,0,0.15)`,display:'flex',justifyContent:'space-around',padding:'8px 0',zIndex:100,boxShadow:'0 -10px 40px rgba(0,0,0,0.5)'}}>
        {tabs.map(tab=>(
          <button key={tab.id} onClick={()=>setTabActivo(tab.id)} style={{background:'none',border:'none',cursor:'pointer',padding:'4px 3px',display:'flex',flexDirection:'column',alignItems:'center',gap:'2px',flex:1,borderTop:`2px solid ${tabActivo===tab.id?C.gold:'transparent'}`,transition:'all 0.2s'}}>
            <span style={{fontSize:'1.1rem',transform:tabActivo===tab.id?'scale(1.2)':'scale(1)',transition:'transform 0.25s cubic-bezier(.34,1.56,.64,1)',display:'block',filter:tabActivo===tab.id?`drop-shadow(0 0 8px ${C.gold})`:'none'}}>{tab.emoji}</span>
            <span style={{fontSize:'8px',fontWeight:'700',color:tabActivo===tab.id?C.gold:C.textSoft,transition:'color 0.2s',letterSpacing:'0.05em'}}>{tab.label.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ================================
// ESTILOS BASE
// ================================
const e = {
  seccion:{width:'100%'},
  stepIndicator:{display:'inline-block',background:`rgba(255,215,0,0.1)`,color:C.gold,fontSize:'11px',fontWeight:'700',padding:'5px 14px',borderRadius:'20px',marginBottom:'1rem',border:`1px solid rgba(255,215,0,0.3)`,letterSpacing:'0.1em'},
  pregunta:{fontSize:'22px',fontWeight:'800',color:C.text,marginBottom:'0.75rem',lineHeight:'1.3'},
  descripcion:{fontSize:'14px',color:C.textMid,lineHeight:'1.6',marginBottom:'1.5rem',fontWeight:'500'},
  input:{width:'100%',padding:'14px 16px',background:'rgba(255,255,255,0.04)',border:`1px solid rgba(255,215,0,0.2)`,borderRadius:'14px',color:C.text,fontSize:'15px',marginBottom:'1rem',outline:'none',boxSizing:'border-box',fontWeight:'500'},
  botonDorado:{width:'100%',padding:'15px',background:`linear-gradient(135deg, ${C.gold}CC, ${C.amber})`,color:'#0D0B1A',border:'none',borderRadius:'14px',fontSize:'14px',fontWeight:'800',cursor:'pointer',marginTop:'0.5rem',boxShadow:`0 6px 24px rgba(255,215,0,0.3)`,transition:'all 0.2s',letterSpacing:'0.05em'},
  checkboxFila:{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1rem'},
  tituloPantalla:{fontSize:'22px',fontWeight:'800',color:C.text,marginBottom:'1.25rem'},
  toast:{position:'fixed',top:'24px',right:'16px',background:`linear-gradient(135deg, ${C.gold}CC, ${C.amber})`,color:'#0D0B1A',padding:'10px 20px',borderRadius:'24px',fontSize:'13px',fontWeight:'700',zIndex:999,boxShadow:`0 4px 20px rgba(255,215,0,0.4)`,letterSpacing:'0.05em'},
}