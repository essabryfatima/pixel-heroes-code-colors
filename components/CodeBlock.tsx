
import React from 'react';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <div className="bg-gray-900/70 border-2 border-slate-600 rounded-lg p-4 my-4 text-sm md:text-base">
      <pre className="text-white whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
   