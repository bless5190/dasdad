export default async function handler(req, res) {
  try {
    const response = await fetch('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 1,
        rows: 5,
        payTypes: ["PIX"],
        asset: "USDT",
        tradeType: "SELL",
        fiat: "BRL",
        userProfileNick: "CAST-INTERMEDIACAO",
        userType: "user"
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API route da Binance:", error);
    res.status(500).json({ error: "Erro ao buscar dados da Binance" });
  }
}
