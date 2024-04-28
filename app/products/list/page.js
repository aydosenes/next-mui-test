import api from '@/utils/api'
import ProductListPageView from './product-list'

export default async function ProductList() {
    //const data = await api.getProductWithFilterQuery()
    const data = [{
        id: '1',
        urlKey: '/adsasdsa',
        name: 'pantolon',
        salePrice: 1.1,
        pictureUrl: '/images/pantolon.jpg',
        discount: null,
        variantCount: null,
    },
    {
        id: '2',
        urlKey: '/xzcxzcz',
        name: 'şapka',
        salePrice: 2.2,
        pictureUrl: '/images/sapka.jpg',
        discount: null,
        variantCount: null,
    },
    {
        id: '3',
        urlKey: '/jkhjkhjkh',
        name: 'ayakkabı',
        salePrice: 3.3,
        pictureUrl: '/images/ayakkabi.jpg',
        discount: null,
        variantCount: null,
    },]
    return <div><ProductListPageView getProducts={data} /></div>
}