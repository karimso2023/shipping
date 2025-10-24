
import React from 'react';
import type { Policy } from '../types';

interface PolicyCardProps {
  policy: Policy;
}

// Barcode component with customizable optional props
interface BarcodeProps {
  lineWidth?: { min: number; max: number };
  lineHeightRange?: [number, number];
  numberOfLines?: number;
  containerHeight?: number;
  backgroundColor?: string;
  lineSpacing?: number;
}

const Barcode: React.FC<BarcodeProps> = ({
  lineWidth = { min: 1, max: 2 },
  lineHeightRange = [0.4, 1.0], // As a percentage of container height
  numberOfLines = 50,
  containerHeight = 64, // in pixels
  backgroundColor = 'transparent',
  lineSpacing = 1, // in pixels
}) => {
  const lines = Array.from({ length: numberOfLines }, (_, i) => {
    const [minHeight, maxHeight] = lineHeightRange;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;
    
    const width = Math.floor(Math.random() * (lineWidth.max - lineWidth.min + 1) + lineWidth.min);
    const widthPx = `${width}px`;

    return (
      <div
        key={i}
        className="bg-black"
        style={{
          height: `${height * 100}%`,
          width: widthPx,
        }}
      ></div>
    );
  });

  return (
    <div
      className="flex items-end justify-center w-full overflow-hidden"
      style={{ 
        height: `${containerHeight}px`, 
        backgroundColor: backgroundColor, 
        gap: `${lineSpacing}px` 
      }}
      aria-hidden="true" // It's a decorative element
    >
      {lines}
    </div>
  );
};


export const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  return (
    <div className="policy-card bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-4 break-inside-avoid">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h2 className="text-2xl font-bold text-slate-800">بوليصة شحن</h2>
        <div className="text-left">
          <p className="font-mono text-sm">{policy.id}</p>
          <p className="text-sm text-slate-500">
            {new Date().toLocaleDateString('ar-EG')}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Customer Info */}
        <div>
          <h3 className="font-semibold text-lg text-slate-700 mb-2 border-b pb-1">بيانات العميل</h3>
          <div className="space-y-2 text-slate-600">
            <p><strong>الاسم:</strong> {policy.name}</p>
            <p><strong>العنوان:</strong> {policy.address}</p>
            <p><strong>المنطقة:</strong> {policy.region}</p>
            <p><strong>رقم الهاتف:</strong> {policy.phone1}</p>
            {policy.phone2 && policy.phone2 !== 'لا يوجد' && (
              <p><strong>رقم آخر:</strong> {policy.phone2}</p>
            )}
          </div>
        </div>

        {/* Shipment Info */}
        <div>
          <h3 className="font-semibold text-lg text-slate-700 mb-2 border-b pb-1">بيانات الشحنة</h3>
          <div className="space-y-2 text-slate-600">
             <p><strong>وصف المنتج:</strong> {policy.productDescription}</p>
            <div className="bg-slate-100 p-3 rounded-md mt-4">
              <p className="text-lg font-bold text-slate-800">
                المبلغ المطلوب: <span className="text-blue-600">{policy.cost.toLocaleString('ar-EG')} جنيه</span>
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* Footer */}
       <div className="mt-6 pt-4 border-t">
        <Barcode 
            containerHeight={50}
            numberOfLines={70}
            backgroundColor="#f8fafc" // slate-50 color
            lineWidth={{ min: 1, max: 3 }}
            lineHeightRange={[0.5, 0.9]}
            lineSpacing={1}
        />
        <p className="text-center text-xs text-slate-400 mt-2">شكراً لتعاملكم معنا</p>
      </div>
    </div>
  );
};
