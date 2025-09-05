import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './pathes';
import Layout from '../shared/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// Lazy load components
const Home = React.lazy(() => import('../modules/home/Home'));
const Philosophers = React.lazy(() => import('../modules/philosophers/Philosophers'));
const PhilosopherDetails = React.lazy(() => import('../modules/philosopher-details/PhilosopherDetails'));
const Articles = React.lazy(() => import('../modules/articles/Articles'));
const ArticleDetails = React.lazy(() => import('../modules/article-details/ArticleDetails'));
const Timeline = React.lazy(() => import('../modules/timeline/Timeline'));
const Auth = React.lazy(() => import('../modules/auth/Auth'));
const Login = React.lazy(() => import('../modules/auth/login/login'));
const Signup = React.lazy(() => import('../modules/auth/signup/signup'));
const Schools = React.lazy(() => import('../modules/schools/Schools'));
const SchoolDetails = React.lazy(() => import('../modules/school-details/SchoolDetails'));
const Books = React.lazy(() => import('../modules/books/Books'));


// Mock authentication state - replace with your actual auth logic
const isAuthenticated = true;

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PHILOSOPHERS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Philosophers />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PHILOSOPHER_DETAILS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PhilosopherDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ARTICLS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Articles />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ARTICLE_DETAILS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TIMELINE,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Timeline />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SCHOOLS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Schools />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SCHOOL_DETAILS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SchoolDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BOOKS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Books />
          </Suspense>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SIGNUP,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense>
        ),
      },
      {
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated} redirectPath={ROUTES.HOME}>
            <Suspense fallback={<div>Loading...</div>} />
          </ProtectedRoute>
        ),
        children: [

          {
            path: ROUTES.PROFILE,
            element: <Auth />,
          },
        ],
      },
    ],
  },
]);
