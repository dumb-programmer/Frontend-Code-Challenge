import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './views/Index'
import Items from './views/Items'
import CreateItem from './views/CreateItem'
import Checkout from './views/Checkout'
import MainLayout from './layouts/MainLayout'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/create" element={<CreateItem />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
