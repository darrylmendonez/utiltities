$(document).ready(function() {

  var swatches = document.querySelectorAll('.swatches span');
  var themeBtns = document.querySelectorAll('.card');
  var root = document.querySelector(':root');
  var jumbotron = document.querySelector('.jumbotron');
  var body = document.querySelector('body');
  var font = document.querySelector('h1');
  var rValue, gValue, bValue;
  var primaryHexColor, secondaryHexColor, fontHexColor;
  var primaryRgbColor = getComputedStyle(jumbotron).backgroundColor;
  var secondaryRgbColor = getComputedStyle(body).backgroundColor;
  var fontRgbColor = getComputedStyle(font).color;
  var agencies = agenciesData;
  var defaultAgency = agenciesData[11] // nucleus global
  console.log('agencies[11] = ', agencies[11]);
  $('#current-theme').html(defaultAgency.name);
  $('#displayed-url').attr('href', defaultAgency.url);
  $('#displayed-url').html(defaultAgency.url);
  $('#displayed-logo').attr('src', defaultAgency.logoUrl);

  // slice rgbColor into array
  var rgbSlicer = function(rgbColor) {
    rgbColor = rgbColor.substring(4, rgbColor.length-1)
           .replace(/ /g, '')
           .split(',');
    rValue = parseInt(rgbColor[0]);
    gValue = parseInt(rgbColor[1]);
    bValue = parseInt(rgbColor[2]);
  }

  // convert rgb to hex
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  var rgbToHex = function(r, g, b) {
    hexValue = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    return hexValue
  }

  // get colors
  var getPrimaryColorCodes = function() {
    document.getElementById('primary-code-rgb').innerHTML = primaryRgbColor;
    rgbSlicer(primaryRgbColor);
    primaryHexColor = rgbToHex(rValue, gValue, bValue);
    document.getElementById('primary-code-hex').innerHTML = primaryHexColor;
    return primaryHexColor;
  }
  getPrimaryColorCodes();

  var getSecondaryColorCodes = function() {
    document.getElementById('secondary-code-rgb').innerHTML = secondaryRgbColor;
    rgbSlicer(secondaryRgbColor);
    secondaryHexColor = rgbToHex(rValue, gValue, bValue);
    document.getElementById('secondary-code-hex').innerHTML = secondaryHexColor;
    return secondaryHexColor;
  }
  getSecondaryColorCodes();

  // var getFontColorCodes = function() {
  //   document.getElementById('font-code-rgb').innerHTML = fontRgbColor;
  //   rgbSlicer(fontRgbColor);
  //   fontHexColor = rgbToHex(rValue, gValue, bValue);
  //   console.log('fontHexColor = ', fontHexColor);
  //   document.getElementById('font-code-hex').innerHTML = fontHexColor;
  //   return fontHexColor;
  // }
  // getFontColorCodes();

  var changeTheme = function(e) {
    var target = e.target;
    var cardElement = target.parentElement.parentElement;
    // if swatch is clicked
    if (target.nodeName === "SPAN") {
      root.style.setProperty('--primary-color', target.style.backgroundColor);
      primaryRgbColor = getComputedStyle(target).backgroundColor;
      root.style.setProperty('--secondary-color', target.style.color);
      secondaryRgbColor = getComputedStyle(target).color;
      root.style.setProperty('--font-color', target.style.borderColor);
      fontRgbColor = getComputedStyle(target).borderColor;
    }
    // else if button is clicked
    else if (target.nodeName === "A") {
      e.preventDefault;
      root.style.setProperty('--primary-color', cardElement.style.backgroundColor);
      primaryRgbColor = getComputedStyle(cardElement).backgroundColor;
      root.style.setProperty('--secondary-color', target.style.backgroundColor);
      secondaryRgbColor = getComputedStyle(target).backgroundColor;
      root.style.setProperty('--font-color', target.style.color);
      fontRgbColor = getComputedStyle(target).color;
      $('html, body').animate({
        scrollTop: $(".jumbotron").offset().top
      }, 500);
    }
    getPrimaryColorCodes();
    getSecondaryColorCodes();
    // getFontColorCodes();
    var agencyId = target.getAttribute('data-agency-id');
    console.log('agencyId = ', agencyId);

    $('#current-theme').html(agencies[agencyId].name);
    if (agencies[agencyId].url === "") {
      console.log('if statement fired');
      $('#url-span').addClass('d-none');
    }
    else {
      $('#url-span').removeClass('d-none');
      $('#displayed-url').html(agencies[agencyId].url);
      $('#displayed-url').attr('href', agencies[agencyId].url);
    }
    $('#displayed-logo').attr('src', agencies[agencyId].logoUrl);
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener('click', (e) => {
      changeTheme(e);
    })
  })

  themeBtns.forEach((themeBtn) => {
    themeBtn.addEventListener('click', (e) => {
      changeTheme(e);
    })
  })

}) // /$(document).ready
