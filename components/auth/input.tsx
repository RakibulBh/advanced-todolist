interface inputProps {
  name: string;
  type: string;
  id: string;
  placeholder: string;
}

export const Input = ({ name, type, id, placeholder }: inputProps) => {
  return (
    <input
      className="px-4 rounded-md py-2 w-full border border-gray-300 focus:border-2 focus:border-gray-600 focus:outline-none"
      name={name}
      type={type}
      id={id}
      placeholder={placeholder}
    />
  );
};
