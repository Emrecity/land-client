type Pivot = {
    user_id: string;
    award_id: string;
};

type BulkVote = any; // Define the structure if available

 export type Award = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    status: string;
    image: string;
    award_prefix: string;
    price_per_vote: string;
    results: string;
    created_at: string;
    updated_at: string;
    rate: string;
    is_featured: boolean; // Converted to boolean
    allow_bulk_voting: boolean; // Converted to boolean
    bulk_votes: BulkVote[];
    pivot: Pivot;
};

export type TransactionItem = {
    id: number;
    user_id: string;
    nominee_id: string;
    award_id: string;
    user_code: string;
    nominee_code: string;
    ref_code: string;
    hubtel_transaction_id: string | null;
    external_transaction_id: string | null;
    payment_status: string;
    transaction_type: string; // Use a union type if possible, e.g., 'deposit' | 'withdrawal'
    payment_mode: string; // Use a union type if possible, e.g., 'momo' | 'credit_card'
    payment_action: string;
    payment_amount: string;
    deduction_rate: string;
    amount_deducted: string;
    amount_per_vote: string;
    number_of_votes: string;
    momo_number: string;
    description: string;
    withdrawal_status: string | null;
    created_at: string;
    updated_at: string;
    category_id: string;
    event_code: string | null;
    event_id: string | null;
    is_bulk_vote: string; 
};

export type Transaction = {
    deposits: number;
    withdrawals: string;
    award_balance: string;
    award: Award[];
    transactions: TransactionItem[];
};
