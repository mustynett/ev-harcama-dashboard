import { CreditCard, PieChart, TrendingUp, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Props will eventually come from parent, but for now we can mock inside or accept props
interface SummaryCardsProps {
    totalBalance?: number;
    monthlyExpense?: number;
    savings?: number;
}

export function SummaryCards({ totalBalance = 0, monthlyExpense = 0, savings = 0 }: SummaryCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Toplam Bakiye</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₺{totalBalance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                    {/* <p className="text-xs text-muted-foreground">+20.1% geçen aydan</p> */}
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bu Ay Harcama</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₺{monthlyExpense.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasarruf (Tahmini)</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₺{savings.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En Çok Harcanan</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">Veri bekleniyor</p>
                </CardContent>
            </Card>
        </div>
    )
}
