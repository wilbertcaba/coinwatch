import Axios from 'axios';
import { useEffect } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const CoinList = ({ coinData }) => {
    // console.log(coinData);

    const styleGreen = {
        color: 'green'
    };

    const styleRed = {
        color: 'red'
    };

    useEffect(() => {
        console.log(coinData);
        // console.log(priceSevenDays(2));
        // console.log(coinSevenDays);
    });

    const priceSevenDays = (index) => {

        return coinData[index].sparkline_in_7d.price;
        // const data = coinData[index].sparkline_in_7d.price;

        // return data.map( (price) => {
        //     return {
        //         value: price
        //     }
        // });



        // return coinData[index].sparkline_in_7d.price.map((price,index) => {
        //     // const readablePrice = price.toLocaleString();
        //     return {
        //         price: price
        //     }
        // });
    }



    // const priceSevenDays = coinData[1].sparkline_in_7d.price.map((price,index) => {
    //     // const readablePrice = price.toLocaleString();
    //     return {
    //         price: price
    //     }
    // });

    // const logPrice = setTimeout(() => { priceSevenDays(1) }, '2000');

    console.log('==========================');
    // console.log(logPrice);

    const DATA_24_HOURS = [
        { time: '00:00', price: 48000 },
        { time: '01:00', price: 48200 },
        { time: '02:00', price: 48400 },
        { time: '03:00', price: 48300 },
        { time: '04:00', price: 48250 },
        { time: '05:00', price: 48500 },
        { time: '06:00', price: 48550 },
        { time: '07:00', price: 48450 },
        { time: '08:00', price: 48400 },
        { time: '09:00', price: 48600 },
        { time: '10:00', price: 48700 },
        { time: '11:00', price: 48800 },
        { time: '12:00', price: 49000 },
        { time: '13:00', price: 49100 },
        { time: '14:00', price: 49200 },
        { time: '15:00', price: 49150 },
        { time: '16:00', price: 49100 },
        { time: '17:00', price: 49000 },
        { time: '18:00', price: 48850 },
        { time: '19:00', price: 48900 },
        { time: '20:00', price: 48800 },
        { time: '21:00', price: 48700 },
        { time: '22:00', price: 48600 },
        { time: '23:00', price: 48500 }
    ];

    const Ymin = Math.min(DATA_24_HOURS.map(data => data.price));
    const Ymax = Math.max(DATA_24_HOURS.map(data => data.price));
    const Ydomain = [Ymin, Ymax];

    return (
        <>
            <div className='relative basis-28 h-60'>
                <ResponsiveContainer>
                    <LineChart data={DATA_24_HOURS} width={600} height={300} dot={false}>
                        <XAxis dataKey="time"  />
                        <YAxis dataKey="price" domain={Ydomain}/>
                        <Line r={0} type="linear" dataKey="price" stroke="#8884d8" />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <ul className='pt-10'>
                {coinData.map((coin, index) => {
                    return (
                        <li key={coin.id} className='flex items-center justify-between hover:bg-slate-100 rounded py-2 px-4'>
                            <div className='flex items-center gap-4'>
                                <img src={coin.image} alt={`${coin.name} Logo`} className='w-7'/>
                                <h3 className='text-md font-bold'>{coin.name}</h3>
                                <p className='text-sm text-slate-500'>{coin.symbol}</p>
                            </div>
                            <div className='flex gap-4 justify-end grow basis-auto text-right text-base'>
                                <div className='relative basis-28 h-5 flex justify-end'>
                                    <LineChart width={100} height={30} data={DATA_24_HOURS}>
                                        <XAxis dataKey="time"  hide={true} />
                                        <YAxis dataKey="price" domain={Ydomain} hide={true}/>
                                        <Line dot={false} type="linear" dataKey="price" stroke="#8884d8" />
                                        {/* <Line dot={false}  dataKey="price" stroke="#8884d8" /> */}
                                        <Tooltip />
                                        <ResponsiveContainer />
                                    </LineChart>
                                </div>
                                <p className='basis-28'>{coin.current_price.toLocaleString()}</p>
                                <p className='basis-28' style={coin.price_change_percentage_24h > 0 ? styleGreen : styleRed} >{coin.price_change_percentage_24h.toFixed(2)}%</p>
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
    // const coinsIds = data.data.map((coin) => {return coin.id});
    // const coinsIdsString = coinsIds.join(',');
    // const dataSevenDays = await Axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsIdsString}&days=7`);

    return {
        props: {
            coinData: data.data
            // coinSevenDays: coinsIdsString
        }
    }
};

export default CoinList;