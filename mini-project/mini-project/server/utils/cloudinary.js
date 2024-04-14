const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dqbf4edwb', 
    api_key: '254118422228826', 
    api_secret: 'eA0KzTO1yCde8XX-e-w8rWx4Hbg' 
});

module.exports = cloudinary;