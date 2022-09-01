import { format, Locale, parse } from 'date-fns';
import * as React from 'react';

import { DateFormatProps } from '@blueprintjs/datetime';

import { DateFormatSelector, DateFormatSelectorProps } from './dateFormatSelector';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const locales: { [localeCode: string]: Locale } = require('date-fns/locale');

export const DateFnsFormatSelector: React.FC<Omit<DateFormatSelectorProps, 'formatOptions'>> = (props) => {
    return (
        <DateFormatSelector
            formatOptions={DATE_FNS_FORMATS}
            label={
                <span>
                    <a href="https://date-fns.org/">date-fns</a> format
                </span>
            }
            {...props}
        />
    );
};

export const DATE_FNS_FORMATS: DateFormatProps[] = [
    getDateFnsFormatter('MM/dd/yyyy'),
    getDateFnsFormatter('yyyy-MM-dd'),
    getDateFnsFormatter('yyyy-MM-dd HH:mm:ss'),
    getDateFnsFormatter("LLL do, yyyy 'at' K:mm a"),
];

function getDateFnsFormatter(formatStr: string): DateFormatProps {
    return {
        formatDate: (date, localeCode: string) => format(date, formatStr, maybeGetLocaleOptions(localeCode)),
        parseDate: (str, localeCode: string) => parse(str, formatStr, new Date(), maybeGetLocaleOptions(localeCode)),
        placeholder: `${formatStr}`,
    };
}

function maybeGetLocaleOptions(localeCode: string): { locale: Locale } | undefined {
    if (locales[localeCode] !== undefined) {
        return { locale: locales[localeCode] };
    }
    return undefined;
}
