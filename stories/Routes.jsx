import {Page} from './Page'

const routes = ({ProtectedRoute, RouteErrorHandler})=> [
  {
    path: "claim",
    element: <ProtectedRoute Component={Page} />,
    errorElement: <RouteErrorHandler />,
  }
]

export default routes;