
var IP;
fetch('https://api.ipify.org?format=json')
    .then((r) => r.json())
    .then((faru) => {
        console.log(" Fetched IP: " + faru.ip);
        IP = faru.ip;
        document.getElementById('ip').innerText = IP;
    }).catch((error) => {
        ip.innerText = "Error in fetching Data! Try again"
        console.log("Error", error);
    })

document.getElementById('btn').addEventListener('click', () => {
    console.log('Data is Fetched');

    fetch(`https://ipinfo.io/${IP}/json?token=3be0f806418642`)
        .then((r) => r.json())
        .then((data) => {
            let dataJson = data;
            console.log("Json Data:", dataJson);
            let lo = dataJson.loc;

            let lats = lo.substring(0, lo.indexOf(','));
            let longs = lo.substring(lo.indexOf(',') + 1);


            document.getElementById('lat').innerHTML = `<b>Lat: </b>${lats}`;
            document.getElementById('long').innerHTML = `<b>Long: </b>${longs}`;
            document.getElementById('city').innerHTML = `<b>City: </b>${dataJson.city}`;
            document.getElementById('region').innerHTML = `<b>Region: </b>${dataJson.region}`;

            document.getElementById('org').innerHTML = `<b>Organisation: </b> ${dataJson.asn.asn} ${dataJson.company.name}`;
            document.getElementById('host').innerHTML = `<b>Hostname: </b>${dataJson.company.domain}`;

            document.getElementById('map').setAttribute('src', `https://maps.google.com/maps?q=${lats},${longs}&hl=en&z=14&amp&output=embed`);

            let dt = new Date().toLocaleString("en-US", { timeZone: `${dataJson.timezone}` });
            document.getElementById('time').innerHTML = `<b>Time Zone: </b>${dataJson.timezone}`;
            document.getElementById('date').innerHTML = `<b>Date And Time: </b>${dt}`;
            let pin = dataJson.postal;
            document.getElementById('pincode').innerHTML = `<b>Pincode: </b>${dataJson.postal}`;
            post(pin);
        })
        .catch((error) => console.log('Error', error))



    document.getElementById('btn').style.display = 'none';
    document.querySelector('.Farhin').style.display = 'flex';
    document.getElementById('searches').style.display = 'block';
    document.querySelector('.pinData').style.display = 'block';
    document.getElementById('mapDiv').style.display = 'block';
})

var arr = [];
function post(pin) {
    console.log(pin);
    fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((r) => r.json())
        .then((data) => {
            console.log(data);
            document.getElementById('message').innerHTML = `<b>Message: </b>${data[0].Message}`;
            console.log(data[0].PostOffice);
            arr = data[0].PostOffice;
            document.getElementById('search').style.display = 'block';
            document.getElementById('z').style.display = 'block';
            show(arr);
        })
        .catch((error) => {
            console.log("Error", error);
        })
}


let postData = document.getElementById('postData')
function show(el) {
    postData.innerHTML = '';
    let res = '';
    el.forEach((a) => {
        res += `
        <div class="posts">
         <div><b>Name: </b>  ${a.Name}</div>
         <div><b>Branch Type: </b> ${a.BranchType}</div>
         <div><b>Delivery Status: </b> ${a.DeliveryStatus}</div>
         <div><b>District: </b> ${a.District}</div>
         <div><b>Division: </b> ${a.Division}</div>
        </div>
        `
    })
    postData.innerHTML = res;
}

let search = document.getElementById('search')
search.addEventListener('keyup', () => {
    let flt = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].Name.toLowerCase().includes(search.value.trim().toLowerCase())) {
            flt.push(arr[i]);
        }
        if (arr[i].BranchType.toLowerCase().includes(search.value.trim().toLowerCase())) {
            flt.push(arr[i]);
        }
    }
    show(flt);
});








