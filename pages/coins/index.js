import Axios from 'axios';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const CoinList = ({ coinData }) => {
    console.log(coinData);

    const styleGreen = {
        color: 'green'
    };

    const styleRed = {
        color: 'red'
    };

    const labels = coinData[0].sparkline_in_7d.price.map((price,index)=>{
        return index
    });

    const data = [
        {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 300, pv: 2800, amt: 5500},
        {name: 'Page C', uv: 500, pv: 1500, amt: 5500},
        {name: 'Page D', uv: 900, pv: 3000, amt: 5500},
        {name: 'Page E', uv: 800, pv: 4000, amt: 5500},
    ];

    return (
        <>
            <div className='relative basis-28 h-60'>
                <ResponsiveContainer>
                    <LineChart data={data} width={600} height={300} dot={false}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <ul className='pt-10'>
                {coinData.map(coin => {
                    return (
                        <li key={coin.id} className='flex items-center justify-between hover:bg-slate-100 rounded py-2 px-4'>
                            <div className='flex items-center gap-4'>
                                <img src={coin.image} alt={`${coin.name} Logo`} className='w-7'/>
                                <h3 className='text-md font-bold'>{coin.name}</h3>
                                <p className='text-sm text-slate-500'>{coin.symbol}</p>
                            </div>
                            <div className='flex gap-4 justify-end grow basis-auto text-right text-base'>
                                <div className='relative basis-28 h-5 flex justify-end'>
                                    <LineChart width={60} height={30} data={data}>
                                        <Line dot={false} type="monotone" dataKey="uv" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                                <p className='basis-28'>{coin.current_price.toLocaleString()}</p>
                                <p className='basis-28' style={coin.price_change_percentage_24h > 0 ? styleGreen : styleRed} >{coin.price_change_percentage_24h}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    )
};

// Generates a Static Site (SSG: Static Site Generation)
// export const getStaticProps = async () => {
//     const data = await Axios.get('https://api.coinstats.app/public/v1/coins?skip=0');

//     return {
//         props: {
//             coinData: data.data
//         }
//     }
// };

// Generates SSR: Server Side Rendering
export const getServerSideProps = async () => {
    // const data = await Axios.get('https://api.coinstats.app/public/v1/coins?skip=0');
    const data = await Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y');

    return {
        props: {
            coinData: data.data
        }
    }
};

export default CoinList;