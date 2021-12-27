type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button {...props} className={`button ${className}`}>
      {children}
    </button>
  );
};
