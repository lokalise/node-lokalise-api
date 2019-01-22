[lokalise-api](../README.md) > ["models/user_groups"](../modules/_models_user_groups_.md) > [UserGroups](../classes/_models_user_groups_.usergroups.md)

# Class: UserGroups

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ UserGroups**

## Index

### Properties

* [created_at](_models_user_groups_.usergroups.md#created_at)
* [group_id](_models_user_groups_.usergroups.md#group_id)
* [members](_models_user_groups_.usergroups.md#members)
* [name](_models_user_groups_.usergroups.md#name)
* [permissions](_models_user_groups_.usergroups.md#permissions)
* [projects](_models_user_groups_.usergroups.md#projects)
* [team_id](_models_user_groups_.usergroups.md#team_id)
* [endpoint](_models_user_groups_.usergroups.md#endpoint)
* [prefixURI](_models_user_groups_.usergroups.md#prefixuri)
* [rootElementName](_models_user_groups_.usergroups.md#rootelementname)

### Methods

* [create](_models_user_groups_.usergroups.md#create)
* [createPromise](_models_user_groups_.usergroups.md#createpromise)
* [delete](_models_user_groups_.usergroups.md#delete)
* [get](_models_user_groups_.usergroups.md#get)
* [handleReject](_models_user_groups_.usergroups.md#handlereject)
* [list](_models_user_groups_.usergroups.md#list)
* [populateArrayFromJson](_models_user_groups_.usergroups.md#populatearrayfromjson)
* [populateObjectFromJson](_models_user_groups_.usergroups.md#populateobjectfromjson)
* [returnBareJSON](_models_user_groups_.usergroups.md#returnbarejson)
* [update](_models_user_groups_.usergroups.md#update)

---

## Properties

<a id="created_at"></a>

###  created_at

**● created_at**: *`string`*

*Defined in [models/user_groups.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L10)*

___
<a id="group_id"></a>

###  group_id

**● group_id**: *`number`*

*Defined in [models/user_groups.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L7)*

___
<a id="members"></a>

###  members

**● members**: *`string`[]*

*Defined in [models/user_groups.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L13)*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Defined in [models/user_groups.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L8)*

___
<a id="permissions"></a>

###  permissions

**● permissions**: *`object`*

*Defined in [models/user_groups.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L9)*

___
<a id="projects"></a>

###  projects

**● projects**: *`object`[]*

*Defined in [models/user_groups.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L12)*

___
<a id="team_id"></a>

###  team_id

**● team_id**: *`number`*

*Defined in [models/user_groups.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L11)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "teams/{!:team_id}/groups/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/user_groups.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L6)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "user_groups"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/user_groups.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/user_groups.ts#L5)*

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

