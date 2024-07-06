// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import Login from "./pages/Login";
// import Registration from "./pages/Registration";
// const HomePage = lazy(() => import("./pages/HomePage"));
// import Protected from "./components/Protected";
// import UploadCsv from "./pages/AddCsv";
// import Create from "./pages/Create";
// import EditRow from "./pages/EditRow";
// import BulkUpload from "./pages/BulkUpload";
// import View from "./pages/View";
// const ErrorDetails = lazy(() => import("./pages/ErrorDetails"));

// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
//     </div>
//   );
// };
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<Protected />}>
//           <Route
//             path="/"
//             element={
//               <Suspense fallback={<Spinner />}>
//                 <HomePage />
//               </Suspense>
//             }
//           />
//           <Route path="/createcsv" element={<UploadCsv />} />
//           <Route path="/create" element={<Create />} />
//           <Route path="/edit" element={<EditRow />} />
//           <Route path="/bulk" element={<BulkUpload />} />
//           <Route path="/view" element={<View />} />

//           <Route
//             path="/errors"
//             element={
//               <Suspense fallback={<Spinner />}>
//                 <ErrorDetails />
//               </Suspense>
//             }
//           />
//         </Route>
//         <Route path="/login" element={<Login />} />
//         <Route path="/registration" element={<Registration />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
const HomePage = lazy(() => import("./pages/HomePage"));
import Protected from "./components/Protected";
import UploadCsv from "./pages/AddCsv";
import Create from "./pages/Create";
import EditRow from "./pages/EditRow";
import BulkUpload from "./pages/BulkUpload";
import View from "./pages/View";
const ErrorDetails = lazy(() => import("./pages/ErrorDetails"));

const Spinner = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      data-testid="spinner"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route path="/createcsv" element={<UploadCsv />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<EditRow />} />
        <Route path="/bulk" element={<BulkUpload />} />
        <Route path="/view" element={<View />} />

        <Route
          path="/errors"
          element={
            <Suspense fallback={<Spinner />}>
              <ErrorDetails />
            </Suspense>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
