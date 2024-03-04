
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
            'squareKm:squareMile': {
                formula: 'divide the area value by 2.59',
                calculation(n) {
                    return n / 2.59;
                }
            },
            'squareKm:squareYard': {
                formula: 'Multipy the area value by 1196000',
                calculation(n) {
                    return n * 1196000;
                }
            },
            'squareKm:squareFoot': {
                formula: 'Multipy the area value by 10760000',
                calculation(n) {
                    return n * 10760000;
                }
            },

            'squarcM:squareKm': {},
            'squarcM:squareMile': {},
            'squarcM:squareYard': {},
            'squarcM:squareFoot': {},

            'squareMile:squareKm': {},
            'squareMile:squareMile': {},
            'squareMile:squareYard': {},
            'squareMile:squareFoot': {},

            'squareYard:squareKm': {},
            'squareYard:squarcM': {},
            'squareYard:squareMile': {},
            'squareYard:squareFoot': {},

            'squareFoot:squareKm': {},
            'squareFoot:squarcM': {},
            'squareFoot:squareMile': {},
            'squareFoot:squareFoot': {},
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
    const leftSelect = document.getElementById('left-select');
    const rightSelect = document.getElementById('right-select');

    const coveterKeys = Object.keys(converter).sort();
    removeAllChild(categorySelect);
    coveterKeys.forEach((item) => {
        addOption(categorySelect, { value: item, text: converter[item].name })
    });

    //set default category units
    updateCategoryChanges(categorySelect, leftSelect, rightSelect);

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