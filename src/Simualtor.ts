export default class Simulator {
	canvas: Canvas
	numberInput: HTMLInputElement
	diceInput: HTMLInputElement
	throwsInput: HTMLInputElement
	gapInput: HTMLInputElement
	form: HTMLFormElement

	constructor(
		canvas: HTMLCanvasElement,
		numberInput: HTMLInputElement,
		diceInput: HTMLInputElement,
		throwsInput: HTMLInputElement,
		gap: HTMLInputElement,
		form: HTMLFormElement,
		divv: HTMLDivElement
	) {
		this.numberInput = numberInput
		this.diceInput = diceInput
		this.throwsInput = throwsInput
		this.gapInput = gap
		this.form = form

		this.form.addEventListener('submit', (e) => {
			e.preventDefault()

			this.simulate()
		})

		this.canvas = new Canvas(canvas, divv)
	}

	simulate() {
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

		this.canvas.draw(thrwos_data, numCols, gap, 20)
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

export class Canvas {
	canvas: HTMLCanvasElement

	rolls: { [numb: number]: number }

	width: number
	height: number

	context: CanvasRenderingContext2D | null

	constructor(canv: HTMLCanvasElement, parent: HTMLDivElement) {
		this.canvas = canv

		const wth = parent.getBoundingClientRect().width - 50

		this.canvas.width = wth
		this.canvas.height = (wth * 9) / 16

		this.width = this.canvas.width
		this.height = this.canvas.height

		this.rolls = []

		this.context = this.canvas.getContext('2d')

		window.addEventListener('resize', () => {
			const wth = parent.getBoundingClientRect().width - 50

			this.canvas.width = wth
			this.canvas.height = (wth * 9) / 16

			this.width = this.canvas.width
			this.height = this.canvas.height
		})
	}

	draw(
		thrwos_data: { [dist: string]: number },
		columns: number,
		gap: number,
		bottom_margin: number
	) {
		const columnWidth = (this.width - (columns - 1) * gap) / columns

		console.log('-------------------------------')
		console.log(columnWidth)
		console.log(columnWidth * columns)
		console.log(columnWidth * columns + (columns - 1) * gap)

		let values: number[] = [...Object.values(thrwos_data)]

		const maxHeight = Math.max(...values) - bottom_margin
		const levelHeight = this.height / maxHeight / 1.4

		if (this.context != null) {
			this.context.clearRect(0, 0, this.width, this.height)
			for (let i = 0; i < values.length; i++) {
				const columnHeight = levelHeight * values[i]

				this.context.fillStyle = 'black'
				this.context.fillRect(
					columnWidth * i + gap * i,
					this.height - columnHeight - bottom_margin,
					columnWidth,
					columnHeight
				)

				this.context.fillText(
					Object.keys(thrwos_data)[i],
					columnWidth * i + gap * i,
					this.height
				)
			}
		}
	}
}
