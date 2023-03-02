import Link from 'next/link';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { StarIcon } from '@heroicons/react/24/outline';

const CoinListItem = ({ coin, onAddToWatchlist, watchlist }) => {
    const styleGreen = {
        color: 'green'
    };
    
    const styleRed = {
        color: 'red'
    }

    const fillColor = () => {
        if (watchlist.includes(coin)) {
            return 'fill-slate-500';
        } else {
            return 'fill-slate-100';
        }
    }

    return (
        <li key={coin.id}>
            <div className='flex items-center justify-between hover:bg-slate-100 rounded-md py-2 px-4 gap-4'>
                <Link href={`coins/${coin.id}`}>
                    <div className='flex items-center justify-between flex-grow cursor-pointer'>
                        <div className='flex items-center gap-4'>
                            <img src={coin.image} alt={`${coin.name} Logo`} className='w-7'/>
                            <h3 className='text-md font-bold'>{coin.name}</h3>
                            <p className='text-sm text-slate-500'>{coin.symbol}</p>
                        </div>
                        <div className='flex gap-4 justify-end grow basis-auto text-right text-base'>
                            <div className='relative basis-28 h-5 flex justify-end'>
                                {/* <LineChart width={100} height={30} data={DATA_24_HOURS}>
                                    <XAxis dataKey="time"  hide={true} />
                                    <YAxis dataKey="price" domain={Ydomain} hide={true}/>
                                    <Line dot={false} type="linear" dataKey="price" stroke="#8884d8" />
                                    <ResponsiveContainer />
                                </LineChart> */}
                            </div>
                            <p className='basis-28'>{coin.current_price.toLocaleString()}</p>
                            <p className='basis-28' style={coin.price_change_percentage_24h > 0 ? styleGreen : styleRed} >{coin.price_change_percentage_24h.toFixed(2)}%</p>
                        </div>
                    </div>
                </Link>
                <button onClick={onAddToWatchlist}>
                    {watchlist.includes(coin) ? <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="w-6 h-6 fill-yellow-500 stroke-yellow-900" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="w-6 h-6 fill-slate-100 stroke-slate-400" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5z"/></svg>}
                </button>
            </div>
        </li>

    )

}

export default CoinListItem;