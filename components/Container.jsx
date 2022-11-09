const Container = ({ children, className }) => {
  return (
    <>
      <div className={`container px-4 my-auto mx-auto max-w-7xl ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Container;
