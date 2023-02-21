import http from 'k6/http';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 1000,
      timeUnit: '1s',
      stages: [
        { duration: '10s', target: 1000 },
        { duration: '30s', target: 500 },
      ],
    },
  },
};

export default function () {
  const BASE_URL = 'http://localhost:8000';
  const productId = Math.floor(Math.random() * 1000011) + 1;
  http.batch([
    ['GET', `${BASE_URL}/products`],
    ['GET', `${BASE_URL}/products/${productId}`],
    ['GET', `${BASE_URL}/products/${productId}/styles`],
    ['GET', `${BASE_URL}/products/${productId}/related`],
  ]);
}
