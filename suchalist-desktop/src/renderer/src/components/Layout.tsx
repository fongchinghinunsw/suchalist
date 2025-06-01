type Props = {
  children: React.ReactNode;
};

export function RootLayout({ children }: Props) {
  return <main className="flex flex-row h-full w-full pt-11">{children}</main>;
}

export function SideBar({ children }: Props) {
  return <aside className="w-[20%] h-full overflow-auto bg-purple-300">{children}</aside>;
}
