import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useRouter } from "next/router";
import Axios from 'axios';
import { StarIcon } from '@heroicons/react/24/outline';
import styles from '../../styles/Coin.module.css';

const Coin = ({ coinMarketData, coinChartData, watchlist }) => {
    const router = useRouter();
    const {coin} = router.query;
    const Ymin = Math.min(coinChartData.map(data => data.price));
    const Ymax = Math.max(coinChartData.map(data => data.price));
    const Ydomain = [Ymin, Ymax];
    const coinIndex = coinMarketData.findIndex(coinId => coinId.id === coin);

    console.log(coinMarketData);
    return <>
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-4'>
                    <img width='48' height='48' src={coinMarketData[coinIndex]?.image} />
                    <h1 className={styles.toUppercase}>{coin}</h1>
                </div>
                <button type='button' className='p-4 border-2 flex items-center gap-4'>
                    Add to Watchlist
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" class="w-6 h-6 blue" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z"/></svg>
                </button>
            </div>
            <div className='relative basis-28 h-60 mb-8'>
                <ResponsiveContainer>
                    <LineChart data={coinChartData} width={600} height={300} dot={false}>
                        <XAxis dataKey="time"  interval={40} />
                        <YAxis dataKey="price" domain={Ydomain} hide={true}/>
                        <Line r={0} type="linear" dataKey="price" stroke="#8884d8" />
                        <Tooltip wrapperStyle={{ fontSize: 12}}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <ul className='grid grid-cols-3 gap-4'>
                <li>
                    <h4 className='font-bold'>Market Cap</h4>
                    <p>${coinMarketData[coinIndex]?.market_cap.toLocaleString()}</p>
                </li>
                <li>
                    <h4 className='font-bold'>Rank</h4>
                    <p>#{coinMarketData[coinIndex]?.market_cap_rank.toLocaleString()}</p>
                </li>
                <li>
                    <h4 className='font-bold'>Price Change (24H)</h4>
                    <p>{coinMarketData[coinIndex]?.price_change_percentage_24h}%</p>
                </li>
                <li>
                    <h4 className='font-bold'>Total Volume</h4>
                    <p>${coinMarketData[coinIndex]?.total_volume.toLocaleString()}</p>
                </li>
                <li>
                    <h4 className='font-bold'>Max Supply</h4>
                    <p>{coinMarketData[coinIndex]?.max_supply ? coinMarketData[coinIndex].max_supply.toLocaleString() : `N/A`}</p>
                </li>
            </ul>

        </>
}

export const getServerSideProps = async ({ params }) => {
    const coin = params.coin;
    const coinMarketData = await Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y');
    const coinChartData = await Axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`);

    coinChartData.data = coinChartData.data.prices.map((price, index) => {
        return {
            time: new Date(price[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            price: price[1]
        }
    });


    return {
        props: {
            coinMarketData: coinMarketData.data,
            coinChartData: coinChartData.data
        }
    }
}

export default Coin;

