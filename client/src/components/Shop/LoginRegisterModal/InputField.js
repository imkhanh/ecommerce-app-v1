import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';

const InputField = ({ label, type, name, value, onChange, showPass, setShowPass, error }) => {
	return (
		<div>
			<label className="mb-1 block text-sm text-black">{label}</label>
			{type === 'password' ? (
				<div className="relative">
					<input
						type={showPass ? 'text' : 'password'}
						name={name}
						value={value}
						onChange={onChange}
						className={`px-2 w-full h-10 text-sm bg-white text-black outline-none border border-black/20 focus:border-black ${error && 'border-red-500'} rounded-sm duration-200 ease-in-out`}
					/>

					<div onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-2 transform -translate-y-1/2">
						<span className="text-sm cursor-pointer select-none text-black/50 hover:text-black duration-200 ease-in-out">{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}</span>
					</div>
				</div>
			) : (
				<input
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					className={`px-2 w-full h-10 text-sm bg-white text-black outline-none border border-black/20 focus:border-black ${error && 'border-red-500'} rounded-sm duration-200 ease-in-out`}
				/>
			)}
		</div>
	);
};

export default InputField;
