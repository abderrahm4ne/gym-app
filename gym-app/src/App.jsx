import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/routesComponents/Dashboard';

function App() {

  {/*==== ROUTER ====*/} 
          const router = createBrowserRouter(
            createRoutesFromElements(
            
              <Route path='/' element={<NavBar />}>
                <Route index path='/' element={<Dashboard />} />
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
