import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Transaction } from "@/lib/types"

interface CategoryChartProps {
    transactions: Transaction[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function CategoryChart({ transactions }: CategoryChartProps) {
    // Group by category
    const data = transactions.reduce((acc, t) => {
        const existing = acc.find(i => i.name === t.category);
        if (existing) {
            existing.value += Number(t.amount);
        } else {
            acc.push({ name: t.category, value: Number(t.amount) });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    if (data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
                Veri yok
            </div>
        )
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₺${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}