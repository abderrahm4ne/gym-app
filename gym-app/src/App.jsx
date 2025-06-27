import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './components/routesComponents/Dashboard';

function App() {

  {/*==== ROUTER ====*/} 
          const router = createBrowserRouter(
            createRoutesFromElements(
            
              <Route path='/' element={<SideBar />}>
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
