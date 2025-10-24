import React, { useState, useCallback } from 'react';
import type { Policy } from './types';
import { FileUpload } from './components/FileUpload';
import { PolicyPreview } from './components/PolicyPreview';

// Make XLSX available from the window object loaded via CDN
declare const XLSX: any;

const App: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileProcess = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setPolicies([]);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error("فشل في قراءة الملف.");
        }
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (json.length === 0) {
          throw new Error("شيت الإكسيل فارغ أو غير مهيأ بشكل صحيح.");
        }

        const generatedPolicies: Policy[] = json.map((row: any, index) => {
          if (!row['الاسم'] || !row['العنوان'] || !row['المنطقه'] || row['تكلفه المنتج'] === undefined || !row['رقم الهاتف'] || !row['وصف المنتج']) {
            throw new Error(`خطأ في بيانات الصف رقم ${index + 2}. تأكد من وجود الأعمدة وملء بياناتها: "الاسم", "العنوان", "المنطقه", "تكلفه المنتج", "رقم الهاتف", "وصف المنتج"`);
          }

          return {
            id: `POL-${Date.now()}-${index + 1}`,
            name: String(row['الاسم']),
            address: String(row['العنوان']),
            region: String(row['المنطقه']),
            cost: Number(row['تكلفه المنتج']),
            phone1: String(row['رقم الهاتف']),
            phone2: row['رقم أخر'] ? String(row['رقم أخر']) : 'لا يوجد',
            productDescription: String(row['وصف المنتج']),
          };
        });

        setPolicies(generatedPolicies);
      } catch (err: any) {
        setError(err.message || "حدث خطأ غير متوقع أثناء معالجة الملف.");
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError("فشل في قراءة الملف. يرجى المحاولة مرة أخرى.");
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(file);
  }, []);
  
  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setPolicies([]);
    setError(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <header className="bg-white shadow-md p-4 print:hidden sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-700">نظام طباعة بوالص الشحن</h1>
          {policies.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow"
              >
                طباعة
              </button>
              <button
                onClick={handleReset}
                className="bg-slate-200 text-slate-700 font-semibold px-6 py-2 rounded-lg hover:bg-slate-300 transition-colors"
              >
                إعادة تعيين
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
            <p className="font-bold">خطأ</p>
            <p>{error}</p>
          </div>
        )}

        {policies.length === 0 ? (
          <FileUpload onFileProcess={handleFileProcess} isLoading={isLoading} />
        ) : (
          <PolicyPreview policies={policies} />
        )}
      </main>
    </div>
  );
};

export default App;
