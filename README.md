# better-cleverbot
## Important Notice
This module is a rewrite of the node module of [cleverbot.io](https://github.com/CleverbotIO/node-cleverbot.io)

### Installation

To install this package, simply enter the following in your console
```
npm install --save better-cleverbot-io
```
Note: It is a good practice to include *--save* to add this to your dependencies in your package.json
  
### Setup

Before using this module, please get your API keys at [http://cleverbot.io/keys](http://cleverbot.io/keys)

To initialize cleverbot, require the module, then create a new instance of cleverbot.

The nick should be a unique identifier. 

You have to create and initialize a fresh instance of `better-cleverbot-io`, if you want to have different sessions without having to switch back and forth with `setNick(sessionName)`
```javascript
var cleverbot = require("better-cleverbot-io"),
bot = new cleverbot({user:'YOUR_API_USER', key:'YOUR_API_KEY',nick:'YOUR Session ID'});
```
### Initalizing the module
to initalize the module use the following:
```javascript
bot.create().then(() => {
    //You just initialized the module :)
}).catch(err => {
//if anything weird happend, you will find it here.
});
```
### Querying Cleverbot

Now querying cleverbot is simple, you pass the text to the *.ask()* method
```javascript
bot.ask("Just a small town Wolke").then((response => {
  console.log(response); // Will likely be: "Living in a uwu World"
});
```
For easy switching this module has legacy methods that work the same as `cleverbot.io`

Just add "Legacy" to the function name.

**This client is using [cleverbot.io](http://cleverbot.io)**