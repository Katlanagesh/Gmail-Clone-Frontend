import './App.css';
import { Suspense } from 'react';
import { Navigate, createBrowserRouter, Route, createRoutesFromElements, RouterProvider}  from "react-router-dom"
import { routes } from './routes/routes';
import Error from './components/common/Error';
import SuspenseLoader from './components/common/SuspenseLoader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
   <Route path={routes.main.path}
       element={<Navigate to={`${routes.emails.path}/inbox`} />} />

    <Route path={routes.main.path}
       element={<routes.main.element />} >

    <Route path={`${routes.emails.path}/:type`}
         element={<routes.emails.element />}
         errorElement={<Error/>}
          />
          <Route path={routes.view.path} 
        element={<routes.view.element />}
        errorElement={<Error/>}
        />
       </Route>

       <Route path={routes.invalid.path}
     element={<Navigate to={`${routes.emails.path}/inbox`} />} />
       </Route>
  )
)


function App() {
  return (
    <Suspense fallback={<SuspenseLoader/>}>
    <RouterProvider router={router}/>
    </Suspense>
  
  );
}

export default App;
