
import Link from "next/link";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const SecondaryButton: React.FC<ButtonProps> = ({ children, href, className, onClick }) => {
  const baseClasses = "px-8 py-3 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300";
  
  const secondaryClasses = "bg-apple-gray-200 text-apple-gray-700 hover:bg-apple-gray-300 focus:ring-apple-gray-300";

  const fullClassName = `${baseClasses} ${secondaryClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={fullClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={fullClassName}>
      {children}
    </button>
  );
};

export default SecondaryButton;
