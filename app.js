'use strict'; /*jslint node: true, es5: true, indent: 2 */
var Redis = require('ioredis');

Redis.Promise.onPossiblyUnhandledRejection(function (error) {
  // you can log the error here.
  // error.command.name is the command name, here is 'set'
  // error.command.args is the command arguments, here is ['foo']
  console.error(error);
});

if (process.env.REDISCLOUD_URL) {
	console.log('Connecting to ' + process.env.REDISCLOUD_URL);
	var redis = new Redis(process.env.REDISCLOUD_URL);
} else {
	console.log('Connecting to redis://local:123456@localhost:6379');
	var redis = new Redis('redis://local:123456@localhost:6379');	
}

redis.lpush('njsagent-rediskeep', Date.now()).then(function(){
	console.log('Wrote current timestamp');
	return redis.disconnect();
}).then(function (){
	console.log('Disconnected from redis');
});