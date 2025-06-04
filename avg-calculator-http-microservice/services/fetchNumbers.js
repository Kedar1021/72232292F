    const axios = require('axios');

const apiMap = {
    p: 'http://20.244.56.144/evaluation-service/prime',
    f: 'http://20.244.56.144/evaluation-service/fibo',
    e: 'http://20.244.56.144/evaluation-service/even',
    r: 'http://20.244.56.144/evaluation-service/rand'
};

module.exports = async function fetchNumbers(type) {
    try {
        const response = await axios.get(apiMap[type], { timeout: 500 });
        return response.data;
    } catch (err) {
        throw new Error('Timeout or API failed');
    }
};
