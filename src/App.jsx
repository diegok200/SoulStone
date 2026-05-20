import { useState, useEffect, useRef } from 'react'
import './App.css'

// ================================
// COLORES VIBRANTES
// ================================
const C = {
  bg: '#FFF5F7',
  bgCard: '#FFFFFF',
  bgSoft: '#FFF0F3',
  rose: '#FF4D8D',
  roseDark: '#E0006B',
  roseLight: '#FFE0EE',
  purple: '#9C27B0',
  purpleDark: '#6A0080',
  purpleLight: '#F3E5F5',
  teal: '#00BFA5',
  tealDark: '#007C6E',
  tealLight: '#E0F2F1',
  amber: '#FF8F00',
  amberDark: '#E65100',
  amberLight: '#FFF3E0',
  blue: '#2979FF',
  blueDark: '#0D47A1',
  blueLight: '#E3F2FD',
  green: '#43A047',
  greenLight: '#E8F5E9',
  yellow: '#FFD600',
  yellowLight: '#FFFDE7',
  coral: '#FF5722',
  coralLight: '#FBE9E7',
  text: '#1A1A2E',
  textMid: '#4A4A6A',
  textSoft: '#9090AA',
  border: '#FFD6E7',
  success: '#00C853',
  gold: '#FFD600',
}

// ================================
// ANIMACIONES CSS
// ================================
const animCSS = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes popIn { from { opacity:0; transform:scale(0.7); } to { opacity:1; transform:scale(1); } }
  @keyframes bounceIn { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.08)} 70%{transform:scale(0.95)} 100%{transform:scale(1);opacity:1} }
  @keyframes slideLeft { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes slideRight { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
  @keyframes confettiFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(120px) rotate(720deg);opacity:0} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes countUp { from{transform:scale(1.4);color:#FF4D8D} to{transform:scale(1);} }
  @keyframes wiggle { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
  @keyframes ringGrow { from{stroke-dasharray:0 1000} }
  @keyframes floatUp { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-60px);opacity:0} }
  .fadeUp { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
  .fadeIn { animation: fadeIn 0.4s ease both; }
  .popIn { animation: popIn 0.4s cubic-bezier(.34,1.56,.64,1) both; }
  .bounceIn { animation: bounceIn 0.6s cubic-bezier(.34,1.56,.64,1) both; }
  .slideLeft { animation: slideLeft 0.45s cubic-bezier(.22,1,.36,1) both; }
  .pulse { animation: pulse 2s infinite; }
  .wiggle { animation: wiggle 0.4s ease; }
`

// ================================
// DATOS
// ================================
const OBJETIVOS = [
  {
    id: 'amor', emoji: '💗', titulo: 'Amor', color: C.rose, colorLight: C.roseLight, colorDark: C.roseDark,
    piedra: { nombre: 'Cuarzo Rosa', emoji: '💗',
      marketing: 'La piedra del amor universal. Abre tu corazón para dar y recibir amor genuino.',
      afirmacion: '"El amor fluye hacia mí de formas hermosas e inesperadas."',
      misiones: [
        { texto: 'Escribe 3 cosas que amas de ti misma', mensaje: '💗 Amarte es el primer paso para atraer amor genuino. Guarda esa lista — léela cuando la duda aparezca.' },
        { texto: 'Envía un mensaje cariñoso a alguien especial', mensaje: '❤️ Cada acto de amor que das regresa multiplicado.' },
        { texto: 'Medita 5 min visualizando amor', mensaje: '🌸 Lo que visualizas con emoción, el universo lo convierte en realidad.' },
        { texto: 'Sonríe a un extraño hoy', mensaje: '✨ Una sonrisa cambia el campo energético de quien la recibe.' },
      ]}, libre: true,
  },
  {
    id: 'abundancia', emoji: '✨', titulo: 'Abundancia', color: C.amber, colorLight: C.amberLight, colorDark: C.amberDark,
    piedra: { nombre: 'Citrino', emoji: '💛',
      marketing: 'La piedra del comerciante. Activa tu energía para atraer riqueza y oportunidades.',
      afirmacion: '"La abundancia fluye hacia mí con facilidad y gratitud."',
      misiones: [
        { texto: 'Visualiza tu meta financiera 5 min', mensaje: '💛 La mente no distingue lo real de lo visualizado con intensidad.' },
        { texto: 'Anota 3 oportunidades de ingresos', mensaje: '📝 El primer paso hacia la abundancia es verla posible.' },
        { texto: 'Revisa tus finanzas con gratitud', mensaje: '🙏 Agradecer lo que tienes activa el flujo de más.' },
        { texto: 'Aprende algo nuevo sobre dinero', mensaje: '📚 Cada cosa que aprendes sobre dinero es una semilla.' },
      ]}, libre: false,
  },
  {
    id: 'bienestar', emoji: '🌿', titulo: 'Bienestar', color: C.teal, colorLight: C.tealLight, colorDark: C.tealDark,
    piedra: { nombre: 'Aventurina', emoji: '💚',
      marketing: 'La piedra de la vitalidad. Activa tu energía vital y apoya hábitos saludables.',
      afirmacion: '"Mi cuerpo es mi templo y lo cuido con amor."',
      misiones: [
        { texto: '10 respiraciones profundas', mensaje: '🌬️ Siempre que te sientas abrumada, vuelve a estas 10 respiraciones.' },
        { texto: 'Camina 15 minutos afuera', mensaje: '🌿 El movimiento es medicina. Cada paso activa endorfinas.' },
        { texto: 'Toma 8 vasos de agua hoy', mensaje: '💧 El 75% del cansancio es deshidratación.' },
        { texto: 'Come una fruta o vegetal extra', mensaje: '🍎 Cada elección saludable le dice a tu cuerpo: te cuido.' },
      ]}, libre: false,
  },
  {
    id: 'paz', emoji: '🧘', titulo: 'Paz mental', color: C.purple, colorLight: C.purpleLight, colorDark: C.purpleDark,
    piedra: { nombre: 'Amatista', emoji: '💜',
      marketing: 'La piedra de la tranquilidad. Calma la mente ansiosa y conecta con tu sabiduría interior.',
      afirmacion: '"La paz es mi estado natural. Elijo la calma en todo momento."',
      misiones: [
        { texto: 'Medita 5 minutos en silencio', mensaje: '🧘 5 minutos de silencio hacen más que 2 horas de distracción.' },
        { texto: 'Escribe 3 cosas por las que estás agradecida', mensaje: '💜 La gratitud cambia la química de tu cerebro.' },
        { texto: 'Desconéctate del celular 1 hora', mensaje: '✨ El descanso digital es tan importante como el físico.' },
        { texto: 'Haz una actividad que te dé paz', mensaje: '🌙 Identificar qué te da paz es una habilidad valiosa.' },
      ]}, libre: false,
  },
  {
    id: 'crecimiento', emoji: '🌱', titulo: 'Crecimiento', color: C.blue, colorLight: C.blueLight, colorDark: C.blueDark,
    piedra: { nombre: 'Lapislázuli', emoji: '💎',
      marketing: 'La piedra de los sabios. Despierta tu potencial oculto y amplía tu perspectiva.',
      afirmacion: '"Cada día soy una versión más evolucionada de mí misma."',
      misiones: [
        { texto: 'Lee 10 páginas de un libro', mensaje: '📚 10 páginas al día son 12 libros al año.' },
        { texto: 'Aprende una habilidad nueva hoy', mensaje: '🌱 Tu cerebro literalmente creció hoy.' },
        { texto: 'Reflexiona sobre una lección aprendida', mensaje: '💎 La experiencia sin reflexión es solo tiempo que pasa.' },
        { texto: 'Haz algo fuera de tu zona de confort', mensaje: '🚀 La incomodidad es la sensación del crecimiento.' },
      ]}, libre: false,
  },
  {
    id: 'espiritual', emoji: '🔮', titulo: 'Espíritu', color: '#7B1FA2', colorLight: '#F3E5F5', colorDark: '#4A0072',
    piedra: { nombre: 'Obsidiana', emoji: '🖤',
      marketing: 'La piedra de la verdad. Limpia tu campo energético y te conecta con tu propósito.',
      afirmacion: '"Estoy conectada con el universo y mi propósito es claro."',
      misiones: [
        { texto: 'Practica 10 min de meditación profunda', mensaje: '🌌 En el silencio profundo el universo habla.' },
        { texto: 'Escribe en tu journal espiritual', mensaje: '✨ Las palabras que salieron hoy vinieron de lo más profundo.' },
        { texto: 'Pasa tiempo en la naturaleza', mensaje: '🌿 La naturaleza recalibra tu sistema energético.' },
        { texto: 'Haz una ofrenda de gratitud al universo', mensaje: '🙏 Lo que das con amor regresa amplificado.' },
      ]}, libre: false,
  },
]

const NIVELES = [
  { nombre: 'Semilla', emoji: '🌱', min: 0, max: 149 },
  { nombre: 'Cuarzo', emoji: '🪨', min: 150, max: 399 },
  { nombre: 'Amatista', emoji: '💜', min: 400, max: 799 },
  { nombre: 'Lapislázuli', emoji: '💎', min: 800, max: 1499 },
  { nombre: 'Esmeralda', emoji: '💚', min: 1500, max: 2499 },
  { nombre: 'Diamante', emoji: '💍', min: 2500, max: Infinity },
]

const EMOCIONES = [
  { id: 'excited', emoji: '🌟', label: 'Emocionada', color: '#FFD600', shape: 'circle' },
  { id: 'joyful', emoji: '🌸', label: 'Alegre', color: C.rose, shape: 'blob' },
  { id: 'grateful', emoji: '💜', label: 'Agradecida', color: C.purple, shape: 'square' },
  { id: 'energized', emoji: '⚡', label: 'Energizada', color: '#00C853', shape: 'star' },
  { id: 'calm', emoji: '🌊', label: 'Tranquila', color: C.teal, shape: 'circle' },
  { id: 'confused', emoji: '🌀', label: 'Confundida', color: C.blue, shape: 'hex' },
  { id: 'tired', emoji: '🌙', label: 'Cansada', color: '#7B1FA2', shape: 'circle' },
  { id: 'stressed', emoji: '🌪️', label: 'Estresada', color: C.coral, shape: 'blob' },
  { id: 'sad', emoji: '🌧️', label: 'Triste', color: '#1565C0', shape: 'circle' },
  { id: 'anxious', emoji: '🦋', label: 'Ansiosa', color: C.amber, shape: 'blob' },
  { id: 'hopeful', emoji: '🌅', label: 'Esperanzada', color: '#F4511E', shape: 'star' },
  { id: 'loved', emoji: '💗', label: 'Amada', color: '#E91E63', shape: 'heart' },
]

function getNivel(xp) { return NIVELES.find(n => xp >= n.min && xp <= n.max) || NIVELES[0] }

function calcularSigno(fechaStr) {
  if (!fechaStr) return { signo: 'Desconocido', emoji: '⭐', elemento: 'Aire' }
  const f = new Date(fechaStr), m = f.getMonth() + 1, d = f.getDate()
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
    {planeta:'🌙 Luna',posicion:'en Escorpio',explicacion:'La Luna en Escorpio intensifica tus emociones y aguza tu intuición. Día poderoso para introspección y decisiones importantes.'},
    {planeta:'☿ Mercurio',posicion:'directo en Tauro',explicacion:'Mercurio directo favorece la comunicación clara. Ideal para conversaciones importantes y acuerdos duraderos.'},
    {planeta:'♀ Venus',posicion:'trino con el Sol',explicacion:'Venus trae armonía y atractivo natural. Las relaciones fluyen con más facilidad — buen momento para conectar.'},
    {planeta:'♂ Marte',posicion:'en cuadratura',explicacion:'Marte puede generar tensión. Usa esa energía para avanzar en proyectos, no para conflictos.'},
    {planeta:'♃ Júpiter',posicion:'en expansión',explicacion:'Júpiter amplifica todo lo que tocas. Las oportunidades de hoy no son casualidad.'},
  ]
  return [t[d%5], t[(d+1)%5], t[(d+2)%5]]
}

// ================================
// CONFETTI
// ================================
function Confetti({ active }) {
  if (!active) return null
  const pieces = Array.from({length: 18}, (_, i) => ({
    id: i,
    color: [C.rose, C.purple, C.teal, C.amber, C.blue, C.yellow, C.coral][i % 7],
    left: `${Math.random() * 90 + 5}%`,
    delay: `${Math.random() * 0.4}s`,
    size: `${Math.random() * 8 + 6}px`,
    shape: Math.random() > 0.5 ? '50%' : '2px',
  }))
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: p.left, top: '20px',
          width: p.size, height: p.size, borderRadius: p.shape,
          background: p.color, animation: `confettiFall 1.2s ${p.delay} ease-in both`,
        }} />
      ))}
    </div>
  )
}

// ================================
// FLOAT XP
// ================================
function FloatXP({ puntos, visible, x, y }) {
  if (!visible) return null
  return (
    <div style={{
      position: 'fixed', left: x || '50%', top: y || '40%',
      transform: 'translateX(-50%)',
      background: C.rose, color: '#fff', padding: '8px 18px',
      borderRadius: '24px', fontSize: '16px', fontWeight: '800',
      zIndex: 9998, animation: 'floatUp 1.2s ease both',
      boxShadow: `0 4px 20px ${C.rose}88`,
      pointerEvents: 'none',
    }}>
      +{puntos} XP ✨
    </div>
  )
}

// ================================
// SCORE CIRCULAR ANIMADO
// ================================
function ScoreCircular({ valor, max, color, label, size = 110 }) {
  const [displayed, setDisplayed] = useState(0)
  const r = (size/2) - 14
  const circ = 2 * Math.PI * r
  const pct = Math.min(displayed / max, 1)
  const dash = pct * circ

  useEffect(() => {
    let start = 0
    const step = valor / 30
    const timer = setInterval(() => {
      start += step
      if (start >= valor) { setDisplayed(valor); clearInterval(timer) }
      else setDisplayed(Math.round(start))
    }, 30)
    return () => clearInterval(timer)
  }, [valor])

  return (
    <div style={{ textAlign: 'center', position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color+'33'} strokeWidth="10"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.05s linear' }}/>
      </svg>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
        <div style={{ fontSize: size > 100 ? '26px' : '18px', fontWeight: '800', color: C.text }}>{displayed}</div>
        <div style={{ fontSize: '10px', color: C.textSoft, fontWeight: '600' }}>{label}</div>
      </div>
    </div>
  )
}

// ================================
// BARRA PROGRESO ANIMADA
// ================================
function BarraProgreso({ valor, max, color, altura = 10 }) {
  const [width, setWidth] = useState(0)
  const pct = Math.min(Math.round((valor/max)*100), 100)
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 100); return () => clearTimeout(t) }, [pct])
  return (
    <div style={{ background: color+'22', borderRadius: '20px', height: altura, overflow: 'hidden' }}>
      <div style={{ width: `${width}%`, height: altura, borderRadius: '20px', background: color, transition: 'width 0.8s cubic-bezier(.22,1,.36,1)' }}/>
    </div>
  )
}

// ================================
// CARD ANIMADA
// ================================
function AnimCard({ children, color, delay = 0, style = {}, onClick }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [delay])
  return (
    <div onClick={onClick} style={{
      background: C.bgCard, borderRadius: '20px', padding: '1.25rem',
      marginBottom: '1rem', border: `2px solid ${color || C.border}`,
      boxShadow: `0 4px 16px ${color || '#FF4D8D'}22`,
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      cursor: onClick ? 'pointer' : 'default', ...style,
    }}>
      {children}
    </div>
  )
}

// ================================
// SHAPE EMOCION
// ================================
function EmocionShape({ emocion, seleccionada, onClick }) {
  const shapes = {
    circle: '50%', blob: '60% 40% 70% 30% / 50% 60% 40% 50%',
    square: '22%', hex: '30% 70% 30% 70% / 70% 30% 70% 30%',
    triangle: '40% 40% 50% 50%', star: '50% 20% 50% 20% / 20% 50% 20% 50%',
    heart: '50% 50% 40% 40%',
  }
  const sel = seleccionada === emocion.id
  return (
    <div onClick={() => onClick(emocion.id)} style={{ textAlign: 'center', cursor: 'pointer' }}>
      <div style={{
        width: '58px', height: '58px', margin: '0 auto 6px',
        background: sel ? emocion.color : emocion.color+'44',
        borderRadius: shapes[emocion.shape] || '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', transition: 'all 0.25s cubic-bezier(.34,1.56,.64,1)',
        transform: sel ? 'scale(1.18)' : 'scale(1)',
        border: `3px solid ${sel ? emocion.color : 'transparent'}`,
        boxShadow: sel ? `0 6px 20px ${emocion.color}66` : 'none',
      }}>
        {emocion.emoji}
      </div>
      <div style={{ fontSize: '10px', color: sel ? C.text : C.textSoft, fontWeight: sel ? '700' : '400', transition: 'all 0.2s' }}>
        {emocion.label}
      </div>
    </div>
  )
}

// ================================
// ONBOARDING
// ================================
function PantallaBienvenida({ onSiguiente }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])
  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(145deg, ${C.rose} 0%, ${C.purple} 50%, #1A0533 100%)`, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <style>{animCSS}</style>
      <div style={{ textAlign:'center', maxWidth:'400px', width:'100%' }}>
        <div className="bounceIn" style={{ fontSize:'6rem', marginBottom:'1rem', animationDelay:'0.1s' }}>✨</div>
        <h1 className="fadeUp" style={{ fontSize:'42px', fontWeight:'900', color:'#fff', marginBottom:'8px', letterSpacing:'-1px', animationDelay:'0.2s' }}>SoulStone</h1>
        <p className="fadeUp" style={{ fontSize:'16px', color:'rgba(255,255,255,0.85)', marginBottom:'0.5rem', animationDelay:'0.3s' }}>Tu entrenadora personal del alma</p>
        <div className="fadeUp" style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', margin:'1.25rem 0 2rem', animationDelay:'0.4s' }}>
          {['Misiones diarias ✦','Carta astral ✦','Círculos grupales'].map((t,i) => (
            <span key={i} style={{ background:'rgba(255,255,255,0.2)', color:'#fff', fontSize:'12px', padding:'5px 14px', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.3)', fontWeight:'600' }}>{t}</span>
          ))}
        </div>
        <button className="fadeUp popIn" style={{ ...e.botonRose, fontSize:'17px', padding:'16px', background:'#fff', color:C.rose, fontWeight:'900', boxShadow:'0 8px 32px rgba(0,0,0,0.25)', animationDelay:'0.5s' }} onClick={onSiguiente}>
          Comenzar mi viaje →
        </button>
      </div>
    </div>
  )
}

function PantallaNombre({ onSiguiente }) {
  const [nombre, setNombre] = useState('')
  return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'420px', width:'100%', textAlign:'center' }}>
        <div style={e.stepIndicator}>1 de 6</div>
        <div className="bounceIn" style={{ fontSize:'4rem', marginBottom:'1rem' }}>🌟</div>
        <h2 className="fadeUp" style={e.pregunta}>¿Cómo te llamamos?</h2>
        <p className="fadeUp" style={e.descripcion}>Tu nombre personaliza toda tu experiencia espiritual.</p>
        <input className="fadeUp" style={e.input} type="text" placeholder="Tu nombre..." value={nombre}
          onChange={(ev) => setNombre(ev.target.value)}
          onKeyDown={(ev) => ev.key==='Enter' && nombre.trim() && onSiguiente(nombre.trim())} autoFocus/>
        <button style={{...e.botonRose, opacity: nombre.trim()?1:0.5, transition:'all 0.3s'}}
          onClick={() => nombre.trim() && onSiguiente(nombre.trim())}>Continuar →</button>
      </div>
    </div>
  )
}

