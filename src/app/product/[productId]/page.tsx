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

// const ProductContent = async ({ params }: PageProps) => {
//     const { productId } = await params;

//     console.log(productId);

//     // // A. Extract the unique URL slug parameter
//     // const { slug } = await params;

//     // // B. Fetch products from your dynamic worker endpoint
//     // const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products/1", {
//     // // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products/1", {
//     //     next: { revalidate: 60 }
//     // });
//     // const products: IProductInfo[] = await res.json();
    
//     // // C. Pinpoint the matching product
//     // const item = products.find(p => p.slug === slug);

//     // // D. If the slug is invalid, send them instantly to the custom 404 page
//     // if (!item) {
//     //     notFound();
//     // }

//     // // E. Establish localized values and analytics metrics
//     // const displayUnit = item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit;
//     // const minPrice = Math.min(...item.markets.map(m => m.min));
//     // const maxPrice = Math.max(...item.markets.map(m => m.max));
//     // const priceDiff = item.today - item.yesterday;
//     return (
//         <div>
//             kjhjhkjhkj
//         </div>
//     );
// };

export default ProductPage;