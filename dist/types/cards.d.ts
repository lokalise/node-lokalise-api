export type CreateCardParams = {
    number: string;
    cvc: string | number;
    exp_month: string | number;
    exp_year: string | number;
};
export type CardDeleted = {
    card_id: string;
    card_deleted: boolean;
};
