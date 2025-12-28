import './App.css'
import ListingsPage from './hooks/listings/ListingsPage'

function App() {
  return (
    <>
      <h1 className='text-3xl font-bold text-center my-6'>Victorian Plumbing Techtask</h1>
      <ListingsPage query="toilets" />
    </>
  )
}

export default App
