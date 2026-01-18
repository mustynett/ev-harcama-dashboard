import { useEffect, useState } from 'react'
import { Bell, LayoutDashboard, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TransactionForm } from '@/components/dashboard/TransactionForm'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { CategoryChart } from '@/components/dashboard/CategoryChart'
import { useTransactions } from '@/hooks/useTransactions'
import { LoginForm } from '@/components/LoginForm'
import { supabase } from '@/lib/supabase'

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions()
  const [userEmail, setUserEmail] = useState<string>("")
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setUserEmail(data.user.email)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || "")
      if (session?.user) {
        setShowLoginModal(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalSpentThisMonth = thisMonthTransactions.reduce((acc, t) => acc + Number(t.amount), 0);


  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-lg md:text-xl text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          Ev Harcama
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          {userEmail ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline-block font-medium text-sm">{userEmail}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => supabase.auth.signOut()}
                className="text-muted-foreground hover:text-destructive"
              >
                Çıkış
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline-block font-medium">Misafir</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">

        {/* Top Summary Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Genel Bakış</h2>
            {!userEmail && (
              <Button onClick={() => setShowLoginModal(true)}>Giriş Yap</Button>
            )}
          </div>
          <SummaryCards
            monthlyExpense={totalSpentThisMonth}
            totalBalance={0} // Not tracked
            savings={0} // Not tracked
          />
        </section>

        {/* Main Grid: Form (Left) vs Charts/List (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Transaction Form */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <Card className="rounded-2xl border border-indigo-100 shadow-xl bg-white dark:bg-card/50 dark:border-indigo-900/20">
              <CardHeader>
                <CardTitle>Harcama Ekle</CardTitle>
                <CardDescription>Yeni bir işlem kaydedin.</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionForm onSubmit={async (data) => {
                  await addTransaction(data)
                }} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Charts & Recent Transactions */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 dark:border-slate-800">
                <CardHeader>
                  <CardTitle>Kategori Dağılımı</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryChart transactions={thisMonthTransactions} />
                </CardContent>
              </Card>
              <Card className="rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 dark:border-slate-800">
                <CardHeader>
                  <CardTitle>Aylık Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-muted/20 rounded-md text-muted-foreground text-sm">
                    (Çizgi Grafik Yakında)
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Son İşlemler</CardTitle>
                  <CardDescription>En son yapılan 5 işlem.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <RecentTransactions
                  transactions={transactions.slice(0, 5)}
                  onDelete={deleteTransaction}
                />
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 bg-white shadow-md hover:bg-slate-100"
              onClick={() => setShowLoginModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <LoginForm onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
