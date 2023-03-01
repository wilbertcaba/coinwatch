import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useRouter } from "next/router";
import Axios from 'axios';
import { StarIcon } from '@heroicons/react/24/outline';
import styles from '../../styles/Coin.module.css';

const Coin = ({ coinMarketData, coinChartData }) => {
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
                    <img width='48' height='48' src={coinMarketData[coinIndex].image} />
                    <h1 className={styles.toUppercase}>{coin}</h1>
                </div>
                <button type='button' className='p-4 border-2 flex items-center gap-4'>
                    Add to Watchlist
                    <StarIcon className='w-6'/>
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
                    <p>${coinMarketData[coinIndex].market_cap.toLocaleString()}</p>
                </li>
                <li>
                    <h4 className='font-bold'>Rank</h4>
                    <p>#{coinMarketData[coinIndex].market_cap_rank.toLocaleString()}</p>
                </li>
                <li>
                    <h4 className='font-bold'>Price Change (24H)</h4>
                    <p>{coinMarketData[coinIndex].price_change_percentage_24h}%</p>
                </li>
                <li>
                    <h4 className='font-bold'>Total Volume</h4>
                    <p>${coinMarketData[coinIndex].total_volume.toLocaleString()}</p>
                </li>
                <li>
                    <h4 className='font-bold'>Max Supply</h4>
                    <p>{coinMarketData[coinIndex].max_supply ? coinMarketData[coinIndex].max_supply.toLocaleString() : `N/A`}</p>
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

