import { AdEditPage } from '@/pages/ad-edit'
import { AdViewPage } from '@/pages/ad-view'
import { AdsPage } from '@/pages/ads'

export const routes = [
  {
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
