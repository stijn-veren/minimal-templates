import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  useRouteError,
  Outlet,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts",
        element: <Contact />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "contacts/show-photo/:photoId",
    element: <ShowPhoto />,
  },
  {
    path: "about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default function Root() {
  return (
    <div>
      <h1>Root Element</h1>
      <nav>
        <ul>
          <li>
            <Link to={`contacts`}>Contacts</Link>
            <ul>
              <li>
                <Link to={`contacts/1`}>Your Name 1</Link>
              </li>
              <li>
                <Link to={`contacts/2`}>Your Friend 2</Link>
              </li>
              <li>
                <Link to={`contacts/3`}>Your Friend 3</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={`products`}>Products</Link>
          </li>
          <li>
            <Link to={`about`}>About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function Contact() {
  let { contactId } = useParams();
  return <h2>{`Contact ${contactId ? contactId : ""}`}</h2>;
}

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Error!</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

function Products() {
  return (
    <>
      <h1>Products Element</h1>
      <ul>
        <li>
          <Link to={`/contacts/show-photo/1`}>Photo 1</Link>
        </li>
        <li>
          <Link to={`/contacts/show-photo/2`}>Photo 2</Link>
        </li>
        <li>
          <Link to={`/contacts/show-photo/3`}>Photo 3</Link>
        </li>
      </ul>
    </>
  );
}

function ShowPhoto() {
  let { photoId } = useParams();
  return (
    <>
      <h1>Show Photo Element</h1>
      <h2>{`Photo Id: ${photoId}`}</h2>
    </>
  );
}

function About() {
  return <h1>About Element</h1>;
}
