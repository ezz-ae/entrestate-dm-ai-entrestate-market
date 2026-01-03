
import Link from "next/link";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, href, className, onClick, type = "button", disabled }) => {
  const baseClasses = "px-8 py-3 font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 inline-flex items-center justify-center";
  
  const primaryClasses = "bg-apple-blue text-white hover:bg-apple-blue/90 focus:ring-apple-blue";

  const fullClassName = `${baseClasses} ${primaryClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={fullClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={fullClassName} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
