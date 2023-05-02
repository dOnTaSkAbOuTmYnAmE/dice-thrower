import Canvas from './Canvas'

export default class Simulator {
	canvas: Canvas
	numberInput: HTMLInputElement
	diceInput: HTMLInputElement
	throwsInput: HTMLInputElement
	gapInput: HTMLInputElement
	form: HTMLFormElement

	light: HTMLDivElement
	timeDisp: HTMLSpanElement

	options: PanelControlss

	constructor(
		canvas: HTMLCanvasElement,
		numberInput: HTMLInputElement,
		diceInput: HTMLInputElement,
		throwsInput: HTMLInputElement,
		gap: HTMLInputElement,
		form: HTMLFormElement,
		divv: HTMLDivElement,
		light: HTMLDivElement,
		running: HTMLSpanElement,
		options?: PanelControlss
	) {
		if (options != null) {
			this.options = options
		} else {
			this.options = {
				bottomMargin: 20,
				drawColor: 'black',
				text: {
					size: 16,
					family: 'Comic Sans MS',
					color: 'white',
				},
			}
		}

		this.numberInput = numberInput
		this.diceInput = diceInput
		this.throwsInput = throwsInput
		this.gapInput = gap
		this.form = form
		this.light = light
		this.timeDisp = running

		this.form.addEventListener('submit', (e) => {
			e.preventDefault()
			this.light.style.setProperty('--light-bg', 'red')
			this.light.innerText = 'Running'

			setTimeout(() => {
				this.simulate()
			}, 100)
		})
		this.canvas = new Canvas(canvas, divv)

		window.addEventListener('resize', () => {})
	}

	simulate() {
		const startTime: number = Date.now()

		const throws = +this.throwsInput.value
		const num: number = +this.numberInput.value
		const dice: number = +this.diceInput.value
		const gap: number = +this.gapInput.value

		const numCols = dice * num

		const distribution: (string | number)[] = []

		for (let i = num; i <= numCols; i++) {
			distribution.push(i)
		}

		let thrwos_data: { [dist: string]: number } = {}
		distribution.forEach((val) => {
			thrwos_data[val] = 0
		})

		for (let i = 0; i < throws; i++) {
			const a = this.throwDices()

			let isGut = false

			distribution.forEach((val, index) => {
				if (!isGut) {
					if (a <= +val) {
						thrwos_data[distribution[index]] += 1
						isGut = true
					}
				}
			})
		}

		this.canvas.draw(
			thrwos_data,
			numCols,
			gap,
			this.options.bottomMargin,
			this.options.drawColor,
			this.options.text
		)

		this.light.style.setProperty('--light-bg', 'greenyellow')
		this.light.innerText = 'Done'

		const finalTime = Date.now() - startTime

		console.log(finalTime)
		this.timeDisp.innerHTML = `${(finalTime / 1000)
			.toFixed(2)
			.split('.')
			.join('s ')}ms`
	}

	throwDices(): number {
		const num: number = +this.numberInput.value
		const dice: number = +this.diceInput.value

		let suma: number = 0
		for (let i = 0; i < num; i++) {
			const throv = Math.ceil(Math.random() * +dice)
			suma += throv
		}

		return suma
	}
}

export interface PanelControlss {
	drawColor: string
	bottomMargin: number
	text: TextStyle
}

export interface TextStyle {
	size: number
	color: string
	family: string
	bold?: boolean
	italic?: boolean
}
