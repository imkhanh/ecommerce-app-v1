import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const Input = ({ label, type, name, value, onChange, showPass, setShowPass }) => {
	return (
		<div>
			<label className="block mb-1 text-sm text-black/70">{label}</label>
			<div className="relative">
				<input type={type} name={name} value={value} onChange={onChange} className="px-4 text-sm w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />

				{name === 'password' && (
					<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer select-none text-black/50 hover:text-black">
						{showPass ? <BsEyeSlashFill className="text-sm" /> : <BsEyeFill className="text-sm" />}
					</span>
				)}
			</div>
		</div>
	);
};

export default Input;
