import { Format } from "./format.utils"

export class FormatTimestamp{

    static timestampToSeconds(timestamp){

        return parseInt((timestamp / 1000) % 60)
    
    }

    static timestampToMinutes(timestamp){

        return parseInt((timestamp/ (1000 * 60)) % 60)

    }

    static timestampToHours(timestamp){

        return parseInt((timestamp/ (1000 * 60 * 60)) % 24)
    }

    static toTime(duration){

        let seconds = FormatTimestamp.timestampToSeconds(duration)
        let minutes = FormatTimestamp.timestampToMinutes(duration)
        let hours = FormatTimestamp.timestampToHours(duration)

        const stringTime = hours > 0? `${hours}:${minutes}:${seconds.toString().padStart(2,'0')}`: `${minutes}:${seconds.toString().padStart(2,'0')}`

        return stringTime

    }


    static timestampToTime(timestamp){
        return (timestamp && typeof timestamp.toDate === 'function')? FormatTimestamp.dateToTime(timestamp.toDate()): ''
    }

    static dateToTime(date, locale = 'pt-BR'){

        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}