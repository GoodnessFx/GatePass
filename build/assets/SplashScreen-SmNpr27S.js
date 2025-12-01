import{r as t,j as e}from"./index-DYvCfV81.js";import{T as v}from"./ticket-DoQQyfWE.js";function u({onComplete:r}){const[l,n]=t.useState(!1),a=t.useMemo(()=>"GatePass",[]),[o,c]=t.useState("");return t.useEffect(()=>{const m=setTimeout(()=>n(!0),80),d=setTimeout(()=>r(),3e3);let s=0;const i=setInterval(()=>{s+=1,c(a.slice(0,s)),s>=a.length&&clearInterval(i)},140);return()=>{clearTimeout(m),clearTimeout(d),clearInterval(i)}},[r,a]),e.jsxs("div",{className:"min-h-svh w-full relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-white"}),e.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[e.jsx("div",{className:"absolute",style:{top:"15vh",left:"-10vw",width:"60vw",height:"60vw",borderRadius:"30vw",backgroundColor:"rgba(255,255,255,0.10)",animation:"gpFloat1 20s ease-in-out infinite"}}),e.jsx("div",{className:"absolute",style:{top:"55vh",left:"55vw",width:"50vw",height:"50vw",borderRadius:"25vw",backgroundColor:"rgba(245,245,245,0.12)",animation:"gpFloat2 22s ease-in-out infinite"}}),e.jsx("div",{className:"absolute",style:{top:"-5vh",left:"40vw",width:"45vw",height:"45vw",borderRadius:"22.5vw",backgroundColor:"rgba(230,230,230,0.08)",animation:"gpFloat3 24s ease-in-out infinite"}}),e.jsx("style",{children:`
          @keyframes gpFloat1 {
            0%   { transform: translate(0,0) rotate(0deg) scale(1); }
            50%  { transform: translate(3vw,-2.5vw) rotate(180deg) scale(1.05); }
            100% { transform: translate(0,0) rotate(360deg) scale(1); }
          }
          @keyframes gpFloat2 {
            0%   { transform: translate(0,0) rotate(0deg) scale(0.95); }
            50%  { transform: translate(-3vw,2.8vw) rotate(180deg) scale(1.08); }
            100% { transform: translate(0,0) rotate(360deg) scale(0.95); }
          }
          @keyframes gpFloat3 {
            0%   { transform: translate(0,0) rotate(0deg) scale(0.92); }
            50%  { transform: translate(2.4vw,2.2vw) rotate(180deg) scale(1.06); }
            100% { transform: translate(0,0) rotate(360deg) scale(0.92); }
          }
        `})]}),e.jsx("div",{className:"relative z-10 min-h-svh flex items-center justify-center p-6",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:`mx-auto mb-4 flex items-center justify-center transition-opacity duration-700 ${l?"opacity-100":"opacity-0"}`,children:e.jsx(v,{className:"text-black",style:{width:"96px",height:"96px"}})}),e.jsxs("h1",{className:`transition-opacity duration-700 ${l?"opacity-100":"opacity-0"} text-black font-extrabold tracking-tight`,style:{fontSize:"4rem"},children:[e.jsx("span",{className:"font-mono",children:o}),e.jsx("span",{className:"inline-block w-[1ch] align-baseline ml-1 bg-black animate-pulse",style:{height:"1em"}})]})]})})]})}export{u as SplashScreen,u as default};
