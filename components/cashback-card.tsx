import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

type CashbackCardProps = {
  logo: string,
  cashback: {
    value: number,
    suffix: string
  },
  sponsored: boolean,
  delay: number,
  extraInfo: string
}

const CashbackCard = ({ logo, cashback, extraInfo, sponsored, delay = 0 }: CashbackCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg"
    >
      <div className="h-28 flex items-center justify-center border-b border-gray-200">
        <div className="text-2xl font-bold text-secondary">{logo}</div>
      </div>
      
      <div className="p-8 text-center">
          <div className="mb-6">
            <div className="text-green-600">
              <span className="text-5xl font-semibold">{cashback.value}</span>
              <span className="text-2xl ml-1">{cashback.suffix}</span>
              <span className='text-sm font-light'> of cashback</span>
            </div>
            {extraInfo && <span className='text-xs text-secondary/80'>{extraInfo}</span>}
          </div>
        
        {sponsored && (
          <div className="text-gray-400 text-sm">Sponsorisé</div>
        )}
      </div>
    </motion.div>
  );
};

export default CashbackCard