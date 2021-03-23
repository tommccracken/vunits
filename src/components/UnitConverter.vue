<template>
  <div>
    <form>
      <label><b>Conversion quantity</b></label>
      <br />
      <select
        v-model="quantity"
        @change="updateUnitSelectOptions()"
        class="w-40"
      >
        <option v-for="quantityElement in quantities">
          {{ quantityElement }}
        </option>
      </select>
      <br />
      <br />
      <label><b>Input units</b></label>
      <br />
      <select v-model="inputUnit" @change="convertInput()" class="w-40">
        <option v-for="inputUnitElement in inputUnits">
          {{ inputUnitElement }}
        </option>
      </select>
      <br />
      <br />
      <label><b>Output units</b></label>
      <br />
      <select v-model="outputUnit" @change="convertInput()" class="w-40">
        <option v-for="outputUnitElement in outputUnits">
          {{ outputUnitElement }}
        </option>
      </select>
      <br />
      <br />
      <label><b>Input value</b></label>
      <br />
      <input
        v-model="inputValue"
        type="text"
        @input="convertInput()"
        class="w-40"
      />
      <br />
      <br />
      <label><b>Output value</b></label>
      <br />
      <label v-if="this.isValidInputValue()">
        {{ outputValue + " " + outputUnitSymbol }}
      </label>
      <label v-else>Invalid input value</label>
      <br />
      <div
        v-if="this.inputUnit !== this.outputUnit && this.isValidInputValue()"
      >
        <br />
        <label><b>Basis</b></label>
        <p class="whitespace-pre-wrap text-xs">
          {{
            getConversionBasis(this.quantity, this.inputUnit, this.outputUnit)
          }}
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import * as vunits from "../vunits-lib.js";

export default {
  data() {
    return {
      quantity: "length",
      inputUnit: "",
      inputUnitSymbol: "",
      outputUnitSymbol: "",
      outputUnit: "",
      inputValue: "1.0",
      outputValue: "",
      quantities: vunits.getQuantities(),
      inputUnits: "",
      outputUnits: "",
      baseUnit: "",
    };
  },

  methods: {
    updateUnitSelectOptions() {
      this.inputUnits = vunits.getUnits(this.quantity);
      this.inputUnit = this.inputUnits[0];
      this.outputUnits = vunits.getUnits(this.quantity);
      this.outputUnit = this.outputUnits[0];
      this.baseUnit = vunits.getBaseUnit(this.quantity);
      this.convertInput();
    },

    updateUnitSymbols() {
      this.inputUnitSymbol = vunits.getSymbol(this.quantity, this.inputUnit);
      this.outputUnitSymbol = vunits.getSymbol(this.quantity, this.outputUnit);
    },

    getConversionFactor(quantity, inputUnit, outputUnit) {
      return vunits.getConversionFactor(quantity, inputUnit, outputUnit, 20);
    },

    isValidInputValue() {
      if (!isNaN(Number(this.inputValue)) && this.inputValue !== "") {
        if (/\s/.test(this.inputValue)) {
          return false;
        }
        return true;
      } else return false;
    },
    getConversionBasis(quantity, inputUnit, outputUnit) {
      let basis = "";
      if (inputUnit !== outputUnit) {
        basis =
          basis +
          "1 " +
          vunits.getSymbol(quantity, inputUnit) +
          " is equivalent to " +
          vunits.getConversionFactor(quantity, inputUnit, outputUnit, 20) +
          " " +
          vunits.getSymbol(quantity, outputUnit) +
          " based on the following:";
        if (inputUnit !== vunits.getBaseUnit(quantity)) {
          basis =
            basis +
            "\n\n" +
            "Input unit (" +
            inputUnit +
            ") to base unit (" +
            vunits.getBaseUnit(quantity) +
            ") conversion factor: " +
            vunits.getUnitData(quantity, inputUnit)["base-factor"] +
            "\n" +
            "Reference: " +
            vunits.getUnitData(quantity, inputUnit).reference;
        }
        if (outputUnit !== vunits.getBaseUnit(quantity)) {
          basis =
            basis +
            "\n\n" +
            "Output unit (" +
            outputUnit +
            ") to base unit (" +
            vunits.getBaseUnit(quantity) +
            ") conversion factor: " +
            vunits.getUnitData(quantity, outputUnit)["base-factor"] +
            "\n" +
            "Reference: " +
            vunits.getUnitData(quantity, outputUnit).reference;
        }
        if (
          inputUnit !== vunits.getBaseUnit(quantity) &&
          outputUnit !== vunits.getBaseUnit(quantity)
        ) {
          basis =
            basis +
            "\n\n" +
            "Therefore calculated conversion factor = \n" +
            vunits.getUnitData(quantity, inputUnit)["base-factor"] +
            " / " +
            vunits.getUnitData(quantity, outputUnit)["base-factor"] +
            " = " +
            vunits.getConversionFactor(quantity, inputUnit, outputUnit, 20);
        }
        basis =
          basis +
          "\n\nWhere required, output values and calculated conversion factors are rounded to 20 significant figures"
      }
      return basis;
    },
    convertInput() {
      if (this.isValidInputValue()) {
        this.updateUnitSymbols();
        this.outputValue = vunits.convert(
          this.inputValue,
          this.quantity,
          this.inputUnit,
          this.outputUnit,
          20
        );
      }
    },
  },

  mounted() {
    this.updateUnitSelectOptions();
    this.updateUnitSymbols();
  },
};
</script>
