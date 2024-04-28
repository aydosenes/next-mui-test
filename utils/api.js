const getProductWithFilterQuery = async () => {
    const response = await fetch(`https://dev-api-gateway.eradev.cloud/online-store-backend/products` + `?Skip=0&Top=20`, {
        method: 'GET',
        headers: {
            'Tenant-Origin': 'http://localhost:3000',
        },
        cache: 'no-store',
    })
    return response.json()
}
export default {
    getProductWithFilterQuery,
}