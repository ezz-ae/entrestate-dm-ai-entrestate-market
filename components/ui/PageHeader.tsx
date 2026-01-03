
import React from "react";

const PageHeader = ({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) => {
  return (
    <div className={`mb-8 flex flex-col gap-4 text-center ${className}`}>
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="text-sm uppercase tracking-wide text-emerald-400">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
