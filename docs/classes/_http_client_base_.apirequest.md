[lokalise-api](../README.md) > ["http_client/base"](../modules/_http_client_base_.md) > [ApiRequest](../classes/_http_client_base_.apirequest.md)

# Class: ApiRequest

## Hierarchy

**ApiRequest**

## Index

### Constructors

* [constructor](_http_client_base_.apirequest.md#constructor)

### Properties

* [params](_http_client_base_.apirequest.md#params)
* [promise](_http_client_base_.apirequest.md#promise)
* [urlRoot](_http_client_base_.apirequest.md#urlroot)

### Methods

* [composeURI](_http_client_base_.apirequest.md#composeuri)
* [constructParameters](_http_client_base_.apirequest.md#constructparameters)
* [createPromise](_http_client_base_.apirequest.md#createpromise)
* [mapUriParams](_http_client_base_.apirequest.md#mapuriparams)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ApiRequest**(uri: *`any`*, method: *`any`*, body?: *`any`*, params?: *`object`*): [ApiRequest](_http_client_base_.apirequest.md)

*Defined in [http_client/base.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L8)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| uri | `any` | - |
| method | `any` | - |
| `Default value` body | `any` |  null |
| `Default value` params | `object` | {} |

**Returns:** [ApiRequest](_http_client_base_.apirequest.md)

___

## Properties

<a id="params"></a>

###  params

**● params**: *`any`*

*Defined in [http_client/base.ts:8](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L8)*

___
<a id="promise"></a>

###  promise

**● promise**: *`Promise`<`Object`>*

*Defined in [http_client/base.ts:7](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L7)*

___
<a id="urlroot"></a>

### `<Private>` urlRoot

**● urlRoot**: *`string`* = "https://api.lokalise.co/api2/"

*Defined in [http_client/base.ts:6](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L6)*

___

## Methods

<a id="composeuri"></a>

### `<Protected>` composeURI

▸ **composeURI**(uri: *`any`*): `any`

*Defined in [http_client/base.ts:46](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| uri | `any` |

**Returns:** `any`

___
<a id="constructparameters"></a>

###  constructParameters

▸ **constructParameters**(method: *`any`*, params: *`any`*): `void`

*Defined in [http_client/base.ts:69](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| method | `any` |
| params | `any` |

**Returns:** `void`

___
<a id="createpromise"></a>

###  createPromise

▸ **createPromise**(uri: *`any`*, method: *`any`*, body: *`any`*): `Promise`<`Object`>

*Defined in [http_client/base.ts:17](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L17)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| uri | `any` |
| method | `any` |
| body | `any` |

**Returns:** `Promise`<`Object`>

___
<a id="mapuriparams"></a>

### `<Protected>` mapUriParams

▸ **mapUriParams**(params: *`any`*): `(Anonymous function)`

*Defined in [http_client/base.ts:53](https://github.com/lokalise/node-lokalise-api/blob/0885602/src/http_client/base.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| params | `any` |

**Returns:** `(Anonymous function)`

___

