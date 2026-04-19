import { useEffect } from 'react'
import Mainroutes from './routes/Mainroutes'
import Nav from './components/Nav'
import { useDispatch } from 'react-redux'
import { asynccurrentUser } from './store/actions/userAction'
import { asyncLoadProducts } from './store/actions/productAction'
import { asyncLoadCart } from './store/actions/cartAction'

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(asynccurrentUser());
    dispatch(asyncLoadProducts());
    dispatch(asyncLoadCart());
  }, [dispatch])

  return (
    <>
      <Nav />
      <Mainroutes />
    </>
  )
}

export default App
