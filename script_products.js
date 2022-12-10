// ------------  Function to clear all products from the page  -----------
clearList = () => {
    document.querySelectorAll('.productPlus').forEach(item => item.remove('li'));
    document.getElementById("inp").value = '';
}

// ================== Api array =================
let products = null;
const apiArray = async() => {
    try {
//         const response = await fetch('http://localhost:3000/products');
                const response = await fetch('https://dmytropv.github.io/Sorting-products-on-the-page-Form-for-adding-products/');
        
        if (response.ok) {
            const get_list = await response.json();
            products = get_list;
            console.log("~ result", "List uploaded successfully")
        }
    } catch (error) {
        console.log("~ error", 'The list has not been loaded!!!' + error);
    }
}

// ============================ OUTPUT allarray start ====================
function allarray() {
    products.forEach((e, i) => {
        let stroka = `<li class="productPlus" id=${products[i].id} > <img src="${products[i].img}" width="200" height="80">
                          <div><h4> Тип: ${products[i].type}. Категорія: ${products[i].category}. 
                          Сезон: ${products[i].season}. Стать: ${products[i].sex}.
                          </h4> ${products[i].description} </div></li>`;
        document.getElementById("lot1").innerHTML += stroka;
    })
}

function outputAll() {
    clearList();
    if (products === null) {
        apiArray()
            .then(s => {
                allarray();
            })
            .catch(error => {
                console.log(error);
                document.write(`Failed to load data! Reload the page... <br/><br/>`);
                document.write(error);
            });
    } else if (products !== null) {
        allarray();
    }
}

document.getElementById("allProds").addEventListener("click", outputAll);

outputAll();
// ------------------------------------------------------------------------------

let filterType = null;

document.addEventListener('change', badu);

// ================== Grouping function with tags for sorting ================= 
function gamburger_select() {

    const arrayTypSelect = [];
    const arrayCategorySelect = [];
    const arraySeasonSelect = [];
    const arraySexSelect = [];

    filterType.forEach((element, i) => {
        arrayTypSelect.push(filterType[i].type);
        arrayCategorySelect.push(filterType[i].category);
        arraySeasonSelect.push(filterType[i].season);
        arraySexSelect.push(filterType[i].sex);
    });

    // -----------------  Type select  -------------------
    const arrayTypSet = new Set(arrayTypSelect);
    const arrayTypTransform = [...arrayTypSet];

    // ---------------  Category select  -----------------
    const arrayCategorySet = new Set(arrayCategorySelect);
    const arrayCategoryTransform = [...arrayCategorySet];

    // ----------------  Season select  ------------------
    const arraySeasonSet = new Set(arraySeasonSelect);
    const arraySeasonTransform = [...arraySeasonSet];

    // ------------------  Sex select  -------------------
    const arraySexSet = new Set(arraySexSelect);
    const arraySexTransform = [...arraySexSet];

    filterType.forEach((e, i) => {

        // -------- Type select ---------
        const sortTypeSelekt = arrayTypTransform.filter(e => e !== filterType[i].type);
        let liteType = '';
        sortTypeSelekt.forEach((element, i) => {
            liteType += '<option value="' + sortTypeSelekt[i] + '">' + sortTypeSelekt[i] + '</option>';
        })
        const litlTypeOne = `<option> ${filterType[i].type} </option>`;
        let typeSelect = '<label>Тип: </label><select class="selectSort" id="idType">' + litlTypeOne + liteType + '</select>';

        // -------- Category select ------
        const sortCategorySelekt = arrayCategoryTransform.filter(e => e !== filterType[i].category);
        let liteCategory = '';
        sortCategorySelekt.forEach((element, i) => {
            liteCategory += '<option value="' + sortCategorySelekt[i] + '">' + sortCategorySelekt[i] + '</option>';
        })
        const litlCategoryOne = `<option> ${filterType[i].category} </option>`;
        let categorySelect = '<label>Категорія: </label><select class="selectSort" id="idCategory">' + litlCategoryOne + liteCategory + '</select>';

        // -------- Season select ------
        const sortSeasonSelekt = arraySeasonTransform.filter(e => e !== filterType[i].season);
        let liteSeason = '';
        sortSeasonSelekt.forEach((element, i) => {
            liteSeason += '<option value="' + sortSeasonSelekt[i] + '">' + sortSeasonSelekt[i] + '</option>';
        })
        const litlSeasonOne = `<option> ${filterType[i].season} </option>`;
        let seasonSelect = '<label>Сезон: </label><select class="selectSort" id="idSeason">' + litlSeasonOne + liteSeason + '</select>';

        // -------- Sex select ------
        const sortSexSelekt = arraySexTransform.filter(e => e !== filterType[i].sex);
        let liteSex = '';
        sortSexSelekt.forEach((element, i) => {
            liteSex += '<option value="' + sortSexSelekt[i] + '">' + sortSexSelekt[i] + '</option>';
        })
        const litlSexOne = `<option> ${filterType[i].sex} </option>`;
        let sexSelect = '<label>Стать: </label><select class="selectSort" id="idSex">' + litlSexOne + liteSex + '</select>';

        let typeOne = [];
        let categoryOne = [];
        let seasonOne = [];
        let sexOne = [];
        filterType.forEach((e, i) => {
            typeOne.push(filterType[i].type);
            categoryOne.push(filterType[i].category);
            seasonOne.push(filterType[i].season);
            sexOne.push(filterType[i].sex);
        });

        typeTwo = new Set(typeOne).size;
        categoryTwo = new Set(categoryOne).size;
        seasonTwo = new Set(seasonOne).size;
        sexTwo = new Set(sexOne).size;

        if (typeTwo < 3) {
            typeSelect = 'Тип: ' + filterType[i].type + '.' + '  ';
        }
        if (categoryTwo < 3) {
            categorySelect = 'Категорія: ' + filterType[i].category + '.' + '  ';
        }
        if (seasonTwo < 3) {
            seasonSelect = 'Сезон: ' + filterType[i].season + '.' + '  ';
        }
        if (sexTwo < 3) {
            sexSelect = 'Стать: ' + filterType[i].sex + '.' + '  ';
        }

        let header = typeSelect + ' ' + categorySelect + ' ' + seasonSelect + ' ' + sexSelect;

        let stroka = `<li class="productPlus" id=${filterType[i].id} > <img src="${filterType[i].img}" width="200" height="80">
        <div><h4>                 
        ${header}
        </h4> ${filterType[i].description} </div></li>`;
        document.getElementById("lot1").innerHTML += stroka;
    })
}
//====================== ACCORDION menu select out ===========================================
document.querySelector(".menuProd")
    .addEventListener('click', event => {
        if (event.target.className === 'name_Prods') { // Використано правильний метод делегування парента до елемента з подією
            namesort = event.target.getAttribute('data-name');
            clearList();
            filterType = products.filter((e, i) => e.type === namesort || e.category === namesort || e.season === namesort || e.sex === namesort);
            gamburger_select();
        }
    });

