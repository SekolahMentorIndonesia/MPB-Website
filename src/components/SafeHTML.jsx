'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';

export default function SafeHTML({ html, className = '' }) {
  const [sanitized, setSanitized] = useState('');

  useEffect(() => {
    if (html) {
      // Add hook to add loading="lazy" to images
      DOMPurify.addHook('afterSanitizeAttributes', function (node) {
        if (node.tagName === 'IMG') {
          node.setAttribute('loading', 'lazy');
        }
      });

      // Configure DOMPurify
      const clean = DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true }, // Only allow HTML
        ADD_ATTR: ['target', 'loading'], // Allow target and loading attributes
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
