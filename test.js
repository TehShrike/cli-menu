const menu = require(`./index.js`)

menu({
	menu_items: [{
		key: `l`,
		name: `lol`,
		action: () => console.log(`Yeah, laugh it up!`),
	}, {
		key: `t`,
		name: `Tell me the time`,
		action: async() => {
			console.log(`The time is`, new Date().toLocaleTimeString())
			await new Promise(resolve => setTimeout(resolve, 1500))
			console.log(`...and now it's`, new Date().toLocaleTimeString())
		},
	}, {
		key: `m`,
		name: `Check out a different menu`,
		action: () => menu({
			title: `BEHOLD THE SUBMENU`,
			menu_items: [{
				key: `j`,
				name: `Tell me a joke`,
				action: () => console.log(`This library has no eunuch testes`),
			}, {
				key: `b`,
				name: `Go back`,
				action: ({ back }) => back(),
			}],
		}),
	}, {
		key: `q`,
		name: `quit`,
		action: ({ back }) => {
			back()

			return `So long 👋`
		},
	}],
}).then(result => {
	console.log(result)
})