function PantallaFecha({ nombre, onSiguiente }) {
  const [fecha, setFecha] = useState('')
  return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'420px', width:'100%', textAlign:'center' }}>
        <div style={e.stepIndicator}>2 de 6</div>
        <div className="bounceIn" style={{ fontSize:'4rem', marginBottom:'1rem' }}>🌙</div>
        <h2 className="fadeUp" style={e.pregunta}>¿Cuándo llegaste a este mundo, {nombre}?</h2>
        <p className="fadeUp" style={e.descripcion}>Calculamos tu carta astral completa.</p>
        <input className="fadeUp" style={e.input} type="date" value={fecha} onChange={(ev) => setFecha(ev.target.value)}/>
        <button style={{...e.botonRose, opacity:fecha?1:0.5}} onClick={() => fecha && onSiguiente(fecha)}>Continuar →</button>
      </div>
    </div>
  )
}

function PantallaHora({ nombre, onSiguiente }) {
  const [hora, setHora] = useState(''), [noSabe, setNoSabe] = useState(false)
  return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'420px', width:'100%', textAlign:'center' }}>
        <div style={e.stepIndicator}>3 de 6</div>
        <div className="bounceIn" style={{ fontSize:'4rem', marginBottom:'1rem' }}>⏰</div>
        <h2 className="fadeUp" style={e.pregunta}>¿A qué hora naciste?</h2>
        <p className="fadeUp" style={e.descripcion}>Con la hora calculamos tu ascendente.</p>
        {!noSabe && <input className="fadeUp" style={e.input} type="time" value={hora} onChange={(ev) => setHora(ev.target.value)}/>}
        <div style={e.checkboxFila}>
          <input type="checkbox" id="noSabe" checked={noSabe} onChange={(ev) => setNoSabe(ev.target.checked)} style={{ marginRight:'8px', width:'18px', height:'18px', accentColor:C.rose }}/>
          <label htmlFor="noSabe" style={{ color:C.textMid, fontSize:'14px', fontWeight:'500' }}>No sé mi hora de nacimiento</label>
        </div>
        <button style={e.botonRose} onClick={() => onSiguiente(noSabe ? null : hora || null)}>Continuar →</button>
      </div>
    </div>
  )
}

function PantallaCiudad({ nombre, onSiguiente }) {
  const [ciudad, setCiudad] = useState('')
  return (
    <div style={{ minHeight:'100vh', background:C.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'420px', width:'100%', textAlign:'center' }}>
        <div style={e.stepIndicator}>4 de 6</div>
        <div className="bounceIn" style={{ fontSize:'4rem', marginBottom:'1rem' }}>🌍</div>
        <h2 className="fadeUp" style={e.pregunta}>¿En qué ciudad naciste?</h2>
        <p className="fadeUp" style={e.descripcion}>El lugar completa tu carta astral.</p>
        <input className="fadeUp" style={e.input} type="text" placeholder="Ciudad, País..." value={ciudad}
          onChange={(ev) => setCiudad(ev.target.value)}
          onKeyDown={(ev) => ev.key==='Enter' && ciudad.trim() && onSiguiente(ciudad.trim())} autoFocus/>
        <button style={{...e.botonRose, opacity:ciudad.trim()?1:0.5}} onClick={() => ciudad.trim() && onSiguiente(ciudad.trim())}>Continuar →</button>
      </div>
    </div>
  )
}

