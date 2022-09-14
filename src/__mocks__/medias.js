import { v4 as uuid } from 'uuid';

export const medias = [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'Movie 1 short desctiption',
    media: '/static/images/products/product_1.png',
    title: 'Movie 1',
    totalDownloads: '594'
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'Movie 2 short desctiption',
    media: '/static/images/products/product_2.png',
    title: 'Movie 2',
    totalDownloads: '625'
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'Movie 3 short desctiption',
    media: '/static/images/products/product_3.png',
    title: 'Movie 3',
    totalDownloads: '857'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Audio 1 short desctiption',
    media: '/static/images/products/product_4.png',
    title: 'Audio 1',
    totalDownloads: '406'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Audio 2 short desctiption',
    media: '/static/images/products/product_5.png',
    title: 'Audio 2',
    totalDownloads: '835'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Audio 3 short desctiption',
    media: '/static/images/products/product_6.png',
    title: 'Audio 3',
    totalDownloads: '835'
  }
];
