[lokalise-api](../README.md) > ["models/files"](../modules/_models_files_.md) > [Files](../classes/_models_files_.files.md)

# Class: Files

## Hierarchy

 [BaseModel](_models_base_model_.basemodel.md)

**↳ Files**

## Index

### Properties

* [filename](_models_files_.files.md#filename)
* [key_count](_models_files_.files.md#key_count)
* [endpoint](_models_files_.files.md#endpoint)
* [prefixURI](_models_files_.files.md#prefixuri)
* [rootElementName](_models_files_.files.md#rootelementname)

### Methods

* [create](_models_files_.files.md#create)
* [createPromise](_models_files_.files.md#createpromise)
* [delete](_models_files_.files.md#delete)
* [download](_models_files_.files.md#download)
* [get](_models_files_.files.md#get)
* [handleReject](_models_files_.files.md#handlereject)
* [list](_models_files_.files.md#list)
* [populateArrayFromJson](_models_files_.files.md#populatearrayfromjson)
* [populateObjectFromJson](_models_files_.files.md#populateobjectfromjson)
* [returnBareJSON](_models_files_.files.md#returnbarejson)
* [update](_models_files_.files.md#update)
* [upload](_models_files_.files.md#upload)

---

## Properties

<a id="filename"></a>

###  filename

**● filename**: *`string`*

*Defined in [models/files.ts:9](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L9)*

___
<a id="key_count"></a>

###  key_count

**● key_count**: *`number`*

*Defined in [models/files.ts:10](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L10)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Inherited from [BaseModel](_models_base_model_.basemodel.md).[endpoint](_models_base_model_.basemodel.md#endpoint)*

*Defined in [models/base_model.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/base_model.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* = "projects/{!:project_id}/files/{:id}"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[prefixURI](_models_base_model_.basemodel.md#prefixuri)*

*Defined in [models/files.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L8)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* = "files"

*Overrides [BaseModel](_models_base_model_.basemodel.md).[rootElementName](_models_base_model_.basemodel.md#rootelementname)*

*Defined in [models/files.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L7)*

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
<a id="download"></a>

###  download

▸ **download**(download: *[DownloadFileParams](../interfaces/_interfaces_download_file_params_.downloadfileparams.md)*): `Promise`<`any`>

*Defined in [models/files.ts:21](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| download | [DownloadFileParams](../interfaces/_interfaces_download_file_params_.downloadfileparams.md) |

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

▸ **list**(params?: *[FileParams](../interfaces/_interfaces_file_params_.fileparams.md)*): `Promise`<`this`[]>

*Overrides [BaseModel](_models_base_model_.basemodel.md).[list](_models_base_model_.basemodel.md#list)*

*Defined in [models/files.ts:12](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L12)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | [FileParams](../interfaces/_interfaces_file_params_.fileparams.md) |  {} |

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
<a id="upload"></a>

###  upload

▸ **upload**(project_id: *`string`*, upload: *[UploadFileParams](../interfaces/_interfaces_upload_file_params_.uploadfileparams.md)*): `Promise`<`any`>

*Defined in [models/files.ts:16](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/models/files.ts#L16)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| project_id | `string` |
| upload | [UploadFileParams](../interfaces/_interfaces_upload_file_params_.uploadfileparams.md) |

**Returns:** `Promise`<`any`>

___

