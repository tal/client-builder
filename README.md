# Client Builder

Client builder is a tool for node that makes it easy to make clients for HTTP
APIs.

## Quick Setup

```js
import {API, Endpoint} from 'client-builder'

const api = new API({
  base: 'https://api.github.com',
  qsParams: ['access-token'],
  params: {
    'access-token': 'my-access-token',
  },
  responseTransform: (httpResponse) => JSON.parse(httpResponse.body),
})

const editComment = new Endpoint(api, '/repos/:owner/:repo/issues/:number/comments', {
  method: 'GET',
  params: {
    owner: 'tal',
  }
})

const response = endpoint.performAction({
  repo: 'client-builder',
  number: '123',
})

response.then((json) => {
  console.log('first comment', json[0])
})
```

This is a basic way to setup your endpoints. For any method but `GET` all parameters
other than those specified in `qsParams` are encoded and placed in the body of
the request.

## Advanced

The options passed into both `Endpoint` and `API` are merged before the rquest is made.

Both classes constructors take the options:

```js
{
  params: {},  // string:string object
  headers: {}, // string:string object
  responseTransform: function() {}, // helper method to transform the response
  qsParams: [], // [string]
}
```

### Params merging

For example:

```js
const api = new API({
  base: 'https://test.com',
  qsParams: ['access-token'],
  params: {
    'access-token': 'my-access-token',
    path_param: 'path',
    to_override: 'top',
  },
  headers: {
    'User-Agent': 'client builder',
  },
})

const editComment = new Endpoint(api, '/endpoint/:path_param', {
  method: 'PATCH',
  params: {
    owner: 'tal',
  },
  headers: {
    'Accept': 'application/json+fmt',
  },
})

const response = endpoint.performAction({
  comment: 'This is a comment',
  to_override: 'overridden',
})
```

Will yield the following request:

```
HOST: https://test.com
PATH: /endpoint/path?access-token=my-access-token
HEADERS: User-Agent=client builder;Accept=application/json+fmt;
BODY:
{
  "comment": "This is a comment",
  "owner": "tal",
  "to_override": "overridden"
}
```

## Todo
- Easy "next page" support
