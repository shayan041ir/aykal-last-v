const handleThemeUpdate = (cssVars) => {
    const root = document.querySelector(':root');
    const keys = Object.keys(cssVars);
    keys.forEach(key => {
        root.style.setProperty(key, cssVars[key]);
    });
}

function dynamicPrimaryColor(primaryColor) {
    'use strict'

    primaryColor.forEach((item) => {
        item.addEventListener('input', (e) => {
            const cssPropName = `--primary-${e.target.getAttribute('data-id')}`;
            const cssPropName1 = `--primary-${e.target.getAttribute('data-id1')}`;
            const cssPropName2 = `--primary-${e.target.getAttribute('data-id2')}`;
            handleThemeUpdate({
                [cssPropName]: e.target.value,
                // 95 is used as the opacity 0.95
                [cssPropName1]: e.target.value + 95,
                [cssPropName2]: e.target.value,
            });
        });
    });
}
function dynamicBackgroundColor(BackgroundColor) {
    'use strict'

    BackgroundColor.forEach((item) => {
        item.addEventListener('input', (e) => {
            const cssPropName = `--dark-${e.target.getAttribute('data-id3')}`;
            const cssPropName1 = `--dark-${e.target.getAttribute('data-id4')}`;
            handleThemeUpdate({
                [cssPropName]: e.target.value + 'dd',
                [cssPropName1]: e.target.value,
            });
        });
    });
}

(function() {
    'use strict'

    // Light theme color picker
    const dynamicPrimaryLight = document.querySelectorAll('input.color-primary-light');
    const dynamicBgColor = document.querySelectorAll('input.background-primary-light');

    // themeSwitch(LightThemeSwitchers);
    dynamicPrimaryColor(dynamicPrimaryLight);
    dynamicBackgroundColor(dynamicBgColor);

    localStorageBackup();

})();

function localStorageBackup() {
    'use strict'

    // if there is a value stored, update color picker and background color
    // Used to retrive the data from local storage
    if (localStorage.AdminorprimaryColor) {
        // document.getElementById('colorID').value = localStorage.AdminorprimaryColor;
        document.querySelector('html').style.setProperty('--primary-bg-color', localStorage.AdminorprimaryColor);
        document.querySelector('html').style.setProperty('--primary-bg-hover', localStorage.AdminorprimaryHoverColor);
        document.querySelector('html').style.setProperty('--primary-bg-border', localStorage.AdminorprimaryBorderColor);
    }

    if (localStorage.AdminorbgColor) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        $('#myonoffswitch2').prop('checked', true);
        $('#myonoffswitch5').prop('checked', true);
        $('#myonoffswitch8').prop('checked', true);
        // document.getElementById('bgID').value = localStorage.AdminorthemeColor;
        document.querySelector('html').style.setProperty('--dark-body', localStorage.AdminorbgColor);
        document.querySelector('html').style.setProperty('--dark-theme', localStorage.AdminorthemeColor);
    }
    if(localStorage.AdminorlightMode){
        document.querySelector('body')?.classList.add('light-theme');
		document.querySelector('body')?.classList.remove('dark-theme');
    }
    
    if(localStorage.AdminordarkMode){
        document.querySelector('body')?.classList.add('dark-theme');
        document.querySelector('body')?.classList.remove('light-theme');
    }
    if(localStorage.Adminorhorizontal){
        document.querySelector('body').classList.add('horizontal')
    }
    if(localStorage.AdminorhorizontalHover){
        document.querySelector('body').classList.add('horizontal-hover')
    }
    if(localStorage.Adminorrtl){
        document.querySelector('body').classList.add('rtl')
    }

    if(localStorage.Adminorclosedmenu){
        document.querySelector('body').classList.add('closed-menu')
    }

    if(localStorage.Adminoricontextmenu){
        document.querySelector('body').classList.add('icontext-menu')
    }

    if(localStorage.Adminorsideiconmenu){
        document.querySelector('body').classList.add('sideicon-menu')
    }

    if(localStorage.Adminorhoversubmenu){
        document.querySelector('body').classList.add('hover-submenu')
    }

    if(localStorage.Adminorhoversubmenu1){
        document.querySelector('body').classList.add('hover-submenu1')
    }
    if(localStorage.Adminordoublemenu){
        document.querySelector('body').classList.add('double-menu')
    }

    if(localStorage.Adminordoublemenutabs){
        document.querySelector('body').classList.add('double-menu-tabs')
    }

    if(localStorage.Adminorbodystyle){
        document.querySelector('body').classList.add('body-style1')
    }

    if(localStorage.Adminorboxedwidth){
        document.querySelector('body').classList.add('layout-boxed')
    }

    if(localStorage.Adminorscrollable){
        document.querySelector('body').classList.add('scrollable-layout')
    }

    if(localStorage.Adminorlightmenu){
        document.querySelector('body').classList.add('light-menu')
    }

    if(localStorage.Adminorcolormenu){
        document.querySelector('body').classList.add('color-menu')
    }

    if(localStorage.Adminorgradientmenu){
        document.querySelector('body').classList.add('gradient-menu')
    }

    if(localStorage.Adminordarkmenu){
        document.querySelector('body').classList.add('dark-menu')
    }

    if(localStorage.Adminorlightheader){
        document.querySelector('body').classList.add('light-header')
    }


    if(localStorage.Adminorgradientheader){
        document.querySelector('body').classList.add('gradient-header')
    }

    if(localStorage.Adminorcolorheader){
        document.querySelector('body').classList.add('color-header')
    }

    if(localStorage.Adminordarkheader){
        document.querySelector('body').classList.add('dark-header')
    }
	// Boxed style
	if (document.querySelector('body').classList.contains('layout-boxed')) {
		$('#myonoffswitch10').prop('checked', true);
	}
	// scrollable-layout style
	if (document.querySelector('body').classList.contains('scrollable-layout')) {
		$('#myonoffswitch12').prop('checked', true);
	}
	// closed-menu style
	if (document.querySelector('body').classList.contains('closed-menu')) {
		$('#myonoffswitch30').prop('checked', true);
	}
	// icontext-menu style
	if (document.querySelector('body').classList.contains('icontext-menu')) {
		$('#myonoffswitch14').prop('checked', true);
	}
	// iconoverlay-menu style
	if (document.querySelector('body').classList.contains('sideicon-menu')) {
		$('#myonoffswitch15').prop('checked', true);
	}
	// hover-submenu style
	if (document.querySelector('body').classList.contains('hover-submenu')) {
		$('#myonoffswitch32').prop('checked', true);
	}
	// hover-submenu1 style
	if (document.querySelector('body').classList.contains('hover-submenu1')) {
		$('#myonoffswitch33').prop('checked', true);
	}
}

