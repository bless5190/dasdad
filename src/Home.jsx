import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBitcoin, FaWhatsapp, FaShieldAlt, FaUserCheck, FaStar } from "react-icons/fa";

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
          title: item.querySelector('title')?.textContent.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec)) || '',
          link: item.querySelector('link')?.textContent || '#',
          date: item.querySelector('pubDate')?.textContent || ''
        }));
        setNews(newsItems);
      });
  }, []);

  return (
    <motion.div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Aqui o conteúdo restante permanece inalterado */}

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
    </motion.div>
  );
};

export default Home;