//==================== Function select sort  ===================
function badu(event) {
    if (event.target.className === "selectSort") {
        let targetSelect = event.target.value;
        const confirmSelect = alert('You have selected for sorting: ' + event.target.value);
        newfilterType = filterType.filter((e, i) => e.type === targetSelect || e.category === targetSelect || e.season === targetSelect || e.sex === targetSelect);
        filterType = newfilterType;
        clearList()
        gamburger_select()
    }
}

//============= Grouping function via input field  =============
function sort() {
    let oood = document.getElementById("inp").value;
    let inpnamePole = oood.toLowerCase().trim();
    if (inpnamePole !== '') {
        twofilterType = products.filter((e, i) => e.type === inpnamePole || e.category === inpnamePole || e.season === inpnamePole || e.sex === inpnamePole);
        filterType = twofilterType;
        clearList();
        gamburger_select();
    }
}

// ================  Menu accordion CSS  ===================
document.querySelectorAll(".accordion")
    .forEach((e) => {
        e.addEventListener('click', () => {
            // accordion.forEach(el => {el.classList.remove('show')});
            e.classList.toggle('show');
        });
    });

// ================================== Add products form ==========================================

// -------------- Add products form -------------
function openFormModal() {
    document.getElementById('boxModal').classList.toggle('open');
}

// --------------------- Form products property ------------------------
const form = document.getElementById("myForm");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var elements = document.getElementById("myForm").elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        if (elements.item(i).className !== 'btnModal') {
            var item = elements.item(i);
            obj[item.name] = item.value;
        }
    }
    let form_object = JSON.stringify(obj)
    fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: form_object
        })
        .then(response => response.json())
        .then(success => console.log("~ success", success))
         openFormModal()
        .catch(error => console.log("~ error", error));
});

// ================= Valid form  =========================
const btnSubmit = document.getElementById('btnModalok');
const formMost = document.getElementById('myForm');


// _____________________________ Input Category FORM ___________________________
function formCatgInpReg() {
    const inputCategory = document.getElementById('formNameprodid');
    const fCatReg = inputCategory.value;
    // document.forms["myForm"]["category"].value;
    const fCRegular = /^[a-zA-Zа-яА-ЯёЁІі]+$/;
    if (fCatReg.length >= 3 && fCatReg.match(fCRegular)) {
        inputCategory.setCustomValidity("");
        document.getElementById('formNameprodid').classList.remove('formInputRed');
        return true;
    } else {
        inputCategory.reportValidity();
        return false;
    }
}
document.getElementById('formNameprodid').addEventListener('input', formCatgInpReg)

