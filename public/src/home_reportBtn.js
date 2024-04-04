$(document).ready(function () {
    
    $('.btn-report-holder').click(function(){
        var report = $(this).data('report'); //Get report abbreviation from data attribute in .btn-report-holder
        var reportname= $(this).find('.report-name').text();
        // alert(report);

        var popup=`
        <form name="hello" action="/post" method="post">
            <div class="popup-body">
                <div class="popup-header">
                    <div class="popup-text">${reportname}</div>
                    <button class="btn-close" onclick="hidePopup()"><img src="/images/close.svg" alt="close popup"></button>
                </div>
                <div class="popup-subheader">
                    <div class="dashed-line"></div>
                    <div class="popup-text-one">Date range</div>
                    <div class="dashed-line"></div>
                </div>
                <div class="popup-options date_range">
                    <button class="btn-dropdown-mock" onclick="selectMonth()">Month</button>
                    <button class="btn-dropdown-mock" onclick="selectQuarter()">Quarter</button>
                    <button class="btn-dropdown-mock" onclick="selectYear()">Year</button>
                </div>
                <div class="report-specifics-holder ${report}">
                </div>
                <button type="submit" class="btn-generate-report">
                    Generate Report
                </button>
            </div>
        </form>
        `;        
        $('.popup').append(popup);
        getOptionsBasedOnReport(report);
        $(".overlay-holder").fadeIn('fast', 'swing');
    });

    $('.btn-generate-report').click( function(){
        try{

        }catch{
            console.log();
        }
    });
});



function getOptionsBasedOnReport(reportname){
    switch(reportname){
        case "IQPM": 
            alert(reportname);
            $('.IQPM').append(`
                <select class="btn-dropdown-mock dropdown-selection" name="category1">
                    <option value="default">(Category)</option>
                    <option value="speaker">Speakers</option>
                    <option value="mic">Microphones</option>
                    <option value="amp">Amplifier</option>
                </select>
            `);
        break;
        // case "TDPM":
        // case "PTPM":
        // case "TIQPT":
        // case "TIQPMPT":
        // case "AWDPT":
    }
}

function hidePopup(){
    // alert("help me");
    //$(".dark-overlay").fadeOut('fast', 'swing');
    $(".overlay-holder").fadeOut('fast', 'swing');
    $(".popup-body").remove();
}

function selectMonth(){
    // alert("hello world");

    $('.date_range').append(`
        <div class="date-options">
            <div class="selection">
                <select class="btn-dropdown-mock dropdown-selection">
                    <option value="default">(Month)</option>
                    <option value="jan">January</option>
                    <option value="feb">February</option>
                    <option value="mar">March</option>
                </select>
                <select class="btn-dropdown-mock dropdown-selection">
                    <option value="default">(Year)</option>
                    <option value="24">2024</option>
                    <option value="23">2023</option>
                    <option value="22">2022</option>
                </select>
            </div>
            <button class="btn-option-close" onclick="closeOptions()"><img src="/images/close.svg" alt="close popup"></button>
        </div>
    `);
}

function selectQuarter(){
    // alert("hello world 2");

    $('.date_range').append(`
        <div class="date-options">
            <div class="selection">
                <select class="btn-dropdown-mock dropdown-selection">
                    <option value="default">(Quarter)</option>
                    <option value="first">1st Quarter</option>
                    <option value="second">2nd Quarter</option>
                    <option value="third">3rd Quarter</option>
                    <option value="fourth">4th Quarter</option>
                </select>
                <select class="btn-dropdown-mock dropdown-selection">
                    <option value="default">(Year)</option>
                    <option value="24">2024</option>
                    <option value="23">2023</option>
                    <option value="22">2022</option>
                </select>
            </div>
            <button class="btn-option-close" onclick="closeOptions()"><img src="/images/close.svg" alt="close popup"></button>
        </div>
    `);
}

function selectYear(){
    alert("hello world 3");

    $('.date_range').append(`
        <div class="date-options selectYear">
            <div class="selection">
                <select class="btn-dropdown-mock dropdown-selection">
                    <option value="default">(Year)</option>
                    <option value="24">2024</option>
                    <option value="23">2023</option>
                    <option value="22">2022</option>
                </select>
            </div>
            <button class="btn-option-close" onclick="closeOptions()"><img src="/images/close.svg" alt="close popup"></button>
        </div>
    `);
}

function closeOptions(){
    $(".date-options").remove();
}