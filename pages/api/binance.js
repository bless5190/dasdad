export default async function handler(req, res) {
  try {
    console.log("Iniciando requisição para a API da Binance...");

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

    console.log("Resposta da Binance recebida.");

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro da Binance: ${response.status} - ${errorText}`);
      throw new Error(`Erro da Binance: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dados da Binance processados com sucesso.");
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na API do servidor:", error);
    res.status(500).json({ error: "Erro ao buscar dados da Binance" });
  }
}