function formCatgInpRegBlur() {
    const inputCategoryB = document.getElementById('formNameprodid');
    const fCatRegB = inputCategoryB.value;
    const fCRegularB = /^[a-zA-Zа-яА-ЯёЁІі]+$/;
    if (fCatRegB === '') {
        inputCategoryB.setCustomValidity("This field is required");
        inputCategoryB.reportValidity();
        return false;
    } else
    if (fCatRegB.length >= 1 && fCatRegB.length < 3) {
        inputCategoryB.setCustomValidity("Enter at least < 3 characters");
        inputCategoryB.reportValidity();
        return false;
    } else if (fCatRegB.length >= 3 && !fCatRegB.match(fCRegularB)) {
        inputCategoryB.setCustomValidity("Incorrect input!");
        inputCategoryB.reportValidity();
        document.getElementById('formNameprodid').classList.add('formInputRed');
        return false;
    }
}
document.getElementById('formNameprodid').addEventListener('blur', formCatgInpRegBlur)
    // _____________________________ Input Category FORM ___________________________

// _____________________________ Input Img FORM ___________________________
function formImgInpReg() {
    const inputImg = document.getElementById('formImgid');
    const fImgReg = inputImg.value;

    const fImgRegular = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (fImgReg.length >= 3 && fImgReg.match(fImgRegular)) {
        inputImg.setCustomValidity("");
        document.getElementById('formImgid').classList.remove('formInputRed');
        return true;
    } else {
        inputImg.reportValidity();
        return false;
    }
}
document.getElementById('formImgid').addEventListener('input', formImgInpReg)

function formImgInpRegBlur() {
    const inputImgB = document.getElementById('formImgid');
    const fImgRegB = inputImgB.value;
    const fImgRegularB = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (fImgRegB === '') {
        inputImgB.setCustomValidity("This field is required");
        inputImgB.reportValidity();
        return false;
    } else
    if (fImgRegB.length >= 1 && fImgRegB.length < 3) {
        inputImgB.setCustomValidity("Enter at least < 3 characters");
        inputImgB.reportValidity();
        return false;
    } else if (fImgRegB.length >= 3 && !fImgRegB.match(fImgRegularB)) {
        inputImgB.setCustomValidity("Incorrect input!");
        document.getElementById('formImgid').classList.add('formInputRed');
        return false;
    }
}
document.getElementById('formImgid').addEventListener('blur', formImgInpRegBlur)
    // _____________________________ Input Img FORM ___________________________

// _____________________________ Input Href FORM ___________________________
function formHrefInpReg() {
    const inputHref = document.getElementById('formHrefid');
    const fHrefReg = inputHref.value;

    const fHrefRegular = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (fHrefReg.length >= 3 && fHrefReg.match(fHrefRegular)) {
        inputHref.setCustomValidity("");
        document.getElementById('formHrefid').classList.remove('formInputRed');
        return true;
    } else {
        inputHref.reportValidity();
        return false;
    }
}
document.getElementById('formHrefid').addEventListener('input', formHrefInpReg)

function formHrefInpRegBlur() {
    const inputHrefB = document.getElementById('formHrefid');
    const fHrefRegB = inputHrefB.value;
    const fHrefRegularB = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (fHrefRegB === '') {
        inputHrefB.setCustomValidity("This field is required");
        inputHrefB.reportValidity();
        return false;
    } else
    if (fHrefRegB.length >= 1 && fHrefRegB.length < 3) {
        inputHrefB.setCustomValidity("Enter at least < 3 characters");
        inputHrefB.reportValidity();
        return false;
    } else if (fHrefRegB.length >= 3 && !fHrefRegB.match(fHrefRegularB)) {
        inputHrefB.setCustomValidity("Incorrect input!");
        document.getElementById('formHrefid').classList.add('formInputRed');
        return false;
    }
}
document.getElementById('formHrefid').addEventListener('blur', formHrefInpRegBlur)
    // _____________________________ Input Href FORM ___________________________

// _____________________________ Input Name FORM ___________________________
function formNameInpReg() {
    const inputName = document.getElementById('formName');
    const fNameReg = inputName.value;

    const fNameRegular = /^[a-zA-Zа-яА-ЯёЁІі]+$/;
    if (fNameReg.length >= 3 && fNameReg.match(fNameRegular)) {
        inputName.setCustomValidity("");
        document.getElementById('formName').classList.remove('formInputRed');
        return true;
    } else {
        inputName.reportValidity();
        return false;
    }
}
document.getElementById('formName').addEventListener('input', formNameInpReg)

