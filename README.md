# 菜单模块

> 模块代码：ibird-menu

菜单模块是用于配制系统内所有菜单或用户菜单的模块，它提供几个内部接口和外部路由供开发者调用。

## 安装模块

```js
npm i ibird-menu -S
```

## 引用模块

```js
const menu = require('ibird-menu');
```

## 菜单结构

```js
// 结构
{
    "菜单编码": {
        "code": "菜单编码，与key相同，属于冗余设计字段",
        "name": "菜单名称",
        "icon": "菜单图标",
        "uri": "菜单链接地址，与children互斥，当设置children时，该项设置会被忽略",
        "children": "子级菜单，对象类型，格式与菜单格式相同，与uri互斥，当设置uri时，该项设置会被忽略"
    }
}

// 示例
{
  "menu1": {
    "code": "menu1",
    "name": "菜单1",
    "icon": "circle",
    "children": {
      "menu1-1": {
        "code": "menu1-1",
        "name": "菜单1-1",
        "icon": "fa-circle",
        "uri": "/dashboard/home/m1_1"
      },
      "menu1-2": {
        "code": "menu1-2",
        "name": "菜单1-2",
        "icon": "fa-circle",
        "uri": "/dashboard/home/m1_2"
      }
    }
  },
  "menu2": {
    "code": "menu2",
    "name": "菜单2",
    "icon": "circle",
    "children": {
      "menu2-1": {
        "code": "menu2-1",
        "name": "菜单2-1",
        "icon": "fa-circle",
        "uri": "/dashboard/home/m2_1"
      },
      "menu2-2": {
        "code": "menu2-2",
        "name": "菜单2-2",
        "icon": "fa-circle",
        "uri": "/dashboard/home/m2_2"
      }
    }
  },
  "menu3": {
    "code": "menu3",
    "name": "菜单3",
    "icon": "fa-circle",
    "uri": "/dashboard/home/m3"
  }
}
```

> Tips：菜单列表是一个以菜单编码为key的对象类型。

## 内部接口

* menu.config：配置系统内所有菜单列表
* menu.users：配置系统内所有用户菜单列表
* menu.get：获取菜单列表

### 配置所有菜单

```js
// 传入菜单列表
menu.config(null, {
    "menu1": {
        "code": "menu1",
        "name": "菜单1",
        "icon": "circle",
        "children": {
            "menu1-1": {
                "code": "menu1-1",
                "name": "菜单1-1",
                "icon": "fa-circle",
                "uri": "/dashboard/home/m1_1"
            },
            "menu1-2": {
                "code": "menu1-2",
                "name": "菜单1-2",
                "icon": "fa-circle",
                "uri": "/dashboard/home/m1_2"
            }
        }
    },
    "menu2": {
        "code": "menu2",
        "name": "菜单2",
        "icon": "circle",
        "children": {
            "menu2-1": {
                "code": "menu2-1",
                "name": "菜单2-1",
                "icon": "fa-circle",
                "uri": "/dashboard/home/m2_1"
            },
            "menu2-2": {
                "code": "menu2-2",
                "name": "菜单2-2",
                "icon": "fa-circle",
                "uri": "/dashboard/home/m2_2"
            }
        }
    },
    "menu3": {
        "code": "menu3",
        "name": "菜单3",
        "icon": "fa-circle",
        "uri": "/dashboard/home/m3"
    }
});

// 根据ibird配置对象自动生成
const app = require('ibird-core');
menu.config(app.config());
```

### 配置用户菜单

传入用户与菜单列表的对象即可，如下所示：

```js
menu.users({
    "zhangsan": {
        "menu1": {
            "code": "menu1",
            "name": "菜单1",
            "icon": "circle",
            "children": {
                "menu1-1": {
                    "code": "menu1-1",
                    "name": "菜单1-1",
                    "icon": "fa-circle",
                    "uri": "/dashboard/home/m1_1"
                }
            }
        },
        "menu3": {
            "code": "menu3",
            "name": "菜单3",
            "icon": "fa-circle",
            "uri": "/dashboard/home/m3"
        }
    },
    "lisi": {
        "menu3": {
            "code": "menu3",
            "name": "菜单3",
            "icon": "fa-circle",
            "uri": "/dashboard/home/m3"
        }
    },
    "wangwu": {
        "menu1": {
            "code": "menu1",
            "name": "菜单1",
            "icon": "circle",
            "children": {
                "menu1-2": {
                    "code": "menu1-2",
                    "name": "菜单1-2",
                    "icon": "fa-circle",
                    "uri": "/dashboard/home/m1_2"
                }
            }
        },
        "menu2": {
            "code": "menu2",
            "name": "菜单2",
            "icon": "circle",
            "children": {
                "menu2-2": {
                    "code": "menu2-2",
                    "name": "菜单2-2",
                    "icon": "fa-circle",
                    "uri": "/dashboard/home/m2_2"
                }
            }
        },
        "menu3": {
            "code": "menu3",
            "name": "菜单3",
            "icon": "fa-circle",
            "uri": "/dashboard/home/m3"
        }
    }
});
```

### 获取菜单列表

获取菜单列表可以传递两个参数，第一个是菜单编码，第二个是用户ID，这两个参数都是可选的，但需要注意的是，不同的传参方式调用的含义是完全不同的：

```js
menu.get(); // 返回所有菜单列表
menu.get(null, 'zhangsan'); // 返回zhangsan的所有菜单列表

menu.get("menu1"); // 只返回menu1下及menu1下所有子菜单列表
menu.get("menu1", "zhangsan"); // 只返回zhangsan的menu1下及menu1下所有子菜单列表

menu.get("menu1.menu1_2"); // 返回指定层级下的菜单列表
menu.get("menu1.menu1_2.menu1_2_1", "zhangsan"); // 返回zhangsan指定层级下的菜单列表
```

## 外部路由

菜单模块提供一个内置路由方便开发者使用：

```js
// 导出内置菜单路由
const get = require('ibird-menu/route/get');

// 可以直接挂载到ibird中
const app = require('ibird-core');
app.mount(get);

// 也可以自行挂载到koa-router中
router.post('/menu', get.middleware);
```

> Tips：该接口的请求方式是GET，接收两个参数：key和userid，对应内置接口的两个参数。如果是使用`ibird-token`在浏览器登录，可以省略userid参数。



