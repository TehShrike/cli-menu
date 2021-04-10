const await_keypress = valid_keys => new Promise(resolve => {
	const listener = data => {
		const key = data.toString()
		if (valid_keys.includes(key)) {
			process.stdin.off(`data`, listener)
			process.stdin.setRawMode(false)
			process.stdin.unref()
			resolve(key)
		}
	}
	process.stdin.ref()
	process.stdin.setRawMode(true)
	process.stdin.on(`data`, listener)
})

const menu_width = 80
const default_display_menu = ({ title, menu_items }) => {
	if (title.length <= menu_width - 4) {
		const title_with_spaces = ` ` + title + ` `
		const dashes_on_left = Math.floor((menu_width - title_with_spaces.length) / 2)
		const title_with_dashes_on_left = title_with_spaces.padStart(title_with_spaces.length + dashes_on_left, `-`)
		const display_title = title_with_dashes_on_left.padEnd(menu_width, `-`)
		console.log(display_title)
	} else {
		console.log(title)
	}
	menu_items.forEach(
		({ key, name }) => console.log(key, `:`, name),
	)
}

module.exports = async({ title = `Menu`, menu_items, display_menu = default_display_menu }) => {
	while (true) {
		let keep_going = true
		const back = () => keep_going = false

		display_menu({ title, menu_items })

		const keypress = await await_keypress(menu_items.map(({ key }) => key))

		const { action } = menu_items.find(({ key }) => key === keypress)

		const result = await action({ back })

		if (!keep_going) {
			return result
		}
	}
}
