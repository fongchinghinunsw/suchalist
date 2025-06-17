import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

type Props = {
  title: string;
  isOpen: boolean;
  Content: ReactNode;
  onClose: () => void;
};

export default function Modal({ title, isOpen, Content, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-100">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel>
          <div className="rounded-xl min-w-100 bg-white p-4">
            <DialogTitle className="font-bold text-2xl flex justify-center">{title}</DialogTitle>
            {Content}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
