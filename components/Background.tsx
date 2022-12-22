type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  id?: string;
};

const Background = ({ children, className, id }: Props) => {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
};

export default Background;
