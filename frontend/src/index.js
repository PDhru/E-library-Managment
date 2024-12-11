import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Index from "./pages/Index" ;
import AddBooks from "./pages/AddBooks";
import PrivateRoute from "./components/PrivateRoute"
import MyBooks from "./pages/MyBooks";
import EditBooks from "./pages/EditBooks";
import BorrowedBooks from "./pages/BorrowedBooks";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/update-book/:id" element={<EditBooks />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
        </Route>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
        </React.StrictMode>
);
