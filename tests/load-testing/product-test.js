import http from 'k6/http';

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 500,
      timeUnit: '1s',
      stages: [
        { duration: '10s', target: 500 },
        { duration: '30s', target: 1000 },
      ],
    },
  },
};

export default function () {
  http.get('http://localhost:8000/products');
}
