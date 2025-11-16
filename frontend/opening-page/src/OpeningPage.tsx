import React from 'react'


interface OpeningPageProps {
 onContinue: () => void
}


const OpeningPage: React.FC<OpeningPageProps> = ({ onContinue }) => {
 return (
   <main
     className="relative min-h-screen w-full bg-[#020b25] text-white font-sans flex flex-col justify-between px-4 py-10 md:px-8 overflow-hidden"
     onClick={onContinue}
   >
     {/* blue light station rectangle*/}
     <div className="pointer-events-none absolute inset-y-6 left-0 flex h-screen items-center">
       <div className="h-full w-20 rounded-t-3xl bg-[#1f6d94] relative">
         {/* two white rectangles */}
         <div className="absolute top-12 left-0 w-full flex justify-between px-2">
           <div className="h-6 w-6 bg-white rounded-sm"></div>
           <div className="h-6 w-6 bg-white rounded-sm"></div>
         </div>


         {/* middle trapezoid bar */}
         <div className="absolute inset-x-0 top-1/2 flex justify-start pl-4">
           <div
             className="h-20 w-12 bg-[#08142F] rotate-[-90deg]"
             style={{
               clipPath: 'polygon(20% 20%, 70% 20%, 100% 100%, 0% 100%)',
             }}
           />
         </div>


         {/* vertical "Emergency" text */}
         <div className="absolute top-1/4 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-400 font-bold tracking-widest text-3xl"
             style={{ writingMode: 'vertical-rl' }}>
           Emergency
         </div>
       </div>
     </div>


     <section className="flex flex-1 flex-col justify-center pl-32 md:pl-40">
       <div className="flex flex-col items-start gap-8">


         {/* Title */}
         <h1 className="text-7xl font-extrabold tracking-tight text-white">LiteLine</h1>


         {/* Centered Logo */}
         <div className="flex items-center justify-center w-full">
           <div className="relative h-40 w-40 rounded-full border-[6px] border-[#53c0ff] bg-[#031025] flex items-center justify-center">
             <img
               src="/logo-removebg-preview.png"
               alt="LiteLine Logo"
               className="h-36 w-36 rounded-full object-cover"
             />
           </div>
         </div>


         <p className="mt-auto w-full bottom-8 text-center text-[#53c0ff] text-lg tracking-wide"> follow the light </p>


       </div>
     </section>






   </main>
 )
}


export default OpeningPage




