[lokalise-api](../README.md) > ["models/base_model"](../modules/_models_base_model_.md) > [BaseModel](../classes/_models_base_model_.basemodel.md)

# Class: BaseModel

## Hierarchy

**BaseModel**

↳  [Comments](_models_comments_.comments.md)

↳  [Contributors](_models_contributors_.contributors.md)

↳  [Files](_models_files_.files.md)

↳  [Keys](_models_keys_.keys.md)

↳  [Languages](_models_languages_.languages.md)

↳  [Projects](_models_projects_.projects.md)

↳  [Screenshots](_models_screenshots_.screenshots.md)

↳  [Snapshots](_models_snapshots_.snapshots.md)

↳  [Tasks](_models_tasks_.tasks.md)

↳  [TeamUsers](_models_team_users_.teamusers.md)

↳  [Teams](_models_teams_.teams.md)

↳  [Translations](_models_translations_.translations.md)

↳  [UserGroups](_models_user_groups_.usergroups.md)

## Index

### Properties

* [endpoint](_models_base_model_.basemodel.md#endpoint)
* [prefixURI](_models_base_model_.basemodel.md#prefixuri)
* [rootElementName](_models_base_model_.basemodel.md#rootelementname)

### Methods

* [create](_models_base_model_.basemodel.md#create)
* [createPromise](_models_base_model_.basemodel.md#createpromise)
* [delete](_models_base_model_.basemodel.md#delete)
* [get](_models_base_model_.basemodel.md#get)
* [handleReject](_models_base_model_.basemodel.md#handlereject)
* [list](_models_base_model_.basemodel.md#list)
* [populateArrayFromJson](_models_base_model_.basemodel.md#populatearrayfromjson)
* [populateObjectFromJson](_models_base_model_.basemodel.md#populateobjectfromjson)
* [returnBareJSON](_models_base_model_.basemodel.md#returnbarejson)
* [update](_models_base_model_.basemodel.md#update)

---

## Properties

<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* =  null

*Defined in [models/base_model.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L7)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* =  null

*Defined in [models/base_model.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L5)*

___

## Methods

<a id="create"></a>

###  create

▸ **create**(body: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`this`>

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

*Defined in [models/base_model.ts:21](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L21)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| body | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`this`>

___

