import { createBrowserRouter } from 'react-router';
import Home from '../../pages/home/Home.jsx';
import RootLayout from '../../layouts/rootLayout/RootLayout.jsx';
import Login from '../../pages/auth/login/Login.jsx';
import Register from '../../pages/auth/register/Register.jsx';
import DashboardLayout from '../../layouts/dashbord/DashboardLayout.jsx';
import AddFoodItemForm from '../../From/AddFoodItemForm.jsx';
import AllFood from '../../pages/dashbord/allFoods/AllFoods.jsx';
import UsersData from '../../pages/dashbord/userData/UsersData.jsx';
import AllRestaurants from '../../pages/allrestaurants/AllRestaurants.jsx';
import OfferPages from '../../pages/offerpages/OfferPages.jsx';
import TrackOrder from '../../pages/trackOrder/TrackOrder.jsx';
import CatagoryPage from '../../pages/catagoryPage/CatagoryPage.jsx';
import UpdateFoodeForm from '../../From/UpdateFoodeForm.jsx';
import AllPopuler from '../../pages/AllPopuler/AllPopuler.jsx';
import Analytics from '../../pages/dashbord/analytics/Analytics.jsx';
import PrivateRoute from '../privateRoute/PrivateRoute.jsx';
import AdminRoute from '../privateRoute/AdminRouts.jsx';
import DashbordProfail from '../../pages/dashbord/profail/DashbordProfail.jsx';
import PaymentHistory from '../../pages/payment/paymentHistory/PaymentHistory.jsx';
import UserPaymentHistory from '../../pages/payment/paymentHistory/UserPaymentHistory.jsx';
import RiderRoute from './../privateRoute/RiderRoutes';
const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/allRestaurants',
        element: <AllRestaurants />,
      },
      {
        path: '/offerPages',
        element: <OfferPages />,
      },
      {
        path: '/trackOrder',
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },
      {
        path: '/allPopuler',
        element: <AllPopuler />,
      },
      {
        path: '/category/:categoryName',
        element: <CatagoryPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <Analytics />,
      },
      {
        path: 'addFoods',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddFoodItemForm />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'allFoods',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllFood />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'updateFoods/:id',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdateFoodeForm />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'usersData',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UsersData />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'paymentHistory',
        element: (
          <PrivateRoute>
            <RiderRoute>
              <PaymentHistory />
            </RiderRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'userPaymentHistory',
        element: (
          <PrivateRoute>
            <UserPaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: 'profail',
        element: (
          <PrivateRoute>
            <DashbordProfail />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
