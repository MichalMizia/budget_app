export default function formatter(num){
    return new Intl.NumberFormat(undefined, {style: "currency", currency: "PLN", maximumFractionDigits: 0}).format(num)
}