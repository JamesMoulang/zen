const MessageRoute = require('./MessageRoute');
const _ = require('underscore');

// (message: string, routes: [Function])
// Passes message down to all the routes, in order.
// Creates a MessageRoute that lets everything through and doesn't trim, and passes message down to it.
const MessageRouter = (message, ...routes) => {
	const route = MessageRoute(undefined, undefined, routes);
	route(message);
};

module.exports = MessageRouter;