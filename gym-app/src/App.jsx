import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/routesComponents/Dashboard';

// icons 
import MembershipsEndsToday from './Admin/MembershipsEndsToday';
import BasicStatistics from './Admin/BasicStatistics';
import MembershipsEnded from './Admin/MembershipsEnded';
import AddMember from './Admin/AddMember';
  import ViewAllMembers from './Admin/ViewAllMembers';
import Notes from './Admin/Notes';
import MemberInfo from './Admin/MemberInfo'

function App() {

  {/*==== ROUTER ====*/} 
          const router = createBrowserRouter(
            createRoutesFromElements(
            
              <Route path='' element={<NavBar />}>
                  <Route path='/' element={<Dashboard />}>
                    <Route path='view-all-members' element={<ViewAllMembers />} />
                      <Route path='view-all-members/:id' element={<MemberInfo />} />
                    <Route path='add-member' element={<AddMember />} />
                    <Route path='memberships-ends-today' element={<MembershipsEndsToday />} />
                    <Route path='memberships-ended' element={<MembershipsEnded />} />
                    <Route path='basic-statistics' element={<BasicStatistics />} />
                    <Route path='take-note' element={<Notes />} />
                  </Route>
                </Route>

            )
          )
   {/*==== ROUTER ====*/}   

  return (
    <RouterProvider  router={router}>
    
    </RouterProvider>
  )
}

export default App
