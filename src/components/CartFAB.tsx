import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface Props {
  totalItems: number
  onClick: () => void
}

export default function CartFAB({ totalItems, onClick }: Props) {
  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={onClick}
          className="fixed z-40 flex items-center justify-center rounded-full"
          style={{
            bottom: '84px',
            right: '16px',
            width: '60px',
            height: '60px',
            backgroundColor: '#E87722',
            boxShadow: '0 0 30px rgba(232,119,34,0.5), 0 6px 20px rgba(0,0,0,0.4)',
          }}
          aria-label={`Ver carrito — ${totalItems} items`}
        >
          <ShoppingCart size={24} color="#000" strokeWidth={2.5} />
          <motion.span
            key={totalItems}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
            style={{ backgroundColor: '#000', color: '#E87722' }}
          >
            {totalItems > 9 ? '9+' : totalItems}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
