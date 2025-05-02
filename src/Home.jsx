import React from "react";
import { motion } from "framer-motion";
import { FaBitcoin, FaExchangeAlt, FaMoneyBillWave, FaHandshake, FaWhatsapp, FaShieldAlt, FaUserCheck, FaStar } from "react-icons/fa";

import { useEffect } from "react";

export default function Home() {
  const [news, setNews] = React.useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://br.cointelegraph.com/rss'))
      .then(res => res.json())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/html');
        const items = xml.querySelectorAll('item');
        const newsItems = Array.from(items).slice(0, 5).map(item => ({
          title: item.querySelector('title')?.textContent.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec)) || '',
          link: item.querySelector('link')?.textContent || '#',
          date: item.querySelector('pubDate')?.textContent || ''
        }));
        setNews(newsItems);
      });
    }
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  const CryptoPrice = ({ id, label }) => {
    const [price, setPrice] = React.useState(null);

    useEffect(() => {
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=brl`)
        .then(res => res.json())
        .then(data => setPrice(data[id]?.brl));
    }, [id]);

    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white border border-gray-700 w-full max-w-xs mx-auto text-left"
        <h3 className="text-lg font-bold mb-1 text-green-300">{label}</h3>
        <p className="text-green-400 text-xl font-medium"{price ? `R$ ${price.toFixed(2)}` : 'Carregando...'}</p>
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gradient-to-b from-gray-950 to-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-800 shadow-md">
        <img src="/ChatGPT Image 12 de abr. de 2025, 21_35_17.png" alt="CAST Logo" className="h-28 opacity-80" />
        <nav className="space-x-6 text-sm md:text-base font-medium">
          <a href="#inicio" className="hover:text-white transition-colors">Início</a>
          <a href="#sobre" className="hover:text-green-400 transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-green-400 transition-colors">Serviços</a>
          <a href="#noticias" className="hover:text-green-400 transition-colors">Notícias</a>
          <a href="#contato" className="hover:text-green-400 transition-colors">Contato</a>
        </nav>
      </header>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 px-6 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Sobre a CAST SERVIÇOS DIGITAIS</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            A CAST Serviços Digitais é uma empresa respeitada e sólida dentro do mercado de compra e venda de criptoativos. Atuando sempre com excelência, respeito e transparência nas suas relações.<br/><br/>
            Buscando sempre as melhores inovações e possuíndo tecnologia de ponta para prover relações com segurança e tranquilidade dentro do ambiente crypto.<br/><br/>
            O objetivo da CAST Serviços Digitais é proporcionar a melhor experiência para os nossos clientes, pois sabemos dos desafios e dificuldades encontrados para a realização de transações seguras dentro desse mercado que cresce tanto.<br/><br/>
            Esperamos poder atender e corresponder as expectativas impostas, sempre mirando na excelência e transparência.
          </p>
        </div>
      </section>

      {/* Emblema central atualizado */}
      <motion.section id="inicio" className="text-center py-20 px-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <img src="/ChatGPT Image 12 de abr. de 2025, 21_35_17.png" alt="CAST Logo Emblema" className="mx-auto h-60 mb-6 opacity-80" />
-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Compra e venda de criptoativos com segurança, transparência e atendimento humanizado.
        </p>
        <a href="https://wa.me/5516991864142" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg text-lg transition-transform hover:scale-105">
          <FaWhatsapp /> Fale pelo WhatsApp
        </a>
      </motion.section>

      {/* Cotações CoinGecko */}
      <motion.section className="py-10 px-6 bg-gray-900 text-center">
  <h2 className="text-2xl font-bold text-green-400 mb-6">Cotações em Tempo Real</h2>
  <div className="flex flex-col md:flex-row justify-center items-center gap-4">
    {[{ id: 'bitcoin', label: 'Bitcoin' }, { id: 'ethereum', label: 'Ethereum' }, { id: 'tether', label: 'Tether' }].map((coin) => (
      <CryptoPrice key={coin.id} id={coin.id} label={coin.label} />
    ))}
  </div>
</motion.section>

      {/* Seção de Políticas KYC e AML */}
      <section id="politicas" className="py-16 px-6 bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Nossas Políticas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2 text-white"><FaUserCheck /> Política KYC</h3>
              <p className="text-gray-400 text-sm mb-4">
                A política "Conheça seu Cliente" garante segurança nas operações. Exigimos identificação, selfie e comprovantes de residência e renda.
              </p>
              <a href="/KYC.pdf" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">Visualizar política KYC</a>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2 text-white"><FaShieldAlt /> Política AML</h3>
              <p className="text-gray-400 text-sm mb-4">
                Nossa política de Prevenção à Lavagem de Dinheiro segue padrões internacionais, incluindo monitoramento, análise de perfil e verificação de origem dos fundos.
              </p>
              <a href="/AML.pdf" target="_blank" rel="noopener noreferrer" className="text-green-400 underline">Visualizar política AML</a>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé com logo identificável */}
      <footer className="bg-gray-950 text-center py-6 border-t border-gray-800 mt-10 text-gray-500 text-sm">
        <div className="mb-2">
          <img src="/ChatGPT Image 12 de abr. de 2025, 21_35_17.png" alt="CAST Logo Rodapé" className="h-10 inline-block mr-2 opacity-80" />
          CAST SERVIÇOS DIGITAIS — Empresa verificada na Binance • 100% avaliações positivas
        </div>
        <p>© 2025 CAST Serviços Digitais. Todos os direitos reservados.</p>
      </footer>

      {/* Botão Voltar ao Topo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Voltar ao topo"
      >
        ↑
      </button>
    </motion.div>
  );
}
