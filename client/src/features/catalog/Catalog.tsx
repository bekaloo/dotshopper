import { useState, useEffect } from 'react';
import { LoadingComponent } from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import ProductList from './ProductList';



const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll)
  const {productsLoaded, status} = useAppSelector(state=>state.catalog)
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
   if(!productsLoaded){
    dispatch(fetchProductsAsync())
   }
  
  }, [productsLoaded])

  if(status.includes('pending')) return <LoadingComponent message='Loading Products...'/>
  return (
    <>
      <ProductList products={products} />
    </>
  )
}

export default Catalog