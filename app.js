
window.onload = function () {
    main()
}


const converter = {
    area: {
        name: "Area",
        units: {
            squareKm: 'Square Kilometer',
            squarcM: 'Square Meter',
            squareMile: 'Square Mile',
            squareYard: 'Square Yard',
            squareFoot: 'Square Foot',
        },
        variants: {
            'squareKm:squarcM': {
                formula: 'multiply the area value by 1000000',
                calculation(n) {
                    return n * 1000000;
                }
            },
            'squarcM:squareKm': {
                formula: 'divide the area value by 1e+6',
                calculation(n) {
                    return n / new Number('1e+6');
                },
                'squareKm:squareMile': {
                    formula: 'divide the area value by 2.59e+6',
                    calculation(n) {
                        return n / new Number('2.59e+6');
                    }
                },
                'squareKm:squareFoot': {
                    formula: 'Multipy the area value by 10760000',
                    calculation(n) {
                        return n * 10760000;
                    }
                },
                'squareKm:squareFoot': {
                    formula: 'Multipy the area value by 10760000',
                    calculation(n) {
                        return n * 10760000;
                    }
                },

            },


            'squarcM:squareKm': {
                formula: 'divide the area value by 1e+6',
                calculation(n) {
                    return n / new Number('1e+6');
                }
            },
            'squarcM:squareMile': {
                formula: 'divide the area value by 2.59e+6',
                calculation(n) {
                    return n / new Number('2.59e+6');
                }
            },
            'squarcM:squareYard': {
                formula: 'Multipy the area value by 1.195',
                calculation(n) {
                    return n * 1.195;
                }
            },
            'squarcM:squareFoot': {
                formula: 'Multipy the area value by 18.764',
                calculation(n) {
                    return n * 18.764;
                }
            },



            'squareMile:squareKm': {
                formula: 'Multipy the area value by 2.59',
                calculation(n) {
                    return n * 2.59;
                }
            },
            'squareMile:squareMile': {
                formula: 'Multipy the area value by 2.59e+6',
                calculation(n) {
                    return n * new Number('2.59e+6');
                }
            },
            'squareMile:squareYard': {
                formula: 'for an approximate result, Multipy the area value by 3.098e+6',
                calculation(n) {
                    return n * new Number('3.098e+6');
                }
            },
            'squareMile:squareFoot': {
                formula: 'for an approximate result, Multipy the area value by 2.788e+7',
                calculation(n) {
                    return n / new Number('2.788e+7');
                }
            },



            'squareYard:squareKm': {
                formula: 'divide the area value by 1.196e+6',
                calculation(n) {
                    return n / new Number('1.196e+6');
                }
            },
            'squareYard:squarcM': {
                formula: 'divide the area value by 1.196',
                calculation(n) {
                    return n / 1.196;
                }
            },
            'squareYard:squareMile': {
                formula: 'for an approximate result,divide the area value by 3.098e+6',
                calculation(n) {
                    return n / new Number('3.098e+6');
                }
            },
            'squareYard:squareFoot': {
                formula: 'Multipy the area value by 9',
                calculation(n) {
                    return n * 9;
                }
            },



            'squareFoot:squareKm': {
                formula: 'for an approximate result,divide the area value by 1.076+7',
                calculation(n) {
                    return n / new Number('1.076+7');
                }
            },
            'squareFoot:squarcM': {
                formula: 'divide the area value by 10.764',
                calculation(n) {
                    return n / 10.764;
                }
            },
            'squareFoot:squareMile': {
                formula: 'for an approximate result,divide the area value by 2.788e+7',
                calculation(n) {
                    return n / new Number('2.788e+7');
                }
            },
            'squareFoot:squareYard': {
                formula: 'divide the area value by 9',
                calculation(n) {
                    return n / new Number('9');
                }
            },
        }
    },


    mass: {
        name: "Mass",
        units: {
            tonne: 'Tone',
            kilogram: 'Kilogram',
            gram: 'Gram',
            milligram: 'Milligram'
        },
    },
    length: {
        name: "Length",
        units: {
            kilometer: 'Kilometer',
            meter: 'Meter',
            centimeter: 'Centimeter',
            millimeter: 'Millimeter'
        },
    },
    time: {
        name: "Time",
        units: {
            second: 'Second',
            minute: 'Minute',
            hour: "Hour",
            day: 'Day'
        }
    },
};

let lastLeftSelectedValue = '';
let lastRightSelectedValue = '';


function main() {
    const categorySelect = document.getElementById('category-select');
    const leftInput = document.getElementById('left-inp');
    const rightInput = document.getElementById('right-inp');
    const leftSelect = document.getElementById('left-select');
    const rightSelect = document.getElementById('right-select');
    const formulaText = document.getElementById('formula-text');

    const coveterKeys = Object.keys(converter).sort();
    removeAllChild(categorySelect);
    coveterKeys.forEach((item) => {
        addOption(categorySelect, { value: item, text: converter[item].name })
    });

    //set default category units
    updateCategoryChanges(categorySelect, leftSelect, rightSelect);


    const converterName = categorySelect.value;
    const variants = converter[converterName].variants;
    const variantKey = `${leftSelect.value}:${rightSelect.value}`;
    const variant = variants[variantKey];
    formulaText.innerText = variant.formula


    leftInput.value = 1
    rightInput.value = variant.calculation(1)


    categorySelect.addEventListener('change', function () {
        updateCategoryChanges(categorySelect, leftSelect, rightSelect);
    });


    leftSelect.addEventListener('change', function (event) {
        if (event.target.value === rightSelect.value) {
            const options = rightSelect.getElementsByTagName('option');
            for (let i = 0; i < options.length; i++) {
                if (lastLeftSelectedValue === options[i].value) {
                    options[i].selected = 'selected';
                    lastRightSelectedValue = options[i].value;
                    break;
                }
            }
        }
        lastLeftSelectedValue = event.target.value;
    });



    rightSelect.addEventListener('change', function (event) {
        if (event.target.value === leftSelect.value) {
            const options = leftSelect.getElementsByTagName('option');
            for (let i = 0; i < options.length; i++) {
                if (lastRightSelectedValue === options[i].value) {
                    options[i].selected = 'selected';
                    lastLeftSelectedValue = options[i].value;
                    break;
                }
            }
        }
        lastRightSelectedValue = event.target.value;
    });



    rightSelect.addEventListener('change', function (event) {

    })

}

function addOption(parent, option) {
    const opt = document.createElement('option');
    opt.setAttribute('value', option.value);
    opt.innerText = option.text;


    parent.appendChild(opt)
}


function removeAllChild(parent) {
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
}


function updateCategoryChanges(categorySelect, leftSelect, rightSelect) {
    const converterName = categorySelect.value;
    const units = converter[converterName].units;
    const options = Object.keys(units);

    //handel left select
    removeAllChild(leftSelect);
    options.forEach((item) => {
        addOption(leftSelect, { value: item, text: units[item] })
    });

    lastLeftSelectedValue = leftSelect.value;

    //handel right select
    removeAllChild(rightSelect);
    options.forEach((item) => {
        addOption(rightSelect, { value: item, text: units[item] })
    });

    //change default option of right select
    rightSelect.getElementsByTagName('option')[1].selected = 'selected';

    lastRightSelectedValue = rightSelect.value;
};

function calculateValue() {

}