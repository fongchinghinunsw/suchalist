import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

type Props = {
  name: string;
  label: string;
  value?: InputProps['value'];
  onClick?: InputProps['onClick'];
  onChange?: InputProps['onChange'];
};

export default function TextInput({ name, ...otherProps }: Props) {
  return (
    <div className="relative group flex h-10 flex-col justify-center items-start">
      <input
        {...otherProps}
        type="text"
        className="z-10 peer absolute w-full outline-none leading-8 border rounded-md px-3 py-1 transition ease-in duration-100 focus:border-amber-400 valid:border-amber-400 bg-transparent"
        required
      />
      <label
        className="relative text-md mx-3 transition ease-in duration-200
        peer-focus:z-10 peer-valid:z-10
      peer-focus:text-amber-400 peer-valid:text-amber-400
        peer-focus:px-1 peer-valid:px-1
        peer-focus:bg-white peer-valid:bg-white
        peer-focus:leading-2 peer-valid:leading-2
        peer-focus:-translate-x-2.5 peer-valid:-translate-x-2.5
        peer-focus:-translate-y-5 peer-valid:-translate-y-5
        peer-focus:scale-80 peer-valid:scale-80"
      >
        {name}
      </label>
    </div>
  );
}
