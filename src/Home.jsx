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
        {buyAds.length === 0 ? <p>Carregando anúncios de compra...</p> : (
          buyAds.map((item, index) => (
            <div key={`buy-${index}`} className="bg-gray-900 p-4 rounded shadow text-left">
              <p className="text-green-400 font-semibold">Preço: R$ {item.adv.price}</p>
              <p className="text-gray-300 text-sm">Tipo: {item.adv.tradeType}</p>
              <p className="text-gray-300 text-sm">
                Limite: {item.adv.minSingleTransAmount} - {item.adv.maxSingleTransAmount} {item.adv.fiat}
              </p>
              <p className="text-gray-400 text-sm">
                Método: {item.adv.tradeMethods[0]?.tradeMethodName}
              </p>
              <p className="text-gray-500 text-xs">
                Anunciante: {item.advertiser?.nickName}
              </p>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold text-green-400 mb-4">Anúncios de Venda</h3>
        {sellAds.length === 0 ? <p>Carregando anúncios de venda...</p> : (
          sellAds.map((item, index) => (
            <div key={`sell-${index}`} className="bg-gray-900 p-4 rounded shadow text-left">
              <p className="text-green-400 font-semibold">Preço: R$ {item.adv.price}</p>
              <p className="text-gray-300 text-sm">Tipo: {item.adv.tradeType}</p>
              <p className="text-gray-300 text-sm">
                Limite: {item.adv.minSingleTransAmount} - {item.adv.maxSingleTransAmount} {item.adv.fiat}
              </p>
              <p className="text-gray-400 text-sm">
                Método: {item.adv.tradeMethods[0]?.tradeMethodName}
              </p>
              <p className="text-gray-500 text-xs">
                Anunciante: {item.advertiser?.nickName}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <motion.div className="min-h-screen p-6 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">CAST Serviços Digitais</h1>
      <div className="mb-10">
        <CryptoPrice id="bitcoin" label="BTC" />
        <CryptoPrice id="ethereum" label="ETH" />
        <CryptoPrice id="tether" label="USDT" />
      </div>
      <P2PAnuncios />
    </motion.div>
  );
};

export default Home;

  );
}
