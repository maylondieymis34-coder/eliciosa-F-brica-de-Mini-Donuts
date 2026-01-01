
import React, { useState, useMemo } from 'react';
import { 
  MessageCircle, 
  Info, 
  Minus, 
  Plus, 
  CheckCircle2,
  UtensilsCrossed,
  Truck,
  Palette,
  Package,
  Star
} from 'lucide-react';
import { 
  PRICES, 
  FILLINGS, 
  TOPPINGS, 
  WHATSAPP_NUMBER 
} from './constants';

const COLOR_PRESETS = [
  { name: 'Rosa', hex: '#FF69B4' },
  { name: 'Azul', hex: '#87CEEB' },
  { name: 'Chocolate', hex: '#4B2C20' },
  { name: 'Branco', hex: '#FDFDFD' },
  { name: 'Dourado', hex: '#D4AF37' },
  { name: 'Lilas', hex: '#C8A2C8' },
];

const App: React.FC = () => {
  // Unidades Individuais (Encomenda)
  const [unfilled, setUnfilled] = useState(0);
  const [filled, setFilled] = useState(0);

  // Caixinhas (Pronta Entrega/Presente)
  const [box4Unfilled, setBox4Unfilled] = useState(0);
  const [box4Filled, setBox4Filled] = useState(0);
  const [box6Unfilled, setBox6Unfilled] = useState(0);
  const [box6Filled, setBox6Filled] = useState(0);

  const [selectedFillings, setSelectedFillings] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState('');
  const [isOtherColor, setIsOtherColor] = useState(false);

  const totalUnits = unfilled + filled + (box4Unfilled * 4) + (box4Filled * 4) + (box6Unfilled * 6) + (box6Filled * 6);
  const totalBoxes = box4Unfilled + box4Filled + box6Unfilled + box6Filled;
  
  // Se tiver caixinhas OU unidades < 30, é pronta entrega
  const isProntaEntrega = (unfilled + filled > 0 && unfilled + filled < 30) || totalBoxes > 0;

  const total = useMemo(() => {
    return (unfilled * PRICES.unfilled) + 
           (filled * PRICES.filled) +
           (box4Unfilled * PRICES.box4Unfilled) +
           (box4Filled * PRICES.box4Filled) +
           (box6Unfilled * PRICES.box6Unfilled) +
           (box6Filled * PRICES.box6Filled);
  }, [unfilled, filled, box4Unfilled, box4Filled, box6Unfilled, box6Filled]);

  const toggleOption = (item: string, currentList: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, max: number) => {
    if (currentList.includes(item)) {
      setter(prev => prev.filter(i => i !== item));
    } else {
      if (currentList.length < max) {
        setter(prev => [...prev, item]);
      }
    }
  };

  const handleColorSelect = (colorName: string) => {
    setCustomColor(colorName);
    setIsOtherColor(false);
  };

  const handleWhatsAppOrder = () => {
    if (total === 0) {
      alert('Por favor, adicione algo ao seu pedido! 🍩');
      return;
    }

    const fillingsText = selectedFillings.length > 0 ? selectedFillings.join(', ') : 'Nenhum';
    const toppingsText = selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Nenhum';
    const colorText = customColor.trim() || 'Padrão';
    const entregaMode = isProntaEntrega ? "🚨 [PRONTA ENTREGA / CAIXINHA]" : "📅 [ENCOMENDA - 3 DIAS]";

    let pedidoDetalhado = "";
    if (unfilled > 0) pedidoDetalhado += `- Unidades Simples: ${unfilled}\n`;
    if (filled > 0) pedidoDetalhado += `- Unidades Recheadas: ${filled}\n`;
    if (box4Unfilled > 0) pedidoDetalhado += `- Caixa 4 un (Simples): ${box4Unfilled}\n`;
    if (box4Filled > 0) pedidoDetalhado += `- Caixa 4 un (Recheada): ${box4Filled}\n`;
    if (box6Unfilled > 0) pedidoDetalhado += `- Caixa 6 un (Simples): ${box6Unfilled}\n`;
    if (box6Filled > 0) pedidoDetalhado += `- Caixa 6 un (Recheada): ${box6Filled}\n`;

    const message = `Oi! Quero os donuts da Deliciosa Fábrica! 😍🍩\n\n` +
      `${entregaMode}\n\n` +
      `📦 Pedido:\n${pedidoDetalhado}\n` +
      `🍯 Recheios: ${fillingsText}\n` +
      `✨ Coberturas: ${toppingsText}\n` +
      `🎨 Cor do Chocolate: ${colorText}\n\n` +
      `💰 Total: R$${total.toFixed(2).replace('.', ',')}\n\n` +
      `Aguardo retorno! ✨`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen pb-48">
      {/* Simpsons Style Header */}
      <div className="relative w-full overflow-hidden bg-[#784212] pt-12 pb-24 shadow-2xl md:rounded-b-[5rem]">
         {/* Wave SVG Pattern like the image top */}
         <div className="absolute top-0 left-0 w-full h-24 bg-[#784212]">
            <div className="flex justify-center gap-10 mt-4 overflow-hidden opacity-30">
               {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-16 h-4 rounded-full" style={{ backgroundColor: ['#F9A8D4', '#60A5FA', '#FBBF24', '#FDF2F8'][i % 4] }} />
               ))}
            </div>
         </div>
         
         <div className="flex flex-col items-center text-center px-6 relative z-10">
            <div className="flex items-center gap-4 mb-8">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png" 
                 alt="Homer" 
                 className="w-32 h-auto drop-shadow-2xl hover:scale-110 transition-transform"
               />
               <div className="relative inline-block py-6 px-10">
                  <div className="absolute inset-0 bg-[#FF2E9B] transform -skew-x-12 -rotate-1 shadow-2xl rounded-lg"></div>
                  <h1 className="relative text-white text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                    Deliciosa Fábrica<br/>de Mini Donuts
                  </h1>
               </div>
            </div>
         </div>
         
         {/* Bottom Donut Border Simulation */}
         <div className="absolute bottom-0 left-0 w-full h-16 flex justify-center gap-4 opacity-80 translate-y-8">
            {[...Array(10)].map((_, i) => (
               <div key={i} className="w-24 h-24 rounded-full border-[10px] border-[#784212] shadow-inner" style={{ backgroundColor: i % 2 === 0 ? '#F9A8D4' : '#FDE68A' }} />
            ))}
         </div>
      </div>

      <main className="max-w-2xl mx-auto px-6 -mt-10 relative z-10 space-y-12">
        
        {/* NEW SECTION: CAIXINHAS (Based on image) */}
        <section className="bg-white rounded-[3.5rem] p-10 shadow-xl border-4 border-[#FF2E9B]">
          <h2 className="text-4xl font-black flex flex-col items-center gap-2 text-[#FF2E9B] mb-10 uppercase italic tracking-tighter text-center">
            <div className="flex items-center gap-4">
               <Package size={40} /> MINI DONUTS
            </div>
            <span className="text-2xl text-slate-500">Caixinhas de Presente</span>
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Box 4 Unfilled */}
            <div className="flex items-center justify-between p-6 bg-pink-50 rounded-[2.5rem] border-2 border-pink-200">
               <div>
                  <p className="font-black text-2xl text-slate-800 uppercase italic">Caixa 4un (Simples)</p>
                  <p className="text-xl text-[#FF2E9B] font-black">R$ 10,00</p>
               </div>
               <div className="flex items-center gap-4">
                  <button onClick={() => setBox4Unfilled(Math.max(0, box4Unfilled - 1))} className="w-12 h-12 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center text-pink-500"><Minus size={24} /></button>
                  <span className="text-3xl font-black w-8 text-center text-pink-600">{box4Unfilled}</span>
                  <button onClick={() => setBox4Unfilled(box4Unfilled + 1)} className="w-12 h-12 rounded-full bg-[#FF2E9B] flex items-center justify-center text-white shadow-lg"><Plus size={24} /></button>
               </div>
            </div>

            {/* Box 4 Filled */}
            <div className="flex items-center justify-between p-6 bg-[#F0FFFE] rounded-[2.5rem] border-2 border-cyan-200">
               <div>
                  <p className="font-black text-2xl text-slate-800 uppercase italic">Caixa 4un (Recheada)</p>
                  <p className="text-xl text-cyan-600 font-black">R$ 12,00</p>
               </div>
               <div className="flex items-center gap-4">
                  <button onClick={() => setBox4Filled(Math.max(0, box4Filled - 1))} className="w-12 h-12 rounded-full bg-white border-2 border-cyan-300 flex items-center justify-center text-cyan-500"><Minus size={24} /></button>
                  <span className="text-3xl font-black w-8 text-center text-cyan-600">{box4Filled}</span>
                  <button onClick={() => setBox4Filled(box4Filled + 1)} className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg"><Plus size={24} /></button>
               </div>
            </div>

            {/* Box 6 Unfilled */}
            <div className="flex items-center justify-between p-6 bg-pink-50 rounded-[2.5rem] border-2 border-pink-200">
               <div>
                  <p className="font-black text-2xl text-slate-800 uppercase italic">Caixa 6un (Simples)</p>
                  <p className="text-xl text-[#FF2E9B] font-black">R$ 13,00</p>
               </div>
               <div className="flex items-center gap-4">
                  <button onClick={() => setBox6Unfilled(Math.max(0, box6Unfilled - 1))} className="w-12 h-12 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center text-pink-500"><Minus size={24} /></button>
                  <span className="text-3xl font-black w-8 text-center text-pink-600">{box6Unfilled}</span>
                  <button onClick={() => setBox6Unfilled(box6Unfilled + 1)} className="w-12 h-12 rounded-full bg-[#FF2E9B] flex items-center justify-center text-white shadow-lg"><Plus size={24} /></button>
               </div>
            </div>

            {/* Box 6 Filled */}
            <div className="flex items-center justify-between p-6 bg-[#F0FFFE] rounded-[2.5rem] border-2 border-cyan-200">
               <div>
                  <p className="font-black text-2xl text-slate-800 uppercase italic">Caixa 6un (Recheada)</p>
                  <p className="text-xl text-cyan-600 font-black">R$ 16,00</p>
               </div>
               <div className="flex items-center gap-4">
                  <button onClick={() => setBox6Filled(Math.max(0, box6Filled - 1))} className="w-12 h-12 rounded-full bg-white border-2 border-cyan-300 flex items-center justify-center text-cyan-500"><Minus size={24} /></button>
                  <span className="text-3xl font-black w-8 text-center text-cyan-600">{box6Filled}</span>
                  <button onClick={() => setBox6Filled(box6Filled + 1)} className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg"><Plus size={24} /></button>
               </div>
            </div>
          </div>
        </section>

        {/* Quantities Card (Avulsas) */}
        <section className="bg-white/80 backdrop-blur-sm rounded-[3.5rem] p-10 shadow-xl border-2 border-white">
          <h2 className="text-4xl font-black flex items-center gap-4 text-slate-700 mb-10 uppercase italic tracking-tighter">
            <UtensilsCrossed size={36} /> Unidades Avulsas
          </h2>
          <div className="space-y-8">
            <div className="flex items-center justify-between p-8 bg-pink-100/40 rounded-[2.5rem]">
              <div>
                <p className="font-black text-2xl text-slate-800 uppercase italic">Simples</p>
                <p className="text-lg text-pink-600 font-bold">R$ 2,00 unidade</p>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={() => setUnfilled(Math.max(0, unfilled - 1))} className="w-12 h-12 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center text-pink-500"><Minus size={30} /></button>
                <span className="text-4xl font-black w-10 text-center text-pink-600">{unfilled}</span>
                <button onClick={() => setUnfilled(unfilled + 1)} className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-lg"><Plus size={30} /></button>
              </div>
            </div>

            <div className="flex items-center justify-between p-8 bg-cyan-100/40 rounded-[2.5rem]">
              <div>
                <p className="font-black text-2xl text-slate-800 uppercase italic">Recheados</p>
                <p className="text-lg text-cyan-600 font-bold">R$ 3,00 unidade</p>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={() => setFilled(Math.max(0, filled - 1))} className="w-12 h-12 rounded-full bg-white border-2 border-cyan-200 flex items-center justify-center text-cyan-500"><Minus size={30} /></button>
                <span className="text-4xl font-black w-10 text-center text-cyan-600">{filled}</span>
                <button onClick={() => setFilled(filled + 1)} className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg"><Plus size={30} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Fillings Selection */}
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-4xl font-black uppercase italic text-pink-700 tracking-tighter">Recheios</h2>
            <span className="bg-pink-100 text-pink-700 text-sm px-5 py-2 rounded-full font-black uppercase shadow-sm">Máx 2</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {FILLINGS.map(filling => (
              <button
                key={filling}
                onClick={() => toggleOption(filling, selectedFillings, setSelectedFillings, 2)}
                className={`p-7 rounded-[2.5rem] text-xl font-black transition-all border-4 text-left flex items-center justify-between ${
                  selectedFillings.includes(filling)
                  ? 'bg-pink-600 text-white border-pink-400 shadow-xl scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-100 hover:border-pink-200 hover:bg-pink-50/20'
                }`}
              >
                {filling}
                {selectedFillings.includes(filling) && <CheckCircle2 size={28} />}
              </button>
            ))}
          </div>
        </section>

        {/* Toppings Selection */}
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-4xl font-black uppercase italic text-cyan-700 tracking-tighter">Coberturas</h2>
            <span className="bg-cyan-100 text-cyan-800 text-sm px-5 py-2 rounded-full font-black uppercase shadow-sm">Máx 3</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {TOPPINGS.map(topping => (
              <button
                key={topping}
                onClick={() => toggleOption(topping, selectedToppings, setSelectedToppings, 3)}
                className={`p-7 rounded-[2.5rem] text-xl font-black transition-all border-4 text-left flex items-center justify-between ${
                  selectedToppings.includes(topping)
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-xl scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-100 hover:border-cyan-300 hover:bg-cyan-50/20'
                }`}
              >
                {topping}
                {selectedToppings.includes(topping) && <CheckCircle2 size={28} />}
              </button>
            ))}
          </div>
        </section>

        {/* Color Choice Section */}
        <section className="space-y-8">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-4xl font-black uppercase italic text-pink-700 tracking-tighter">Cor do Chocolate</h2>
            <Palette size={32} className="text-pink-400" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color.name)}
                className={`flex flex-col items-center gap-3 p-6 rounded-[2.5rem] border-4 transition-all ${
                  customColor === color.name && !isOtherColor
                  ? 'bg-pink-50 border-pink-500 scale-[1.05] shadow-lg'
                  : 'bg-white border-slate-100'
                }`}
              >
                <div className="w-16 h-16 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: color.hex }} />
                <span className="text-lg font-black uppercase italic text-slate-700">{color.name}</span>
              </button>
            ))}
            <button
              onClick={() => { setIsOtherColor(true); setCustomColor(''); }}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-[2.5rem] border-4 transition-all ${isOtherColor ? 'bg-pink-50 border-pink-500 scale-[1.05]' : 'bg-white border-slate-100'}`}
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 border-4 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-black">?</div>
              <span className="text-lg font-black uppercase italic text-slate-700">Outra</span>
            </button>
          </div>
          {isOtherColor && (
            <div className="p-1.5 bg-gradient-to-r from-pink-300 to-cyan-300 rounded-[3rem] shadow-lg">
              <input type="text" value={customColor} onChange={(e) => setCustomColor(e.target.value)} placeholder="Qual cor você deseja?" className="w-full bg-white p-8 rounded-[2.8rem] text-slate-800 font-black text-2xl focus:outline-none" autoFocus />
            </div>
          )}
        </section>

        {/* Important Info Footer */}
        <section className="bg-[#784212] p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden">
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="bg-pink-500 p-3 rounded-2xl shadow-lg"><Star size={32} /></div>
                 <h3 className="text-3xl font-black uppercase italic tracking-tighter">Regras da Fábrica</h3>
              </div>
              <ul className="space-y-6">
                 <li className="flex gap-4 text-2xl font-black italic">
                    <CheckCircle2 className="text-pink-400 shrink-0" size={32} />
                    <span>Encomendas: A partir de 30 unidades</span>
                 </li>
                 <li className="flex gap-4 text-2xl font-black italic">
                    <CheckCircle2 className="text-pink-400 shrink-0" size={32} />
                    <span>Caixinhas: Perfeitas para Presente!</span>
                 </li>
                 <li className="flex gap-4 text-2xl font-black italic">
                    <CheckCircle2 className="text-pink-400 shrink-0" size={32} />
                    <span>Prazo: 3 dias de antecedência</span>
                 </li>
                 <li className="flex gap-4 text-2xl font-black italic bg-white/10 p-4 rounded-2xl border border-white/20">
                    <Truck className="text-cyan-400 shrink-0" size={32} />
                    <span>Temos Pronta Entrega de Caixinhas!</span>
                 </li>
              </ul>
           </div>
        </section>
      </main>

      {/* Modern Floating Order Bar */}
      <div className="fixed bottom-0 inset-x-0 p-6 z-50 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-[3.5rem] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-4 border-[#FF2E9B] flex items-center gap-4">
            <div className="bg-pink-50 px-8 py-5 rounded-[2.8rem] border-2 border-pink-100 shrink-0 shadow-inner">
              <p className="text-[12px] uppercase font-black text-pink-400 tracking-widest leading-none mb-1 text-center">Total</p>
              <p className="text-4xl font-black text-[#FF2E9B] leading-none tracking-tight">R$ {total.toFixed(2).replace('.', ',')}</p>
            </div>
            <button 
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-[#22C55E] hover:bg-green-600 text-white h-24 rounded-[2.8rem] font-black uppercase italic text-2xl flex items-center justify-center gap-4 shadow-xl transition-all active:scale-95 group"
            >
              <MessageCircle size={36} className="group-hover:rotate-12 transition-transform" />
              Enviar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
