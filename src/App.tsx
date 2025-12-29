import './App.css'
import ListingsPage from './hooks/listings/ListingsPage'
import { ComparisonProvider } from './hooks/useComparison'
import ComparisonPanel from './components/ComparisonPanel/ComparisonPanel'

function App() {
  return (
    <ComparisonProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header>
        <h1 className='text-3xl font-bold text-center my-6'>Victorian Plumbing Techtask</h1>
      </header>
      <main id="main-content">
        <ListingsPage query="toilets" />
      </main>
      <ComparisonPanel />
    </ComparisonProvider>
  )
}

export default App
