type Props = {
  children: React.ReactNode;
};

export function SideBar({ children }: Props) {
  return <aside className="w-[25%] overflow-auto bg-white relative">{children}</aside>;
}
