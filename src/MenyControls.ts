export default class Menu {
	menu: HTMLDivElement
	constructor(menu: HTMLDivElement, toggleButton: HTMLButtonElement) {
		this.menu = menu

		toggleButton.addEventListener('click', () => {
			this.toggleMenu()
		})
	}

	toggleMenu() {
		this.menu.classList.toggle('menu-open')
	}
}
