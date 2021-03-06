/*
 * @Des: 
 * @Version: 
 * @Author: Ellen
 * @Date: 2021-06-30 18:55:09
 * @LastEditors: Ellen
 * @LastEditTime: 2021-06-30 18:55:22
 */
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      // 给 User 表添加列（字段）：updateAt
      return queryInterface.addColumn('User', 'updatedAt', {
          type: Sequelize.DATE,
          allowNull: false
      })
  },

  down: (queryInterface, Sequelize) => {
      // 删除 user 表的 updatedAt 列（字段）
      return queryInterface.removeColumn('User', 'updatedAt');
  }
};
