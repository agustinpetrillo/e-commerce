const Background = ({ children, className, id }) => {
  return (
    <>
      <div className={className} id={id}>
        {children}
      </div>
    </>
  );
};

export default Background;
