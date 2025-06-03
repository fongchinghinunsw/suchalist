import clsx from 'clsx';

type Props = {
  className?: string;
};

export default function Divider({ className }: Props) {
  return <div className={clsx('border border-gray-300 rounded-4xl mx-2', className)} />;
}
