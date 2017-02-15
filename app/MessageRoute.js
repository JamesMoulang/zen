var _ = require('underscore');

// (match: regex, remove: regex, routes: [Function]) => (message)
// Returns a function that is given a message.
// Then, if the message matches 'match', trim 'remove' from it and pass it down to routes.
const MessageRoute = (match, remove, ...routes) => {
	return (message) => {
		console.log(message.content);
		if (typeof(match) === 'undefined' || message.content.match(match)) {
			const trimmedContent = typeof(match) === 'undefined' ? message.content : message.content.replace(remove, '');
			const trimmed = Object.assign({}, message, {content: trimmedContent});
			console.log(message.content + " -> " + trimmed.content);
			_.each(routes, (r) => {
				r(trimmed);
			});
		}
	};
};

module.exports = MessageRoute;