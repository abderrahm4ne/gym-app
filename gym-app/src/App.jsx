import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/routesComponents/Dashboard';

// icons 
import MembershipsEndsToday from './Admin/MembershipsEndsToday';
import MembershipsEnded from './Admin/MembershipsEnded';
import AddMember from './Admin/AddMember';
  import ViewAllMembers from './Admin/ViewAllMembers';
import Notes from './Admin/Notes';
import MemberInfo from './Admin/MemberInfo'
import UnCompletedPayment from './Admin/UnCompletedPayment';

function App() {
  {/*==== ROUTER ====*/} 
          const router = createHashRouter(
            createRoutesFromElements(
              <Route path='/' element={<NavBar />}>
                <Route index element={<Dashboard />} />

                <Route element={<Dashboard />} >

                  <Route path='view-all-members' element={<ViewAllMembers />} />
                  <Route path='view-all-members/:id' element={<MemberInfo />} />
                  <Route path='add-member' element={<AddMember />} />
                  <Route path='memberships-ends-today' element={<MembershipsEndsToday />} />
                  <Route path='memberships-ended' element={<MembershipsEnded />} />
                  <Route path='uncompleted-payment' element={<UnCompletedPayment />} />
                  <Route path='take-note' element={<Notes />} />
                  <Route path='*' element={<MembershipsEnded />} />

                </Route>

              </Route>
              
            )
          );
   {/*==== ROUTER ====*/}   

  return (
    <RouterProvider router={router} />
  )
}

export default App
