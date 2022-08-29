import classNames from 'classnames';
import moment from 'moment';
import * as React from 'react';

import { Icon, Intent, Props, Tag } from '@blueprintjs/core';
import { DateRange } from '@blueprintjs/datetime';

const FORMAT = 'dddd, LL';
const FORMAT_TIME = 'dddd, LL LT';

export const MomentDate: React.FC<{ date: Date | null; format?: string; withTime?: boolean }> = ({
    date,
    withTime = false,
    format = withTime ? FORMAT_TIME : FORMAT,
}) => {
    const m = moment(date);
    if (m.isValid()) {
        return <Tag intent={Intent.PRIMARY}>{m.format(format)}</Tag>;
    } else {
        return <Tag minimal={true}>no date</Tag>;
    }
};
