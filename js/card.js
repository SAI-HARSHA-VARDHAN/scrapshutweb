(function(){
  var newscript = document.createElement('script');
  var newscript1 = document.createElement('script');
  var newscript2 = document.createElement('script');
  var link = document.createElement("link");
     newscript.type = 'text/javascript';
     newscript1.type = 'text/javascript';
     newscript2.type = 'text/javascript';
     newscript.async = true;
     newscript1.async = true;
     newscript2.async = true;
     newscript.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
     newscript1.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js';
     newscript2.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript1);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript2);
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(link);
})();
  
function fetch(){
  localStorage.apikey = '80IdCIAg.E9yZMEHQyQhemv7cEbfkwZP8ulW8ZqVE'

    // alert(window.name)
    if(window.name != "")
    localStorage.access_token = window.name
    const companyViewUrl = "https://backend.scrapshut.com/company/view"
    $.ajax({
        type: "GET",
        headers : {
            "API-KEY":localStorage.apikey
        },
        contentType: 'application/json',
        url: companyViewUrl,
        data: {},
        success: function (data) {
            const company_name = data.results[0].company_name
            localStorage.company_name = company_name
            console.log("Company name stored is "+localStorage.company_name)
            checkIfCompanyValid()
        },
        error: function(data)
        {
            console.log(data)
        }
    });  
}

function checkIfCompanyValid(){
    // const current_url = location.href
    const current_url = "https://social.scrapshut.com"
    const domain_name = current_url.split("//")[1].split("/")[0]
    const domain_parts = domain_name.split("\.")
    console.log(domain_parts)
    if(domain_parts.includes(localStorage.company_name)){
        console.log("Matched")
        fetchRatings()
    }
    else{
        console.log("Domain Doesn't match")

    }
}

function fetchRatings(){
    const ratingsUrl = "https://backend.scrapshut.com/company/post/?search="+localStorage.company_name
    $.ajax({
        type: "GET",
        headers : {
            "API-KEY": localStorage.apikey
        },
        contentType: 'application/json',
        url: ratingsUrl,
        data: {},
        success: function (data) {
            const object = data
            const len = object.results.length
            const results_object = object.results
            var avgrating = 0
            var cnt = 0
            for(let i=0;i<results_object.length;i++){
                avgrating += results_object[i].rate
                console.log(results_object[i])
                cnt += 1
            }
            avgrating = avgrating/cnt
            roundedAvg = Math.round(avgrating)
            var html = ``;
            html += `<div class="row insidecontainer" style="width:50vw;">`+
            `<div class="col-4" align="center"><img src="https://scrapshut.s3.ap-south-1.amazonaws.com/scrapshut.gif" height="150px" width="150px"></div>`+
            `<div class="col-8"><h3 class='company'>Organization Name</h3>`
            for(let j=0;j<roundedAvg;j++){
                html += `<span class='star' style='color:gold;'>★</span>`
            }
            let remain = 5 - roundedAvg;
            for(let j=0;j<remain;j++){
                html += `<span class='star remain'>&#9734;</span>`
            }
            html += `<span class='rate'> ${avgrating.toFixed(1)} out of 5</span>`+
            `<br/>${cnt} ratings<br/>`
            if(localStorage.access_token)
            html += `<button class="btn-primary ratethis" onclick="window.open('https://www.wiringbridge.com/review.html')">Rate this</button></div>`
            else
            html += `<button class="btn-primary ratethis" onclick="openpopup()">Signup to review</button></div>`
            html +=`</div><br/><div class='container review' onclick="showhide()"><b>REVIEWS &#8595;</b></div><br/><div id="cardgroup">`
            for(let i=0;i<results_object.length;i++){
                html += `<div class="card" style="width:45vw;"><div class='card-header'><div class="row"><div class="col"><b>${results_object[i].author}</b></div> <div class="col" align="right">${results_object[i].rate}⭐️</div></div></div>`+
                `<div class='card-body'>${results_object[i].review}</div></div>`
            }
            html += `</div>`
            $("#result").html(html)
            $("#cardgroup").hide()
            
        },
        error: function(data)
        {
            console.log(data)
        }
    });
}

function openpopup(){
    popup = window.open("https://cardforhosting.web.app/", location.href, "width=500,height=400");
    popup.moveTo(0,0);
    popup.focus();
}

var rate=0,anonymous=false,fake=false;

