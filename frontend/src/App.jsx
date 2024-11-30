import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import LogoutBtn from './components/auth/Logout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/register' element={<Register />} />
      <Route path='/user/login' element={<Login />} />
      <Route path='/user/logout' element={<LogoutBtn />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

export default App;
