import http from 'k6/http';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 1000,
      timeUnit: '1s',
      stages: [
        { duration: '10s', target: 300 },
        { duration: '30s', target: 500 },
      ],
    },
  },
};

export default function () {
  const BASE_URL = 'http://localhost:8000';
  const productId = Math.floor(Math.random() * 1000011) + 1;
  const param = Math.floor(Math.random() * 20 + 1);
  http.batch([
    ['GET', `${BASE_URL}/products?count=${param}&page=${param}`],
    ['GET', `${BASE_URL}/products/${productId}`],
    ['GET', `${BASE_URL}/products/${productId}/styles`],
    ['GET', `${BASE_URL}/products/${productId}/related`],
  ]);
}
