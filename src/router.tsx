import { Routes, Route } from 'react-router-dom';
import UserList from './Pages/user-list/user-list';
import UserDetails from './Pages/user-detail/user-detail';

export function Router() {
  return (
    <Routes>
      <Route path="/user-list" element={<UserList />} />
      <Route path="/user-details" element={<UserDetails />} />
    </Routes>
  );
}