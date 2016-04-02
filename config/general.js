const path = require('path');
module.exports = {
	'secret' : '',
    'database': process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/',
    'dbname': 'cloud',
    'root': path.join(__dirname, '..'),
    'cloud_name' : '',
    'api_key' : '',
    'api_secret': '',
};