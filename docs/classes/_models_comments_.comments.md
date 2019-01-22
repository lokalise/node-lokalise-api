[lokalise-api](../README.md) > ["models/comments"](../modules/_models_comments_.md) > [Comments](../classes/_models_comments_.comments.md)

# Class: Comments

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Comments**

## Implements

* [Comment](../interfaces/_interfaces_comment_.comment.md)

## Index

### Properties

* [added_at](_models_comments_.comments.md#added_at)
* [added_by](_models_comments_.comments.md#added_by)
* [added_by_email](_models_comments_.comments.md#added_by_email)
* [comment](_models_comments_.comments.md#comment)
* [comment_id](_models_comments_.comments.md#comment_id)
* [key_id](_models_comments_.comments.md#key_id)
* [endpoint](_models_comments_.comments.md#endpoint)
* [prefixURI](_models_comments_.comments.md#prefixuri)
* [rootElementName](_models_comments_.comments.md#rootelementname)

### Methods

* [create](_models_comments_.comments.md#create)
* [createPromise](_models_comments_.comments.md#createpromise)
* [delete](_models_comments_.comments.md#delete)
* [get](_models_comments_.comments.md#get)
* [handleReject](_models_comments_.comments.md#handlereject)
* [list](_models_comments_.comments.md#list)
* [populateArrayFromJson](_models_comments_.comments.md#populatearrayfromjson)
* [populateObjectFromJson](_models_comments_.comments.md#populateobjectfromjson)
* [returnBareJSON](_models_comments_.comments.md#returnbarejson)
* [update](_models_comments_.comments.md#update)

---

## Properties

<a id="added_at"></a>

###  added_at

**● added_at**: *`string`*

*Implementation of [Comment](../interfaces/_interfaces_comment_.comment.md).[added_at](../interfaces/_interfaces_comment_.comment.md#added_at)*

*Defined in [models/comments.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L12)*

___
<a id="added_by"></a>

###  added_by

**● added_by**: *`number`*

*Implementation of [Comment](../interfaces/_interfaces_comment_.comment.md).[added_by](../interfaces/_interfaces_comment_.comment.md#added_by)*

*Defined in [models/comments.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L10)*

___
<a id="added_by_email"></a>

###  added_by_email

**● added_by_email**: *`string`*

*Implementation of [Comment](../interfaces/_interfaces_comment_.comment.md).[added_by_email](../interfaces/_interfaces_comment_.comment.md#added_by_email)*

*Defined in [models/comments.ts:11](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L11)*

___
<a id="comment"></a>

###  comment

**● comment**: *`string`*

*Implementation of [Comment](../interfaces/_interfaces_comment_.comment.md).[comment](../interfaces/_interfaces_comment_.comment.md#comment)*

*Defined in [models/comments.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L9)*

___
<a id="comment_id"></a>

###  comment_id

**● comment_id**: *`number`*

*Implementation of [Comment](../interfaces/_interfaces_comment_.comment.md).[comment_id](../interfaces/_interfaces_comment_.comment.md#comment_id)*

*Defined in [models/comments.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L7)*

___
<a id="key_id"></a>

###  key_id

**● key_id**: *`number`*

*Implementation of [Comment](../interfaces/_interfaces_comment_.comment.md).[key_id](../interfaces/_interfaces_comment_.comment.md#key_id)*

*Defined in [models/comments.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L8)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/comments/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/comments.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L6)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "comments"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/comments.ts:5](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/comments.ts#L5)*

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

