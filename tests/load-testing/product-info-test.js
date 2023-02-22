import http from 'k6/http';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 1000,
      timeUnit: '1s',
      stages: [
        { duration: '10s', target: 500 },
        { duration: '30s', target: 1000 },
      ],
    },
  },
};

export default function () {
  const productId = Math.floor(Math.random() * 1000011) + 1;
  const param = Math.floor(Math.random() * 20 + 1);
  http.get(
    `http://localhost:8000/products/${productId}?count=${param}&page=${param}`
  );
}
