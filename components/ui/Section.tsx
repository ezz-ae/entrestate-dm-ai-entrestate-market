
import React from "react";

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className={`mx-auto max-w-6xl px-6 pb-16 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
