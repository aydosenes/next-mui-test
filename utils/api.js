const getProductWithFilterQuery = async () => {
    const response = await fetch(`/products` + `?Skip=0&Top=20`, {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:3000',
        },
        cache: 'no-store',
    })
    return response.json()
}
export default {
    getProductWithFilterQuery,
}