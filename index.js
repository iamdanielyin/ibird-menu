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
 * @param config ibird配置对象
 */
app.config = (obj, config) => {
    if (typeof config !== 'object' && typeof obj !== 'object') return;
    const result = {};
    if (!obj) {
        for (const code in config.schema) {
            let s = config.schema[code];
            if (s === null || (typeof s !== 'object')) continue;
            result[code] = {
                code: code,
                name: s.displayName || code,
                icon: 'file',
                uri: `/${code}`
            };
        }
    } else {
        Object.assign(result, obj);
    }
    cache.menus = result;
    return result;
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
 * 获取菜单列表
 * @param key
 * @param unionid
 */
app.get = (key, unionid) => {
    if (unionid) {
        if (typeof cache.users !== 'object') return {};
        if (typeof cache.users[unionid] !== 'object') return {};
    }
    const split = key.split('.');
    key = (split.length > 1) ? split.join('.children.') : key;
    return unionid ? _.get(cache.users[unionid], key, {}) : _.get(cache.menus, key, {});
};