import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Transaction } from "@/lib/types"

interface RecentTransactionsProps {
    transactions: Transaction[]
    onDelete: (id: string) => void
}

export function RecentTransactions({ transactions, onDelete }: RecentTransactionsProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Not</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead className="text-right">Tutar</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((t) => (
                        <TableRow key={t.id}>
                            <TableCell className="font-medium">{t.category}</TableCell>
                            <TableCell className="text-muted-foreground truncate max-w-[150px]">{t.notes || "-"}</TableCell>
                            <TableCell>{format(new Date(t.date), "d MMM yyyy", { locale: tr })}</TableCell>
                            <TableCell className="text-right font-bold">
                                ₺{t.amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => onDelete(t.id)} className="h-8 w-8 text-destructive hover:text-destructive/90">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {transactions.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                Henüz işlem yok.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}