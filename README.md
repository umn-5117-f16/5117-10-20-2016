# 5117-10-20-2016

## Tutorial

* <https://docs.mongodb.com/getting-started/shell/>
* <http://mongodb.github.io/node-mongodb-native/2.2/quick-start/>

## Setup

get the data:

```sh
cd data
wget https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json
```

for convenience, set up an alias to connect to mongodb:

```sh
alias mdb='mongo ds041526.mlab.com:41526/maxharp3r-testingdb -u <dbuser> -p <dbpassword>'
alias mdb_import='mongoimport --host ds041526.mlab.com --port 41526 --db maxharp3r-testingdb -u <dbuser> -p <dbpassword>'
```

import data

```sh
mdb_import --collection restaurants --drop --file ./data/primer-dataset.json
```

insert documents into "messages" collection

```js
db.messages.insert({'content': 'hello, world'})
```

to try:
* bulk insert
* custom \_id (see https://docs.mongodb.com/manual/reference/method/ObjectId/)

find documents in "restaurants"

```js
db.restaurants.find( { "grades.grade": "B" } )
```

## node

see [mongo.js](mongo.js) for db connection management and
[queries.js](queries.js) for example calls.
