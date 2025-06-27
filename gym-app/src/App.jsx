import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {

  {/*==== ROUTER ====*/} 
          const router = createBrowserRouter(
            createRoutesFromElements(
            
              <Route path='/' element={<Dashboard />}>
                
              </Route>
            
            )
          )
   {/*==== ROUTER ====*/}   

  return (
    <RouterProvider router={router}>
    
    </RouterProvider>
  )
}

export default App
