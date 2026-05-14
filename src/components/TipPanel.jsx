import { motion, AnimatePresence } from 'framer-motion'
import { getTip } from '../data/tips'

// ─── TAMAÑO DEL VIDEO ─────────────────────────────────────────────────────
// Ajusta estos valores para cambiar el tamaño del panel y el video.
// El alto del video se calcula automáticamente en proporción 16:9.
const PANEL_WIDTH    = 280   // px — ancho del panel lateral (desktop)
const DRAWER_HEIGHT  = '50vh' // altura del drawer inferior (móvil)
// ─────────────────────────────────────────────────────────────────────────

export default function TipPanel({ moduleId, open, onClose }) {
  const tip = getTip(moduleId)

  // Alto del video en proporción 16:9 según el ancho del panel
  const videoHeight = Math.round((PANEL_WIDTH * 9) / 16)

  if (!tip) return null

  const embedUrl = `https://www.youtube.com/embed/${tip.videoId}?rel=0&modestbranding=1`

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Overlay translúcido (solo móvil) ─────────────────────── */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ── Panel lateral (desktop ≥ md) ─────────────────────────── */}
          <motion.aside
            className="hidden md:flex flex-col bg-white border-l-2 border-cream-dark flex-shrink-0 overflow-hidden"
            style={{ width: PANEL_WIDTH }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: PANEL_WIDTH, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <PanelContent
              tip={tip}
              embedUrl={embedUrl}
              videoHeight={videoHeight}
              onClose={onClose}
            />
          </motion.aside>

          {/* ── Drawer inferior (móvil < md) ──────────────────────────── */}
          <motion.aside
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl border-t-2 border-cream-dark overflow-hidden"
            style={{ height: DRAWER_HEIGHT }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Handle visual del drawer */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-ink/20 rounded-full" />
            </div>
            <PanelContent
              tip={tip}
              embedUrl={embedUrl}
              // En móvil el video ocupa el ancho disponible menos padding
              videoHeight={Math.round((window.innerWidth - 32) * 9 / 16)}
              onClose={onClose}
              mobile
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Contenido compartido entre panel y drawer ────────────────────────────
function PanelContent({ tip, embedUrl, videoHeight, onClose, mobile = false }) {
  return (
    <div className={`flex flex-col h-full ${mobile ? 'px-4 pb-4' : 'p-4'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <h3 className="font-display text-lg text-ink leading-none">Tip del profe</h3>
        </div>
        <button
          onClick={onClose}
          className="text-ink/40 hover:text-ink transition-colors text-xl leading-none"
          aria-label="Cerrar tip"
        >
          ✕
        </button>
      </div>

      {/* Título del video */}
      <p className="font-body text-sm text-ink/50 mb-3 leading-snug">{tip.title}</p>

      {/* ── Embed de YouTube ───────────────────────────────────────────
          Para ajustar el tamaño del video modifica PANEL_WIDTH arriba.
          El alto se recalcula automáticamente en proporción 16:9.
      ─────────────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden flex-shrink-0 bg-ink/5"
        style={{ height: videoHeight }}
      >
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={tip.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Nota al pie */}
      <p className="font-body text-xs text-ink/30 mt-3 leading-relaxed">
        Este video es solo una guía. ¡Tú puedes resolverlo!
      </p>
    </div>
  )
}