function PantallaCheckIn({ nombre, onSiguiente }) {
  const [emocion, setEmocion] = useState('')
  return (
    <div style={{ minHeight:'100vh', background:C.bg, padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'480px', margin:'0 auto' }}>
        <div style={e.stepIndicator}>5 de 6</div>
        <h2 className="fadeUp" style={{ ...e.pregunta, textAlign:'center' }}>¿Cómo te sientes hoy, {nombre}?</h2>
        <p className="fadeUp" style={{ ...e.descripcion, textAlign:'center' }}>Tu estado emocional guía tu misión del día.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
          {EMOCIONES.map((em, i) => (
            <div key={em.id} style={{ animation:`fadeUp 0.4s ${i*0.04}s both` }}>
              <EmocionShape emocion={em} seleccionada={emocion} onClick={setEmocion}/>
            </div>
          ))}
        </div>
        <button style={{...e.botonRose, opacity:emocion?1:0.5, transition:'all 0.3s'}}
          onClick={() => emocion && onSiguiente(emocion)}>
          {emocion ? `Me siento ${EMOCIONES.find(em=>em.id===emocion)?.label} →` : 'Elige cómo te sientes'}
        </button>
      </div>
    </div>
  )
}

function PantallaObjetivo({ nombre, onSiguiente }) {
  const [objetivo, setObjetivo] = useState('')
  return (
    <div style={{ minHeight:'100vh', background:C.bg, padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'480px', margin:'0 auto' }}>
        <div style={e.stepIndicator}>6 de 6</div>
        <div className="bounceIn" style={{ fontSize:'2.5rem', textAlign:'center', marginBottom:'0.5rem' }}>🎯</div>
        <h2 className="fadeUp" style={{ ...e.pregunta, textAlign:'center' }}>¿Qué quieres transformar?</h2>
        <p className="fadeUp" style={{ ...e.descripcion, textAlign:'center' }}>
          Tu primera piedra es <strong style={{ color:C.rose }}>gratis</strong>. Cada objetivo tiene su gema perfecta.
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1rem' }}>
          {OBJETIVOS.map((obj, i) => (
            <div key={obj.id} onClick={() => setObjetivo(obj.id)}
              style={{ animation:`fadeUp 0.4s ${i*0.07}s both`, background: objetivo===obj.id ? obj.color : C.bgCard,
                border:`3px solid ${objetivo===obj.id ? obj.color : C.border}`, borderRadius:'18px', padding:'1rem',
                cursor:'pointer', transition:'all 0.3s cubic-bezier(.34,1.56,.64,1)',
                transform: objetivo===obj.id ? 'scale(1.04)' : 'scale(1)',
                boxShadow: objetivo===obj.id ? `0 8px 24px ${obj.color}66` : '0 2px 8px rgba(0,0,0,0.06)',
              }}>
              <div style={{ fontSize:'2rem', marginBottom:'6px' }}>{obj.emoji}</div>
              <div style={{ fontSize:'13px', fontWeight:'700', color: objetivo===obj.id ? '#fff' : C.text }}>{obj.titulo}</div>
              <div style={{ fontSize:'11px', color: objetivo===obj.id ? 'rgba(255,255,255,0.85)' : C.textMid, marginTop:'3px' }}>{obj.piedra.nombre}</div>
              <div style={{ display:'inline-block', fontSize:'10px', fontWeight:'700', marginTop:'6px',
                background: objetivo===obj.id ? 'rgba(255,255,255,0.25)' : (obj.libre ? C.tealLight : C.amberLight),
                color: objetivo===obj.id ? '#fff' : (obj.libre ? C.tealDark : C.amberDark),
                padding:'2px 8px', borderRadius:'20px' }}>
                {obj.libre ? '✓ Gratis' : 'Premium'}
              </div>
            </div>
          ))}
        </div>
        {objetivo && (
          <div className="bounceIn" style={{ background: OBJETIVOS.find(o=>o.id===objetivo)?.color, borderRadius:'14px', padding:'0.85rem 1rem', marginBottom:'1rem', textAlign:'center' }}>
            <span style={{ fontSize:'1.5rem' }}>{OBJETIVOS.find(o=>o.id===objetivo)?.piedra.emoji}</span>
            <span style={{ fontSize:'14px', fontWeight:'700', color:'#fff', marginLeft:'8px' }}>
              Tu piedra: {OBJETIVOS.find(o=>o.id===objetivo)?.piedra.nombre}
            </span>
          </div>
        )}
        <button style={{...e.botonRose, opacity:objetivo?1:0.5}} onClick={() => objetivo && onSiguiente(objetivo)}>
          {objetivo ? 'Activar mi SoulStone →' : 'Elige tu objetivo'}
        </button>
      </div>
    </div>
  )
}

function PantallaCartaAstral({ perfil, onEntrar }) {
  const { signo, emoji, elemento } = calcularSigno(perfil.fecha)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(145deg, ${objData?.color || C.rose} 0%, ${C.purple} 100%)`, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 1rem' }}>
      <div style={{ maxWidth:'420px', width:'100%', textAlign:'center' }}>
        <div className="bounceIn" style={{ fontSize:'4rem', marginBottom:'0.5rem' }}>🔮</div>
        <h2 className="fadeUp" style={{ fontSize:'26px', fontWeight:'800', color:'#fff', marginBottom:'4px' }}>¡Tu alma está lista!</h2>
        <p className="fadeUp" style={{ color:'rgba(255,255,255,0.85)', fontSize:'14px', marginBottom:'1.5rem' }}>Tu gema ha sido elegida por el universo</p>
        <div className="fadeUp" style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', borderRadius:'20px', padding:'1.25rem', marginBottom:'1rem', border:'1px solid rgba(255,255,255,0.3)' }}>
          <div style={{ display:'flex', justifyContent:'space-around', marginBottom:'1rem' }}>
            {[{label:'Signo',val:`${emoji} ${signo}`},{label:'Elemento',val:elemento},{label:'Ciudad',val:perfil.ciudad}].map((item,i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'14px', fontWeight:'700', color:'#fff' }}>{item.val}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.7)', marginTop:'2px' }}>{item.label}</div>
              </div>
            ))}
          </div>
          {objData && (
            <div className="bounceIn" style={{ background:'rgba(255,255,255,0.2)', borderRadius:'14px', padding:'1rem', textAlign:'center' }}>
              <div style={{ fontSize:'3.5rem', marginBottom:'6px' }}>{objData.piedra.emoji}</div>
              <div style={{ fontSize:'18px', fontWeight:'800', color:'#fff' }}>{objData.piedra.nombre}</div>
              <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.85)', marginTop:'4px', fontStyle:'italic' }}>{objData.piedra.afirmacion}</div>
            </div>
          )}
        </div>
        <button className="bounceIn" style={{...e.botonRose, background:'#fff', color:objData?.color||C.rose, fontSize:'16px', fontWeight:'900', boxShadow:'0 8px 32px rgba(0,0,0,0.2)'}} onClick={onEntrar}>
          ✨ Entrar a SoulStone
        </button>
      </div>
    </div>
  )
}

// ================================
// HOME
// ================================
function PantallaHome({ perfil, xp, setXp }) {
  const { signo, emoji } = calcularSigno(perfil.fecha)
  const nivel = getNivel(xp)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const transitos = getTransitosDia()
  const [misiones, setMisiones] = useState(
    (objData?.piedra.misiones||[]).map(m=>({...m,hecho:false,mostrarMensaje:false}))
  )
  const [confetti, setConfetti] = useState(false)
  const [floatXP, setFloatXP] = useState({ visible:false, puntos:0 })
  const completadas = misiones.filter(m=>m.hecho).length
  const siguienteNivel = NIVELES[NIVELES.indexOf(nivel)+1]
  const scoreEspiritual = Math.min(Math.round((xp/300)*10+(completadas/misiones.length)*3),10)

  const completar = (i) => {
    const nuevas = [...misiones]
    if (!nuevas[i].hecho) {
      nuevas[i].hecho = true
      nuevas[i].mostrarMensaje = true
      setMisiones(nuevas)
      setXp(prev=>prev+40)
      setFloatXP({ visible:true, puntos:40 })
      setTimeout(() => setFloatXP({ visible:false, puntos:0 }), 1500)
      if (nuevas.every(m=>m.hecho)) {
        setTimeout(() => {
          setConfetti(true)
          setXp(prev=>prev+100)
          setFloatXP({ visible:true, puntos:100 })
          setTimeout(() => { setConfetti(false); setFloatXP({ visible:false, puntos:0 }) }, 2500)
        }, 400)
      }
    }
  }

  return (
    <div style={e.seccion}>
      <Confetti active={confetti}/>
      <FloatXP puntos={floatXP.puntos} visible={floatXP.visible}/>

      {/* Header */}
      <div className="fadeUp" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
        <div>
          <h2 style={{ fontSize:'24px', fontWeight:'800', color:C.text, marginBottom:'2px' }}>
            Hola, {perfil.nombre} {objData?.emoji}
          </h2>
          <p style={{ color:C.textSoft, fontSize:'13px', fontWeight:'500' }}>{emoji} {signo} · {nivel.emoji} {nivel.nombre}</p>
        </div>
        <div className="pulse" style={{ background: objData?.color||C.rose, borderRadius:'50%', width:'46px', height:'46px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', boxShadow:`0 4px 16px ${objData?.color||C.rose}66` }}>
          {objData?.piedra.emoji}
        </div>
      </div>

      {/* Score card vibrante */}
      <AnimCard color={objData?.color||C.rose} delay={0}>
        <div style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
          <ScoreCircular valor={scoreEspiritual} max={10} color={objData?.color||C.rose} label="Score" size={95}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'14px', fontWeight:'700', color:C.text, marginBottom:'4px' }}>Score espiritual</div>
            <div style={{ fontSize:'13px', color:C.textMid, marginBottom:'10px' }}>
              {scoreEspiritual>=8?'🌟 ¡Energía altísima!':scoreEspiritual>=5?'💫 Vas muy bien':'🌱 Sigue creciendo'}
            </div>
            <div style={{ fontSize:'12px', color:C.textSoft, marginBottom:'6px' }}>
              {xp} XP · {siguienteNivel?`${siguienteNivel.min-xp} para ${siguienteNivel.nombre}`:'¡Máximo!'}
            </div>
            <BarraProgreso valor={xp-nivel.min} max={(siguienteNivel?.min||nivel.max+1)-nivel.min} color={objData?.color||C.rose} altura={8}/>
          </div>
        </div>
      </AnimCard>

      {/* Tránsito */}
      <AnimCard color={C.amber} delay={80}>
        <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
          <div style={{ background:C.amber, width:'38px', height:'38px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', flexShrink:0 }}>🪐</div>
          <div>
            <div style={{ fontSize:'12px', fontWeight:'700', color:C.amberDark, marginBottom:'3px' }}>{transitos[0].planeta} {transitos[0].posicion}</div>
            <div style={{ fontSize:'12px', color:C.textMid, lineHeight:'1.5' }}>{transitos[0].explicacion}</div>
          </div>
        </div>
      </AnimCard>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem', marginBottom:'1rem' }}>
        {[
          { icon:'🔥', val:'1', label:'Racha', color:C.rose },
          { icon:'⚡', val:String(xp), label:'XP total', color:C.purple },
          { icon:'🎯', val:`${completadas}/${misiones.length}`, label:'Misiones', color:objData?.color||C.teal },
        ].map((s,i) => (
          <div key={i} className="fadeUp" style={{ animation:`fadeUp 0.4s ${i*0.08+0.2}s both`, background:s.color, borderRadius:'16px', padding:'0.85rem', textAlign:'center', boxShadow:`0 4px 16px ${s.color}55` }}>
            <div style={{ fontSize:'1.4rem', marginBottom:'2px' }}>{s.icon}</div>
            <div style={{ fontSize:'20px', fontWeight:'800', color:'#fff' }}>{s.val}</div>
            <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.85)', fontWeight:'600' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Afirmación */}
      <AnimCard color={objData?.color||C.rose} delay={200} style={{ background:`linear-gradient(135deg, ${objData?.color||C.rose}, ${C.purple})`, border:'none' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'1.8rem', marginBottom:'6px' }}>{objData?.piedra.emoji}</div>
          <p style={{ color:'#fff', fontSize:'15px', fontStyle:'italic', lineHeight:'1.7', fontWeight:'500' }}>
            {objData?.piedra.afirmacion}
          </p>
        </div>
      </AnimCard>

      {/* Misiones */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
        <h3 style={{ fontSize:'17px', fontWeight:'800', color:C.text }}>⚡ Misiones de hoy</h3>
        <span style={{ background:C.purple, color:'#fff', fontSize:'11px', fontWeight:'700', padding:'4px 10px', borderRadius:'20px' }}>+100 XP bonus</span>
      </div>
      <div style={{ marginBottom:'1rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'12px', color:C.textSoft, marginBottom:'5px', fontWeight:'600' }}>
          <span>{completadas} de {misiones.length}</span>
          <span>{Math.round((completadas/misiones.length)*100)}%</span>
        </div>
        <BarraProgreso valor={completadas} max={misiones.length} color={objData?.color||C.rose} altura={10}/>
      </div>

      {misiones.map((m,i) => (
        <div key={i} style={{ animation:`fadeUp 0.4s ${i*0.08+0.3}s both` }}>
          <div style={{
            background: m.hecho ? (objData?.color||C.rose) : C.bgCard,
            border:`2.5px solid ${m.hecho?(objData?.color||C.rose):C.border}`,
            borderRadius:'18px', padding:'1rem', marginBottom:'0.4rem',
            display:'flex', alignItems:'center', gap:'12px',
            boxShadow: m.hecho ? `0 6px 20px ${objData?.color||C.rose}44` : '0 2px 8px rgba(0,0,0,0.05)',
            transition:'all 0.4s cubic-bezier(.34,1.56,.64,1)',
          }}>
            <div style={{
              width:'44px', height:'44px', borderRadius:'14px', flexShrink:0,
              background: m.hecho ? 'rgba(255,255,255,0.25)' : (objData?.color||C.rose),
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.3rem',
              transition:'all 0.3s',
            }}>
              {m.hecho ? '✅' : ['🌬️','🌿','❤️','🧘'][i%4]}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'14px', fontWeight:'700', color: m.hecho?'#fff':C.text }}>{m.texto}</div>
              <div style={{ fontSize:'12px', color: m.hecho?'rgba(255,255,255,0.8)':'rgba(255,77,141,0.8)', marginTop:'2px', fontWeight:'600' }}>+40 XP</div>
            </div>
            <button onClick={() => completar(i)} style={{
              padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:'700',
              cursor: m.hecho?'default':'pointer',
              background: m.hecho ? 'rgba(255,255,255,0.25)' : (objData?.color||C.rose),
              color: m.hecho ? '#fff' : '#fff',
              border: m.hecho ? '2px solid rgba(255,255,255,0.4)' : `2px solid ${objData?.color||C.rose}`,
              transition:'all 0.2s',
              boxShadow: m.hecho ? 'none' : `0 4px 12px ${objData?.color||C.rose}55`,
            }}>
              {m.hecho ? '✓' : 'Hacer'}
            </button>
          </div>
          {m.mostrarMensaje && (
            <div className="slideLeft" style={{ background:C.teal, borderRadius:'14px', padding:'0.85rem 1rem', marginTop:'-0.3rem', marginBottom:'0.6rem', borderTopLeftRadius:'4px', borderTopRightRadius:'4px', boxShadow:`0 4px 16px ${C.teal}44` }}>
              <p style={{ fontSize:'13px', color:'#fff', lineHeight:'1.6', margin:0, fontStyle:'italic', fontWeight:'500' }}>
                {m.mensaje}
              </p>
            </div>
          )}
        </div>
      ))}

      {completadas===misiones.length && (
        <div className="bounceIn" style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.green})`, borderRadius:'20px', padding:'1.5rem', textAlign:'center', marginTop:'0.5rem', boxShadow:`0 8px 32px ${C.teal}55` }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'8px' }}>🎉</div>
          <div style={{ fontSize:'16px', fontWeight:'800', color:'#fff', marginBottom:'4px' }}>¡Todas las misiones completadas!</div>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)' }}>+100 XP bonus ganado · ¡Eres imparable!</div>
        </div>
      )}
    </div>
  )
}

