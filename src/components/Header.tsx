interface HeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  return (
    <div className='flex w-full gap-2 items-center'>
      <div className='flex-1'>
        <h2 className='text-2xl leading-8 font-bold'>{props.title}</h2>
        {props.description && (
          <p className='font-400 text-sm leading-5 mt-2'>{props.description}</p>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default Header;
