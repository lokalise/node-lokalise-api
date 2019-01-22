[lokalise-api](../README.md) > ["models/translations"](../modules/_models_translations_.md) > [Translations](../classes/_models_translations_.translations.md)

# Class: Translations

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Translations**

## Index

### Properties

* [is_fuzzy](_models_translations_.translations.md#is_fuzzy)
* [is_reviewed](_models_translations_.translations.md#is_reviewed)
* [key_id](_models_translations_.translations.md#key_id)
* [language_iso](_models_translations_.translations.md#language_iso)
* [modified_at](_models_translations_.translations.md#modified_at)
* [modified_by](_models_translations_.translations.md#modified_by)
* [modified_by_email](_models_translations_.translations.md#modified_by_email)
* [translation](_models_translations_.translations.md#translation)
* [translation_id](_models_translations_.translations.md#translation_id)
* [words](_models_translations_.translations.md#words)
* [endpoint](_models_translations_.translations.md#endpoint)
* [prefixURI](_models_translations_.translations.md#prefixuri)
* [rootElementName](_models_translations_.translations.md#rootelementname)

### Methods

* [create](_models_translations_.translations.md#create)
* [createPromise](_models_translations_.translations.md#createpromise)
* [delete](_models_translations_.translations.md#delete)
* [get](_models_translations_.translations.md#get)
* [handleReject](_models_translations_.translations.md#handlereject)
* [list](_models_translations_.translations.md#list)
* [populateArrayFromJson](_models_translations_.translations.md#populatearrayfromjson)
* [populateObjectFromJson](_models_translations_.translations.md#populateobjectfromjson)
* [returnBareJSON](_models_translations_.translations.md#returnbarejson)
* [update](_models_translations_.translations.md#update)

---

## Properties

<a id="is_fuzzy"></a>

###  is_fuzzy

**● is_fuzzy**: *`boolean`*

*Defined in [models/translations.ts:14](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L14)*

___
<a id="is_reviewed"></a>

###  is_reviewed

**● is_reviewed**: *`boolean`*

*Defined in [models/translations.ts:15](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L15)*

___
<a id="key_id"></a>

###  key_id

**● key_id**: *`number`*

*Defined in [models/translations.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L8)*

___
<a id="language_iso"></a>

###  language_iso

**● language_iso**: *`string`*

*Defined in [models/translations.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L9)*

___
<a id="modified_at"></a>

###  modified_at

**● modified_at**: *`string`*

*Defined in [models/translations.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L10)*

___
<a id="modified_by"></a>

###  modified_by

**● modified_by**: *`number`*

*Defined in [models/translations.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L11)*

___
<a id="modified_by_email"></a>

###  modified_by_email

**● modified_by_email**: *`string`*

*Defined in [models/translations.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L12)*

___
<a id="translation"></a>

###  translation

**● translation**: *`string`*

*Defined in [models/translations.ts:13](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L13)*

___
<a id="translation_id"></a>

###  translation_id

**● translation_id**: *`number`*

*Defined in [models/translations.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L7)*

___
<a id="words"></a>

###  words

**● words**: *`number`*

*Defined in [models/translations.ts:16](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L16)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/translations/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/translations.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L6)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "translations"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/translations.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/translations.ts#L5)*

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

