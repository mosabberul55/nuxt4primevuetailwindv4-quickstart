import moment from 'moment';

export const formatDateTime = (dateTime: string, ll: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(dateTime).format(ll);
};