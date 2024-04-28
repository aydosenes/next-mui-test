import ProductListPageView from './product-list'
import api from '@/utils/api'
export default async function ProductList() {
    const data = await api.getProductWithFilterQuery()
    return <ProductListPageView getProducts={data} />
}