


export default function Hero({ 
    title = "GLITCH_CORE", 
    subtitle = "The Next Generation of Gaming" })
    {

    const pulso = () => {
        const tituloHero = document.querySelector('h1');
        tituloHero.classList.add('animate-pulse');
    }


    return(
        <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img alt="Hero Background" className="bg-[url('/HERO_BG/background.png')] bg-cover bg-center bg-no-repeat min-h-screen"/>

                <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background"></div>

            </div>
            <div className="relative z-10 text-center px-margin-mobile flex flex-col items-center">
                <h1 className="font-display-lg md:text-[80px] text-display-lg-mobile font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-fixed drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] mb-md py-4 cursor-pointer" onClick={pulso}>{title}</h1>

                <p className="font-headline-md text-headline-md text-on-surface mb-xl max-w-2xl">{subtitle}</p>
                
                <a className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-bold text-lg hover:drop-shadow-[0_0_24px_rgba(56,189,248,0.6)] transition-all hover:scale-105 flex items-center gap-2" href="#catalog">Ingresar ↓</a>
            </div>
        </header>
    )
}