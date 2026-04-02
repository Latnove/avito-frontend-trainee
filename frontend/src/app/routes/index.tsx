import { AdEditPage } from '@/pages/ad-edit'
import { AdViewPage } from '@/pages/ad-view'
import { AdsPage } from '@/pages/ads'

// CR: нет 404 страницы
export const routes = [
  {
    // CR: сделала бы редирект с / на нужную страницу, а не просила пользователя менять урл
    // { path: '/', element: <Navigate to="/ads" replace /> }
    path: '/',
    element: <h1>Пожалуйста, перейдите по /ads</h1>,
  },
  {
    path: '/ads',
    element: <AdsPage />,
  },
  {
    path: '/ads/:id',
    element: <AdViewPage />,
  },
  {
    path: '/ads/:id/edit',
    element: <AdEditPage />,
  },
]
