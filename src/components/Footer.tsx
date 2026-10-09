import React from 'react';

const Footer = () => {
    return (
    <footer className="w-full bg-[#f4f6f4] border-t border-gray-200 py-6 text-xs text-gray-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">

        <div className="font-medium text-gray-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        
        <div className="font-medium text-gray-700">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;