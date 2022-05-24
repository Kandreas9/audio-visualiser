(()=>{var L=r=>{let a=e=>e<10?`0${e}`:e,n=Math.floor(r/3600),s=Math.floor(r/60)-n*60,c=Math.floor(r-n*3600-s*60);return`${a(s)}:${a(c)}`},f=L;var T=r=>Math.pow(2,Math.ceil(Math.log(r)/Math.log(2))),y=T;var h=class extends HTMLElement{constructor(){super();let a=this.attachShadow({mode:"open"}),n=this.hasAttribute("audio-type")?this.getAttribute("audio-type"):"video",s=this.getAttribute("audio-src"),c=this.hasAttribute("visualiser-color")?this.getAttribute("visualiser-color"):"plum",e=this.hasAttribute("controls-color")?this.getAttribute("controls-color"):"black",w=this.getAttribute("default-classes"),l=this.hasAttribute("visualiser-bar-count")?this.getAttribute("visualiser-bar-count"):"50";l=y(l);let x=[...Array(l)].map(()=>`<div class='bar ${w}'></div>`).join(" "),v=document.createElement("template");v.innerHTML=`
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
                    background-color: ${c};
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
                    color: ${e};
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
                ${n==="video"?`<video controls src='${s}'></video>`:`<audio controls src='${s}'></audio>`}

                <div class='barsContainer'>
                    ${x}
                </div>


				<div class='controls'>
                    <button class='play'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${e}">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div class='timer'>00:00</div>
                    <input class='volume' min='0' max='100' value='100' type='range'>
                </div>
            </div>
            `,a.appendChild(v.content.cloneNode(!0));let t=this.shadowRoot.querySelectorAll("video, audio")[0],A=this.shadowRoot.querySelectorAll(".bar"),d=this.shadowRoot.querySelector(".play"),M=this.shadowRoot.querySelector(".timer"),$=this.shadowRoot.querySelector(".volume");d.addEventListener("click",()=>{t.paused?t.play():t.pause()}),$.addEventListener("change",o=>{t.volume=o.target.value/100}),t.addEventListener("timeupdate",o=>{M.textContent=f(o.target.currentTime)});let p=!1,u=new AudioContext,z=u.createMediaElementSource(t),i=u.createAnalyser();z.connect(i),i.connect(u.destination),i.fftSize=l*2;let g=i.frequencyBinCount,m=new Uint8Array(g);t.addEventListener("playing",()=>{p=!0,d.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${e}">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            `,b()}),t.addEventListener("pause",()=>{d.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="${e}">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
            `});function b(){if(!!p){requestAnimationFrame(b),i.getByteFrequencyData(m);for(let o=0;o<g;o++){let C=m[o]/255;A[o].style.transform=`scaleY(${C})`}}}}};customElements.define("audio-visualiser",h);})();
//# sourceMappingURL=audio-visualiser.js.map
