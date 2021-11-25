## Table组件
### options.property

|              Name              | Type               | Default    | Description                                                  |
| :----------------------------: | ---------          | ---------- | ------------------------------------------------------------ |
|             `rowKey`           | `string`           | `"id"`     | 表格行 key 的取值，可以是字符串或一个函数                          |
|           `showIndex`          | `boolean`          | `true`     | 是否显示序号列                                                 |
|           `showPagination`     | `boolean`          | `true`     | 是否分页                                                      |
|            `bordered`          | `boolean`          | `true`     | 是否展示外边框和列边框                                          |
|            `columns`           | `array`            | `[]`       | 表格列的配置                                                  |
|              `btns`            | `TableBtnsType`    | `null`     | table上方按钮                                                |
|             `actions`          | `TableActionsType` | `null`     | 操作列                                                      |
|               `api`            | `TableApiType`     | `null`     | api                                                        |
|      `rebuildDataCallback`     | `(data: any)=>any` | `null`     | 重构接口返回的数据                                            |
|        `paginationConfig`      | `(data: any)=>any` | `object`   | 分页配置                                                     |
|          `handleAction`        | `(item, row)=>any` | `null`     | 点击action按钮触发 |
|        `useDefaultModal`       | `boolean`          | `false`    | 使用默认的新建修改弹框                          |

**示例：**用户行为栈最大长度为30

```typescript
MITO.init({
  ...
  maxBreadcrumbs: 30
})
```

#### btns

```typescript
enum ActionType {
  DEFAULT_GET = 'default_get',
  DEFAULT_ADD = 'default_add',
  DEFAULT_EDIT = 'default_edit',
  DEFAULT_DELETE = 'default_delete',
}
interface TableBtnListType {
  id: number;
  type: string;
  icon: any;
  label: string;
  title: string;
  action: ActionType | string;
}
interface TableBtnsType{
  show: boolean;
  list?: Array<TableBtnListType>;
}
```

**示例**：如果不需要将`show`设为`false`

```typescript
{
  btns: {
    show: true,
    list: [
      {
        id: 1,
        type: 'primary',
        icon: <PlusOutlined />,
        label: 'Add Product',
        title: 'Add Product',
         action: ProduceActionType.ADD,
        disabled: false
       },
    ],
  }
}
```

#### TableActionsType

```typescript
enum ActionType {
  DEFAULT_GET = 'default_get',
  DEFAULT_ADD = 'default_add',
  DEFAULT_EDIT = 'default_edit',
  DEFAULT_DELETE = 'default_delete',
}
interface TableActionListType {
  id: number;
  label: string;
  title: string;
  action: ActionType | string;
  disabled: boolean;
}

interface TableActionsType {
  show: boolean;
  list?: Array<TableActionListType>;
}
```

**示例**：如果不需要将`show`设为`false`

```typescript
{
  actions: {
    show: true,
    list: [
       {
        id: 1,
        label: 'Edit',
        title: 'Edit Product',
        action: ProduceActionType.EDIT,
        disabled: !HAS_WRITE_PERMISSION,
      },
    ],
  }
}
```

#### api

```typescript
enum ActionType {
  DEFAULT_GET = 'default_get',
  DEFAULT_ADD = 'default_add',
  DEFAULT_EDIT = 'default_edit',
  DEFAULT_DELETE = 'default_delete',
}
interface TableApiType {
  [propName: string]: any;
}
```

**示例**

```typescript
{
  api: {
    [ActionType.DEFAULT_GET]: {
      fn: apiGetConfigs,
      listKey: 'product_configs',
    },
  }
}
```

#### rebuildDataCallback

**示例**

```
{
  rebuildDataCallback: (data) => {
    data.forEach((item: any, key: number) => {
      item.id = key;
    });
    return data;
  }
}
```