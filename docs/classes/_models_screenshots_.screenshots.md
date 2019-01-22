[lokalise-api](../README.md) > ["models/screenshots"](../modules/_models_screenshots_.md) > [Screenshots](../classes/_models_screenshots_.screenshots.md)

# Class: Screenshots

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Screenshots**

## Index

### Properties

* [description](_models_screenshots_.screenshots.md#description)
* [height](_models_screenshots_.screenshots.md#height)
* [key_ids](_models_screenshots_.screenshots.md#key_ids)
* [screenshot_id](_models_screenshots_.screenshots.md#screenshot_id)
* [screenshot_tags](_models_screenshots_.screenshots.md#screenshot_tags)
* [title](_models_screenshots_.screenshots.md#title)
* [url](_models_screenshots_.screenshots.md#url)
* [width](_models_screenshots_.screenshots.md#width)
* [endpoint](_models_screenshots_.screenshots.md#endpoint)
* [prefixURI](_models_screenshots_.screenshots.md#prefixuri)
* [rootElementName](_models_screenshots_.screenshots.md#rootelementname)

### Methods

* [create](_models_screenshots_.screenshots.md#create)
* [createPromise](_models_screenshots_.screenshots.md#createpromise)
* [delete](_models_screenshots_.screenshots.md#delete)
* [get](_models_screenshots_.screenshots.md#get)
* [handleReject](_models_screenshots_.screenshots.md#handlereject)
* [list](_models_screenshots_.screenshots.md#list)
* [populateArrayFromJson](_models_screenshots_.screenshots.md#populatearrayfromjson)
* [populateObjectFromJson](_models_screenshots_.screenshots.md#populateobjectfromjson)
* [returnBareJSON](_models_screenshots_.screenshots.md#returnbarejson)
* [update](_models_screenshots_.screenshots.md#update)

---

## Properties

<a id="description"></a>

###  description

**● description**: *`string`*

*Defined in [models/screenshots.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L11)*

___
<a id="height"></a>

###  height

**● height**: *`number`*

*Defined in [models/screenshots.ts:14](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L14)*

___
<a id="key_ids"></a>

###  key_ids

**● key_ids**: *`string`[]*

*Defined in [models/screenshots.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L8)*

___
<a id="screenshot_id"></a>

###  screenshot_id

**● screenshot_id**: *`number`*

*Defined in [models/screenshots.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L7)*

___
<a id="screenshot_tags"></a>

###  screenshot_tags

**● screenshot_tags**: *`string`[]*

*Defined in [models/screenshots.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L12)*

___
<a id="title"></a>

###  title

**● title**: *`string`*

*Defined in [models/screenshots.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L10)*

___
<a id="url"></a>

###  url

**● url**: *`string`*

*Defined in [models/screenshots.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L9)*

___
<a id="width"></a>

###  width

**● width**: *`number`*

*Defined in [models/screenshots.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L13)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/screenshots/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/screenshots.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L6)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "screenshots"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/screenshots.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/screenshots.ts#L5)*

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

