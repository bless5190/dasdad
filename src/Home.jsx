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
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = xml.querySelectorAll('item');
        const newsItems = Array.from(items).slice(0, 5).map(item => ({
          title: item.querySelector('title')?.textContent || '',
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
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gradient-to-b from-gray-950 to-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-800 shadow-md">
        <img src="/logo_verde_transparente.png" alt="CAST Logo" className="h-10" />
        <nav className="space-x-6 text-sm md:text-base font-medium">
          <a href="#inicio" className="hover:text-green-400 transition-colors">Início</a>
          <a href="#sobre" className="hover:text-green-400 transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-green-400 transition-colors">Serviços</a>
          <a href="#noticias" className="hover:text-green-400 transition-colors">Notícias</a>
          <a href="#contato" className="hover:text-green-400 transition-colors">Contato</a>
        </nav>
      </header>

      {/* Destaque 1 Ano com banner clicável */}
      <a href="https://wa.me/5516991864142" target="_blank" rel="noopener noreferrer">
        <section className="bg-gradient-to-r from-green-800 to-green-600 text-center py-10 hover:brightness-110 transition-all cursor-pointer">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">🎉 CAST SERVIÇOS DIGITAIS COMPLETA 1 ANO!</h2>
          <p className="text-white text-sm md:text-base">Clique aqui e aproveite condições especiais de aniversário.</p>
        </section>
      </a>

      {/* Hero Section */}
      <motion.section id="inicio" className="text-center py-20 px-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAMAAAANIilAAAAAUVBMVEX///8AAAB/f3+jo6PZ2dnr6+v7+/vf39+cnJxLS0uHh4e3t7drampKSko6OjoZGRkpKSl1dXV4eHhBQUEeHh6JiYnj4+NwcHAgICBZWVnd7AaVAAAG/UlEQVR4nO2d63KrIAxFnRFFvqr7/39uWy5Qb0Rmx0znXfnmkiZCmQo8yS3H8qMywAAAAAAAAAAAAAAAAAAAAAAAAAAD8H+g1Mr+yB7VHH2csYfzq6DHeTrfR+cfnYHfKbrIv+d54jNV+sbPf2Po9dwcfsPoM/y/UYrkN3ZAX0g9Et7XFoSR9vFe04PbCX+XdjEP29v2kFdpPu+HZjEL3Zvo3mXzYjKq4k3MdOZ3IvbUwOyv7t9wrBtp9ezKxzGvQ2nOV+PrmuHzltwew5bNWLxjoPVvFhn6Yfd+K/Xjr8J68XpNKktMNkcNPYz8p69MoTcztdi2sl6gE1/sixjsO7wZ5kRY+HoZqrr+13nbfjhzht/XUIRfGy+ZaHcRra7rOrq49pssZX9cWbapHJmvRWKjErppEYra9pNKqHbUisveZ11bflOzVKqUb1KmqD7FZErU1oPFqS2qa1KaQfZtXT8m+X82nm+hRqN0NWOZdX0yybfMyFZmoRnS6vVv/bavj83NmCk8krnFLZXYhZ3GHdthEo03qNlh6q9nkmRdrGa+s9ixWptQ+gSpUVazmYyrcRTFHpU2MSmTTu4f3tbaw0iM6NZnbzRL4U8NGStgZdKSmK6vGtaoeFbr2NLWeo9PY3bG9t7vLZKynlnJm8T9SaH4hxHdqGZHkTcRHV8/kHFaZhzfTfHov07p3Wkx3PBueyaTqbGUZCkUbVyVX9AjTVYuYrXsiM+plWoqZOsVHyxt2bFfkrdJWVKa3KFVeqkrZUtTme19k5t+uPvTyl61dml2ytEVnYlU66MXKmoV2ulymXakqv3FcZtpqylXZMpnzzshWYmsW1pUKUrt3w7vXk7t86rfNsFJcm3KkW6kLXdB3ZJTWbVvUFrRWneKfuUZ1lj53LQtrZzGyZxP2UFklUqXkyd4u+XbqqYt5xjWXyzXZvO2N3NKn9bRYQAAAAAAAAAAAAAAAAAAAAAAAAAwD/hT8GzeKldM5SFAAAAAElFTkSuQmCC" alt="CAST Logo Emblema" className="mx-auto h-24 mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-400 flex justify-center items-center gap-3">
          <FaHandshake className="text-blue-400" /> CAST SERVIÇOS DIGITAIS
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Compra e venda de criptoativos com segurança, transparência e atendimento humanizado.
        </p>
        <a href="https://wa.me/5516991864142" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg text-lg transition-transform hover:scale-105">
          <FaWhatsapp /> Fale pelo WhatsApp
        </a>
      </motion.section>

      {/* Sobre */}
      <motion.section id="sobre" className="py-20 px-6 bg-gray-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-400 mb-6">Sobre a CAST</h2>
    <p className="text-gray-300 text-lg mb-10">
      A CAST Serviços Digitais é uma empresa sólida no mercado de criptoativos, atuando na corretora Binance com selo de Comerciante Verificada Profissional. Nosso foco é oferecer negociações rápidas, seguras e com atendimento humano, respeitoso e eficiente.
    </p>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-gray-900 p-6 rounded-xl shadow text-center">
        <h3 className="text-xl font-bold text-green-300 mb-2 flex justify-center items-center gap-2"><FaUserCheck /> Política KYC</h3>
        <p className="text-gray-400 text-sm mb-4">
          Nossa política de "Conheça seu Cliente" garante que todas as operações sejam realizadas de forma segura, exigindo identificação, selfie e comprovantes. Aplicada tanto a pessoas físicas quanto jurídicas.
        </p>
        <a href="/KYC_-_CAST_MAIS_ATT_28129_28129_assinado (1) (2).pdf" target="_blank" className="text-green-400 underline">Visualizar política KYC</a>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl shadow text-center">
        <h3 className="text-xl font-bold text-green-300 mb-2 flex justify-center items-center gap-2"><FaShieldAlt /> Política AML</h3>
        <p className="text-gray-400 text-sm mb-4">
          Adotamos rigorosas medidas de Prevenção à Lavagem de Dinheiro, incluindo monitoramento contínuo, verificação de origem dos recursos e identificação de PEPs (Pessoas Politicamente Expostas).
        </p>
        <a href="/CAST Intemediação AML (1) (2).pdf" target="_blank" className="text-green-400 underline">Visualizar política AML</a>
      </div>
    </div>
  </div>
</motion.section>

      {/* Serviços */}
      <motion.section id="servicos" className="py-20 px-6 bg-gray-900" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-8 flex justify-center items-center gap-2">
            <FaBitcoin className="text-orange-400" /> Serviços
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-green-300 mb-4">Cotações em tempo real</h3>
              <iframe src="https://br.widgets.investing.com/live-currency-cross-rates?theme=darkTheme" width="100%" height="300" frameBorder="0" allowTransparency="true"></iframe>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-center">
              <p className="text-green-200 text-3xl font-extrabold mb-6 leading-relaxed">
                Deseja comprar ou vender Criptoativos?
              </p>
              <a href="https://wa.me/5516991864142" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow w-fit mx-auto text-lg">
                <FaWhatsapp /> Fale pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Notícias */}
      <motion.section className="py-20 px-6 bg-gray-900" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-400 mb-10 flex items-center justify-center gap-2">
      <FaStar className="text-yellow-400" /> Feedbacks dos Clientes
    </h2>
    <div className="grid md:grid-cols-2 gap-6 text-left">
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-green-300 font-semibold">Transação rápida</p>
        <p className="text-sm text-gray-400">P2P-368582dz • 2025-04-30</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-green-300 font-semibold">Transação rápida, Educado e amigável</p>
        <p className="text-sm text-gray-400">P2P-9fd053vf • 2025-04-15</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-green-300 font-semibold">Obrigado!</p>
        <p className="text-sm text-gray-400">VitorBarbosaJr • 2025-04-11</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <p className="text-green-300 font-semibold">Excelente atendimento e liberação ágil</p>
        <p className="text-sm text-gray-400">Usuário Anônimo • 2025-04-13</p>
      </div>
    </div>
  </div>
</motion.section>

<motion.section id="noticias" className="py-20 px-6 bg-gray-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-400 mb-6">Notícias</h2>
    <div className="grid md:grid-cols-2 gap-8">
  <div className="bg-gray-800 p-6 rounded-xl shadow">
    <h3 className="text-xl font-bold text-green-300 mb-4">Cotações</h3>
    <iframe src="https://br.widgets.investing.com/live-currency-cross-rates?theme=darkTheme" width="100%" height="300" frameBorder="0" allowTransparency="true"></iframe>
  </div>
  <div className="bg-gray-800 p-6 rounded-xl shadow text-left">
    <h3 className="text-xl font-bold text-green-300 mb-4">Últimas Notícias</h3>
    <ul className="text-sm space-y-2 text-gray-300">
  {news.map((item, index) => (
    <li key={index}>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
        {item.title}
      </a>
      <div className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
    </li>
  ))}
</ul>
  </div>
</div>
  </div>
</motion.section>

      {/* Contato */}
      <motion.section id="contato" className="py-20 px-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-6">Contato</h2>
          <p className="text-gray-300 mb-6">Fale com a CAST Serviços Digitais pelo WhatsApp ou preencha o formulário abaixo.</p>
          <form className="space-y-4">
            <input type="text" placeholder="Nome" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400" />
            <input type="email" placeholder="Email" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400" />
            <textarea placeholder="Mensagem" className="w-full p-3 rounded bg-gray-700 placeholder-gray-400"></textarea>
            <button type="submit" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-white">Enviar</button>
          </form>
        </div>
      </motion.section>

      {/* Rodapé com selo */}
      <footer className="bg-gray-950 text-center py-6 border-t border-gray-800 mt-10 text-gray-500 text-sm">
        <div className="mb-2">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAMAAAANIilAAAAAUVBMVEX///8AAAB/f3+jo6PZ2dnr6+v7+/vf39+cnJxLS0uHh4e3t7drampKSko6OjoZGRkpKSl1dXV4eHhBQUEeHh6JiYnj4+NwcHAgICBZWVnd7AaVAAAG/UlEQVR4nO2d63KrIAxFnRFFvqr7/39uWy5Qb0Rmx0znXfnmkiZCmQo8yS3H8qMywAAAAAAAAAAAAAAAAAAAAAAAAAAD8H+g1Mr+yB7VHH2csYfzq6DHeTrfR+cfnYHfKbrIv+d54jNV+sbPf2Po9dwcfsPoM/y/UYrkN3ZAX0g9Et7XFoSR9vFe04PbCX+XdjEP29v2kFdpPu+HZjEL3Zvo3mXzYjKq4k3MdOZ3IvbUwOyv7t9wrBtp9ezKxzGvQ2nOV+PrmuHzltwew5bNWLxjoPVvFhn6Yfd+K/Xjr8J68XpNKktMNkcNPYz8p69MoTcztdi2sl6gE1/sixjsO7wZ5kRY+HoZqrr+13nbfjhzht/XUIRfGy+ZaHcRra7rOrq49pssZX9cWbapHJmvRWKjErppEYra9pNKqHbUisveZ11bflOzVKqUb1KmqD7FZErU1oPFqS2qa1KaQfZtXT8m+X82nm+hRqN0NWOZdX0yybfMyFZmoRnS6vVv/bavj83NmCk8krnFLZXYhZ3GHdthEo03qNlh6q9nkmRdrGa+s9ixWptQ+gSpUVazmYyrcRTFHpU2MSmTTu4f3tbaw0iM6NZnbzRL4U8NGStgZdKSmK6vGtaoeFbr2NLWeo9PY3bG9t7vLZKynlnJm8T9SaH4hxHdqGZHkTcRHV8/kHFaZhzfTfHov07p3Wkx3PBueyaTqbGUZCkUbVyVX9AjTVYuYrXsiM+plWoqZOsVHyxt2bFfkrdJWVKa3KFVeqkrZUtTme19k5t+uPvTyl61dml2ytEVnYlU66MXKmoV2ulymXakqv3FcZtpqylXZMpnzzshWYmsW1pUKUrt3w7vXk7t86rfNsFJcm3KkW6kLXdB3ZJTWbVvUFrRWneKfuUZ1lj53LQtrZzGyZxP2UFklUqXkyd4u+XbqqYt5xjWXyzXZvO2N3NKn9bRYQAAAAAAAAAAAAAAAAAAAAAAAAAwD/hT8GzeKldM5SFAAAAAElFTkSuQmCC" alt="CAST Logo Rodapé" className="h-6 inline-block mr-2" />
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
