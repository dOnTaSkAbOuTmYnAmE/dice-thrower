import './scss/style.scss'
import Simulator from './Simualtor'

try {
	const canv = document.querySelector<HTMLCanvasElement>('#display')

	const inp1 = document.querySelector<HTMLInputElement>('#numod')
	const inp2 = document.querySelector<HTMLInputElement>('#dice')
	const inp3 = document.querySelector<HTMLInputElement>('#throws')

	const gapi = document.querySelector<HTMLInputElement>('#gap')

	const forr = document.querySelector<HTMLFormElement>('#main')
	const div = document.querySelector<HTMLDivElement>('.display')

	const lght = document.querySelector<HTMLDivElement>('#light')

	if (
		canv != null &&
		inp1 != null &&
		inp2 != null &&
		inp3 != null &&
		forr != null &&
		gapi != null &&
		div != null &&
		lght != null
	) {
		const sim = new Simulator(canv, inp1, inp2, inp3, gapi, forr, div, lght)
		console.log(sim)
	}
} catch {}
