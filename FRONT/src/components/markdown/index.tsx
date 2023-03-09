import * as React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownProps {
  source: string;
}

const Markdown: React.FC<MarkdownProps> = ({ source }) => {
  const html = DOMPurify.sanitize(marked(source));

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
