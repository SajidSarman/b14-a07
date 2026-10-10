import React, { Suspense } from 'react';
import CategoryProductsPage from './CategoryPage';

interface PageProps {
    params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: PageProps) => {
    return (
        <div className="w-full bg-[#f8faf7] min-h-screen">
            <Suspense fallback={
                <div className="max-w-6xl mx-auto p-6 space-y-6 animate-pulse">
                    <div className="h-20 bg-gray-200 rounded-2xl w-full mb-4" />
                    <div className="h-14 bg-gray-100 rounded-xl w-full" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-40 bg-gray-100 rounded-2xl" />
                        ))}
                    </div>
                </div>
            }>
                <CategoryProductsPage dataPromise={params} />
            </Suspense>
        </div>
    );
};

export default CategoryPage;
