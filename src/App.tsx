import './App.css'
import ListingsPage from './hooks/listings/ListingsPage'
import { ComparisonProvider } from './hooks/useComparison'
import ComparisonPanel from './components/ComparisonPanel/ComparisonPanel'

function App() {
  return (
    <ComparisonProvider>
      <h1 className='text-3xl font-bold text-center my-6'>Victorian Plumbing Techtask</h1>
      <ListingsPage query="toilets" />
      <ComparisonPanel />
    </ComparisonProvider>
  )
}

export default App
