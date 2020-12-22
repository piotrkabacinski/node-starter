import request from 'supertest';
import createApp from '../app';

const app = createApp();

export default request(app);
