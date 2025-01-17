export type Nominee={
    id: number;
    nominee_code: string;
    nominee_status: string;
    full_name: string;
    stage_name: string | null;
    gender: string | null;
    phone: string | null;
    other_info: string | null;
    social_media: string | null;
    image: string;
    award_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
    votes:Vote;
}
export type Vote = {
    id: number;
    award_id: string;
    category_id: string;
    nominee_id: string;
    count: string;
    created_at: string;
    updated_at: string;
    nominee_code: string;
};

export type Category = {
    id: number;
    title: string;
    gender: 'male' | 'female' | null;
    is_active: string;
    award_id: string;
    created_at: string;
    updated_at: string;
};

export type Award = {
    title: string;
    start_date: string;
    end_date: string;
    award_prefix: string;
    price_per_vote: string;
    image: string;
    updated_at: string;
    created_at: string;
    id: number;
    bulk_votes: [];
    categories: Category[];
    nominees: Nominee[];
};
