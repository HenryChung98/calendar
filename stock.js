// const stockUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
// const stockKey = config.stockKey;

// async function getStock(symbol) {
//     const responseWeather = await fetch(stockUrl + symbol + `&apikey=${stockKey}`);

//     if (responseWeather.status === 404) {
//         alert("Cannot Load Stock API");
//         return;
//     }

//     try {
//         let data = await responseWeather.json();

//         // Check if 'Meta Data' and 'Time Series (Daily)' exist
//         const metaData = data['Meta Data'];
//         const timeSeries = data['Time Series (Daily)'];

//         if (!metaData || !timeSeries) {
//             console.error("Meta Data or Time Series not found in the response");
//             return;
//         }

//         const latestDate = Object.keys(timeSeries)[0];
//         const latestStockInfo = timeSeries[latestDate];

//         const lastDate = Object.keys(timeSeries)[1];
//         const lastStockInfo = timeSeries[lastDate];

//         console.log(`today Open: ${latestStockInfo['1. open']}`);
//         console.log(`today Close: ${latestStockInfo['4. close']}`);
//         console.log(`last day Open: ${lastStockInfo['1. open']}`);
//         console.log(`last day Close: ${lastStockInfo['4. close']}`);
//     } catch (error) {
//         console.error('Error parsing stock data:', error);
//     }
// }

// let stock = "U"; // Replace with the stock symbol you're interested in
// getStock(stock);
