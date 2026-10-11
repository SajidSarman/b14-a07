import React, { Suspense } from 'react';
import ProductDetailsPage from './ProductDetailsPage';

interface PageProps {
    params: Promise<{ productId: string }>;
}

const ProductPage = ({ params }: PageProps) => {
    return (
        <Suspense fallback={<div>Loading product...</div>}>
            <ProductDetailsPage params={params} />
        </Suspense>
    );
};


export default ProductPage;