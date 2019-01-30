[lokalise](../README.md) > ["collections/base_collection"](../modules/_collections_base_collection_.md) > [BaseCollection](../classes/_collections_base_collection_.basecollection.md)

# Class: BaseCollection

## Hierarchy

**BaseCollection**

↳  [Comments](_collections_comments_.comments.md)

↳  [Contributors](_collections_contributors_.contributors.md)

↳  [Files](_collections_files_.files.md)

↳  [Keys](_collections_keys_.keys.md)

↳  [Languages](_collections_languages_.languages.md)

↳  [Projects](_collections_projects_.projects.md)

↳  [Screenshots](_collections_screenshots_.screenshots.md)

↳  [Snapshots](_collections_snapshots_.snapshots.md)

↳  [Tasks](_collections_tasks_.tasks.md)

↳  [TeamUsers](_collections_team_users_.teamusers.md)

↳  [Teams](_collections_teams_.teams.md)

↳  [Translations](_collections_translations_.translations.md)

↳  [UserGroups](_collections_user_groups_.usergroups.md)

## Index

### Properties

* [elementClass](_collections_base_collection_.basecollection.md#elementclass)
* [endpoint](_collections_base_collection_.basecollection.md#endpoint)
* [prefixURI](_collections_base_collection_.basecollection.md#prefixuri)
* [rootElementName](_collections_base_collection_.basecollection.md#rootelementname)

### Methods

* [create](_collections_base_collection_.basecollection.md#create)
* [createPromise](_collections_base_collection_.basecollection.md#createpromise)
* [delete](_collections_base_collection_.basecollection.md#delete)
* [get](_collections_base_collection_.basecollection.md#get)
* [handleReject](_collections_base_collection_.basecollection.md#handlereject)
* [list](_collections_base_collection_.basecollection.md#list)
* [populateArrayFromJson](_collections_base_collection_.basecollection.md#populatearrayfromjson)
* [populateObjectFromJson](_collections_base_collection_.basecollection.md#populateobjectfromjson)
* [returnBareJSON](_collections_base_collection_.basecollection.md#returnbarejson)
* [update](_collections_base_collection_.basecollection.md#update)

---

## Properties

<a id="elementclass"></a>

### `<Static>``<Protected>` elementClass

**● elementClass**: *`any`* =  null

*Defined in [collections/base_collection.ts:8](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L8)*

___
<a id="endpoint"></a>

### `<Static>``<Protected>` endpoint

**● endpoint**: *`string`* =  null

*Defined in [collections/base_collection.ts:6](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L6)*

___
<a id="prefixuri"></a>

### `<Static>``<Protected>` prefixURI

**● prefixURI**: *`string`* =  null

*Defined in [collections/base_collection.ts:7](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L7)*

___
<a id="rootelementname"></a>

### `<Static>``<Protected>` rootElementName

**● rootElementName**: *`string`* =  null

*Defined in [collections/base_collection.ts:5](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L5)*

___

## Methods

<a id="create"></a>

###  create

▸ **create**(body: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`any`>

*Defined in [collections/base_collection.ts:18](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L18)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| body | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`any`>

___
<a id="createpromise"></a>

### `<Protected>` createPromise

▸ **createPromise**(method: *`any`*, params: *`any`*, resolveFn: *`any`*, rejectFn?: *[handleReject](_collections_base_collection_.basecollection.md#handlereject)*, body?: *`any`*, uri?: *`any`*): `Promise`<`any`>

*Defined in [collections/base_collection.ts:55](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L55)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| method | `any` | - |
| params | `any` | - |
| resolveFn | `any` | - |
| `Default value` rejectFn | [handleReject](_collections_base_collection_.basecollection.md#handlereject) |  this.handleReject |
| `Default value` body | `any` |  null |
| `Default value` uri | `any` |  null |

**Returns:** `Promise`<`any`>

___
<a id="delete"></a>

###  delete

▸ **delete**(id: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`any`>

*Defined in [collections/base_collection.ts:27](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L27)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| id | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`any`>

___
<a id="get"></a>

###  get

▸ **get**(id: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*, body?: *`any`*): `Promise`<`any`>

*Defined in [collections/base_collection.ts:10](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L10)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| id | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |
| `Default value` body | `any` |  null |

**Returns:** `Promise`<`any`>

___
<a id="handlereject"></a>

### `<Protected>` handleReject

▸ **handleReject**(data: *`any`*): `any`

*Defined in [collections/base_collection.ts:51](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `any` |

**Returns:** `any`

___
<a id="list"></a>

###  list

▸ **list**(params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`any`[]>

*Defined in [collections/base_collection.ts:14](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L14)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) | {} |

**Returns:** `Promise`<`any`[]>

___
<a id="populatearrayfromjson"></a>

### `<Protected>` populateArrayFromJson

▸ **populateArrayFromJson**(json: *`Array`<`any`>*): `this`[]

*Defined in [collections/base_collection.ts:37](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L37)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| json | `Array`<`any`> |

**Returns:** `this`[]

___
<a id="populateobjectfromjson"></a>

### `<Protected>` populateObjectFromJson

▸ **populateObjectFromJson**(json: *`Object`*): `this`

*Defined in [collections/base_collection.ts:32](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| json | `Object` |

**Returns:** `this`

___
<a id="returnbarejson"></a>

### `<Protected>` returnBareJSON

▸ **returnBareJSON**(json: *`any`*): `any`

*Defined in [collections/base_collection.ts:47](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| json | `any` |

**Returns:** `any`

___
<a id="update"></a>

###  update

▸ **update**(id: *`any`*, body: *`any`*, params?: *[StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md)*): `Promise`<`any`>

*Defined in [collections/base_collection.ts:22](https://github.com/lokalise/node-lokalise-api/blob/324e932/src/collections/base_collection.ts#L22)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| id | `any` | - |
| body | `any` | - |
| `Default value` params | [StandartParams](../interfaces/_interfaces_standart_params_.standartparams.md) |  {} |

**Returns:** `Promise`<`any`>

___

