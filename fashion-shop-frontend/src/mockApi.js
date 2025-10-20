// simplest mock API - replace with real API calls later
const mockDresses = [
  { _id: '1', number: 1, name: 'Floral Dress', price: 1200, images: ['https://picsum.photos/id/1011/600/400','https://picsum.photos/id/1012/600/400'] },
  { _id: '2', number: 2, name: 'Summer Dress', price: 999, images: ['https://picsum.photos/id/1013/600/400'] },
  { _id: '3', number: 3, name: 'Evening Gown', price: 2400, images: ['https://picsum.photos/id/1014/600/400','https://picsum.photos/id/1015/600/400'] },
];

export default {
  getDresses: () => Promise.resolve(mockDresses),
};
