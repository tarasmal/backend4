const {get} = require("axios");
const getIp = async () => {
    try {
        const response = await get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching server IP:', error);
        return 'Error fetching IP';
    }
};


module.exports = getIp