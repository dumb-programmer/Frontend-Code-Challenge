import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './views/Index'
import Items from './views/Items'
import CreateItem from './views/CreateItem'
import Checkout from './views/Checkout'
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/create" element={<CreateItem />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
