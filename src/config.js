const API_HOST = process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_SERVER : 'http://localhost:8000';

export default API_HOST;
