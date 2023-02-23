
/**
 * 当前时间状态
 * @returns 
 */
export const timeState = () => {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
        return '早上好';
    } else if (hours > 10 && hours <= 14) {
        return '中午好';
    } else if (hours > 14 && hours <= 18) {
        return '下午好';
    } else if (hours > 18 && hours <= 24) {
        return '晚上好';
    }

    return '';
}