const plataformas = [
  { name: "PC", icon: "🖥" },
  { name: "PlayStation", icon: "🎮" },
  { name: "Xbox", icon: "🟢" },
  { name: "Nintendo", icon: "🔴" },
  { name: "VR", icon: "🥽" }
];

export default function Plataformas(){
    return(
        <div className="flex gap-lg justify-center items-center my-0 mx-auto py-lg px-margin-mobile md:px-margin-desktop max-w-1440">
         {plataformas.map((plataforma, index)=>
            <span key={index} className="text-on-surface-variant">
               {plataforma.icon}  {plataforma.name}
            </span>
         )}
        </div>
    )
}