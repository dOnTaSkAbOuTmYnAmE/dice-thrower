import { TextStyle } from './Simualtor'

export default class Canvas {
	canvas: HTMLCanvasElement

	rolls: { [numb: number]: number }

	width: number
	height: number
	margin: number

	context: CanvasRenderingContext2D | null

	constructor(canv: HTMLCanvasElement, parent: HTMLDivElement) {
		this.canvas = canv

		this.margin = 64

		const wth = parent.getBoundingClientRect().width - this.margin

		this.canvas.width = wth
		this.canvas.height = (wth * 9) / 16

		this.width = this.canvas.width
		this.height = this.canvas.height

		this.rolls = []

		this.context = this.canvas.getContext('2d')

		window.addEventListener('resize', () => {
			const wth = parent.getBoundingClientRect().width - this.margin

			this.canvas.width = wth
			this.canvas.height = (wth * 9) / 16

			this.width = this.canvas.width
			this.height = this.canvas.height

			// this.context!.fillStyle = 'red'
			// this.context?.fillRect(0, 0, this.width, this.height)
		})
	}

	draw(
		thrwos_data: { [dist: string]: number },
		columns: number,
		gap: number,
		bottom_margin: number,
		fill_color: string,
		text_styles: TextStyle
	) {
		const columnWidth = (this.width - (columns - 1) * gap) / columns

		// console.log('-------------------------------')
		// console.log(columnWidth)
		// console.log(columnWidth * columns)
		// console.log(columnWidth * columns + (columns - 1) * gap)

		let values: number[] = [...Object.values(thrwos_data)]

		const numLevels = Math.max(...values)
		const levelHeight = (this.height - bottom_margin) / numLevels

		if (this.context != null) {
			this.context.clearRect(0, 0, this.width, this.height)
			for (let i = 0; i < values.length; i++) {
				const columnHeight = levelHeight * values[i]

				this.context.fillStyle = fill_color
				this.context.fillRect(
					columnWidth * i + gap * i,
					this.height - columnHeight - bottom_margin,
					columnWidth,
					columnHeight
				)

				this.context.fillStyle = text_styles.color
				this.context.font = `${text_styles.size}px ${text_styles.family}`
				this.context.fillText(
					Object.keys(thrwos_data)[i],
					columnWidth * i +
						gap * i +
						columnWidth / 2 -
						text_styles.size / 2,
					i % 2 == 1 ? this.height : this.height - bottom_margin / 2
				)
			}
		}
	}
}
