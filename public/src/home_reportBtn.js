$(document).ready(function () {
    
    $('.btn-report-holder').click(function(){
        var report = $(this).data('report'); //Get report abbreviation from data attribute in .btn-report-holder
        var reportname= $(this).find('.report-name').text();
        // alert(report);
        var popup=`
        <form name ="hello" action="/${report}post" method="post">
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
                    <option value="speaker">ACCESSORIES</option>
                    <option value="mic">AGR/MIRACLE 8 ITEM</option>
                    <option value="amp">CAR SPEAKER</option>
                    <option value="speaker">CEILING SPEAKER</option>
                    <option value="speaker">HORN SPEAKER</option>
                    <option value="speaker">KARAOKE SPEAKERS</option>
                    <option value="speaker">MOULDED SPEAKERS</option>
                    <option value="speaker">PA & PRO SPEAKER SYSTEM</option>
                    <option value="speaker">WALL MOUNT SPEAKERS</option>
                    <option value="speaker">WOOFERS</option>
                    <option value="system">CONFERENCE SYSTEM</option>
                    <option value="item">FULL RANGE ITEMS</option>
                    <option value="amp">KARAOKE & PA AMPLIFIERS</option>
                    <option value="array">LINE ARRAY</option>
                    <option value="mic">MIC & WIRELESS MICROPHONE</option>
                    <option value="mixer">MIXER</option>
                    <option value="item">PHASED OUT</option>
                    <option value="lectern">PODIUM LECTERN</option>
                    <option value="amp">POWER AMPLIFIERS</option>
                    <option value="woofer">PRO WOOFERS</option>
                    <option value="processor">PROCESSORS</option>
                    <option value="charge">REPAIR CHARGES</option>
                    <option value="item">SOUND DIMENSION ITEMS</option>
                    <option value="parts">SPAREPARTS</option>
                    <option value="tweeter">TWEETERS</option>
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
                    <option value="eon">FRAME EZ-112A</option>
                    <option value="eon">FRAME EZ-206A</option>
                    <option value="eon">FRAME EZ-406A</option>
                    <option value="gx">FRAME HLT12X</option>
                    <option value="gx">FRAME K-10A</option>
                    <option value="gx">FRAME K3</option>
                    <option value="gx">FRAME KIRA 288</option>
                    <option value="gx">FRAME LC-12N</option>
                    <option value="gx">FRAME LX-18</option>
                    <option value="gx">FRAME LX-212A</option>
                    <option value="gx">FRAME LXD-7000</option>
                    <option value="gx">FRAME V12A</option>
                    <option value="gx">FRAME VPX COMBI</option>
                    <option value="gx">FRAME VPX-310</option>
                    <option value="gx">FRAME VPX-312 (TOP)</option>
                    <option value="gx">FRAME VRX932A</option>
                    <option value="gx">FRAME VTX-12</option>
                    <option value="gx">FRAME VTX-935</option>
                    <option value="csl">HF-203 TRANSFORMER</option>
                    <option value="csl">HORN H3002</option>
                    <option value="csl">HORN H310</option>
                    <option value="csl">HORN H315</option>
                    <option value="csl">HORN H7003</option>
                    <option value="csl">MC-02SP BLACK (100M)</option>
                    <option value="csl">MC-02SP D.BLUE (100M)</option>
                    <option value="csl">MS-3</option>
                    <option value="csl">NB-908</option>
                    <option value="csl">PL CONNECTOR (MONO)</option>
                    <option value="csl">RJ-45 CONNECTOR</option>
                    <option value="csl">SP-1</option>
                    <option value="csl">SP-2</option>
                    <option value="csl">SPEAKON</option>
                    <option value="csl">SPW14</option>
                    <option value="csl">SS-5 SPEAKER STAND</option>
                    <option value="csl">SS-8 SPEAKER STAND</option>
                    <option value="csl">THX-12</option>
                    <option value="csl">VC-100</option>
                    <option value="csl">XLR (F)</option>
                    <option value="csl">XLR (M)</option>
                </select>
        
                <select class="btn-dropdown-mock dropdown-selection" name="category1">
                    <option value="default">(Category)</option>
                    <option value="speaker">ACCESSORIES</option>
                    <option value="mic">AGR/MIRACLE 8 ITEM</option>
                    <option value="amp">CAR SPEAKER</option>
                    <option value="speaker">CEILING SPEAKER</option>
                    <option value="speaker">HORN SPEAKER</option>
                    <option value="speaker">KARAOKE SPEAKERS</option>
                    <option value="speaker">MOULDED SPEAKERS</option>
                    <option value="speaker">PA & PRO SPEAKER SYSTEM</option>
                    <option value="speaker">WALL MOUNT SPEAKERS</option>
                    <option value="speaker">WOOFERS</option>
                    <option value="system">CONFERENCE SYSTEM</option>
                    <option value="item">FULL RANGE ITEMS</option>
                    <option value="amp">KARAOKE & PA AMPLIFIERS</option>
                    <option value="array">LINE ARRAY</option>
                    <option value="mic">MIC & WIRELESS MICROPHONE</option>
                    <option value="mixer">MIXER</option>
                    <option value="item">PHASED OUT</option>
                    <option value="lectern">PODIUM LECTERN</option>
                    <option value="amp">POWER AMPLIFIERS</option>
                    <option value="woofer">PRO WOOFERS</option>
                    <option value="processor">PROCESSORS</option>
                    <option value="charge">REPAIR CHARGES</option>
                    <option value="item">SOUND DIMENSION ITEMS</option>
                    <option value="parts">SPAREPARTS</option>
                    <option value="tweeter">TWEETERS</option>
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
                    <option value="CHRISTIAN">CHRISTIAN</option>
                    <option value="DANIEL">DANIEL</option>
                    <option value="DREX">DREX</option>
                    <option value="MJ">MJ</option>
                    <option value="NEIL">NEIL</option>
                    <option value="OMER">OMER</option>
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