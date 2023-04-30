import './scss/style.scss'
import Simulator from './Simualtor'
import Menu from './MenyControls'

try {
	const canv = document.querySelector<HTMLCanvasElement>('#display')

	const inp1 = document.querySelector<HTMLInputElement>('#numod')
	const inp2 = document.querySelector<HTMLInputElement>('#dice')
	const inp3 = document.querySelector<HTMLInputElement>('#throws')

	const gapi = document.querySelector<HTMLInputElement>('#gap')

	const forr = document.querySelector<HTMLFormElement>('#main')
	const div = document.querySelector<HTMLDivElement>('.display')
	const panl = document.querySelector<HTMLDivElement>('.panel')

	const lght = document.querySelector<HTMLDivElement>('#light')
	const tdsp = document.querySelector<HTMLSpanElement>('#f-time')

	const tbtn = document.querySelector<HTMLButtonElement>('.toggle')

	if (
		canv != null &&
		inp1 != null &&
		inp2 != null &&
		inp3 != null &&
		forr != null &&
		gapi != null &&
		div != null &&
		lght != null &&
		tdsp != null
	) {
		const sim = new Simulator(
			canv,
			inp1,
			inp2,
			inp3,
			gapi,
			forr,
			div,
			lght,
			tdsp,
			{
				bottomMargin: 48,
				drawColor: '#E2FF9E',
				text: {
					size: 24,
					family: 'Arial',
					color: '#BFFF29',
				},
			}
		)
		console.log(sim)
	}

	if (panl != null && tbtn != null) {
		const men = new Menu(panl, tbtn)

		men.toggleMenu()
	}

	document.querySelector('#extras')?.addEventListener('submit', (e) => {
		e.preventDefault()
	})
} catch {}