// ================================
// JOURNAL
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
    {id:'general',emoji:'📝',label:'General',color:C.purple},
    {id:'trabajo',emoji:'💼',label:'Trabajo',color:C.blue},
    {id:'relaciones',emoji:'❤️',label:'Relaciones',color:C.rose},
    {id:'suenos',emoji:'🌙',label:'Sueños',color:'#7B1FA2'},
    {id:'miedo',emoji:'🦋',label:'Miedos',color:C.amber},
    {id:'logro',emoji:'🏆',label:'Logros',color:C.teal},
  ]

  const generarGuia = (texto) => {
    const lower = texto.toLowerCase()
    const t = transitos[0]
    const ctx = `Con ${t.planeta} ${t.posicion} hoy`
    const esTrabajo = lower.includes('trabajo')||lower.includes('entrevista')||lower.includes('jefe')||lower.includes('proyecto')
    const esAmor = lower.includes('amor')||lower.includes('pareja')||lower.includes('relación')||lower.includes('senti')
    const esMiedo = lower.includes('miedo')||lower.includes('ansiedad')||lower.includes('nervios')||lower.includes('preocup')
    const esLogro = lower.includes('logré')||lower.includes('conseguí')||lower.includes('pude')||lower.includes('terminé')
    const p=objData?.piedra.emoji||'💗', pn=objData?.piedra.nombre||'tu piedra', af=objData?.piedra.afirmacion||''

    if (esTrabajo&&esMiedo) return `${ctx}, los astros favorecen la comunicación auténtica sobre la perfecta. ${signo} tiende a ser más dura consigo misma antes de los grandes momentos.\n\nSostén tu ${pn} ${p} y recuerda: ya llegaste hasta aquí por algo. No necesitas ser perfecta, necesitas ser real.\n\nLos tránsitos de hoy sugieren confiar en tu primera respuesta intuitiva.`
    if (esTrabajo) return `${ctx}, el universo está alineando las piezas correctas.\n\nTu ${pn} ${p} amplifica tu capacidad de comunicarte con claridad hoy.\n\nAntes de ese momento, respira 3 veces y repite: ${af}`
    if (esAmor&&esMiedo) return `${ctx}, Venus favorece las conversaciones desde el corazón.\n\nTu ${pn} ${p} te recuerda que el amor real no requiere perfección — requiere honestidad.\n\nHoy es buen día para decir lo que sientes de verdad.`
    if (esAmor) return `${ctx}, las energías ampllifican la conexión emocional genuina.\n\nTu ${pn} ${p} te recuerda que mereces el mismo amor que das.\n\nConfía en lo que sientes — los astros respaldan las decisiones del corazón.`
    if (esMiedo) return `${ctx}, la energía es perfecta para transformar el miedo en claridad.\n\nTu ${pn} ${p} absorbe esa ansiedad. Inhala 4s, retén 4s, exhala 4s. Repite: ${af}`
    if (esLogro) return `${ctx}, los astros celebran contigo. Los logros no son accidentes.\n\nTu ${pn} ${p} amplifica esta energía de éxito — déjala cerca hoy.`
    return `${ctx}, hay una energía particular que resuena con lo que describes.\n\nTu ${pn} ${p} te acompaña en este proceso.\n\nRecuerda: ${af}`
  }

  const guardar = () => {
    if (!texto.trim()) return
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
      <h2 className="fadeUp" style={e.tituloPantalla}>📓 Journal del Alma</h2>
      <AnimCard color={C.amber} delay={0}>
        <div style={{ fontSize:'12px', fontWeight:'700', color:C.amberDark, marginBottom:'8px' }}>🪐 Energía astral ahora:</div>
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {transitos.map((t,i) => (
            <span key={i} style={{ background:C.amber, color:'#fff', fontSize:'11px', fontWeight:'700', padding:'4px 10px', borderRadius:'20px' }}>
              {t.planeta} {t.posicion}
            </span>
          ))}
        </div>
      </AnimCard>

      <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', marginBottom:'0.75rem' }}>
        {categorias.map(c => (
          <button key={c.id} onClick={() => setCategoria(c.id)} style={{
            padding:'7px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer',
            background: categoria===c.id ? c.color : C.bgCard,
            color: categoria===c.id ? '#fff' : C.textMid,
            border:`2px solid ${categoria===c.id ? c.color : C.border}`,
            transition:'all 0.2s', boxShadow: categoria===c.id ? `0 4px 12px ${c.color}55` : 'none',
          }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <textarea style={{...e.input,minHeight:'120px',resize:'vertical',fontFamily:'inherit',lineHeight:'1.6'}}
        placeholder={`¿Qué tienes en mente, ${perfil.nombre}? (+25 XP por entrada)`}
        value={texto} onChange={(ev)=>setTexto(ev.target.value)}/>
      <button style={e.botonRose} onClick={guardar}>Recibir guía astral {objData?.piedra.emoji}</button>

      {entradas.map((entrada,idx) => (
        <AnimCard key={entrada.id} color={entrada.catData?.color} delay={idx*60}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <div style={{ width:'30px', height:'30px', borderRadius:'10px', background:entrada.catData?.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>
                {entrada.catData?.emoji}
              </div>
              <span style={{ fontSize:'12px', color:C.textSoft, fontWeight:'500' }}>{entrada.fecha} · {entrada.hora}</span>
            </div>
            <span style={{ background:entrada.catData?.color, color:'#fff', fontSize:'10px', fontWeight:'700', padding:'3px 8px', borderRadius:'20px' }}>{entrada.catData?.label}</span>
          </div>
          <span style={{ background:C.amber, color:'#fff', fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', display:'inline-block', marginBottom:'8px' }}>
            🪐 {entrada.transito?.planeta} {entrada.transito?.posicion}
          </span>
          <p style={{ fontSize:'14px', color:C.text, lineHeight:'1.6', marginBottom:'12px', fontStyle:'italic', fontWeight:'500' }}>"{entrada.texto}"</p>
          <div style={{ background:`linear-gradient(135deg, ${objData?.color||C.rose}, ${C.purple})`, borderRadius:'14px', padding:'1rem' }}>
            <div style={{ fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.85)', marginBottom:'6px' }}>
              {objData?.piedra.emoji} Guía astral:
            </div>
            <p style={{ fontSize:'13px', color:'#fff', lineHeight:'1.7', fontStyle:'italic', whiteSpace:'pre-line', margin:0 }}>{entrada.guia}</p>
          </div>
        </AnimCard>
      ))}

      {entradas.length===0 && (
        <div style={{ textAlign:'center', padding:'2rem', color:C.textSoft }}>
          <div style={{ fontSize:'3rem', marginBottom:'8px' }}>📓</div>
          <p style={{ fontSize:'13px', fontWeight:'500' }}>Tu primera entrada activa la guía astral personalizada</p>
        </div>
      )}
    </div>
  )
}

// ================================
// PIEDRAS
// ================================
function PantallaPiedras({ perfil }) {
  const [seleccionada, setSeleccionada] = useState(null)
  const objActual = OBJETIVOS.find(o=>o.id===perfil.objetivo)

  return (
    <div style={e.seccion}>
      <h2 className="fadeUp" style={e.tituloPantalla}>💎 Tienda de Piedras</h2>
      <p className="fadeUp" style={{ fontSize:'13px', color:C.textMid, marginBottom:'1.25rem', fontWeight:'500' }}>
        Cada piedra desbloquea un objetivo de vida y misiones únicas.
      </p>

      {objActual && (
        <AnimCard color={C.teal} delay={0} style={{ background:`linear-gradient(135deg, ${objActual.color}, ${C.purple})`, border:'none' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ fontSize:'3.5rem' }}>{objActual.piedra.emoji}</div>
            <div style={{ flex:1 }}>
              <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px' }}>✓ Activa ahora</span>
              <div style={{ fontSize:'18px', fontWeight:'800', color:'#fff', marginTop:'4px' }}>{objActual.piedra.nombre}</div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.85)' }}>{objActual.titulo}</div>
            </div>
          </div>
        </AnimCard>
      )}

      {OBJETIVOS.map((obj,i) => {
        const esActiva = obj.id===perfil.objetivo
        const abierta = seleccionada?.id===obj.id
        return (
          <div key={obj.id} className="fadeUp" style={{ animation:`fadeUp 0.4s ${i*0.06}s both` }}>
            <div onClick={() => setSeleccionada(abierta?null:obj)} style={{
              background: esActiva||abierta ? obj.color : C.bgCard,
              border:`2.5px solid ${esActiva||abierta?obj.color:C.border}`,
              borderRadius:'18px', padding:'1rem 1.25rem', marginBottom:'0.75rem',
              cursor:'pointer', transition:'all 0.3s cubic-bezier(.22,1,.36,1)',
              boxShadow: esActiva||abierta ? `0 8px 24px ${obj.color}55` : '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width:'52px', height:'52px', borderRadius:'16px', background: esActiva||abierta?'rgba(255,255,255,0.25)':obj.colorLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem', flexShrink:0 }}>
                  {obj.piedra.emoji}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap', marginBottom:'3px' }}>
                    <span style={{ fontSize:'15px', fontWeight:'800', color: esActiva||abierta?'#fff':C.text }}>{obj.piedra.nombre}</span>
                    {esActiva && <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px' }}>Activa</span>}
                    {!esActiva&&obj.libre && <span style={{ background:C.teal, color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px' }}>Gratis</span>}
                    {!obj.libre&&!esActiva && <span style={{ background:C.amber, color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px' }}>Premium</span>}
                  </div>
                  <div style={{ fontSize:'12px', color: esActiva||abierta?'rgba(255,255,255,0.85)':C.textSoft, fontWeight:'500' }}>{obj.titulo}</div>
                </div>
                <div style={{ fontSize:'18px', color: esActiva||abierta?'rgba(255,255,255,0.7)':C.textSoft }}>
                  {abierta?'∧':'∨'}
                </div>
              </div>

              {abierta && (
                <div className="fadeIn" style={{ marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.25)' }}>
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.7', marginBottom:'12px', fontWeight:'500' }}>{obj.piedra.marketing}</p>
                  <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:'12px', padding:'0.85rem', marginBottom:'12px' }}>
                    <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.7)', fontWeight:'700', marginBottom:'4px' }}>Afirmación:</div>
                    <div style={{ fontSize:'13px', color:'#fff', fontStyle:'italic', fontWeight:'500' }}>{obj.piedra.afirmacion}</div>
                  </div>
                  <div style={{ fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.8)', marginBottom:'8px' }}>Misiones que desbloquea:</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'12px' }}>
                    {obj.piedra.misiones.map((m,i) => (
                      <div key={i} style={{ background:'rgba(255,255,255,0.15)', borderRadius:'10px', padding:'8px 10px', fontSize:'12px', color:'#fff', fontWeight:'500' }}>
                        ✦ {m.texto}
                      </div>
                    ))}
                  </div>
                  {!esActiva && (
                    <button style={{...e.botonRose, background:'#fff', color:obj.color, fontWeight:'800'}}>
                      {obj.libre?'Activar gratis':'Desbloquear · $2.99 🔒'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}

      <AnimCard color={C.amber} delay={400} style={{ background:`linear-gradient(135deg, ${C.amber}, ${C.coral})`, border:'none' }}>
        <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
          <div style={{ fontSize:'2.5rem' }}>⭐</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'16px', fontWeight:'800', color:'#fff', marginBottom:'4px' }}>Plan Alma — $9.99/mes</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', marginBottom:'12px' }}>
              Todas las piedras + carta astral + journal ilimitado + Círculos premium
            </div>
            <button style={{...e.botonRose, background:'#fff', color:C.amberDark, fontWeight:'800'}}>Ver Plan Alma →</button>
          </div>
        </div>
      </AnimCard>
    </div>
  )
}

// ================================
// ASTRAL
// ================================
function PantallaAstral({ perfil }) {
  const { signo, emoji, elemento } = calcularSigno(perfil.fecha)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const numeros = numerossuerte(perfil.fecha, signo)
  const transitos = getTransitosDia()
  const hoy = new Date()
  const numColors = [C.rose, C.purple, C.amber]

  const favoreceMap = {
    amor:{tema:'❤️ Amor y relaciones',texto:'Venus activo amplifica las conexiones emocionales. Ideal para una conversación sincera o un gesto romántico.'},
    abundancia:{tema:'💰 Finanzas',texto:'Mercurio directo favorece negociaciones. Presenta propuestas o revisa tu situación financiera hoy.'},
    bienestar:{tema:'🌿 Salud',texto:'Los tránsitos activan tu vitalidad. Aprovecha para implementar un hábito nuevo.'},
    paz:{tema:'🧘 Mente',texto:'La energía invita a la introspección. Meditar puede revelarte insights importantes.'},
    crecimiento:{tema:'🌱 Aprendizaje',texto:'El día favorece el aprendizaje práctico. Estudia o desarrolla una habilidad nueva.'},
    espiritual:{tema:'✨ Espíritu',texto:'Tu intuición está en su punto más alto hoy. Escucha esas señales sutiles.'},
  }
  const favorece = favoreceMap[perfil.objetivo]||favoreceMap.paz
  const consejos = [
    'Hoy puedes sentirte más cansada de lo usual — tómatelo con calma.',
    'Tu energía social está elevada. Es buen momento para conectar.',
    'Evita decisiones impulsivas hoy. La paciencia es tu mejor aliada.',
    'Una caminata en la naturaleza te puede renovar completamente.',
    'Tu intuición está especialmente activa — confía en tus impulsos.',
    'Es un día favorable para cerrar ciclos y soltar lo que ya no sirve.',
    'La creatividad fluye con fuerza hoy. Crea, escribe o diseña algo.',
  ]

  return (
    <div style={e.seccion}>
      <h2 className="fadeUp" style={e.tituloPantalla}>🌙 Tu carta astral</h2>

      <AnimCard color={C.purple} delay={0} style={{ background:`linear-gradient(135deg, ${C.purple}, #1A0533)`, border:'none' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'1rem' }}>
          <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', border:'3px solid rgba(255,255,255,0.4)' }}>
            {emoji}
          </div>
          <div>
            <div style={{ fontSize:'20px', fontWeight:'800', color:'#fff' }}>{signo}</div>
            <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)', fontWeight:'500' }}>Elemento {elemento} · {perfil.ciudad}</div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[{label:'Objetivo',val:objData?.titulo},{label:'Tu gema',val:`${objData?.piedra.emoji} ${objData?.piedra.nombre}`}].map((item,i) => (
            <div key={i} style={{ background:'rgba(255,255,255,0.15)', borderRadius:'12px', padding:'8px 10px' }}>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.65)', marginBottom:'2px', fontWeight:'600' }}>{item.label}</div>
              <div style={{ fontSize:'13px', fontWeight:'700', color:'#fff' }}>{item.val}</div>
            </div>
          ))}
        </div>
      </AnimCard>

      <h3 style={{ fontSize:'16px', fontWeight:'800', color:C.text, marginBottom:'0.75rem' }}>🎲 Tus números de hoy</h3>
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem' }}>
        {numeros.map((n,i) => (
          <div key={i} className="bounceIn" style={{ flex:1, background:numColors[i], borderRadius:'18px', padding:'1.25rem 0.5rem', textAlign:'center', boxShadow:`0 6px 20px ${numColors[i]}66`, animation:`bounceIn 0.5s ${i*0.12}s both` }}>
            <div style={{ fontSize:'32px', fontWeight:'900', color:'#fff' }}>{n}</div>
            <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.85)', fontWeight:'700', marginTop:'3px' }}>Número {i+1}</div>
          </div>
        ))}
      </div>

      <AnimCard color={objData?.color||C.rose} delay={100} style={{ background:`linear-gradient(135deg, ${objData?.color||C.rose}, ${C.amber})`, border:'none' }}>
        <div style={{ fontSize:'14px', fontWeight:'800', color:'#fff', marginBottom:'6px' }}>⭐ Hoy te favorece en:</div>
        <div style={{ fontSize:'15px', fontWeight:'800', color:'#fff', marginBottom:'6px' }}>{favorece.tema}</div>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', margin:0, fontWeight:'500' }}>{favorece.texto}</p>
      </AnimCard>

      <h3 style={{ fontSize:'16px', fontWeight:'800', color:C.text, marginBottom:'0.75rem' }}>🪐 Tránsitos de hoy</h3>
      {transitos.map((t,i) => (
        <AnimCard key={i} color={[C.rose,C.purple,C.amber][i]} delay={i*80} style={{ background:[C.rose,C.purple,C.amber][i], border:'none' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
            <span style={{ fontSize:'15px', fontWeight:'800', color:'#fff' }}>{t.planeta}</span>
            <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px' }}>{t.posicion}</span>
          </div>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.5', margin:0, fontWeight:'500' }}>{t.explicacion}</p>
        </AnimCard>
      ))}

      <AnimCard color={C.teal} delay={300} style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.green})`, border:'none' }}>
        <div style={{ fontSize:'13px', fontWeight:'800', color:'#fff', marginBottom:'6px' }}>💡 Consejo de los astros:</div>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', fontStyle:'italic', margin:0, fontWeight:'500' }}>
          {consejos[hoy.getDay()%consejos.length]}
        </p>
      </AnimCard>
    </div>
  )
}

// ================================
// CÍRCULOS
// ================================
function PantallaCirculos({ perfil, xp, setXp }) {
  const [vista, setVista] = useState('lobby')
  const [tabCirculo, setTabCirculo] = useState('energia')
  const [toast, setToast] = useState('')
  const [juegoActivo, setJuegoActivo] = useState(null)
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)
  const { signo } = calcularSigno(perfil.fecha)
  const transitos = getTransitosDia()

  const mostrarToast = (msg) => { setToast(msg); setTimeout(()=>setToast(''),2800) }
  const ganarXP = (puntos, msg) => { setXp(prev=>prev+puntos); mostrarToast(msg||`+${puntos} XP ✨`) }

  const miembros = [
    { iniciales:(perfil.nombre||'TU').substring(0,2).toUpperCase(), nombre:perfil.nombre+' (tú)', piedra:objData?.piedra.emoji+' '+objData?.piedra.nombre, signo, color:C.rose },
    { iniciales:'VM', nombre:'Valeria M.', piedra:'💗 Cuarzo Rosa', signo:'Libra', color:C.purple },
    { iniciales:'MS', nombre:'Marco S.', piedra:'💜 Amatista', signo:'Piscis', color:C.teal },
  ]

  if (juegoActivo) return (
    <SimulacionJuego juego={juegoActivo} perfil={perfil} miembros={miembros} transitos={transitos}
      onSalir={(xpG) => { setJuegoActivo(null); if(xpG) ganarXP(xpG,`¡Juego completado! +${xpG} XP`) }}/>
  )

  if (vista==='lobby') return (
    <div style={e.seccion}>
      {toast && <div style={e.toast}>{toast}</div>}
      <h2 className="fadeUp" style={e.tituloPantalla}>🔮 Círculos de Energía</h2>
      <p className="fadeUp" style={{ fontSize:'13px', color:C.textMid, marginBottom:'1.25rem', fontWeight:'500' }}>
        Reúnete con amigas en tiempo real. Compatibilidad astral, juegos y rituales grupales.
      </p>
      <AnimCard color={C.teal} delay={0} style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.green})`, border:'none', cursor:'pointer' }} onClick={()=>setVista('sala')}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:'16px', fontWeight:'800', color:'#fff', marginBottom:'3px' }}>🌿 Retiro Valle Sagrado</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.85)', fontWeight:'500' }}>3 participantes · Compatibilidad 87%</div>
          </div>
          <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'5px 12px', borderRadius:'20px' }}>● En vivo</span>
        </div>
      </AnimCard>
      <button style={e.botonRose} onClick={()=>setVista('sala')}>+ Crear nuevo círculo</button>
      <button style={{...e.botonRose, background:'transparent', color:C.rose, border:`2.5px solid ${C.rose}`, marginTop:'0.5rem', boxShadow:'none'}}
        onClick={()=>mostrarToast('Ingresa el código del círculo')}>
        Unirme con código
      </button>
      <AnimCard color={C.border} delay={200}>
        <div style={{ fontSize:'13px', color:C.textMid, lineHeight:'2', fontWeight:'500' }}>
          <div>✅ <span style={{ fontWeight:'700', color:C.text }}>Gratis:</span> Círculos de 3, 2 juegos, chat grupal</div>
          <div>🔒 <span style={{ fontWeight:'700', color:C.amberDark }}>Premium:</span> 20 personas, todos los juegos, rituales</div>
        </div>
      </AnimCard>
    </div>
  )

  return (
    <div style={e.seccion}>
      {toast && <div style={e.toast}>{toast}</div>}
      <button onClick={()=>setVista('lobby')} style={{ background:'none', border:'none', color:C.rose, fontSize:'13px', cursor:'pointer', marginBottom:'1rem', padding:0, fontWeight:'700' }}>
        ← Mis círculos
      </button>
      <AnimCard color={C.teal} delay={0}>
        <div style={{ fontSize:'16px', fontWeight:'800', color:C.text, marginBottom:'4px' }}>🌿 Retiro Valle Sagrado</div>
        <div style={{ fontSize:'12px', color:C.textSoft, marginBottom:'0.75rem', fontWeight:'500' }}>
          Código: <strong style={{ color:C.rose, letterSpacing:'0.12em' }}>LUNA42</strong>
        </div>
        {miembros.map((m,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'7px 0', borderBottom:i<miembros.length-1?`1px solid ${C.border}`:'none' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:C.success, flexShrink:0 }}/>
            <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:m.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'800', flexShrink:0, boxShadow:`0 3px 10px ${m.color}66` }}>
              {m.iniciales}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'13px', fontWeight:'700', color:C.text }}>{m.nombre}</div>
              <div style={{ fontSize:'11px', color:C.textSoft, fontWeight:'500' }}>{m.signo} · {m.piedra}</div>
            </div>
          </div>
        ))}
      </AnimCard>

      <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap', marginBottom:'1rem' }}>
        {[{id:'energia',label:'⚡ Energía'},{id:'juegos',label:'🎲 Juegos'},{id:'ritual',label:'🕯️ Ritual'},{id:'chat',label:'💬 Chat'}].map(t => (
          <button key={t.id} onClick={()=>setTabCirculo(t.id)} style={{
            padding:'8px 16px', borderRadius:'20px', fontSize:'12px', fontWeight:'700', cursor:'pointer',
            background: tabCirculo===t.id ? C.rose : C.bgCard,
            color: tabCirculo===t.id ? '#fff' : C.textMid,
            border:`2px solid ${tabCirculo===t.id?C.rose:C.border}`,
            transition:'all 0.25s', boxShadow: tabCirculo===t.id?`0 4px 12px ${C.rose}55`:'none',
          }}>{t.label}</button>
        ))}
      </div>

      {tabCirculo==='energia' && (
        <div>
          <AnimCard color={C.purple} delay={0} style={{ background:`linear-gradient(135deg, ${C.purple}, #1A0533)`, border:'none' }}>
            <div style={{ fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.75)', marginBottom:'6px' }}>🔮 Oráculo del grupo:</div>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', fontStyle:'italic', margin:0, fontWeight:'500' }}>
              "Con {transitos[0].planeta} {transitos[0].posicion} hoy, este grupo tiene una ventana poderosa. La combinación de sus piedras crea un campo de protección y claridad colectiva."
            </p>
          </AnimCard>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
            {[{icon:'⚡',val:'87%',label:'Compatibilidad',color:C.rose},{icon:'🌊',val:'92%',label:'Afinidad',color:C.teal},{icon:'🌙',val:'79%',label:'Armonía lunar',color:C.purple},{icon:'💎',val:'94%',label:'Resonancia',color:C.blue}].map((c,i) => (
              <div key={i} className="bounceIn" style={{ background:c.color, borderRadius:'16px', padding:'1rem', textAlign:'center', boxShadow:`0 6px 20px ${c.color}55`, animation:`bounceIn 0.5s ${i*0.1}s both` }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'4px' }}>{c.icon}</div>
                <div style={{ fontSize:'24px', fontWeight:'900', color:'#fff' }}>{c.val}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.85)', fontWeight:'600' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tabCirculo==='juegos' && <JuegosCirculo miembros={miembros} perfil={perfil} transitos={transitos} onIniciar={setJuegoActivo} mostrarToast={mostrarToast}/>}
      {tabCirculo==='ritual' && <RitualGrupal miembros={miembros} ganarXP={ganarXP}/>}
      {tabCirculo==='chat' && <ChatGrupal perfil={perfil} objData={objData} ganarXP={ganarXP}/>}
    </div>
  )
}

function JuegosCirculo({ miembros, perfil, transitos, onIniciar, mostrarToast }) {
  const juegos = [
    {id:'verdad',emoji:'💜',nombre:'Verdad Espiritual',propósito:'Crear confianza profunda. Cada respuesta honesta fortalece el vínculo energético del círculo.',desc:'La piedra elige quién responde. Preguntas del alma.',instrucciones:'La app selecciona un miembro y le hace una pregunta espiritual. 60 segundos para responder con honestidad.',libre:true,xp:60,color:C.purple},
    {id:'sincro',emoji:'🌀',nombre:'Sincronía Grupal',propósito:'Medir la coherencia energética. Cuanto más sincronizadas, mayor el campo colectivo.',desc:'¿Cuántas piensan lo mismo en silencio?',instrucciones:'Todas cierran los ojos 30 segundos. Piensan en una palabra, color y número. Al abrir, revelan juntas.',libre:true,xp:50,color:C.teal},
    {id:'oraculo',emoji:'🃏',nombre:'Oráculo Compartido',propósito:'Activar la sabiduría colectiva usando la carta astral como espejo.',desc:'Cada una recibe una carta astral. El grupo interpreta juntas.',instrucciones:'La app asigna una carta según tu signo. Cada una lee en voz alta y el grupo interpreta.',libre:false,xp:80,color:C.rose},
    {id:'mantra',emoji:'🎵',nombre:'Mantra Colectivo',propósito:'Unificar la energía en una sola vibración. El sonido compartido eleva la frecuencia grupal.',desc:'Mantra único generado para este grupo.',instrucciones:'El mantra se repite 3 veces: suave, normal, fuerte. Luego 30 segundos de silencio.',libre:false,xp:70,color:C.amber},
  ]
  return (
    <div>
      <p style={{ fontSize:'13px', color:C.textMid, marginBottom:'1rem', lineHeight:'1.6', fontWeight:'500' }}>
        Cada juego tiene un propósito energético real — experiencias que transforman el vínculo del grupo.
      </p>
      {juegos.map((j,i) => (
        <AnimCard key={j.id} color={j.color} delay={i*70} style={{ background: j.libre?j.color:C.bgCard, border:`2.5px solid ${j.color}` }}>
          <div style={{ display:'flex', gap:'12px' }}>
            <div style={{ width:'52px', height:'52px', borderRadius:'16px', background: j.libre?'rgba(255,255,255,0.2)':j.color+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', flexShrink:0 }}>
              {j.emoji}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'4px', flexWrap:'wrap' }}>
                <span style={{ fontSize:'15px', fontWeight:'800', color: j.libre?'#fff':C.text }}>{j.nombre}</span>
                {j.libre ? <span style={{ background:'rgba(255,255,255,0.25)', color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px' }}>Gratis</span>
                  : <span style={{ background:C.amber, color:'#fff', fontSize:'10px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px' }}>Premium</span>}
              </div>
              <div style={{ fontSize:'12px', color: j.libre?'rgba(255,255,255,0.85)':C.textSoft, marginBottom:'8px', fontWeight:'500' }}>{j.desc}</div>
              <div style={{ background: j.libre?'rgba(255,255,255,0.15)':j.color+'15', borderRadius:'10px', padding:'7px 10px', marginBottom:'8px' }}>
                <div style={{ fontSize:'11px', fontWeight:'700', color: j.libre?'rgba(255,255,255,0.8)':j.color, marginBottom:'2px' }}>✦ Propósito:</div>
                <div style={{ fontSize:'12px', color: j.libre?'rgba(255,255,255,0.9)':C.textMid, lineHeight:'1.4', fontWeight:'500' }}>{j.propósito}</div>
              </div>
              <div style={{ fontSize:'11px', color: j.libre?'rgba(255,255,255,0.7)':C.textSoft, fontStyle:'italic', marginBottom:'10px' }}>📋 {j.instrucciones}</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:'12px', fontWeight:'700', color: j.libre?'rgba(255,255,255,0.9)':j.color }}>+{j.xp} XP grupal</span>
                <button style={{ padding:'8px 18px', borderRadius:'20px', fontSize:'12px', fontWeight:'800', cursor:'pointer',
                  background: j.libre?'rgba(255,255,255,0.25)':'transparent',
                  color: j.libre?'#fff':C.amberDark,
                  border:`2px solid ${j.libre?'rgba(255,255,255,0.5)':C.amber}`,
                  transition:'all 0.2s' }}
                  onClick={() => j.libre?onIniciar(j):mostrarToast('🔒 Plan Alma — $9.99/mes')}>
                  {j.libre?'▶ Iniciar':'🔒 Premium'}
                </button>
              </div>
            </div>
          </div>
        </AnimCard>
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

  const preguntas = [
    `Con ${transitos[0].planeta} ${transitos[0].posicion} hoy: ¿Qué es lo que más te cuesta soltar en este momento?`,
    '¿Cuándo fue la última vez que fuiste completamente honesta contigo misma sobre algo importante?',
    '¿Qué versión de ti misma estás dejando de mostrar al mundo por miedo?',
    '¿Qué necesitas perdonarte para poder avanzar?',
    '¿Qué agradeces de las personas en este círculo?',
  ]
  const retroBots = [
    'Gracias por tu honestidad. Lo que acabas de nombrar ya se está transformando.',
    'Lo que compartes resuena con todas. La vulnerabilidad crea conexión real.',
    'Eso requiere valentía. Los astros de hoy respaldan exactamente esta honestidad.',
  ]
  const sincroData = { palabras:['Luz','Agua','Silencio'], colores:['Azul','Verde','Dorado'], numeros:[7,3,11] }

  if (fase==='intro') return (
    <div style={e.seccion}>
      <button onClick={()=>onSalir(null)} style={{ background:'none', border:'none', color:C.rose, fontSize:'13px', cursor:'pointer', marginBottom:'1rem', padding:0, fontWeight:'700' }}>← Volver a juegos</button>
      <AnimCard color={juego.color} delay={0} style={{ background:`linear-gradient(135deg, ${juego.color}, ${C.purple})`, border:'none' }}>
        <div style={{ textAlign:'center', marginBottom:'1rem' }}>
          <div className="bounceIn" style={{ fontSize:'3.5rem', marginBottom:'8px' }}>{juego.emoji}</div>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'#fff', marginBottom:'8px' }}>{juego.nombre}</div>
        </div>
        <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:'12px', padding:'0.85rem', marginBottom:'1rem' }}>
          <div style={{ fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.75)', marginBottom:'4px' }}>✦ Propósito:</div>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', fontWeight:'500' }}>{juego.propósito}</div>
        </div>
        <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:'12px', padding:'0.85rem', marginBottom:'1rem' }}>
          <div style={{ fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.75)', marginBottom:'4px' }}>🪐 Tránsito ahora:</div>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.9)', fontWeight:'500' }}>{transitos[0].planeta} {transitos[0].posicion}</div>
        </div>
        <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', marginBottom:'1rem', fontWeight:'500' }}>📋 {juego.instrucciones}</p>
        <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', marginBottom:'1rem', fontWeight:'500' }}>Participantes: {miembros.map(m=>m.nombre).join(', ')}</div>
      </AnimCard>
      <button style={e.botonRose} onClick={()=>setFase('jugando')}>▶ Comenzar {juego.nombre}</button>
    </div>
  )

  if (juego.id==='verdad'&&fase==='jugando') {
    const actual = miembros[turno%miembros.length]
    const esMiTurno = turno%miembros.length===0
    return (
      <div style={e.seccion}>
        <AnimCard color={C.purple} delay={0} style={{ background:`linear-gradient(135deg, ${C.purple}, #1A0533)`, border:'none' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
            <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', fontWeight:'600' }}>Turno {turno+1} de {miembros.length}</div>
            <div style={{ display:'flex', gap:'4px' }}>
              {miembros.map((_,i)=><div key={i} style={{ width:'10px', height:'10px', borderRadius:'50%', background:i<turno?C.success:i===turno%miembros.length?'#fff':C.border }}/>)}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:actual.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:'800', boxShadow:`0 4px 14px ${actual.color}88` }}>
              {actual.iniciales}
            </div>
            <div>
              <div style={{ fontSize:'15px', fontWeight:'800', color:'#fff' }}>{actual.nombre}</div>
              <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.75)' }}>{actual.piedra}</div>
            </div>
          </div>
          <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:'14px', padding:'1rem', textAlign:'center', marginBottom:'1rem' }}>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.7)', fontWeight:'700', marginBottom:'6px' }}>✦ Pregunta espiritual:</div>
            <div style={{ fontSize:'15px', color:'#fff', lineHeight:'1.6', fontStyle:'italic', fontWeight:'500' }}>{preguntas[turno%preguntas.length]}</div>
          </div>
          {esMiTurno ? (
            <>
              <textarea style={{...e.input,minHeight:'90px',resize:'vertical',fontFamily:'inherit'}} placeholder="Responde desde el corazón..." value={respuesta} onChange={(ev)=>setRespuesta(ev.target.value)}/>
              <button style={{...e.botonRose,background:'#fff',color:C.purple,fontWeight:'800'}} onClick={()=>{
                if(!respuesta.trim())return
                setRespuestas(prev=>[...prev,{miembro:actual.nombre,texto:respuesta,retro:retroBots[turno%retroBots.length]}])
                setRespuesta('')
                if(turno+1>=miembros.length)setFase('resultado')
                else setTurno(p=>p+1)
              }}>Compartir mi verdad →</button>
            </>
          ) : (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.8)', marginBottom:'12px', fontWeight:'500' }}>{actual.nombre} está respondiendo... Escucha en silencio.</div>
              <button style={{...e.botonRose,background:'rgba(255,255,255,0.2)',color:'#fff',border:'2px solid rgba(255,255,255,0.4)',boxShadow:'none'}}
                onClick={()=>{
                  setRespuestas(prev=>[...prev,{miembro:actual.nombre,texto:'(respuesta de voz)',retro:retroBots[turno%retroBots.length]}])
                  if(turno+1>=miembros.length)setFase('resultado')
                  else setTurno(p=>p+1)
                }}>✓ {actual.nombre} terminó</button>
            </div>
          )}
        </AnimCard>
        {respuestas.map((r,i)=>(
          <AnimCard key={i} color={C.teal} delay={i*50} style={{ background:C.teal, border:'none' }}>
            <div style={{ fontSize:'12px', fontWeight:'800', color:'rgba(255,255,255,0.85)', marginBottom:'4px' }}>{r.miembro}</div>
            {r.texto!=='(respuesta de voz)'&&<div style={{ fontSize:'13px', color:'#fff', fontStyle:'italic', marginBottom:'6px', fontWeight:'500' }}>"{r.texto}"</div>}
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.9)', fontWeight:'600' }}>{r.retro}</div>
          </AnimCard>
        ))}
      </div>
    )
  }

  if (juego.id==='sincro'&&fase==='jugando') return (
    <div style={e.seccion}>
      <AnimCard color={C.teal} delay={0} style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.blue})`, border:'none' }}>
        <div style={{ textAlign:'center', marginBottom:'1rem' }}>
          <div className="bounceIn" style={{ fontSize:'3rem', marginBottom:'8px' }}>🌀</div>
          <div style={{ fontSize:'17px', fontWeight:'800', color:'#fff', marginBottom:'8px' }}>Sincronía Grupal</div>
          <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', fontWeight:'500' }}>Cierra los ojos. Piensa en una palabra, un color y un número del 1 al 20. Cuando abras, revela con el grupo.</p>
        </div>
        {!sincroRevelado ? (
          <>
            <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem' }}>
              {['Una palabra','Un color','Un número'].map((p,i)=>(
                <input key={i} style={{...e.input,flex:1,marginBottom:0,textAlign:'center',fontSize:'13px',fontWeight:'600'}} placeholder={p}/>
              ))}
            </div>
            <button style={{...e.botonRose,background:'#fff',color:C.teal,fontWeight:'800'}} onClick={()=>setSincroRevelado(true)}>👁 Revelar</button>
          </>
        ) : (
          <>
            {miembros.map((m,i)=>(
              <div key={i} className="fadeUp" style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 0', borderBottom:i<miembros.length-1?'1px solid rgba(255,255,255,0.2)':'none', animation:`fadeUp 0.4s ${i*0.1}s both` }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:m.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'800' }}>{m.iniciales}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'13px', fontWeight:'700', color:'#fff' }}>{m.nombre}</div>
                  <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.8)', fontWeight:'500' }}>"{sincroData.palabras[i]}" · {sincroData.colores[i]} · {sincroData.numeros[i]}</div>
                </div>
              </div>
            ))}
            <div className="bounceIn" style={{ background:'rgba(255,255,255,0.2)', borderRadius:'14px', padding:'1rem', marginTop:'1rem', textAlign:'center' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'4px' }}>✨</div>
              <div style={{ fontSize:'15px', fontWeight:'800', color:'#fff', marginBottom:'4px' }}>2 coincidencias</div>
              <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', fontWeight:'500' }}>67% de sincronía grupal</div>
            </div>
            <button style={{...e.botonRose,background:'#fff',color:C.teal,fontWeight:'800',marginTop:'1rem'}} onClick={()=>setFase('resultado')}>Ver resultado →</button>
          </>
        )}
      </AnimCard>
    </div>
  )

  if (fase==='resultado') return (
    <div style={e.seccion}>
      <AnimCard color={C.success} delay={0} style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.green})`, border:'none' }}>
        <div style={{ textAlign:'center' }}>
          <div className="bounceIn" style={{ fontSize:'3.5rem', marginBottom:'8px' }}>🎉</div>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'#fff', marginBottom:'8px' }}>{juego.nombre} completado</div>
          <div style={{ background:'rgba(255,255,255,0.2)', borderRadius:'12px', padding:'0.85rem', marginBottom:'1rem' }}>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.8)', fontWeight:'700', marginBottom:'4px' }}>✦ Lo que logró:</div>
            <div style={{ fontSize:'13px', color:'#fff', fontWeight:'500' }}>{juego.propósito}</div>
          </div>
          <div style={{ fontSize:'36px', fontWeight:'900', color:'#fff' }}>+{juego.xp} XP</div>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.85)', fontWeight:'600' }}>ganados por el grupo completo</div>
        </div>
      </AnimCard>
      <button style={e.botonRose} onClick={()=>onSalir(juego.xp)}>✓ Finalizar y cobrar XP</button>
    </div>
  )
  return null
}

