const isProduction = false;

const devApiUr = 'http://127.0.0.1:8000/api/';
const prodApiUr = 'http://127.0.0.1:8000/api/';


export default {
  apiUrl: isProduction ? prodApiUr : devApiUr,
};
