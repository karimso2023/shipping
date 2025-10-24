import React from 'react';

interface FileUploadProps {
  onFileProcess: (file: File) => void;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcess, isLoading }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileProcess(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center p-8 bg-white rounded-xl shadow-lg border border-slate-200">
      <h2 className="text-3xl font-bold mb-4 text-slate-700">ابدأ الآن</h2>
      <p className="text-slate-500 mb-6 max-w-lg mx-auto leading-relaxed">
        ارفع شيت الإكسيل الخاص بالعملاء لإنشاء بوالص الشحن تلقائياً. تأكد من أن الشيت يحتوي على الأعمدة التالية:
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">الاسم</code>
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">العنوان</code>
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">المنطقه</code>
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">تكلفه المنتج</code>
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">رقم الهاتف</code>
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">وصف المنتج</code>
          <code className="bg-slate-100 text-slate-700 p-2 rounded text-sm font-mono">رقم أخر (اختياري)</code>
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-4 text-slate-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {isLoading ? (
                <p className="text-lg text-slate-600 animate-pulse">جاري المعالجة...</p>
            ) : (
                <>
                    <p className="mb-2 text-sm text-slate-500">
                        <span className="font-semibold">اضغط للاختيار</span> أو قم بسحب الملف هنا
                    </p>
                    <p className="text-xs text-slate-500">XLSX, XLS (بحد أقصى 5 ميجا)</p>
                </>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      </div>
    </div>
  );
};
