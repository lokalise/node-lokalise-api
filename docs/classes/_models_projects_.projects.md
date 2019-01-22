[lokalise-api](../README.md) > ["models/projects"](../modules/_models_projects_.md) > [Projects](../classes/_models_projects_.projects.md)

# Class: Projects

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Projects**

## Implements

* [Project](../interfaces/_interfaces_project_.project.md)

## Index

### Properties

* [created_at](_models_projects_.projects.md#created_at)
* [created_by](_models_projects_.projects.md#created_by)
* [created_by_email](_models_projects_.projects.md#created_by_email)
* [description](_models_projects_.projects.md#description)
* [name](_models_projects_.projects.md#name)
* [project_id](_models_projects_.projects.md#project_id)
* [team_id](_models_projects_.projects.md#team_id)
* [endpoint](_models_projects_.projects.md#endpoint)
* [prefixURI](_models_projects_.projects.md#prefixuri)
* [rootElementName](_models_projects_.projects.md#rootelementname)

### Methods

* [create](_models_projects_.projects.md#create)
* [createPromise](_models_projects_.projects.md#createpromise)
* [delete](_models_projects_.projects.md#delete)
* [empty](_models_projects_.projects.md#empty)
* [get](_models_projects_.projects.md#get)
* [handleReject](_models_projects_.projects.md#handlereject)
* [list](_models_projects_.projects.md#list)
* [populateArrayFromJson](_models_projects_.projects.md#populatearrayfromjson)
* [populateObjectFromJson](_models_projects_.projects.md#populateobjectfromjson)
* [returnBareJSON](_models_projects_.projects.md#returnbarejson)
* [update](_models_projects_.projects.md#update)

---

## Properties

<a id="created_at"></a>

###  created_at

**● created_at**: *`string`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[created_at](../interfaces/_interfaces_project_.project.md#created_at)*

*Defined in [models/projects.ts:14](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L14)*

___
<a id="created_by"></a>

###  created_by

**● created_by**: *`number`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[created_by](../interfaces/_interfaces_project_.project.md#created_by)*

*Defined in [models/projects.ts:15](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L15)*

___
<a id="created_by_email"></a>

###  created_by_email

**● created_by_email**: *`string`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[created_by_email](../interfaces/_interfaces_project_.project.md#created_by_email)*

*Defined in [models/projects.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L13)*

___
<a id="description"></a>

###  description

**● description**: *`string`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[description](../interfaces/_interfaces_project_.project.md#description)*

*Defined in [models/projects.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L11)*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[name](../interfaces/_interfaces_project_.project.md#name)*

*Defined in [models/projects.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L10)*

___
<a id="project_id"></a>

###  project_id

**● project_id**: *`number`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[project_id](../interfaces/_interfaces_project_.project.md#project_id)*

*Defined in [models/projects.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L9)*

___
<a id="team_id"></a>

###  team_id

**● team_id**: *`number`*

*Implementation of [Project](../interfaces/_interfaces_project_.project.md).[team_id](../interfaces/_interfaces_project_.project.md#team_id)*

*Defined in [models/projects.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L12)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/projects.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L7)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "projects"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/projects.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L6)*

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
<a id="empty"></a>

###  empty

▸ **empty**(project_id: *`any`*): `void`

*Defined in [models/projects.ts:17](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/projects.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| project_id | `any` |

**Returns:** `void`

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

