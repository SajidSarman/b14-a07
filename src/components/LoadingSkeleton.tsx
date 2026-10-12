import React from 'react';

const LoadingSkeleton = () => {
    return (
        <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6 p-4 sm:p-6">
            <div className="h-20 bg-gray-200 rounded-2xl w-full mb-4" />
            <div className="h-14 bg-gray-100 rounded-xl w-full" />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-40 bg-gray-100 rounded-2xl" />
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;