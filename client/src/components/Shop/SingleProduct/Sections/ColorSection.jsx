
const ColorSection = ({ product, color, setColor }) => {
   return (
      <div className="flex flex-col">
         <span className="mb-2 text-sm font-medium">Colors</span>
         <div className="grid grid-cols-4 gap-2">
            {product.colors.map((c, index) => (
               <span
                  key={index}
                  onClick={() => setColor(c)}
                  className={`py-3 px-5 text-base flex items-center justify-center border ${color === c ? 'border-black' : 'border-gray-200'
                     } rounded-md hover:border-black cursor-pointer select-none transition-colors`}
               >
                  {c}
               </span>
            ))}
         </div>
      </div>
   )
}

export default ColorSection