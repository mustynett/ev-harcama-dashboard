import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Transaction } from "@/lib/types"

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (error) throw error
            setTransactions(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'user_id'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("User not authenticated")

            const { error } = await supabase.from('transactions').insert({
                ...transaction,
                user_id: user.id
            })
            if (error) throw error
            await fetchTransactions()
        } catch (err: any) {
            console.error("Error adding transaction:", err)
            throw err
        }
    }

    const deleteTransaction = async (id: string) => {
        try {
            const { error } = await supabase.from('transactions').delete().eq('id', id)
            if (error) throw error
            await fetchTransactions()
        } catch (err: any) {
            console.error("Error deleting transaction:", err)
            throw err
        }
    }

    useEffect(() => {
        fetchTransactions()

        // Subscribe to changes
        const channel = supabase
            .channel('transactions_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
                fetchTransactions()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return { transactions, loading, error, addTransaction, deleteTransaction, refresh: fetchTransactions }
}
