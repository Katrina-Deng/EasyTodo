/*
 * @Des: 
 * @Version: 
 * @Author: Ellen
 * @Date: 2021-06-30 19:38:01
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 21:46:48
 */
'use strict';
const crypto = require('crypto')

module.exports = {
  up(queryInterface, Sequelize) {
    // let md5 = crypto.createHash('md5');
    // let password = md5.update('123456').digest('hex');
    // let date = new Date();

    // return queryInterface.bulkInsert('User', ['Ellen', 'lili', 'leo', 'cci'].map((name, index) => {
    //     return {
    //         id: index + 1,
    //         name,
    //         password,
    //         createdAt: date,
    //         updatedAt: date
    //     }
    // }));
},
down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
}
};
