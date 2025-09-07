import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ROUTES } from './pathes';
import Layout from '../shared/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import Loading from '../shared/loading/Loading';

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


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PHILOSOPHERS,
        element: (
          <Suspense fallback={<Loading />}>
            <Philosophers />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PHILOSOPHER_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <PhilosopherDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ARTICLS,
        element: (
          <Suspense fallback={<Loading />}>
            <Articles />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ARTICLE_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <ArticleDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TIMELINE,
        element: (
          <Suspense fallback={<Loading />}>
            <Timeline />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SCHOOLS,
        element: (
          <Suspense fallback={<Loading />}>
            <Schools />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SCHOOL_DETAILS,
        element: (
          <Suspense fallback={<Loading />}>
            <SchoolDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BOOKS,
        element: (
          <Suspense fallback={<Loading />}>
            <Books />
          </Suspense>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SIGNUP,
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        element: (
          <ProtectedRoute redirectPath={ROUTES.HOME}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ROUTES.PROFILE,
            element: (
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
