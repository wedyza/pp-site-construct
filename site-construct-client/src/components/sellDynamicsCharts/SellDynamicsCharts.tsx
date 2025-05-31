import React, { useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSellDynamics } from '../../store/sellDynamicsSlice';
import './sellDynamicsCharts.scss';

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function mapOrdersToWeek(orders: { created_at__date: string; count: number }[]) {
    const weekData = WEEK_DAYS.map((day) => ({
        day,
        count: 0,
    }));

    const dayIndexMap: Record<string, number> = {
        'Mon': 0,
        'Tue': 1,
        'Wed': 2,
        'Thu': 3,
        'Fri': 4,
        'Sat': 5,
        'Sun': 6,
    };

    for (const order of orders) {
        const date = new Date(order.created_at__date);
        const engDay = date.toLocaleString('en-US', { weekday: 'short' }); // e.g., 'Mon'
        const index = dayIndexMap[engDay];
        if (index !== undefined) {
            weekData[index].count += order.count;
        }
    }

    return weekData;
}

const SellDynamicsCharts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.sellDynamics);

    useEffect(() => {
        dispatch(fetchSellDynamics());
    }, [dispatch]);

    if (!data) return null;

    const profits = data.order_profits;
    const orders = data.order_counts;
    const weekOrders = mapOrdersToWeek(orders);

    const getBarColor = (value: number, max: number) => {
        const ratio = value / max;
        if (ratio <= 1 / 3) return '#CD1E0E80';
        if (ratio <= 2 / 3) return '#FFA60080';
        return '#3ACD0E80';
    };

    const maxCount = Math.max(...weekOrders.map(item => item.count));

    return (
        <div className="charts-container">
            <div className="chart-wrapper">
                <h2 className="chart-title text-h3">Выручка (руб)</h2>
                <ResponsiveContainer width="100%" height={195}>
                    <LineChart data={profits}>
                        <XAxis 
                            dataKey="created_at__date"
                            tick={{ fontSize: 11, textAnchor: 'end' }}
                        />
                        <YAxis tick={{ fontSize: 11, textAnchor: 'end' }} />
                        <Tooltip 
                            itemStyle={{ fontSize: '14px' }}
                            contentStyle={{ backgroundColor: '#FEFEFE', padding: '10px', borderRadius: '10px' }}
                        />
                        <Line 
                            type="linear" 
                            dataKey="count" 
                            stroke="#02040F" 
                            dot={{ r: 3.5, strokeWidth: 0, fill: '#FFA600' }}
                            name="Выручка (₽)" 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-wrapper chart-wrapper__orders">
                <h2 className="chart-title text-h3">Количество (шт)</h2>
                <ResponsiveContainer width="100%" height={195}>
                    <BarChart data={weekOrders}>
                        <XAxis 
                            dataKey="day"
                            tick={{ fontSize: 11, textAnchor: 'middle' }}
                        />
                        <YAxis tick={{ fontSize: 11, textAnchor: 'end' }} />
                        <Tooltip 
                            itemStyle={{ fontSize: '14px' }}
                            contentStyle={{ backgroundColor: '#FEFEFE', padding: '10px', borderRadius: '10px' }}
                        />
                        <Bar
                            dataKey="count"
                            barSize={16}
                            name="Заказы (шт)"
                        >
                            {weekOrders.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getBarColor(entry.count, maxCount)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SellDynamicsCharts;
