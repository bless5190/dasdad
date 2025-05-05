import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBitcoin, FaWhatsapp, FaShieldAlt, FaUserCheck, FaStar } from "react-icons/fa";

const CryptoPrice = ({ symbol, label }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = () => {
      fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
        .then(res => res.json())
        .then(data => {
          const priceBRL = parseFloat(data.price);
          setPrice(priceBRL);
        });
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center bg-gray-800 rounded p-3 shadow w-full gap-2 sm:gap-0">
      <span className="text-green-400 font-semibold">{label}</span>
      <span className="text-white">{price ? `R$ ${price.toFixed(3)}` : '...'}</span>
    </div>
  );
};

const P2PAnuncios = () => {
  const [buyAds, setBuyAds] = useState([]);
  const [sellAds, setSellAds] = useState([]);

  useEffect(() => {
    const fetchAds = async (type, setter) => {
      try {
        const res = await fetch('https://binance-proxy-roan.vercel.app/api/binance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname: "CAST-INTERMEDIACAO",
            tradeType: type
          })
        });
        const data = await res.json();
        const filtered = (data?.data || []).filter(
          item => item.advertiser?.nickName === "CAST-INTERMEDIACAO"
        );
        setter(filtered);
      } catch (err) {
        console.error(`Erro ao buscar anúncios ${type}:`, err);
      }
    };

    fetchAds("BUY", setBuyAds);
    fetchAds("SELL", setSellAds);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-green-400 mb-4">Anúncios de Compra</h3>
        {buyAds.length === 0 ? <p>No momento não temos nenhum anúncio disponível.</p> : (
          buyAds.map((item, index) => (
            <div key={`buy-${index}`} className="bg-gray-900 p-4 rounded shadow text-left">
              <p className="text-green-400 font-semibold">Preço: R$ {item.adv.price}</p>
              <p className="text-gray-300 text-sm">Tipo: Comprar da CAST</p>
              <p className="text-gray-300 text-sm">Ativo: {item.adv.asset}/{item.adv.fiat}</p>
              <p className="text-gray-300 text-sm">Limite: {item.adv.minSingleTransAmount} - {item.adv.maxSingleTransAmount} {item.adv.fiat}</p>
              <p className="text-gray-400 text-sm">Método: {item.adv.tradeMethods[0]?.tradeMethodName}</p>
              <p className="text-gray-500 text-xs">Anunciante: {item.advertiser?.nickName}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-green-400 mb-4">Anúncios de Venda</h3>
        {sellAds.length === 0 ? <p>No momento não temos nenhum anúncio disponível.</p> : (
          sellAds.map((item, index) => (
            <div key={`sell-${index}`} className="bg-gray-900 p-4 rounded shadow text-left">
              <p className="text-green-400 font-semibold">Preço: R$ {item.adv.price}</p>
              <p className="text-gray-300 text-sm">Tipo: Vender para a CAST</p>
              <p className="text-gray-300 text-sm">Ativo: {item.adv.asset}/{item.adv.fiat}</p>
              <p className="text-gray-300 text-sm">Limite: {item.adv.minSingleTransAmount} - {item.adv.maxSingleTransAmount} {item.adv.fiat}</p>
              <p className="text-gray-400 text-sm">Método: {item.adv.tradeMethods[0]?.tradeMethodName}</p>
              <p className="text-gray-500 text-xs">Anunciante: {item.advertiser?.nickName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://br.cointelegraph.com/rss'))
      .then(res => res.json())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = xml.querySelectorAll('item');
        const newsItems = Array.from(items).slice(0, 5).map(item => ({
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '#',
          date: item.querySelector('pubDate')?.textContent || ''
        }));
        setNews(newsItems);
      });
  }, []);

  return (
    <motion.div className="min-h-screen bg-gray-950 text-white font-sans">
      <section id="inicio" className="text-center py-20 px-6">
        <img src="/Emblema.png" alt="CAST Logo Emblema" className="mx-auto h-48 mb-6 opacity-80" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">CAST SERVIÇOS DIGITAIS</h1>
        <p className="text-lg md:text-xl bg-black/60 p-4 rounded-xl max-w-2xl mx-auto">
          Compra e venda de criptoativos com segurança, transparência e atendimento humanizado.
        </p>
        <a href="https://wa.me/5516991864142" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 mt-8 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-lg">
          <FaWhatsapp /> Fale pelo WhatsApp
        </a>
      </section>

      <section id="sobre" className="py-20 px-6 text-center bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-8">Sobre a CAST</h2>
          <p className="text-gray-300 leading-relaxed">
            A CAST Serviços Digitais é uma empresa respeitada e sólida no mercado de compra e venda de criptoativos, atuando sempre com excelência, respeito e transparência.
            Seguindo os padrões mais altos de atendimento humano. Com taxas extremamente competitivas no mercado.
            <br /><br />
            A CAST possui como objetivo proporcionar uma acessibilidade com confiança para nossos clientes, é por isso que sempre estamos investindo em novas soluções, e em nossa infraestrutura.
            Te convidamos a vir conhecer o nosso trabalho, será um prazer ter você como cliente. Aqui, valorizamos extremamente você!
          </p>
        </div>
      </section>

      <section id="servicos" className="py-20 px-6 bg-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Cotações em tempo real (Binance)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <CryptoPrice symbol="BTCBRL" label="BTC/BRL" />
            <CryptoPrice symbol="ETHBRL" label="ETH/BRL" />
            <CryptoPrice symbol="USDTBRL" label="USDT/BRL" />
            <CryptoPrice symbol="BNBBRL" label="BNB/BRL" />
            <CryptoPrice symbol="SOLBRL" label="SOL/BRL" />
            <CryptoPrice symbol="BCHBRL" label="BCH/BRL" />
          </div>
        </div>
      </section>

      <section id="anuncios" className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-8">Anúncios CAST-INTERMEDIACAO</h2>
          <P2PAnuncios />
        </div>
      </section>

      <section id="noticias" className="py-20 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-6">Notícias</h2>
          <ul className="space-y-4">
            {news.map((item, index) => (
              <li key={index} className="text-left bg-gray-700 p-4 rounded-xl">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline text-lg">
                  {item.title}
                </a>
                <p className="text-sm text-gray-400">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="feedbacks" className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10 flex items-center justify-center gap-2">
            <FaStar className="text-yellow-400" /> Feedbacks dos Clientes
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-800 p-4 rounded-xl shadow">
              <p className="text-white font-semibold">Transação rápida</p>
              <p className="text-sm text-gray-400">P2P-368582dz • 2025-04-30</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow">
              <p className="text-white font-semibold">Transação rápida, Educado e amigável</p>
              <p className="text-sm text-gray-400">P2P-9fd053vf • 2025-04-15</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow">
              <p className="text-white font-semibold">Obrigado!</p>
              <p className="text-sm text-gray-400">VitorBarbosaJr • 2025-04-11</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl shadow">
              <p className="text-white font-semibold">Excelente atendimento e liberação ágil</p>
              <p className="text-sm text-gray-400">Usuário Anônimo • 2025-04-13</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="py-20 px-6 bg-gray-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 bg-black/60 px-4 py-2 rounded-xl inline-block">Contato</h2>
          <p className="text-white mb-6 bg-black/60 px-4 py-2 rounded-xl inline-block">Fale com a CAST Serviços Digitais pelo WhatsApp ou preencha o formulário abaixo.</p>
          <form action="https://formspree.io/f/xjkwyrkb" method="POST" className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            fetch(form.action, {
              method: form.method,
              body: new FormData(form),
              headers: { 'Accept': 'application/json' }
            }).then(response => {
              if (response.ok) {
                alert('Mensagem enviada com sucesso!');
                form.reset();
              } else {
                alert('Erro ao enviar. Tente novamente.');
              }
            });
          }}>
            <input type="text" name="nome" required placeholder="Nome" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400" />
            <input type="email" name="email" required placeholder="Email" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400" />
            <textarea name="mensagem" required placeholder="Mensagem" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400"></textarea>
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-white">Enviar</button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-950 text-center py-6 border-t border-gray-800 mt-10 text-gray-500 text-sm">
        <div className="mb-2">
          <img src="/Emblema.png" alt="CAST Logo Rodapé" className="h-10 inline-block mr-2 opacity-80" />
          CAST SERVIÇOS DIGITAIS — Empresa verificada na Binance • 100% avaliações positivas
        </div>
        <p>© 2025 CAST Serviços Digitais. Todos os direitos reservados.</p>
      </footer>
    </motion.div>
  );
};

export default Home;
export { CryptoPrice, P2PAnuncios };
