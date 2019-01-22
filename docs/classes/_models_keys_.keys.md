[lokalise-api](../README.md) > ["models/keys"](../modules/_models_keys_.md) > [Keys](../classes/_models_keys_.keys.md)

# Class: Keys

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Keys**

## Index

### Properties

* [base_words](_models_keys_.keys.md#base_words)
* [char_limit](_models_keys_.keys.md#char_limit)
* [comments](_models_keys_.keys.md#comments)
* [context](_models_keys_.keys.md#context)
* [created_at](_models_keys_.keys.md#created_at)
* [custom_attributes](_models_keys_.keys.md#custom_attributes)
* [description](_models_keys_.keys.md#description)
* [filenames](_models_keys_.keys.md#filenames)
* [is_archived](_models_keys_.keys.md#is_archived)
* [is_hidden](_models_keys_.keys.md#is_hidden)
* [is_plural](_models_keys_.keys.md#is_plural)
* [key_id](_models_keys_.keys.md#key_id)
* [key_name](_models_keys_.keys.md#key_name)
* [platforms](_models_keys_.keys.md#platforms)
* [plural_name](_models_keys_.keys.md#plural_name)
* [screenshots](_models_keys_.keys.md#screenshots)
* [tags](_models_keys_.keys.md#tags)
* [translations](_models_keys_.keys.md#translations)
* [endpoint](_models_keys_.keys.md#endpoint)
* [prefixURI](_models_keys_.keys.md#prefixuri)
* [rootElementName](_models_keys_.keys.md#rootelementname)

### Methods

* [bulk_update](_models_keys_.keys.md#bulk_update)
* [create](_models_keys_.keys.md#create)
* [createPromise](_models_keys_.keys.md#createpromise)
* [delete](_models_keys_.keys.md#delete)
* [get](_models_keys_.keys.md#get)
* [handleReject](_models_keys_.keys.md#handlereject)
* [list](_models_keys_.keys.md#list)
* [populateArrayFromJson](_models_keys_.keys.md#populatearrayfromjson)
* [populateObjectFromJson](_models_keys_.keys.md#populateobjectfromjson)
* [returnBareJSON](_models_keys_.keys.md#returnbarejson)
* [update](_models_keys_.keys.md#update)

---

## Properties

<a id="base_words"></a>

###  base_words

**● base_words**: *`number`*

*Defined in [models/keys.ts:23](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L23)*

___
<a id="char_limit"></a>

###  char_limit

**● char_limit**: *`number`*

*Defined in [models/keys.ts:24](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L24)*

___
<a id="comments"></a>

###  comments

**● comments**: *`object`*

*Defined in [models/keys.ts:15](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L15)*

___
<a id="context"></a>

###  context

**● context**: *`string`*

*Defined in [models/keys.ts:22](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L22)*

___
<a id="created_at"></a>

###  created_at

**● created_at**: *`string`*

*Defined in [models/keys.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L9)*

___
<a id="custom_attributes"></a>

###  custom_attributes

**● custom_attributes**: *`any`[]*

*Defined in [models/keys.ts:25](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L25)*

___
<a id="description"></a>

###  description

**● description**: *`string`*

*Defined in [models/keys.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L12)*

___
<a id="filenames"></a>

###  filenames

**● filenames**: *`object`*

*Defined in [models/keys.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L11)*

___
<a id="is_archived"></a>

###  is_archived

**● is_archived**: *`boolean`*

*Defined in [models/keys.ts:21](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L21)*

___
<a id="is_hidden"></a>

###  is_hidden

**● is_hidden**: *`boolean`*

*Defined in [models/keys.ts:20](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L20)*

___
<a id="is_plural"></a>

###  is_plural

**● is_plural**: *`boolean`*

*Defined in [models/keys.ts:18](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L18)*

___
<a id="key_id"></a>

###  key_id

**● key_id**: *`number`*

*Defined in [models/keys.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L8)*

___
<a id="key_name"></a>

###  key_name

**● key_name**: *`string`*

*Defined in [models/keys.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L10)*

___
<a id="platforms"></a>

###  platforms

**● platforms**: *`string`[]*

*Defined in [models/keys.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L13)*

___
<a id="plural_name"></a>

###  plural_name

**● plural_name**: *`string`*

*Defined in [models/keys.ts:19](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L19)*

___
<a id="screenshots"></a>

###  screenshots

**● screenshots**: *`object`*

*Defined in [models/keys.ts:16](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L16)*

___
<a id="tags"></a>

###  tags

**● tags**: *`string`[]*

*Defined in [models/keys.ts:14](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L14)*

___
<a id="translations"></a>

###  translations

**● translations**: *`object` | `object`[]*

*Defined in [models/keys.ts:17](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L17)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/keys/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/keys.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L7)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "keys"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/keys.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L6)*

___

## Methods

<a id="bulk_update"></a>

###  bulk_update

▸ **bulk_update**(project_id: *`string`*, keys: *[BulkUpdateKeysParams](../interfaces/_interfaces_bulk_update_key_.bulkupdatekeysparams.md)*): `void`

*Defined in [models/keys.ts:27](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/keys.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| project_id | `string` |
| keys | [BulkUpdateKeysParams](../interfaces/_interfaces_bulk_update_key_.bulkupdatekeysparams.md) |

**Returns:** `void`

___
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

