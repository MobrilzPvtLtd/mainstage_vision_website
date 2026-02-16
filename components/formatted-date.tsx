"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
    date: string | Date;
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
}

export function FormattedDate({
    date,
    locale = "nl-NL",
    options = { day: 'numeric', month: 'short', year: 'numeric' }
}: FormattedDateProps) {
    const [formatted, setFormatted] = useState<string>("");

    useEffect(() => {
        const dateObj = typeof date === "string" ? new Date(date) : date;
        if (!isNaN(dateObj.getTime())) {
            setFormatted(dateObj.toLocaleDateString(locale, options));
        }
    }, [date, locale, options]);

    // Return empty string or placeholder until hydrated to prevent removeChild mismatch
    return <>{formatted}</>;
}
