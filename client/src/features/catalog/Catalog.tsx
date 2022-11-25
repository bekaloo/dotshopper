import { useState, useEffect } from 'react';
import { Product } from '../../app/models/product';
import ProductList from './ProductList';



const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    fetch('https://localhost:5001/Api')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  return (
    <>
      <ProductList products={products} />
    </>
  )
}

export default Catalog