
import React from "react";

const PageHeader = ({ title, subtitle, description, eyebrow, className }: { title: string; subtitle?: string; description?: string; eyebrow?: string; className?: string }) => {
  return (
    <div className={`mb-8 flex flex-col gap-1 ${className}`}>
      {eyebrow && <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-apple-blue mb-1">{eyebrow}</p>}
      <h1 className="text-3xl font-semibold text-apple-gray-600 leading-tight">{title}</h1>
      {subtitle && <p className="text-sm font-medium text-apple-gray-400">{subtitle}</p>}
      {description && <p className="text-apple-gray-400 text-lg mt-2">{description}</p>}
    </div>
  );
};

export default PageHeader;
