(()=>{var L=o=>{let r=s=>s<10?`0${s}`:s,i=Math.floor(o/3600),a=Math.floor(o/60)-i*60,c=Math.floor(o-i*3600-a*60);return`${r(a)}:${r(c)}`},f=L;var T=o=>Math.pow(2,Math.ceil(Math.log(o)/Math.log(2))),y=T;var v=class extends HTMLElement{constructor(){super();let r=this.attachShadow({mode:"open"}),i=this.hasAttribute("audio-type")?this.getAttribute("audio-type"):"video",a=this.getAttribute("audio-src"),c=this.hasAttribute("visualiser-color")?this.getAttribute("visualiser-color"):"plum",s=this.getAttribute("default-classes"),l=this.hasAttribute("visualiser-bar-count")?this.getAttribute("visualiser-bar-count"):"50";l=y(l);let w=[...Array(l)].map(()=>`<div class='bar ${s}'></div>`).join(" "),h=document.createElement("template");h.innerHTML=`
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
                ${i==="video"?`<video controls src='${a}'></video>`:`<audio controls src='${a}'></audio>`}

                <div class='barsContainer'>
                    ${w}
                </div>


				<div class='controls'>
                    <button class='play'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div class='timer'>00:00</div>
                    <input class='volume' min='0' max='100' value='100' type='range'>
                </div>
            </div>
            `,r.appendChild(h.content.cloneNode(!0));let e=this.shadowRoot.querySelectorAll("video, audio")[0],x=this.shadowRoot.querySelectorAll(".bar"),d=this.shadowRoot.querySelector(".play"),A=this.shadowRoot.querySelector(".timer"),M=this.shadowRoot.querySelector(".volume");d.addEventListener("click",()=>{e.paused?e.play():e.pause()}),M.addEventListener("change",t=>{e.volume=t.target.value/100}),e.addEventListener("timeupdate",t=>{A.textContent=f(t.target.currentTime)});let p=!1,u=new AudioContext,C=u.createMediaElementSource(e),n=u.createAnalyser();C.connect(n),n.connect(u.destination),n.fftSize=l*2;let g=n.frequencyBinCount,m=new Uint8Array(g);e.addEventListener("playing",()=>{p=!0,d.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            `,b()}),e.addEventListener("pause",()=>{d.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
            `});function b(){if(!!p){requestAnimationFrame(b),n.getByteFrequencyData(m);for(let t=0;t<g;t++){let z=m[t]/255;x[t].style.transform=`scaleY(${z})`}}}}};customElements.define("audio-visualiser",v);})();
//# sourceMappingURL=audio-visualiser.js.map
