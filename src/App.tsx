import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'
import { Button } from './components/ui/button'
import { useTransactions } from './hooks/useTransactions'
import { SummaryCards } from './components/dashboard/SummaryCards'
import { TransactionForm } from './components/dashboard/TransactionForm'
import { CategoryChart } from './components/dashboard/CategoryChart'
import { RecentTransactions } from './components/dashboard/RecentTransactions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Separator } from './components/ui/separator'
import { Loader2, LogOut, Wallet } from 'lucide-react'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const { transactions, loading: transactionsLoading, addTransaction, deleteTransaction } = useTransactions()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    // For demo purposes, we'll try to sign in with a demo account or sign up
    // In a real app, you'd have a proper auth form
    const email = prompt("E-posta adresiniz:")
    const password = prompt("Şifreniz:")

    if (email && password) {
      const { error } = await supabase.auth.signInWithPassword({
         email,
         password
      })
      if (error) {
        // Try sign up if sign in fails
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password
        })
        if (signUpError) alert(signUpError.message)
        else alert("Kayıt olundu! Lütfen e-postanızı onaylayın veya giriş yapın (Supabase ayarlarınıza bağlı).")
      }
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // Calculate stats
  const totalBalance = 25000 - transactions.reduce((acc, t) => acc + Number(t.amount), 0); // Mock starting balance
  const monthlyExpense = transactions.reduce((acc, t) => acc + Number(t.amount), 0);
  const savings = totalBalance * 0.15; // Mock savings calculation

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>Ev Harcama Dashboard'una erişmek için giriş yapın.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full">Giriş Yap / Kayıt Ol</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Harcama Takip</h1>
              <p className="text-muted-foreground">Finansal durumunuzu kontrol altına alın.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:inline-block">{session.user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </div>
        </div>

        <Separator />

        {/* Summary Cards */}
        <SummaryCards
          totalBalance={totalBalance}
          monthlyExpense={monthlyExpense}
          savings={savings}
        />

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-12">
          {/* Left Column: Form */}
          <div className="md:col-span-4 lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Harcama Ekle</CardTitle>
                <CardDescription>Yeni bir işlem kaydı oluşturun.</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionForm onSubmit={addTransaction} />
              </CardContent>
            </Card>
          </div>

           {/* Right Column: Charts & List */}
           <div className="md:col-span-8 lg:col-span-9 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                   <CardHeader>
                    <CardTitle>Kategori Dağılımı</CardTitle>
                   </CardHeader>
                   <CardContent>
                    <CategoryChart transactions={transactions} />
                   </CardContent>
                </Card>
                <Card>
                   <CardHeader>
                    <CardTitle>Son İşlemler</CardTitle>
                   </CardHeader>
                   <CardContent>
                     {transactionsLoading ? (
                       <div className="h-64 flex items-center justify-center">
                         <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                       </div>
                     ) : (
                        <RecentTransactions transactions={transactions} onDelete={deleteTransaction} />
                     )}
                   </CardContent>
                </Card>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default App