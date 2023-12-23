
var siteName = document.getElementById('siteName');

var siteUrl = document.getElementById('siteUrl');

var submitBtn = document.getElementById('submitBtn');

var validationBtn = document.getElementById('validationBtn');


validationBtn.classList.remove('d-none');
submitBtn.classList.add('d-none');

var siteList = [];

if(localStorage.getItem('urls') != null){
   
    siteList =   JSON.parse(localStorage.getItem('urls'));
    displayData();
}

function addUrl(){

    if( validSiteName() == true && validSiteUrl() == true ){

    var siteDetails = {
        name: siteName.value,
        url: siteUrl.value
    }
    siteList.push(siteDetails);

    localStorage.setItem('urls', JSON.stringify(siteList));

    clearForm();

    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');

    displayData();

    validationBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
    
  }
  else{
    validationBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
  }
    
}

function clearForm(){
    siteName.value = '';
    siteUrl.value = '';
}

function displayData(){
    
    var data = '';

    for(var i = 0; i < siteList.length; i++){
        data += `<tr>
        <td>${i+1}</td>
        <td>${siteList[i].name}</td>
        <td><a href="${siteList[i].url}" target="_blank" class="btn visitBtn"><i class="fa-regular fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteUrl(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }

    document.getElementById('tableBody').innerHTML = data;
}

function deleteUrl(index){

    siteList.splice(index, 1);

    localStorage.setItem('urls', JSON.stringify(siteList));
    displayData();
}

function validSiteName(){
    var text = siteName.value;

    var RegexName = /^[a-zA-Z]{3,20}$/;

    if(  RegexName.test(text) ){
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');

        siteUrl.classList.remove('is-invalid');

        return true;
    }
    else{
        siteName.classList.add('is-invalid');
        siteName.classList.remove('is-valid');

        validationBtn.classList.remove('d-none');
        submitBtn.classList.add('d-none');

        return false;
    }

}

function validSiteUrl(){

    var url = siteUrl.value;

    var regexUrl = /^(https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/ ;

    if( regexUrl.test(url) ){

        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');

        return true;
    }
    else{
        siteUrl.classList.remove('is-valid');
        siteUrl.classList.add('is-invalid');

        validationBtn.classList.remove('d-none');
        submitBtn.classList.add('d-none');

        return false;
    }
}


function checkValidation(){
    
    if(validSiteName() && validSiteUrl()){
        submitBtn.classList.remove('d-none');
        validationBtn.classList.add('d-none');
    }
}


