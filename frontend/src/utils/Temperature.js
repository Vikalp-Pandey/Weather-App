export const getTemperature = (temp,unit) => {
    if(unit=="Celsius"){
         return temp
    }else if(unit=="Farenheit"){
        return (9/5)*temp + 32
    }
    return temp;
}