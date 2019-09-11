import Main from './js/main.js';
import { getUserInfo, rankList } from './js/api/index.js';

getUserInfo().then(data => {
    new Main(data);
});
