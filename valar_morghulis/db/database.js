let fs        = require('fs');
let path      = require('path');
let Sequelize = require('sequelize');
let basename  = path.basename(__filename);
let env       = process.env.NODE_ENV || 'development';
let config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let db        = {};


let engine = new Sequelize(config.database, config.username, config.password, config);

try {
    await engine.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


fs.d
class Player extends Model {}
class PlayerClass extends Model {}

Player.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

})


PlayerClass.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameClass: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
})

