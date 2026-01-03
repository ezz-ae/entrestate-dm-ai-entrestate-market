
import React from "react";

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`rounded-3xl border border-slate-800 bg-slate-950/80 p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
