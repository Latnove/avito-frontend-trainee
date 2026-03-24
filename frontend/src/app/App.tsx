import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'normalize.css'
import { AppRouter } from './providers/router'
import './styles/index.css'
import './styles/variables.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App
