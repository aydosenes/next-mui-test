'use client'

import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import throttle from 'lodash/throttle'
import CircularProgress from '@mui/material/CircularProgress'
import { FlexBox, FlexRowCenter } from '../../../components/flex-box'
import { Paragraph } from '../../../components/Typography'
import ProductsGridView from '../../../components/products-view/products-grid-view'

const ProductListPageView = ({ getProducts }) => {
    const SORT_OPTIONS = [
        {
            label: 'Default',
            value: 'Default',
        },
        {
            label: 'Price Low to High',
            value: 'Price Low to High',
        },
        {
            label: 'Price High to Low',
            value: 'Price High to Low',
        },
    ]
    const [loading, setLoading] = useState(false)
    const [productList, setProductList] = useState([])

    const handleSort = async (e) => {
        const sortValue = e.target.value
        if (sortValue === 'Default') {
            const searchedProducts = [...productList].sort(
                (a, b) => parseInt(a.code) - parseInt(b.code),
            )
            setProductList(searchedProducts)
        }

        if (sortValue === 'Price Low to High') {
            const searchedProducts = [...productList].sort(
                (a, b) => a.comparePrice - b.comparePrice,
            )
            setProductList(searchedProducts)
        }
        if (sortValue === 'Price High to Low') {
            const searchedProducts = [...productList].sort(
                (a, b) => b.comparePrice - a.comparePrice,
            )
            setProductList(searchedProducts)
        }
    }
    const fetchData = async () => {
        var pageCount = parseInt(localStorage.getItem('productListCount')) || 0

        if (pageCount % 20 == 0) {
            setLoading(true)
            var filterQuery = `?Skip=${pageCount}&Top=20`            
            var res = getProducts
            console.log(getProducts)
            if (res.length != 0) {
                setProductList((prevProducts) => {
                    const uniqueRes = res.filter(
                        (newProduct) =>
                            !prevProducts.some(
                                (existingProduct) => existingProduct.id === newProduct.id,
                            ),
                    )

                    return [...prevProducts, ...uniqueRes]
                })

                localStorage.setItem('productListCount', pageCount + res.length)
            }

            setLoading(false)
        }
    }

    const handleScroll = throttle(() => {
        if (productList.length % 20 == 0) {
            fetchData()
        }
    }, 300)

    useEffect(() => {
        localStorage.setItem('productListCount', 0)

        fetchData()
    }, [])

    return (
        <Container
            sx={{
                mt: 4,
                mb: 6,
            }}
        >
            <Card
                elevation={1}
                sx={{
                    mb: '55px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: {
                        sm: '1rem 1.25rem',
                        md: '0.5rem 1.25rem',
                        xs: '1.25rem 1.25rem 0.25rem',
                    },
                }}
            >
                <FlexBox alignItems='center' columnGap={4} flexWrap='wrap' my='0.5rem'>
                    <FlexBox alignItems='center' gap={1} flex='1 1 0'>
                        <Paragraph color='grey.600' whiteSpace='pre'>
                            {'sortBy'}:
                        </Paragraph>

                        <TextField
                            select
                            fullWidth
                            size='small'
                            variant='outlined'
                            placeholder='Sort by'
                            defaultValue={SORT_OPTIONS[0].value}
                            sx={{
                                flex: '1 1 0',
                                minWidth: '150px',
                            }}
                            onChange={(e) => handleSort(e)}
                        >
                            {SORT_OPTIONS.map((item) => (
                                <MenuItem value={item.value} key={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FlexBox>

                    <FlexBox alignItems='center' my='0.25rem'>
                    </FlexBox>
                </FlexBox>
            </Card>
            {productList.length < 1 ? (
                <FlexBox
                    alignItems='center'
                    justifyContent='center'
                    height='80vh'
                    display='absolute'
                >
                </FlexBox>
            ) : (
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <ProductsGridView
                            products={productList}
                            handleScroll={handleScroll}
                        />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        {loading === false ? (
                            <FlexBox
                                alignItems='center'
                                justifyContent='center'
                                display='flex'
                            >
                                <FlexRowCenter minHeight='10vh'>
                                    <Paragraph color='grey.600'>
                                        {productList.length} {'resultsFound'}
                                    </Paragraph>
                                </FlexRowCenter>
                            </FlexBox>
                        ) : (
                            <FlexBox
                                alignItems='center'
                                justifyContent='center'
                                display='flex'
                            >
                                <FlexRowCenter minHeight='10vh'>
                                    <CircularProgress color='primary' />
                                </FlexRowCenter>
                            </FlexBox>
                        )}
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}

export default ProductListPageView
