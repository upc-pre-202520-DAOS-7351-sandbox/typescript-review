import {Currency} from "./shared/domain/model/currency";

console.log('Happy developing ✨')

try{
    // Scenario 1: Real-time registration with USD and current date
    const usdCurrencyCode = "USD" as const;
    const usdCurrency = new Currency(usdCurrencyCode);
    console.log(usdCurrency.toString());

} catch(e){
    console.log(e);
}