function formNameInpRegBlur() {
    const inputNameB = document.getElementById('formName');
    const fNameRegB = inputNameB.value;
    const fNameRegularB = /^[a-zA-Zа-яА-ЯёЁІі]+$/;
    if (fNameRegB === '') {
        inputNameB.setCustomValidity("This field is required");
        inputNameB.reportValidity();
        return false;
    } else
    if (fNameRegB.length >= 1 && fNameRegB.length < 3) {
        inputNameB.setCustomValidity("Enter at least < 3 characters");
        inputNameB.reportValidity();
        return false;
    } else if (fNameRegB.length >= 3 && !fNameRegB.match(fNameRegularB)) {
        inputNameB.setCustomValidity("Incorrect input!");
        document.getElementById('formName').classList.add('formInputRed');
        return false;
    }
}
document.getElementById('formName').addEventListener('blur', formNameInpRegBlur)
    // _____________________________ Input Name FORM ___________________________

// // _____________________________ Input Phone FORM ___________________________
function formPhoneInpReg() {
    const inputPhone = document.getElementById('formPhone');
    const fPhoneReg = inputPhone.value.trim();

    const fPhoneRegular = /^(?=.*[0-9])[- +()0-9]{13,15}$/;
    if (fPhoneReg.length >= 3 && fPhoneReg.match(fPhoneRegular)) {
        inputPhone.setCustomValidity("");
        document.getElementById('formPhone').classList.remove('formInputRed');
        return true;
    } else {
        inputPhone.reportValidity();
        return false;
    }
}
document.getElementById('formPhone').addEventListener('input', formPhoneInpReg)

function formPhoneInpRegBlur() {
    const inputPhoneB = document.getElementById('formPhone');
    const fPhoneRegB = inputPhoneB.value.trim();
    const fPhoneRegularB = /^(?=.*[0-9])[- +()0-9]{13,15}$/;
    if (fPhoneRegB === '') {
        inputPhoneB.setCustomValidity("This field is required");
        inputPhoneB.reportValidity();
        return false;
    } else
    if (fPhoneRegB.length >= 1 && fPhoneRegB.length < 3) {
        inputPhoneB.setCustomValidity("Enter correct phone starting +380 or 0");
        inputPhoneB.reportValidity();
        return false;
    } else if (fPhoneRegB.length >= 3 && !fPhoneRegB.match(fPhoneRegularB)) {
        inputPhoneB.setCustomValidity("Incorrect input!");
        document.getElementById('formPhone').classList.add('formInputRed');
        return false;
    }
}
document.getElementById('formPhone').addEventListener('blur', formPhoneInpRegBlur)
      // _____________________________ Input Phone FORM ___________________________

// // _____________________________ Input Email FORM ___________________________
function formEmailInpReg() {
    const inputEmail = document.getElementById('formEmail');
    const fEmailReg = inputEmail.value.trim();

    const fEmailRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fEmailReg.length >= 3 && fEmailReg.match(fEmailRegular)) {
        inputEmail.setCustomValidity("");
        document.getElementById('formEmail').classList.remove('formInputRed');
        return true;
    } else {
        inputEmail.reportValidity();
        return false;
    }
}
document.getElementById('formEmail').addEventListener('input', formEmailInpReg)

function formEmailInpRegBlur() {
    const inputEmailB = document.getElementById('formEmail');
    const fEmailRegB = inputEmailB.value.trim();
    const fEmailRegularB = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fEmailRegB === '') {
        inputEmailB.setCustomValidity("This field is required");
        inputEmailB.reportValidity();
        return false;
    } else
    if (fEmailRegB.length >= 1 && fEmailRegB.length < 3) {
        inputEmailB.setCustomValidity("Enter valid email");
        inputEmailB.reportValidity();
        return false;
    } else if (fEmailRegB.length >= 3 && !fEmailRegB.match(fEmailRegularB)) {
        inputEmailB.setCustomValidity("Incorrect input!");
        document.getElementById('formEmail').classList.add('formInputRed');
        return false;
    }
}
document.getElementById('formEmail').addEventListener('blur', formEmailInpRegBlur)
    //     // _____________________________ Input Email FORM ___________________________

function validForm() {
    if (
        formCatgInpReg() &&
        formImgInpReg() &&
        formHrefInpReg() &&
        formNameInpReg() &&
        formPhoneInpReg() &&
        formEmailInpReg()
    ) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

formMost.addEventListener('mouseout', validForm)
