import { CreditCard, PieChart, TrendingUp, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SummaryCardsProps {
    totalBalance?: number;
    monthlyExpense?: number;
    savings?: number;
}

export function SummaryCards({ totalBalance = 0, monthlyExpense = 0, savings = 0 }: SummaryCardsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Balance Card */}
            <Card className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 via-white to-white dark:from-blue-900/20 dark:via-background dark:to-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:bg-blue-500/20" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Bakiye</CardTitle>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                        <Wallet className="h-5 w-5" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">₺{totalBalance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                    <p className="text-xs text-blue-500 font-medium mt-1">+2.5% geçen aydan</p>
                </CardContent>
            </Card>

            {/* Expense Card */}
            <Card className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 via-white to-white dark:from-rose-900/20 dark:via-background dark:to-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-rose-500/10 blur-2xl" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Bu Ay Harcama</CardTitle>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
                        <CreditCard className="h-5 w-5" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">₺{monthlyExpense.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                    <p className="text-xs text-rose-500 font-medium mt-1">+12% geçen aydan</p>
                </CardContent>
            </Card>

            {/* Savings Card */}
            <Card className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-white to-white dark:from-emerald-900/20 dark:via-background dark:to-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Tasarruf</CardTitle>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                        <TrendingUp className="h-5 w-5" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">₺{savings.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                    <p className="text-xs text-emerald-500 font-medium mt-1">+5% hedef</p>
                </CardContent>
            </Card>

            {/* Most Spent Card */}
            <Card className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/50 via-white to-white dark:from-violet-900/20 dark:via-background dark:to-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">En Çok Harcanan</CardTitle>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                        <PieChart className="h-5 w-5" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">-</div>
                    <p className="text-xs text-muted-foreground mt-1">Veri bekleniyor</p>
                </CardContent>
            </Card>
        </div>
    )
}
