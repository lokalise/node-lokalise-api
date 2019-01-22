[lokalise-api](../README.md) > ["models/contributors"](../modules/_models_contributors_.md) > [Contributors](../classes/_models_contributors_.contributors.md)

# Class: Contributors

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Contributors**

## Index

### Properties

* [admin_rights](_models_contributors_.contributors.md#admin_rights)
* [created_at](_models_contributors_.contributors.md#created_at)
* [email](_models_contributors_.contributors.md#email)
* [fullname](_models_contributors_.contributors.md#fullname)
* [is_admin](_models_contributors_.contributors.md#is_admin)
* [is_reviewer](_models_contributors_.contributors.md#is_reviewer)
* [languages](_models_contributors_.contributors.md#languages)
* [user_id](_models_contributors_.contributors.md#user_id)
* [endpoint](_models_contributors_.contributors.md#endpoint)
* [prefixURI](_models_contributors_.contributors.md#prefixuri)
* [rootElementName](_models_contributors_.contributors.md#rootelementname)

### Methods

* [create](_models_contributors_.contributors.md#create)
* [createPromise](_models_contributors_.contributors.md#createpromise)
* [delete](_models_contributors_.contributors.md#delete)
* [get](_models_contributors_.contributors.md#get)
* [handleReject](_models_contributors_.contributors.md#handlereject)
* [list](_models_contributors_.contributors.md#list)
* [populateArrayFromJson](_models_contributors_.contributors.md#populatearrayfromjson)
* [populateObjectFromJson](_models_contributors_.contributors.md#populateobjectfromjson)
* [returnBareJSON](_models_contributors_.contributors.md#returnbarejson)
* [update](_models_contributors_.contributors.md#update)

---

## Properties

<a id="admin_rights"></a>

###  admin_rights

**● admin_rights**: *`string`[]*

*Defined in [models/contributors.ts:14](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L14)*

___
<a id="created_at"></a>

###  created_at

**● created_at**: *`string`*

*Defined in [models/contributors.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L10)*

___
<a id="email"></a>

###  email

**● email**: *`string`*

*Defined in [models/contributors.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L8)*

___
<a id="fullname"></a>

###  fullname

**● fullname**: *`string`*

*Defined in [models/contributors.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L9)*

___
<a id="is_admin"></a>

###  is_admin

**● is_admin**: *`boolean`*

*Defined in [models/contributors.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L11)*

___
<a id="is_reviewer"></a>

###  is_reviewer

**● is_reviewer**: *`boolean`*

*Defined in [models/contributors.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L12)*

___
<a id="languages"></a>

###  languages

**● languages**: *`object`*

*Defined in [models/contributors.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L13)*

___
<a id="user_id"></a>

###  user_id

**● user_id**: *`number`*

*Defined in [models/contributors.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L7)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/contributors/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/contributors.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L6)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "contributors"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/contributors.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/contributors.ts#L5)*

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

