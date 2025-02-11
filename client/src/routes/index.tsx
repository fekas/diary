import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// 懒加载页面组件
const Calendar = lazy(() => import('../pages/Calendar/index'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>加载中...</div>}>
        <Calendar />
      </Suspense>
    )
  }
]);