// triggers on changing the color picker
function changePrimaryColor() {
    'use strict';
    checkOptions();

    var userColor = document.getElementById('colorID').value;
    localStorage.setItem('AdminorprimaryColor', userColor);
    // to store value as opacity 0.95 we use 95
    localStorage.setItem('AdminorprimaryHoverColor', userColor + 95);
    localStorage.setItem('AdminorprimaryBorderColor', userColor);

    names()
}
// triggers on changing the color picker
function changeBackgroundColor() {

    var userColor = document.getElementById('bgID').value;
    localStorage.setItem('AdminorbgColor', userColor + 'dd');
    localStorage.setItem('AdminorthemeColor', userColor);
    names()

    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    $('#myonoffswitch2').prop('checked', true);
    $('#myonoffswitch5').prop('checked', true);
    $('#myonoffswitch8').prop('checked', true);

    localStorage.setItem("AdminordarkMode", true);
    names();
  }


// to check the value is hexa or not
const isValidHex = (hexValue) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue)

const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
    // convert hex value to 256
const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)
    // get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a, alpha) => {
        if (typeof a !== "undefined") { return a / 255 }
        if ((typeof alpha != "number") || alpha < 0 || alpha > 1) {
            return 1
        }
        return alpha
    }
    // convertion of hex code to rgba code
function hexToRgba(hexValue, alpha) {
    'use strict'

    if (!isValidHex(hexValue)) { return null }
    const chunkSize = Math.floor((hexValue.length - 1) / 3)
    const hexArr = getChunksFromString(hexValue.slice(1), chunkSize)
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
    return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`
}


let myVarVal

function names() {
    'use strict'

    let primaryColorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg-color').trim();

    //get variable
    myVarVal = localStorage.getItem("AdminorprimaryColor")  || primaryColorVal;
    // index charts
    if(document.querySelector('#chart-1') !== null){
        chart();
    }
    if(document.querySelector('#project-budget') !== null){
        project();
    }
    
    // index2 charts
    if(document.querySelector('#sales-budaget') !== null){
        sales();
    }
    if(document.querySelector('#chart-pai') !== null){
        chartpai();
    }
    // index3 charts
    if(document.querySelector('#growthcompany') !== null){
        growthcompany();
    }
    if(document.querySelector('#chart-company') !== null){
        chartcompany();
    }

    // index4 charts
    if(document.querySelector('#cryptochart') !== null){
        cryptochart();
    }

    // index4 charts
    if(document.querySelector('#chart-eco') !== null){
        charteco();
    }

    let colorData1 = hexToRgba(myVarVal || primaryColorVal , 0.1)
    document.querySelector('html').style.setProperty('--primary01', colorData1);

    let colorData2 = hexToRgba(myVarVal || primaryColorVal , 0.2)
    document.querySelector('html').style.setProperty('--primary02', colorData2);

    let colorData3 = hexToRgba(myVarVal || primaryColorVal , 0.3)
    document.querySelector('html').style.setProperty('--primary03', colorData3);

    let colorData4 = hexToRgba(myVarVal || primaryColorVal , 0.4)
    document.querySelector('html').style.setProperty('--primary04', colorData4);

    let colorData5 = hexToRgba(myVarVal || primaryColorVal , 0.5)
    document.querySelector('html').style.setProperty('--primary05', colorData5);

    let colorData6 = hexToRgba(myVarVal || primaryColorVal , 0.6)
    document.querySelector('html').style.setProperty('--primary06', colorData6);

    let colorData7 = hexToRgba(myVarVal || primaryColorVal , 0.7)
    document.querySelector('html').style.setProperty('--primary07', colorData7);

    let colorData8 = hexToRgba(myVarVal || primaryColorVal , 0.8)
    document.querySelector('html').style.setProperty('--primary08', colorData8);

    let colorData9 = hexToRgba(myVarVal || primaryColorVal , 0.9)
    document.querySelector('html').style.setProperty('--primary09', colorData9);

    let colorData05 = hexToRgba(myVarVal || primaryColorVal , 0.05)
    document.querySelector('html').style.setProperty('--primary005', colorData05);

}

names()

