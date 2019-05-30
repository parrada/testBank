export const Config = {
    minAge :18,
    antiquityTime : 18,
    creditRanges : {
        minSalary :800000,
        range1: {
            min : this.minSalary,
            max : 1000000
        },
        range2: {
            min : 1000000,
            max : 4000000
        },
        range3: {
            min : 4000000,
        }
    },
    approvedCreditNumber : {
        range1 : '5.000.000',
        range2 : '20.000.000',
        range3 : '50.000.000'
    }
}