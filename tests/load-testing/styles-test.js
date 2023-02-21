import http from 'k6/http';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 500,
      timeUnit: '1s',
      stages: [
        { duration: '10s', target: 500 },
        { duration: '10s', target: 1000 },
      ],
      thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 200'],
      },
    },
  },
};

export default function () {
  const productId = Math.floor(Math.random() * 1000011) + 1;
  http.get(`http://localhost:8000/products/${productId}/styles`);
}
