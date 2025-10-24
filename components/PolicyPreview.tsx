
import React from 'react';
import type { Policy } from '../types';
import { PolicyCard } from './PolicyCard';

interface PolicyPreviewProps {
  policies: Policy[];
}

export const PolicyPreview: React.FC<PolicyPreviewProps> = ({ policies }) => {
  return (
    <>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .policy-card {
            page-break-inside: avoid;
          }
           .policy-card:nth-child(3n) {
             page-break-after: always;
           }
        }
      `}</style>
      <div id="printable-area" className="space-y-4">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </>
  );
};
