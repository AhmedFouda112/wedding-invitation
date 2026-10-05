const target=new Date("2027-07-18T20:00:00+03:00").getTime();
const $=id=>document.getElementById(id);
function tick(){let x=Math.max(0,target-Date.now());const d=Math.floor(x/864e5);x%=864e5;const h=Math.floor(x/36e5);x%=36e5;const m=Math.floor(x/6e4);x%=6e4;const s=Math.floor(x/1e3);$("days").textContent=String(d).padStart(2,"0");$("hours").textContent=String(h).padStart(2,"0");$("minutes").textContent=String(m).padStart(2,"0");$("seconds").textContent=String(s).padStart(2,"0")}
tick();setInterval(tick,1000);

const music=$("music"),musicBtn=$("musicBtn"),screen=$("envelopeScreen"),invitation=$("invitation"),key=$("keyHotspot"),flash=$("openingFlash");
let playing=false;

async function startMusic(){
  try{await music.play();playing=true;musicBtn.textContent="Ⅱ";}catch(e){}
}

key.addEventListener("click",async()=>{
  if(screen.classList.contains("opening")) return;
  key.classList.add("clicked");
  await startMusic();

  // The envelope flap rises first, like a real envelope opening.
  screen.classList.add("opening");

  setTimeout(()=>{
    flash.classList.add("flash");
  },700);

  setTimeout(()=>{
    screen.classList.add("opened");
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden","false");
    musicBtn.classList.add("visible");
    setTimeout(()=>document.querySelector(".hero").scrollIntoView({behavior:"smooth"}),450);
  },1350);
});

musicBtn.addEventListener("click",async()=>{
  if(playing){music.pause();playing=false;musicBtn.textContent="♫";}
  else await startMusic();
});

$("rsvpForm").addEventListener("submit",e=>{
  e.preventDefault();$("rsvpForm").hidden=true;$("success").hidden=false;
});
