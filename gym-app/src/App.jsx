import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/routesComponents/Dashboard';

import MembershipsEndsToday from './Admin/MembershipsEndsToday';
import BasicStatistics from './Admin/BasicStatistics';
import MembershipsEnded from './Admin/MembershipsEnded';
import AddMember from './Admin/AddMember';
import EditMember from './Admin/EditMember';
import RenewMemberships from './Admin/RenewMemberships';
import ViewAllMembers from './Admin/ViewAllMembers';
import Notes from './Admin/Notes';

function App() {

  {/*==== ROUTER ====*/} 
          const router = createBrowserRouter(
            createRoutesFromElements(
            
              <Route path='' element={<NavBar />}>
                  <Route path='/' element={<Dashboard />}>
                    <Route index path='view-all-member' element={<ViewAllMembers />} />
                    <Route path='add-member' element={<AddMember />} />
                    <Route path='edit-member' element={<EditMember />} />
                    <Route path='renew-membership' element={<RenewMemberships />} />
                    <Route path='remove-member' element={<EditMember />} />
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