function openratepopup(){
    var htmlform = ``;
    htmlform += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="mod" style="display:none;">Launch demo modal</button>`;
    htmlform += `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">`
            +`<div class="modal-dialog modal-dialog-centered" role="document">`
                +`<div class="modal-content">`
                +`<div class="modal-header">`
                    +`<h5 class="modal-title" id="exampleModalCenterTitle">WiringBridge</h5>`
                    +`<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close">`
                    +`<span aria-hidden="true">&times;</span>`
                    +`</button>`
                +`</div>`
                +`<div class="modal-body">`
                    +`<form id="formId">
      <div class="form-row">
        <div class="form-group col-4">
          <p class="label">Review</p>
        </div>
        <div class="form-group col-8">
          <input name="review" type="text" class="form-control" id="inputEmail4" placeholder="Title" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-4">
          <p class="label">Tags</p>
        </div>
        <div class="form-group col-8">
          <input name="tags" type="text" class="form-control" id="inputAddress2" placeholder="Comma seperated tags"
            class="label" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-4">
          <p class="label">Rate</p>
        </div>
        <div class="form-group col-8">
          <!-- <label for="inputZip">Rate</label> -->
          <!-- <input name="rate" type="number" class="form-control" id="inputZip"> -->
          <fieldset class="rating" style="margin-top: -10px;">
            <input type="radio" id="star5" name="rating" value="5" onclick="updaterate(5)" /><label class="full"
              for="star5" title="5 stars"></label>
            <!-- <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label> -->
            <input type="radio" id="star4" name="rating" value="4" onclick="updaterate(4)" /><label class="full"
              for="star4" title="4 stars"></label>
            <!-- <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label> -->
            <input type="radio" id="star3" name="rating" value="3" onclick="updaterate(3)" /><label class="full"
              for="star3" title="3 stars"></label>
            <!-- <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label> -->
            <input type="radio" id="star2" name="rating" value="2" onclick="updaterate(2)" /><label class="full"
              for="star2" title="2 stars"></label>
            <!-- <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label> -->
            <input type="radio" id="star1" name="rating" value="1" onclick="updaterate(1)" /><label class="full"
              for="star1" title="1 star"></label>
            <!-- <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label> -->
        </div>
      </div>
      <div class="form-group">
        <div class="form-check col-12" style="text-align: left;">
          <input name="anonymous" class="form-check-input" type="checkbox" id="gridCheck1" onclick="updatean()">
          <label class="form-check-label" for="gridCheck">
            Anonymous
          </label>
        </div>
        <div class="form-check col-12" style="text-align: left;">
          <input name="fake" class="form-check-input" type="checkbox" id="gridCheck2" onclick="updatefk()">
          <label class="form-check-label" for="gridCheck">
            Might be Fake
          </label>
        </div>
      </div>
    </form>`
                +`</div>`
                +`<div class="modal-footer">`
                    +`<button type="button" class="btn btn-primary" onclick="post()">Submit</button>`
                +`</div>`
                +`</div>`
            +`</div>`
            +`</div>`
    $("#result").append(htmlform);
    $("#mod").click();
}

function updaterate(a) {
    rate = a;
    console.log(rate);
}

var ac = 0, fc = 0;

function updatean() {
      if (ac == 0) {
        ac = 1;
        anonymous = true;
      }
      else {
        ac = 0;
        anonymous = false;
      }
      console.log(anonymous);
    }
    function updatefk() {
      if (fc == 0) {
        fc = 1;
        fake = true;
      }
      else {
        fc = 0;
        fake = false;
    }
    console.log(fake);
}

function post(){
    var url = location.href;
    var tags = $("#inputAddress2").val().split(",");
    var review = $("inputEmail4").val()
    data = {review:review,url:url,tags:tags,rate:rate,anonymous:anonymous,fake:fake,advertisement:{url:null,title:null,advertizing_content:null}};
    data = JSON.stringify(data)
    console.log(data)
    $.ajax({
        type: "POST",
        headers : {
            Authorization :'JWT '+localStorage.access_token,
            "API-KEY":"LrUyJbg2.hbzsN46K8ghSgF8LkhxgybbDnGqqYhKM"
        },
        contentType: 'application/json',
        url: 'https://backend.scrapshut.com/api/post/',
        data: data,
        success: function (data) {
            console.log(data)
            alert("Successfully posted");
            fetch();
            $("#close").click();
            // document.getElementById("mod").click();
        },
        error: function(data)
        {
            var error = JSON.parse(Object.values(data)[16]);
            var errorDetails = error.details;
            if(errorDetails == undefined){
                errorDetails = error.detail;
            }
            if(errorDetails == undefined){
                 errorDetails = error.url;
            }
            if(errorDetails == "Error decoding signature."){
                // document.getElementById("mod1").click();
                alert("Please register to reviw");
            }
            else{
                alert("Error: "+errorDetails);
            }
            $("#close").click()
        }
    });
}

function showhide(){
    $("#cardgroup").toggle();
}