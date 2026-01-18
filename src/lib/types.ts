export type TransactionType = 'income' | 'expense';

export type Category = 'Faturalar' | 'Market' | 'Ulaşım' | 'Eğlence' | 'Diğer';
export type PaymentMethod = 'Nakit' | 'Kredi Kartı' | 'Banka Kartı';

export interface Transaction {
    id: string;
    user_id: string;
    amount: number;
    date: string; // ISO date string
    category: Category;
    payment_method: PaymentMethod;
    notes?: string;
    created_at: string;
}

export interface DashboardStats {
    totalBalance: number;
    monthlyExpense: number;
    percentageChange: number; // vs last month
    topCategory: string;
}