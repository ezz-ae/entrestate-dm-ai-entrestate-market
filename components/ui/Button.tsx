
import React from "react";
import Link from "next/link";

const Button = ({ href, children, className, ...props }: { href?: string; children: React.ReactNode; className?: string, [x:string]: any }) => {
  const classes = `rounded-full px-6 py-3 text-center text-sm font-semibold text-white shadow-lg ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
