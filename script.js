import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '60s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 400, // if the preAllocatedVUs are not enough, we can initialize more
    }
  }
};

export default function () {
  // GET
  http.get('http://localhost:3030/products/id/1'); // these are the endpoints I'll be hitting

  // POST
  var url = 'http://localhost:3030/newProduct';
  var payload = JSON.stringify({
    id: 1,
    title: 'Sample Title',
    brand: 'Sample Brand',
    department: 'Sample Department',
    price: 120.99,
    imageurl: 'https://sdctestbucket.s3.amazonaws.com/tarjay-sample-1.jpeg',
    producturl: '/123abc'
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
  sleep(1);
}