import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Shifts from "./components/Shifts";
import AvailableShifts from "./components/AvailableShifts";
import { Provider } from "react-redux";
import store from "./utils/appstore";
import Header from "./components/Header";

const App = () => {
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Shifts />
    },
    {
      path: "/available-shifts",
      element: <AvailableShifts />
    }
  ]);
  return (
    <><Provider store={store}>
     
      <RouterProvider router={approuter} />
      </Provider>
    </>
  );
};

export default App;
