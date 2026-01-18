import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Category, PaymentMethod } from "@/lib/types"

interface TransactionFormProps {
    onSubmit: (data: any) => Promise<void>;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
    const [date, setDate] = useState<Date>()
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState<Category | "">("")
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("")
    const [notes, setNotes] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!date || !amount || !category || !paymentMethod) return

        setLoading(true)
        try {
            await onSubmit({
                amount: parseFloat(amount),
                date: date.toISOString(),
                category,
                payment_method: paymentMethod,
                notes
            })
            // Reset form
            setAmount("")
            setCategory("")
            setPaymentMethod("")
            setNotes("")
            setDate(undefined)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="amount">Tutar</Label>
                <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="text-lg font-medium"
                />
            </div>

            <div className="space-y-2">
                <Label>Tarih</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Tarih seçin</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Faturalar">Faturalar</SelectItem>
                        <SelectItem value="Market">Market</SelectItem>
                        <SelectItem value="Ulaşım">Ulaşım</SelectItem>
                        <SelectItem value="Eğlence">Eğlence</SelectItem>
                        <SelectItem value="Diğer">Diğer</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="payment">Ödeme Yöntemi</Label>
                <Select value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Ödeme yöntemi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Nakit">Nakit</SelectItem>
                        <SelectItem value="Kredi Kartı">Kredi Kartı</SelectItem>
                        <SelectItem value="Banka Kartı">Banka Kartı</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                    id="notes"
                    placeholder="İsteğe bağlı not..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kaydediliyor...
                    </>
                ) : (
                    "Kaydet"
                )}
            </Button>
        </form>
    )
}
