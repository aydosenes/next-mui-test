import { Fragment } from 'react'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'

import ProductCard1 from '../product-cards/product-card-1/product-card' // CUSTOM DATA MODEL
import throttle from 'lodash/throttle'
// ========================================================
const ProductsGridView = ({ products, handleScroll }) => {
  useEffect(() => {
    // Event listener'ı ekleyin
    const handleScrollEvent = throttle(() => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      if (scrollTop + windowHeight >= documentHeight - 50) {
        handleScroll()
      }
    }, 200)

    window.addEventListener('scroll', handleScrollEvent)

    // Component unmount olduğunda event listener'ı kaldırın
    return () => {
      window.removeEventListener('scroll', handleScrollEvent)
    }
  }, [])
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.urlKey}
              title={item.name}
              price={item.salePrice}
              rating={5}
              hideRating={true}
              pictureUrl={
                item.pictureUrl != undefined
                  ? item.pictureUrl.length > 0
                    ? item.pictureUrl
                    : process.env.NEXT_PUBLIC_NOIMAGE_URL
                  : process.env.NEXT_PUBLIC_NOIMAGE_URL
              }
              discount={item.discount}
              variantCount={item.variantCount}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

export default ProductsGridView
