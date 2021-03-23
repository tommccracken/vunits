import conversions from "./vunits-conversions.json";
import big, { Big } from "big.js";

big.RM = 1;
big.DP = 30;
//big.strict = true;

export function getQuantities() {
    let quantities = [];
    for (let quantity in conversions.quantities) {
        quantities.push(quantity);
    }
    return quantities;
}

export function getUnits(quantity) {
    let units = [];
    try {
        for (let unit in conversions.quantities[quantity].units) {
            units.push(unit);
        }
        return units;
    } catch (err) { }
}

export function getBaseUnit(quantity) {
    return conversions.quantities[quantity]["base-unit"];
}

export function getSymbol(quantity, unit) {
    return conversions.quantities[quantity].units[unit].symbol;
}

export function getConversionFactor(quantity, fromUnit, toUnit, maxSF) {
    return getConversionFactorUnrounded(quantity, fromUnit, toUnit).prec(maxSF);
}

function getConversionFactorUnrounded(quantity, fromUnit, toUnit) {
    try {
        return new Big(conversions.quantities[quantity].units[fromUnit]["base-factor"]).div(new Big(conversions.quantities[quantity].units[toUnit]["base-factor"]));

    } catch (err) {
        console.error(err + " - Confirm that the quantity, fromUnit and toUnit are valid");
        if (conversions.quantities[quantity] === undefined) {
            console.log("Invalid quantity");
        }
        else {
            if (conversions.quantities[quantity].units[fromUnit] === undefined) {
                console.log("Invalid input units");
            }
            if (conversions.quantities[quantity].units[toUnit] === undefined) {
                console.log("Invalid output units");
            }
        }
    }
}

export function convert(value, quantity, fromUnit, toUnit, maxSF) {
    return convertUnrounded(value, quantity, fromUnit, toUnit).prec(maxSF);
}

function convertUnrounded(value, quantity, fromUnit, toUnit) {
    try {
        return new Big(value).mul(getConversionFactorUnrounded(quantity, fromUnit, toUnit));
    } catch (err) {
        console.error(err + " - Confirm that the input value is valid");
        if (isNaN(value)) {
            console.log("Invalid input value");
        }
    }
}

export function getUnitData(quantity, unit) {
    return {
        "base-factor": conversions.quantities[quantity].units[unit]["base-factor"],
        "symbol": conversions.quantities[quantity].units[unit]["symbol"],
        "reference": conversions.quantities[quantity].units[unit]["reference"]
    }
}
