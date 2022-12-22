type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <>
      <div className={`container px-4 my-auto mx-auto max-w-7xl ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Container;
