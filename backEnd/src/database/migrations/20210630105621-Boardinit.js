/*
 * @Des: 
 * @Version: 
 * @Author: Ellen
 * @Date: 2021-06-30 18:56:21
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 19:11:49
 */
'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /*
        up 需要返回一个 Promise
        queryInterface.createTable 方法用于创建表
            - 第一个参数是要创建的表的名称
            - 第二个参数是一个对象，用来描述表中包含的字段信息
            - queryInterface.createTable 返回一个 Promise
    */
    return queryInterface.createTable('Board', {
        id: {
            // 字段类型：数字
            type: Sequelize.INTEGER,
            // 设置为主键
            primaryKey: true,
            // 自动增长
            autoIncrement: true
        },
        userId: {
          // 字段类型：数字
          type: Sequelize.INTEGER,
          allowNull: false
      },
        name: {
            // 字符串类型（20长度）
            type: Sequelize.STRING(255),
            // 值唯一
            unique: true,
            // 不允许 null 值
            allowNull: false
        },
        createdAt: {
            // 日期类型
            type: Sequelize.DATE,
            // 不允许 null 值
            allowNull: false
        },
        updatedAt: {
          // 日期类型
          type: Sequelize.DATE,
          // 不允许 null 值
          allowNull: false
      }
    });

},
down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('Board');
}
};
