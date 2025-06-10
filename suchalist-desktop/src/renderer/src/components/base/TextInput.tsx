import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;

type Props = {
  name: string;
  label: string;
  value?: InputProps['value'];
  onChange?: InputProps['onChange'];
};

export default function TextInput({ name, ...otherProps }: Props) {
  return (
    <div className="relative group flex h-10">
      <input
        {...otherProps}
        type="text"
        className="peer absolute w-full outline-none leading-8 border rounded-md px-2 py-1 transition ease-in duration-100 focus:border-amber-400 valid:border-amber-400 bg-transparent"
        required
      />
      <label
        className="z-10 absolute text-md px-2 py-1 mx-2 leading-7 top-0.5 bg-white transition ease-in duration-200 
      peer-focus:text-amber-400 peer-valid:text-amber-400
        peer-focus:py-0 peer-valid:py-0
        peer-focus:bg-white peer-valid:bg-white
        peer-focus:leading-2 peer-valid:leading-2
        peer-focus:-translate-x-2 peer-valid:-translate-x-2
        peer-focus:-translate-y-2 peer-valid:-translate-y-2
        peer-focus:scale-80 peer-valid:scale-80"
      >
        {name}
      </label>
    </div>
  );
}
