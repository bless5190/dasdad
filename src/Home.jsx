import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBitcoin, FaExchangeAlt, FaMoneyBillWave, FaHandshake, FaWhatsapp, FaShieldAlt, FaUserCheck, FaStar } from "react-icons/fa";

const CryptoPrice = ({ id, label }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=brl`)
      .then(res => res.json())
      .then(data => setPrice(data[id]?.brl));
  }, [id]);

  return (
    <div className="flex items-center justify-between bg-gray-800 rounded p-2 shadow">
      <span className="text-green-400 font-semibold">{label}</span>
      <span className="text-white">{price ? `R$ ${price.toFixed(2)}` : '...'}</span>
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
        {buyAds.length === 0 ? <p>Carregando...</p> : (
          buyAds.map((item, index) => (
            <div key={`buy-${index}`} className="bg-gray-900 p-4 rounded shadow text-left">
              <p className="text-green-400 font-semibold">Preço: R$ {item.adv.price}</p>
              <p className="text-gray-300 text-sm">Tipo: {item.adv.tradeType}</p>
              <p className="text-gray-300 text-sm">Limite: {item.adv.minSingleTransAmount} - {item.adv.maxSingleTransAmount} {item.adv.fiat}</p>
              <p className="text-gray-400 text-sm">Método: {item.adv.tradeMethods[0]?.tradeMethodName}</p>
              <p className="text-gray-500 text-xs">Anunciante: {item.advertiser?.nickName}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-green-400 mb-4">Anúncios de Venda</h3>
        {sellAds.length === 0 ? <p>Carregando...</p> : (
          sellAds.map((item, index) => (
            <div key={`sell-${index}`} className="bg-gray-900 p-4 rounded shadow text-left">
              <p className="text-green-400 font-semibold">Preço: R$ {item.adv.price}</p>
              <p className="text-gray-300 text-sm">Tipo: {item.adv.tradeType}</p>
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
    if (typeof window !== 'undefined') {
      fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://br.cointelegraph.com/rss'))
        .then(res => res.json())
        .then(data => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data.contents, 'text/html');
          const items = xml.querySelectorAll('item');
          const newsItems = Array.from(items).slice(0, 5).map(item => ({
            title: item.querySelector('title')?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '')?.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec)) || '',
            link: item.querySelector('link')?.textContent || '#',
            date: item.querySelector('pubDate')?.textContent || ''
          }));
          setNews(newsItems);
        });
    }
  }, []);

  return (
    <motion.div className="min-h-screen p-6 bg-gray-950 text-white space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">CAST Serviços Digitais</h1>
        <p className="text-gray-400">Compra e venda de criptoativos com segurança e transparência.</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Cotações</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CryptoPrice id="bitcoin" label="BTC" />
          <CryptoPrice id="ethereum" label="ETH" />
          <CryptoPrice id="tether" label="USDT" />
          <CryptoPrice id="binancecoin" label="BNB" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Anúncios P2P da CAST-INTERMEDIACAO</h2>
        <P2PAnuncios />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Sobre a CAST</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          A CAST Serviços Digitais é uma empresa respeitada no mercado de compra e venda de criptoativos. Atuamos com excelência, respeito e tecnologia de ponta para garantir segurança em todas as transações.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Serviços</h2>
        <ul className="text-gray-300 list-disc list-inside max-w-3xl mx-auto">
          <li>Compra e venda de criptoativos com PIX</li>
          <li>Atendimento via WhatsApp</li>
          <li>Verificação e segurança (KYC e AML)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Últimas Notícias</h2>
        <div className="space-y-4">
          {news.length === 0 ? <p>Carregando...</p> : (
            news.map((item, idx) => (
              <div key={idx} className="bg-gray-800 p-4 rounded shadow">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline font-semibold block">
                  {item.title}
                </a>
                <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-400 mb-4">Contato</h2>
        <form action="https://formspree.io/f/xjkwyrkb" method="POST" className="space-y-4 max-w-xl mx-auto">
          <input type="text" name="nome" required placeholder="Nome" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400" />
          <input type="email" name="email" required placeholder="Email" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400" />
          <textarea name="mensagem" required placeholder="Mensagem" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400"></textarea>
          <button type="submit" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-white">Enviar</button>
        </form>
      </section>

      <footer className="text-center text-gray-400 text-sm mt-10">
        <p>© 2025 CAST Serviços Digitais — Empresa verificada na Binance</p>
      </footer>
    </motion.div>
  );
};

export default Home;


