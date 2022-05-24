import formatTimer from "./utils/formatTimer"
import sanitizeVisualiserBarCount from "./utils/sanitizeVisualiserBarCount"

class AudioVisualiser extends HTMLElement {
	constructor() {
		super()

		const shadow = this.attachShadow({ mode: 'open' })

        const audioType = this.hasAttribute('audio-type') ? this.getAttribute('audio-type') : 'video'
        const audioSrc = this.getAttribute('audio-src')
        const visualiserColor = this.hasAttribute('visualiser-color')
            ? this.getAttribute('visualiser-color')
            : 'plum'
        const controlsColor = this.hasAttribute('controls-color')
            ? this.getAttribute('controls-color')
            : 'black'
        const defaultClasses = this.getAttribute('default-classes')

        let visualiserBarCount = this.hasAttribute('visualiser-bar-count')
            ? this.getAttribute('visualiser-bar-count')
            : '50'

        visualiserBarCount = sanitizeVisualiserBarCount(visualiserBarCount)

        const barArr = [...Array(visualiserBarCount)]
		const barList = barArr
			.map(() => {
				return `<div class='bar ${defaultClasses}'></div>`
			})
			.join(' ')

		const template = document.createElement('template')
		template.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                video, audio {
                    display: none;
                }

                .barsContainer {
                    height: 255px;
                    display: flex;
                    justify-content: center;
                    gap: 2px;
                }

                .bar {
                    width: 4px;
                    background-color: ${visualiserColor};
                }

                .neon {
                    background-color: #a4508b;
                    background-image: linear-gradient(0deg, #a4508b 0%, #5f0a87 74%);
                    box-shadow: 1px 1px 30px rgba(81,45,168 ,1);
                }

                .controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: ${controlsColor};
                }

                .play {
                    background: none;
                    border: none;
                }

                .volume {
                    width: 4rem;
                }

                .timer {
                    font-size: 1.2rem;
                }

                svg {
                    height: 2rem;
                    cursor: pointer;
                }
            </style>
            <div>
                ${
					audioType === 'video'
						? `<video controls src='${audioSrc}'></video>`
						: `<audio controls src='${audioSrc}'></audio>`
				}

                <div class='barsContainer'>
                    ${barList}
                </div>


				<div class='controls'>
                    <button class='play'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${controlsColor}">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div class='timer'>00:00</div>
                    <input class='volume' min='0' max='100' value='100' type='range'>
                </div>
            </div>
            `

		shadow.appendChild(template.content.cloneNode(true))

        const audioTag = this.shadowRoot.querySelectorAll('video, audio')[0]
        const bars = this.shadowRoot.querySelectorAll('.bar')

        //Controls
        const controlsPlay = this.shadowRoot.querySelector('.play')
        const controlsTimer = this.shadowRoot.querySelector('.timer')
        const controlsVolume = this.shadowRoot.querySelector('.volume')

        controlsPlay.addEventListener('click', () => {
            audioTag.paused ? audioTag.play() : audioTag.pause()
        })

        controlsVolume.addEventListener('change', (e) => {
				audioTag.volume = e.target.value / 100
		})

        audioTag.addEventListener('timeupdate', (e) => {
				controlsTimer.textContent = formatTimer(e.target.currentTime)
		})

        //Analyser
		let isPlaying = false
		let context = new AudioContext()
		let source = context.createMediaElementSource(audioTag)
		let analyser = context.createAnalyser()

		source.connect(analyser)
		analyser.connect(context.destination)
		analyser.fftSize = visualiserBarCount * 2

		let bufferLength = analyser.frequencyBinCount
		let frequencyData = new Uint8Array(bufferLength)

        audioTag.addEventListener('playing', () => {
            isPlaying = true

            controlsPlay.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${controlsColor}">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            `

            renderFrame()
        })

        audioTag.addEventListener('pause', () => {
            controlsPlay.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${controlsColor}">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
            `
        })

        function renderFrame() {
			if (!isPlaying) return

			requestAnimationFrame(renderFrame)
			analyser.getByteFrequencyData(frequencyData)

            for (let i = 0; i < bufferLength; i++) {
                let barHeight = frequencyData[i];
                let scalePerc = barHeight/255

                bars[i].style.transform = `scaleY(${scalePerc})`
            }
		}
	}
}

customElements.define('audio-visualiser', AudioVisualiser)