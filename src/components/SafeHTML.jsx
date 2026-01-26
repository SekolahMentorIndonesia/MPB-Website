'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';

export default function SafeHTML({ html, className = '' }) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    if (html) {
      // Configure DOMPurify
      const clean = DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true }, // Only allow HTML
        ADD_ATTR: ['target'], // Allow target attribute for links
      });
      setSanitized(clean);
    }
  }, [html]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
