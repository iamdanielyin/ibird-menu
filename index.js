'use strict';

/**
 * 主模块
 * Created by yinfxs on 2017/4/7.
 */

const _ = require('lodash');
const app = {};
module.exports = app;

const cache = { menus: {}, users: {} };
/**
 * 菜单初始化配置
 * @param obj 配置对象
 */
app.config = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    cache.menus = obj;
};
/**
 * 用户菜单初始化配置
 * @param obj 配置对象
 */
app.users = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    Object.assign(cache.users, obj);
};

/**
 *
 * @param key
 * @param unionid
 */
app.get = (key, unionid) => {
    if (typeof cache.users !== 'object') return {};
    if (typeof cache.users[unionid] !== 'object') return {};
    return unionid ? _.get(cache.users[unionid], key, {}) : _.get(cache.menus, key, {});
};