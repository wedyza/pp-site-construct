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

const SellDynamicsCharts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.sellDynamics);

    useEffect(() => {
        dispatch(fetchSellDynamics());
    }, [dispatch]);

    if (!data) return null;

    const profits = data.order_profits;
    const orders = data.order_counts;
    const colors = ["#CD1E0E80", "#FFA60080", "#3ACD0E80"];

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
                    <BarChart data={orders}>
                        <XAxis 
                            dataKey="created_at__date"
                            tick={{ fontSize: 11, textAnchor: 'end' }}
                        />
                        <YAxis tick={{ fontSize: 11, textAnchor: 'end' }} />
                        <Tooltip 
                            itemStyle={{ fontSize: '14px' }}
                            contentStyle={{ backgroundColor: '#FEFEFE', padding: '10px', borderRadius: '10px' }}
                        />
                        <Bar
                            type="monotone"
                            dataKey="count"
                            barSize={16}
                            name="Заказы (шт)"
                        >
                            {orders.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SellDynamicsCharts;
