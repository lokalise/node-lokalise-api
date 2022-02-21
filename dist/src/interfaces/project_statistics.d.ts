export interface ProjectStatistics {
    progress_total: number;
    keys_total: number;
    team: number;
    base_words: number;
    qa_issues_total: number;
    qa_issues: {
        not_reviewed: number;
        unverified: number;
        spelling_grammar: number;
        inconsistent_placeholders: number;
        inconsistent_html: number;
        different_number_of_urls: number;
        different_urls: number;
        leading_whitespace: number;
        trailing_whitespace: number;
        different_number_of_email_address: number;
        different_email_address: number;
        different_brackets: number;
        different_numbers: number;
        double_space: number;
        special_placeholder: number;
        unbalanced_brackets: number;
    };
    languages: Array<{
        language_id: number;
        language_iso: string;
        progress: number;
        words_to_do: number;
    }>;
}
