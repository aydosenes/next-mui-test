import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating' // GLOBAL CUSTOM COMPONENTS
import LazyImage from '../../../components/LazyImage'
import { H3, Span } from '../../../components/Typography'
//import ProductViewDialog from '../../../components/products-view/product-view-dialog' // LOCAL CUSTOM HOOK
import React, { useState } from 'react'
import { ImageWrapper, ContentWrapper, StyledBazaarCard } from './styles' // ========================================================
import Link from 'next/link'

// ========================================================
const ProductCard1 = ({
  id,
  slug,
  title,
  price,
  pictureUrl,
  rating = 5,
  hideRating,
  hoverEffect,
  discount = 0,
  showProductSize,
  variantCount,
}) => {  
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleAlertClose = () => {
    setAlertOpen(false)
  }

  
  return (
    <>
      <StyledBazaarCard hoverEffect={hoverEffect}>
        <ImageWrapper>
          <Link href={`/products/${slug}`}>
            <LazyImage
              priority
              src={pictureUrl}
              width={500}
              height={500}
              alt={title}
            />
          </Link>
        </ImageWrapper>

        {/* PRODUCT VIEW DIALOG BOX */}
        {/* <ProductViewDialog
          openDialog={openModal}
          handleCloseDialog={toggleDialog}
          product={{
            title,
            price,
            id,
            slug,
            imgGroup: [pictureUrl, pictureUrl],
          }}
        /> */}
      </StyledBazaarCard>
    </>
  )
}

export default ProductCard1
