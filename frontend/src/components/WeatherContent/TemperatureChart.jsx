import React, { useContext } from 'react'
import { SearchContext } from '../../searchContext/SearchContext';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, LabelList,Dot } from 'recharts';
import HourAxis from './HourAxis';

// Recharts will pass props like x, y, value, and index to it.
const CustomLabel = (props) => {
    const { x, y, value, index } = props;

    // --- 2. Set your desired gap here ---
    // This will show the 0th, 3rd, 6th, 9th... label.
    const LABEL_GAP = 3;

    // 3. Use the modulo operator to render nothing if it's not the right index
    if (index % LABEL_GAP !== 0) {
        return null;
    }

    // 4. If it IS the right index, render the label
    // We manually add the styling that <LabelList> was doing before.
    return (
        <text
            x={x}
            y={y}
            dy={-10} // This is the `offset={10}` (negative dy moves it up)
            fill="#e5e7eb"
            fontSize={14}
            textAnchor="middle" // This centers the text above the point
            className='flex justify-between gap-4'
        >
            {`${value}`} {/* This is the `formatter` logic */}
        </text>
    );
};

const TemperatureChart = () => {

    const { hourlyForecast, loading } = useContext(SearchContext);
    if (loading) return <div className="text-gray-400 text-center ">Loading Chart...</div>;
    if (!hourlyForecast || hourlyForecast.length === 0) return null;

    return (
        <div style={{ width: '100%', height: 150 }} className="mt-8 overflow-hidden">
            <ResponsiveContainer>
                <AreaChart data={hourlyForecast} margin={{top:12, right:0, left:10, bottom:20}} >
                    <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1" >
                            <stop offset="5%" stopColor="#facc15" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                        {/* <XAxis  dataKey="time" stroke="#a1a1aa" tickLine={false} axisLine={false} interval={2} padding={{left:10, right:10}} /> */}
                        <HourAxis />
                     <Tooltip 
                        cursor={{ stroke: 'rgba(156, 163, 175, 0.3)', strokeWidth: 1 }} 
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563', color: '#fff', borderRadius: '0.5rem' }}
                    />
                    <Area type="monotone" dataKey="temp" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)">
                        {/* --- 5. Use the `content` prop here --- */}
                        {/* All the old props (position, offset, fill, etc.) are now inside CustomLabel */}
                        <LabelList dataKey="temp" content={<CustomLabel />} />
                    </Area>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TemperatureChart;