function RitualGrupal({ miembros, ganarXP }) {
  const [paso, setPaso] = useState(0)
  const pasos = [
    {emoji:'🕯️',titulo:'Encender una vela',desc:'Simboliza la presencia de todas en el círculo.'},
    {emoji:'💎',titulo:'Sostener tu piedra',desc:'Cierra los ojos 30 segundos. Siente su temperatura.'},
    {emoji:'🌬️',titulo:'3 respiraciones sincronizadas',desc:'Todas al mismo tiempo: inhala 4s, retén 2s, exhala 4s.'},
    {emoji:'🙏',titulo:'Intención en voz alta',desc:'Cada una dice su intención para este círculo.'},
    {emoji:'⭐',titulo:'Sello del círculo',desc:'Todas juntas: "El círculo está completo."'},
  ]
  const done = paso>=pasos.length
  const pct = Math.round((paso/pasos.length)*100)

  return (
    <div>
      <AnimCard color={C.purple} delay={0}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
          <div style={{ fontSize:'15px', fontWeight:'800', color:C.text }}>🕯️ Ritual de luna llena</div>
          <div style={{ fontSize:'13px', fontWeight:'700', color:C.purple }}>{paso}/{pasos.length}</div>
        </div>
        <BarraProgreso valor={paso} max={pasos.length} color={C.purple} altura={8}/>
      </AnimCard>
      {!done ? (
        <AnimCard color={C.purple} delay={100} style={{ background:`linear-gradient(135deg, ${C.purple}, #1A0533)`, border:'none' }}>
          <div style={{ textAlign:'center' }}>
            <div className="bounceIn" style={{ fontSize:'3rem', marginBottom:'8px' }}>{pasos[paso].emoji}</div>
            <div style={{ fontSize:'17px', fontWeight:'800', color:'#fff', marginBottom:'6px' }}>Paso {paso+1}: {pasos[paso].titulo}</div>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', marginBottom:'1rem', fontWeight:'500' }}>{pasos[paso].desc}</p>
            <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', marginBottom:'1rem' }}>
              {miembros.map((m,i)=><span key={i} style={{ marginRight:'8px', fontWeight:'600' }}>✅ {m.nombre.split(' ')[0]}</span>)}
            </div>
          </div>
          <button style={{...e.botonRose,background:'#fff',color:C.purple,fontWeight:'800'}} onClick={()=>setPaso(p=>p+1)}>✓ Completé este paso</button>
        </AnimCard>
      ) : (
        <AnimCard color={C.success} delay={0} style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.green})`, border:'none' }}>
          <div style={{ textAlign:'center' }}>
            <div className="bounceIn" style={{ fontSize:'3rem', marginBottom:'8px' }}>🌕</div>
            <div style={{ fontSize:'17px', fontWeight:'800', color:'#fff', marginBottom:'8px' }}>¡Ritual completado!</div>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.9)', marginBottom:'1rem', fontWeight:'500' }}>El círculo creó un campo energético que permanece entre todas.</p>
            <button style={{...e.botonRose,background:'rgba(255,255,255,0.25)',color:'#fff',border:'2px solid rgba(255,255,255,0.5)',boxShadow:'none'}} onClick={()=>ganarXP(80,'🌕 +80 XP ✨')}>Cobrar +80 XP grupal</button>
          </div>
        </AnimCard>
      )}
    </div>
  )
}

function ChatGrupal({ perfil, objData, ganarXP }) {
  const [mensajes, setMensajes] = useState([
    {de:'Valeria M.',texto:'💗 Presente y lista',out:false},
    {de:'Marco S.',texto:'Este lugar es increíble 🌿',out:false},
  ])
  const [texto, setTexto] = useState('')
  const enviar = (msg) => {
    const t=msg||texto.trim(); if(!t)return
    setMensajes(p=>[...p,{de:perfil.nombre,texto:t,out:true}])
    setTexto(''); ganarXP(10,'+10 XP ✨')
  }
  return (
    <div>
      <div style={{ background:C.bgCard, border:`2px solid ${C.border}`, borderRadius:'18px', padding:'1rem', minHeight:'180px', marginBottom:'0.75rem' }}>
        {mensajes.map((m,i)=>(
          <div key={i} style={{ marginBottom:'0.5rem', display:'flex', flexDirection:'column', alignItems:m.out?'flex-end':'flex-start' }}>
            {!m.out&&<div style={{ fontSize:'11px', color:C.textSoft, marginBottom:'2px', marginLeft:'4px', fontWeight:'600' }}>{m.de}</div>}
            <div style={{ padding:'9px 14px', borderRadius:'18px', fontSize:'13px', maxWidth:'80%', fontWeight:'500',
              background:m.out?C.rose:C.bgSoft, color:m.out?'#fff':C.text,
              borderBottomRightRadius:m.out?'4px':'18px', borderBottomLeftRadius:m.out?'18px':'4px',
              boxShadow:m.out?`0 4px 12px ${C.rose}44`:'none',
            }}>{m.texto}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'0.5rem' }}>
        <input style={{...e.input,flex:1,marginBottom:0}} placeholder="Escribe un mensaje..." value={texto}
          onChange={(ev)=>setTexto(ev.target.value)} onKeyDown={(ev)=>ev.key==='Enter'&&enviar()}/>
        <button style={{...e.botonRose,width:'auto',padding:'0 1.25rem',marginTop:0}} onClick={()=>enviar()}>→</button>
      </div>
      <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
        {['💗 Presente','✨ Energía','🙏 Gracias','🌬️ Respirando'].map(q=>(
          <button key={q} onClick={()=>enviar(q)} style={{ padding:'6px 12px', borderRadius:'20px', fontSize:'11px', cursor:'pointer', fontWeight:'600', background:C.bgSoft, color:C.textMid, border:`2px solid ${C.border}` }}>{q}</button>
        ))}
      </div>
    </div>
  )
}

// ================================
// PERFIL
// ================================
function PantallaPerfil({ perfil, xp }) {
  const { signo, emoji } = calcularSigno(perfil.fecha)
  const nivel = getNivel(xp)
  const siguiente = NIVELES[NIVELES.indexOf(nivel)+1]
  const objData = OBJETIVOS.find(o=>o.id===perfil.objetivo)

  return (
    <div style={e.seccion}>
      <h2 className="fadeUp" style={e.tituloPantalla}>✨ Mi perfil</h2>

      <AnimCard color={objData?.color||C.rose} delay={0} style={{ background:`linear-gradient(145deg, ${objData?.color||C.rose}, ${C.purple})`, border:'none' }}>
        <div style={{ textAlign:'center' }}>
          <div className="bounceIn" style={{ width:'80px', height:'80px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', border:'3px solid rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.8rem', margin:'0 auto 0.75rem' }}>
            {nivel.emoji}
          </div>
          <div style={{ fontSize:'22px', fontWeight:'800', color:'#fff' }}>{perfil.nombre}</div>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.85)', marginTop:'4px', fontWeight:'600' }}>{emoji} {signo} · {perfil.ciudad}</div>
          <div style={{ fontSize:'15px', fontWeight:'800', color:'#fff', marginTop:'8px' }}>{nivel.emoji} Nivel {nivel.nombre} · {xp} XP</div>
          <div style={{ margin:'12px 0 6px' }}>
            <BarraProgreso valor={xp-nivel.min} max={(siguiente?.min||nivel.max+1)-nivel.min} color='rgba(255,255,255,0.8)' altura={8}/>
          </div>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.8)', fontWeight:'600' }}>
            {siguiente?`${siguiente.min-xp} XP para ${siguiente.emoji} ${siguiente.nombre}`:'¡Nivel máximo!'}
          </div>
        </div>
      </AnimCard>

      {/* Scores */}
      <AnimCard color={C.border} delay={100}>
        <div style={{ fontSize:'15px', fontWeight:'800', color:C.text, marginBottom:'1rem', textAlign:'center' }}>Score espiritual general</div>
        <div style={{ display:'flex', justifyContent:'space-around' }}>
          {[
            {val:Math.min(Math.round(xp/30),10),label:'XP',color:C.rose},
            {val:7,label:'Misiones',color:C.purple},
            {val:8,label:'Racha',color:C.teal},
          ].map((s,i)=><ScoreCircular key={i} valor={s.val} max={10} color={s.color} label={s.label} size={88}/>)}
        </div>
      </AnimCard>

      {/* Gemas */}
      <h3 style={{ fontSize:'16px', fontWeight:'800', color:C.text, marginBottom:'0.75rem' }}>Tus gemas</h3>
      <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
        {NIVELES.map((n,i)=>(
          <div key={i} className="bounceIn" style={{ padding:'8px 14px', borderRadius:'20px', fontSize:'12px', fontWeight:'700',
            animation:`bounceIn 0.5s ${i*0.08}s both`,
            background: xp>=n.min ? (i===0?C.rose:i===1?C.purple:i===2?C.blue:i===3?C.teal:i===4?C.amber:C.gold) : C.bgSoft,
            color: xp>=n.min?'#fff':C.textSoft,
            boxShadow: xp>=n.min?`0 4px 12px ${i===0?C.rose:i===1?C.purple:C.teal}55`:'none',
          }}>
            {n.emoji} {n.nombre}
          </div>
        ))}
      </div>

      <AnimCard color={C.border} delay={300}>
        {[
          {label:'Objetivo activo',val:objData?.titulo},
          {label:'Tu gema',val:`${objData?.piedra.emoji} ${objData?.piedra.nombre}`},
          {label:'Plan',val:'Gratuito'},
          {label:'Racha',val:'1 día 🔥'},
          {label:'XP total',val:`${xp} ⚡`},
        ].map((item,i)=>(
          <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:i<4?`1px solid ${C.border}`:'none' }}>
            <span style={{ fontSize:'13px', color:C.textSoft, fontWeight:'600' }}>{item.label}</span>
            <span style={{ fontSize:'13px', fontWeight:'800', color:C.text }}>{item.val}</span>
          </div>
        ))}
      </AnimCard>

      <AnimCard color={C.amber} delay={400} style={{ background:`linear-gradient(135deg, ${C.amber}, ${C.coral})`, border:'none' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:'6px' }}>⭐</div>
          <div style={{ fontSize:'16px', fontWeight:'800', color:'#fff', marginBottom:'4px' }}>Plan Alma — $9.99/mes</div>
          <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.9)', lineHeight:'1.6', marginBottom:'12px', fontWeight:'500' }}>
            Todas las piedras + carta astral completa + Círculos premium
          </div>
          <button style={{...e.botonRose,background:'#fff',color:C.amberDark,fontWeight:'800'}}>Ver Plan Alma →</button>
        </div>
      </AnimCard>
    </div>
  )
}

// ================================
// APP PRINCIPAL
// ================================
export default function App() {
  const [pantalla, setPantalla] = useState(0)
  const [perfil, setPerfil] = useState({nombre:'',fecha:'',hora:null,ciudad:'',objetivo:'',emocion:''})
  const [tabActivo, setTabActivo] = useState('home')
  const [xp, setXp] = useState(0)
  const [prevTab, setPrevTab] = useState('home')

  const siguiente = (campo, valor) => {
    if (campo) setPerfil(prev=>({...prev,[campo]:valor}))
    setPantalla(prev=>prev+1)
  }

  const cambiarTab = (tab) => { setPrevTab(tabActivo); setTabActivo(tab) }

  const tabs = [
    {id:'home',emoji:'🏠',label:'Inicio'},
    {id:'journal',emoji:'📓',label:'Journal'},
    {id:'piedras',emoji:'💎',label:'Piedras'},
    {id:'astral',emoji:'🌙',label:'Astral'},
    {id:'circulos',emoji:'🔮',label:'Círculos'},
    {id:'perfil',emoji:'✨',label:'Perfil'},
  ]

  if (pantalla<8) return (
    <div style={{ minHeight:'100vh', background:C.bg }}>
      <style>{animCSS}</style>
      {pantalla===0&&<PantallaBienvenida onSiguiente={()=>siguiente(null,null)}/>}
      {pantalla===1&&<PantallaNombre onSiguiente={(v)=>siguiente('nombre',v)}/>}
      {pantalla===2&&<PantallaFecha nombre={perfil.nombre} onSiguiente={(v)=>siguiente('fecha',v)}/>}
      {pantalla===3&&<PantallaHora nombre={perfil.nombre} onSiguiente={(v)=>siguiente('hora',v)}/>}
      {pantalla===4&&<PantallaCiudad nombre={perfil.nombre} onSiguiente={(v)=>siguiente('ciudad',v)}/>}
      {pantalla===5&&<PantallaCheckIn nombre={perfil.nombre} onSiguiente={(v)=>siguiente('emocion',v)}/>}
      {pantalla===6&&<PantallaObjetivo nombre={perfil.nombre} onSiguiente={(v)=>siguiente('objetivo',v)}/>}
      {pantalla===7&&<PantallaCartaAstral perfil={perfil} onEntrar={()=>setPantalla(8)}/>}
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:C.bg, paddingBottom:'75px' }}>
      <style>{animCSS}</style>
      <div style={{ maxWidth:'500px', margin:'0 auto', padding:'1.5rem 1rem' }}>
        <div key={tabActivo} className="slideLeft">
          {tabActivo==='home'&&<PantallaHome perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='journal'&&<PantallaJournal perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='piedras'&&<PantallaPiedras perfil={perfil}/>}
          {tabActivo==='astral'&&<PantallaAstral perfil={perfil}/>}
          {tabActivo==='circulos'&&<PantallaCirculos perfil={perfil} xp={xp} setXp={setXp}/>}
          {tabActivo==='perfil'&&<PantallaPerfil perfil={perfil} xp={xp}/>}
        </div>
      </div>

      {/* Menú inferior */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, background:'#fff', borderTop:`3px solid ${C.rose}22`, display:'flex', justifyContent:'space-around', padding:'8px 0', zIndex:100, boxShadow:'0 -6px 24px rgba(255,77,141,0.12)' }}>
        {tabs.map((tab)=>(
          <button key={tab.id} onClick={()=>cambiarTab(tab.id)} style={{
            background:'none', border:'none', cursor:'pointer', padding:'4px 6px',
            display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', flex:1,
            borderTop:`3px solid ${tabActivo===tab.id?C.rose:'transparent'}`,
            transition:'all 0.2s',
          }}>
            <span style={{ fontSize:'1.3rem', transform:tabActivo===tab.id?'scale(1.2)':'scale(1)', transition:'transform 0.25s cubic-bezier(.34,1.56,.64,1)', display:'block' }}>{tab.emoji}</span>
            <span style={{ fontSize:'9px', fontWeight:'700', color:tabActivo===tab.id?C.rose:C.textSoft, transition:'color 0.2s' }}>{tab.label}</span>
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
  seccion: { width:'100%' },
  stepIndicator: { display:'inline-block', background:C.rose, color:'#fff', fontSize:'12px', fontWeight:'700', padding:'5px 14px', borderRadius:'20px', marginBottom:'1rem' },
  pregunta: { fontSize:'24px', fontWeight:'800', color:C.text, marginBottom:'0.75rem', lineHeight:'1.3' },
  descripcion: { fontSize:'14px', color:C.textMid, lineHeight:'1.6', marginBottom:'1.5rem', fontWeight:'500' },
  input: { width:'100%', padding:'14px 16px', background:'#fff', border:`2.5px solid ${C.border}`, borderRadius:'14px', color:C.text, fontSize:'15px', marginBottom:'1rem', outline:'none', boxSizing:'border-box', fontWeight:'500' },
  botonRose: { width:'100%', padding:'15px', background:C.rose, color:'#fff', border:'none', borderRadius:'14px', fontSize:'15px', fontWeight:'800', cursor:'pointer', marginTop:'0.5rem', boxShadow:`0 6px 20px ${C.rose}55`, transition:'all 0.2s' },
  checkboxFila: { display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1rem' },
  tituloPantalla: { fontSize:'22px', fontWeight:'800', color:C.text, marginBottom:'1.25rem' },
  toast: { position:'fixed', top:'24px', right:'16px', background:C.rose, color:'#fff', padding:'10px 20px', borderRadius:'24px', fontSize:'13px', fontWeight:'700', zIndex:999, boxShadow:`0 4px 20px ${C.rose}66` },
}