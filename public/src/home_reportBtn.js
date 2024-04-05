$(document).ready(function () {
    
    $('.btn-report-holder').click(function(){
        var report = $(this).data('report'); //Get report abbreviation from data attribute in .btn-report-holder
        var reportname= $(this).find('.report-name').text();
        // alert(report);
        var popup=`
        <form name ="hello" action="/${reportname}post" method="post">
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
                    <button type="button" class="btn-dropdown-mock" onclick="selectMonth()">Month</button>
                    <button type="button"  class="btn-dropdown-mock" onclick="selectQuarter()">Quarter</button>
                    <button type="button"  class="btn-dropdown-mock" onclick="selectYear()">Year</button>
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

    $('.btn-generate-report').click(function(){
        try{
            
        }catch{
            console.log();
        }
    });
});



function getOptionsBasedOnReport(reportname){
    let appendStr
    switch(reportname){
        case "IQPM": 
            appendStr=`
            <div class="popup-subheader">
                <div class="dashed-line"></div>
                <div class="popup-text-one">Item Category</div>
                <div class="dashed-line"></div>
            </div>
            <br>
            <div class="centered">
                <select class="btn-dropdown-mock dropdown-selection" name="category1">
                    <option value="default">(Category)</option>
                    <option value="speaker">Speakers</option>
                    <option value="mic">Microphones</option>
                    <option value="amp">Amplifier</option>
                </select>
            </div>
            `
        break;
        case "TDPM": case "PTPM":
            appendStr= `
            <div class="popup-subheader">
                <div class="dashed-line"></div>
                <div class="popup-text-one">Task type</div>
                <div class="dashed-line"></div>
            </div>
            <div class="popup-options taskType" name="status">
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="taskType" value="repair">
                    <span>Repair</span>
                </label>
                <label class="btn-dropdown-mock taskOption" >
                    <input type="radio" class="radioCheck" name="taskType" value="replace">
                    <span>Replace</span>
                </label>
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="taskType" value="return">
                    <span>Return</span>
                </label>
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="taskType" value="QA">
                    <span>QA</span>
                </label>
            </div>
            <div class="popup-subheader">
                <div class="popup-subheader">

                    <div class="popup-text-one">Item
                    </div>
                    <div class="dashed-line"></div>
                    <div class="popup-text-one">or</div>
                    <div class="dashed-line"></div>
                    <div class="popup-text-one">Category</div>

                </div>
            </div>
            <div class="popup-options">
                <select class="btn-dropdown-mock dropdown-selection" name="category1">
                    <option value="default">(Item)</option>
                    <option value="eon">EON</option>
                    <option value="gx">GX</option>
                    <option value="csl">CSL</option>
                </select>
                <select class="btn-dropdown-mock dropdown-selection" name="category1">
                    <option value="default">(Category)</option>
                    <option value="speaker">Speakers</option>
                    <option value="mic">Microphones</option>
                    <option value="amp">Amplifier</option>
                </select>
            </div>
            `
        break;
        case "TIQPT": case "AWDPT":
            appendStr= `
            <div class="popup-subheader">
                <div class="dashed-line"></div>
                <div class="popup-text-one">Technician</div>
                <div class="dashed-line"></div>
            </div>
            <br>
            <div class="centered">
                <select class="btn-dropdown-mock dropdown-selection" name="technician">
                    <option value="default">(Technician)</option>
                    <option value="tech1">tech1</option>
                    <option value="tech2">tech2</option>
                    <option value="tech3">tech3</option>
                </select>
            </div>
            `
        break;
        // case "TIQPMPT":
    }
    $('.report-specifics-holder').append(appendStr);
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
                <label for="date from">date from: (month)</label>
                <input type="month" id="dateFrom" name="dateFrom">
                <label for="date to">date to:</label>
                <input type="date" id="dateTo" name="dateTo">
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