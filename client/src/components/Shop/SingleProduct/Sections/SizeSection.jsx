const ColorSection = ({ product, size, setSize }) => {
   return (
      <div className="flex flex-col">
         <span className="mb-2 text-sm font-medium">Sizes</span>
         <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((s, index) => (
               <span
                  key={index}
                  onClick={() => setSize(s)}
                  className={`py-3  px-5 text-base flex items-center justify-center border ${size === s ? 'border-black' : 'border-gray-200'
                     } rounded-md hover:border-black cursor-pointer select-none transition-colors`}
               >
                  {s}
               </span>
            ))}
         </div>
      </div>
   )
}

export default ColorSection