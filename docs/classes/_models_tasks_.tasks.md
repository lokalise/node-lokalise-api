[lokalise-api](../README.md) > ["models/tasks"](../modules/_models_tasks_.md) > [Tasks](../classes/_models_tasks_.tasks.md)

# Class: Tasks

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Tasks**

## Index

### Properties

* [auto_close_languages](_models_tasks_.tasks.md#auto_close_languages)
* [auto_close_task](_models_tasks_.tasks.md#auto_close_task)
* [completed_at](_models_tasks_.tasks.md#completed_at)
* [completed_by](_models_tasks_.tasks.md#completed_by)
* [completed_by_email](_models_tasks_.tasks.md#completed_by_email)
* [created_at](_models_tasks_.tasks.md#created_at)
* [created_by](_models_tasks_.tasks.md#created_by)
* [created_by_email](_models_tasks_.tasks.md#created_by_email)
* [description](_models_tasks_.tasks.md#description)
* [due_date](_models_tasks_.tasks.md#due_date)
* [keys_count](_models_tasks_.tasks.md#keys_count)
* [languages](_models_tasks_.tasks.md#languages)
* [progress](_models_tasks_.tasks.md#progress)
* [status](_models_tasks_.tasks.md#status)
* [task_id](_models_tasks_.tasks.md#task_id)
* [title](_models_tasks_.tasks.md#title)
* [words_count](_models_tasks_.tasks.md#words_count)
* [endpoint](_models_tasks_.tasks.md#endpoint)
* [prefixURI](_models_tasks_.tasks.md#prefixuri)
* [rootElementName](_models_tasks_.tasks.md#rootelementname)

### Methods

* [create](_models_tasks_.tasks.md#create)
* [createPromise](_models_tasks_.tasks.md#createpromise)
* [delete](_models_tasks_.tasks.md#delete)
* [get](_models_tasks_.tasks.md#get)
* [handleReject](_models_tasks_.tasks.md#handlereject)
* [list](_models_tasks_.tasks.md#list)
* [populateArrayFromJson](_models_tasks_.tasks.md#populatearrayfromjson)
* [populateObjectFromJson](_models_tasks_.tasks.md#populateobjectfromjson)
* [returnBareJSON](_models_tasks_.tasks.md#returnbarejson)
* [update](_models_tasks_.tasks.md#update)

---

## Properties

<a id="auto_close_languages"></a>

###  auto_close_languages

**● auto_close_languages**: *`boolean`*

*Defined in [models/tasks.ts:19](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L19)*

___
<a id="auto_close_task"></a>

###  auto_close_task

**● auto_close_task**: *`boolean`*

*Defined in [models/tasks.ts:20](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L20)*

___
<a id="completed_at"></a>

###  completed_at

**● completed_at**: *`string`*

*Defined in [models/tasks.ts:21](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L21)*

___
<a id="completed_by"></a>

###  completed_by

**● completed_by**: *`number`*

*Defined in [models/tasks.ts:22](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L22)*

___
<a id="completed_by_email"></a>

###  completed_by_email

**● completed_by_email**: *`string`*

*Defined in [models/tasks.ts:23](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L23)*

___
<a id="created_at"></a>

###  created_at

**● created_at**: *`string`*

*Defined in [models/tasks.ts:15](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L15)*

___
<a id="created_by"></a>

###  created_by

**● created_by**: *`number`*

*Defined in [models/tasks.ts:16](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L16)*

___
<a id="created_by_email"></a>

###  created_by_email

**● created_by_email**: *`string`*

*Defined in [models/tasks.ts:17](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L17)*

___
<a id="description"></a>

###  description

**● description**: *`string`*

*Defined in [models/tasks.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L9)*

___
<a id="due_date"></a>

###  due_date

**● due_date**: *`string`*

*Defined in [models/tasks.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L12)*

___
<a id="keys_count"></a>

###  keys_count

**● keys_count**: *`number`*

*Defined in [models/tasks.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L13)*

___
<a id="languages"></a>

###  languages

**● languages**: *`object`*

*Defined in [models/tasks.ts:18](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L18)*

___
<a id="progress"></a>

###  progress

**● progress**: *`number`*

*Defined in [models/tasks.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L11)*

___
<a id="status"></a>

###  status

**● status**: *`string`*

*Defined in [models/tasks.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L10)*

___
<a id="task_id"></a>

###  task_id

**● task_id**: *`number`*

*Defined in [models/tasks.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L7)*

___
<a id="title"></a>

###  title

**● title**: *`string`*

*Defined in [models/tasks.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L8)*

___
<a id="words_count"></a>

###  words_count

**● words_count**: *`number`*

*Defined in [models/tasks.ts:14](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L14)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/tasks/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/tasks.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L6)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "tasks"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/tasks.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/tasks.ts#L5)*

___

## Methods

<a id="create"></a>

###  create

▸ **create**(body: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`this`>

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[create](_models_base_model_.basemodel.md#create)*

*Defined in [models/base_model.ts:17](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L17)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| body | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`this`>

___
<a id="createpromise"></a>

### `<Protected>` createPromise

▸ **createPromise**(method: *`any`*, params: *`any`*, resolveFn: *`any`*, rejectFn?: *[handleReject](_models_base_model_.basemodel.md#handlereject)*, body?: *`any`*, uri?: *`any`*): `Promise`<`any`>

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[createPromise](_models_base_model_.basemodel.md#createpromise)*

*Defined in [models/base_model.ts:52](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L52)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| method | `any` | - |
| params | `any` | - |
| resolveFn | `any` | - |
| `Default value` rejectFn | [handleReject](_models_base_model_.basemodel.md#handlereject) |  this.handleReject |
| `Default value` body | `any` |  null |
| `Default value` uri | `any` |  null |

**Returns:** `Promise`<`any`>

___
<a id="delete"></a>

###  delete

▸ **delete**(id: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`any`>

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[delete](_models_base_model_.basemodel.md#delete)*

*Defined in [models/base_model.ts:25](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L25)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| id | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`any`>

___
<a id="get"></a>

###  get

▸ **get**(id: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*, body?: *`any`*): `Promise`<`this`>

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[get](_models_base_model_.basemodel.md#get)*

*Defined in [models/base_model.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L9)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| id | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |
| `Default value` body | `any` |  null |

**Returns:** `Promise`<`this`>

___
<a id="handlereject"></a>

### `<Protected>` handleReject

▸ **handleReject**(data: *`any`*): `any`

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[handleReject](_models_base_model_.basemodel.md#handlereject)*

*Defined in [models/base_model.ts:48](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `any`

___
<a id="list"></a>

###  list

▸ **list**(params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`this`[]>

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[list](_models_base_model_.basemodel.md#list)*

*Defined in [models/base_model.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L13)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) | {} |

**Returns:** `Promise`<`this`[]>

___
<a id="populatearrayfromjson"></a>

### `<Protected>` populateArrayFromJson

▸ **populateArrayFromJson**(json: *`Array`<`any`>*): `this`[]

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[populateArrayFromJson](_models_base_model_.basemodel.md#populatearrayfromjson)*

*Defined in [models/base_model.ts:36](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| json | `Array`<`any`> |

**Returns:** `this`[]

___
<a id="populateobjectfromjson"></a>

### `<Protected>` populateObjectFromJson

▸ **populateObjectFromJson**(json: *`Object`*): `this`

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[populateObjectFromJson](_models_base_model_.basemodel.md#populateobjectfromjson)*

*Defined in [models/base_model.ts:29](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| json | `Object` |

**Returns:** `this`

___
<a id="returnbarejson"></a>

### `<Protected>` returnBareJSON

▸ **returnBareJSON**(json: *`any`*): `any`

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[returnBareJSON](_models_base_model_.basemodel.md#returnbarejson)*

*Defined in [models/base_model.ts:44](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| json | `any` |

**Returns:** `any`

___
<a id="update"></a>

###  update

▸ **update**(body: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`this`>

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[update](_models_base_model_.basemodel.md#update)*

*Defined in [models/base_model.ts:21](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L21)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| body | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`this`>

___

