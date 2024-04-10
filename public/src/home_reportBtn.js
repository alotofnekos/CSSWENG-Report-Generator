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
                <div class="popup-options date_range taskType" name="dateRange">
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="dateRange" value="month" onclick="selectMonth()">
                    <span>Month</span>
                </label>
                <label class="btn-dropdown-mock taskOption" >
                    <input type="radio" class="radioCheck" name="dateRange" value="quarter" onclick="selectQuarter()">
                    <span>Quarter</span>
                </label>
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="dateRange" value="year" onclick="selectYear()">
                    <span>Year</span>
                </label>
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
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="AGR/MIRACLE 8 ITEM">AGR/MIRACLE 8 ITEM</option>
                    <option value="CAR SPEAKER">CAR SPEAKER</option>
                    <option value="CEILING SPEAKER">CEILING SPEAKER</option>
                    <option value="HORN SPEAKER">HORN SPEAKER</option>
                    <option value="KARAOKE SPEAKERS">KARAOKE SPEAKERS</option>
                    <option value="MOULDED SPEAKERS">MOULDED SPEAKERS</option>
                    <option value="PA & PRO SPEAKER SYSTEM">PA & PRO SPEAKER SYSTEM</option>
                    <option value="WALL MOUNT SPEAKERS">WALL MOUNT SPEAKERS</option>
                    <option value="WOOFERS">WOOFERS</option>
                    <option value="CONFERENCE SYSTEM">CONFERENCE SYSTEM</option>
                    <option value="FULL RANGE ITEMS">FULL RANGE ITEMS</option>
                    <option value="KARAOKE & PA AMPLIFIERS">KARAOKE & PA AMPLIFIERS</option>
                    <option value="LINE ARRAY">LINE ARRAY</option>
                    <option value="MIC & WIRELESS MICROPHONE">MIC & WIRELESS MICROPHONE</option>
                    <option value="MIXER">MIXER</option>
                    <option value="PHASED OUT">PHASED OUT</option>
                    <option value="PODIUM LECTERN">PODIUM LECTERN</option>
                    <option value="POWER AMPLIFIERS">POWER AMPLIFIERS</option>
                    <option value="PRO WOOFERS">PRO WOOFERS</option>
                    <option value="PROCESSORS">PROCESSORS</option>
                    <option value="REPAIR CHARGES">REPAIR CHARGES</option>
                    <option value="SOUND DIMENSION ITEMS">SOUND DIMENSION ITEMS</option>
                    <option value="SPAREPARTS">SPAREPARTS</option>
                    <option value="TWEETERS">TWEETERS</option>
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
                    <input type="radio" class="radioCheck" name="taskType" value="Repair">
                    <span>Repair</span>
                </label>
                <label class="btn-dropdown-mock taskOption" >
                    <input type="radio" class="radioCheck" name="taskType" value="Replace">
                    <span>Replace</span>
                </label>
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="taskType" value="Return">
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
            <select class="btn-dropdown-mock dropdown-selection" name="itemModel">
                <option value="default">(Item)</option>
                <option value="FRAME EZ-112A">FRAME EZ-112A</option>
                <option value="FRAME EZ-206A">FRAME EZ-206A</option>
                <option value="FRAME EZ-406A">FRAME EZ-406A</option>
                <option value="FRAME HLT12X">FRAME HLT12X</option>
                <option value="FRAME K-10A">FRAME K-10A</option>
                <option value="FRAME K3">FRAME K3</option>
                <option value="FRAME KIRA 288">FRAME KIRA 288</option>
                <option value="FRAME LC-12N">FRAME LC-12N</option>
                <option value="FRAME LX-18">FRAME LX-18</option>
                <option value="FRAME LX-212A">FRAME LX-212A</option>
                <option value="FRAME LXD-7000">FRAME LXD-7000</option>
                <option value="FRAME V12A">FRAME V12A</option>
                <option value="FRAME VPX COMBI">FRAME VPX COMBI</option>
                <option value="FRAME VPX-310">FRAME VPX-310</option>
                <option value="FRAME VPX-312 (TOP)">FRAME VPX-312 (TOP)</option>
                <option value="FRAME VRX932A">FRAME VRX932A</option>
                <option value="FRAME VTX-12">FRAME VTX-12</option>
                <option value="FRAME VTX-935">FRAME VTX-935</option>
                <option value="HF-203 TRANSFORMER">HF-203 TRANSFORMER</option>
                <option value="HORN H3002">HORN H3002</option>
                <option value="HORN H310">HORN H310</option>
                <option value="HORN H315">HORN H315</option>
                <option value="HORN H7003">HORN H7003</option>
                <option value="MC-02SP BLACK (100M)">MC-02SP BLACK (100M)</option>
                <option value="MC-02SP D.BLUE (100M)">MC-02SP D.BLUE (100M)</option>
                <option value="MS-3">MS-3</option>
                <option value="NB-908">NB-908</option>
                <option value="PL CONNECTOR (MONO)">PL CONNECTOR (MONO)</option>
                <option value="RJ-45 CONNECTOR">RJ-45 CONNECTOR</option>
                <option value="SP-1">SP-1</option>
                <option value="SP-2">SP-2</option>
                <option value="SPEAKON">SPEAKON</option>
                <option value="SPW14">SPW14</option>
                <option value="SS-5 SPEAKER STAND">SS-5 SPEAKER STAND</option>
                <option value="SS-8 SPEAKER STAND">SS-8 SPEAKER STAND</option>
                <option value="THX-12">THX-12</option>
                <option value="VC-100">VC-100</option>
                <option value="XLR (F)">XLR (F)</option>
                <option value="XLR (M)">XLR (M)</option>
            </select>        
        
                <select class="btn-dropdown-mock dropdown-selection" name="category1">
                    <option value="default">(Category)</option>
                    <option value="ACCESSORIES">ACCESSORIES</option>
                    <option value="AGR/MIRACLE 8 ITEM">AGR/MIRACLE 8 ITEM</option>
                    <option value="CAR SPEAKER">CAR SPEAKER</option>
                    <option value="CEILING SPEAKER">CEILING SPEAKER</option>
                    <option value="HORN SPEAKER">HORN SPEAKER</option>
                    <option value="KARAOKE SPEAKERS">KARAOKE SPEAKERS</option>
                    <option value="MOULDED SPEAKERS">MOULDED SPEAKERS</option>
                    <option value="PA & PRO SPEAKER SYSTEM">PA & PRO SPEAKER SYSTEM</option>
                    <option value="WALL MOUNT SPEAKERS">WALL MOUNT SPEAKERS</option>
                    <option value="WOOFERS">WOOFERS</option>
                    <option value="CONFERENCE SYSTEM">CONFERENCE SYSTEM</option>
                    <option value="FULL RANGE ITEMS">FULL RANGE ITEMS</option>
                    <option value="KARAOKE & PA AMPLIFIERS">KARAOKE & PA AMPLIFIERS</option>
                    <option value="LINE ARRAY">LINE ARRAY</option>
                    <option value="MIC & WIRELESS MICROPHONE">MIC & WIRELESS MICROPHONE</option>
                    <option value="MIXER">MIXER</option>
                    <option value="PHASED OUT">PHASED OUT</option>
                    <option value="PODIUM LECTERN">PODIUM LECTERN</option>
                    <option value="POWER AMPLIFIERS">POWER AMPLIFIERS</option>
                    <option value="PRO WOOFERS">PRO WOOFERS</option>
                    <option value="PROCESSORS">PROCESSORS</option>
                    <option value="REPAIR CHARGES">REPAIR CHARGES</option>
                    <option value="SOUND DIMENSION ITEMS">SOUND DIMENSION ITEMS</option>
                    <option value="SPAREPARTS">SPAREPARTS</option>
                    <option value="TWEETERS">TWEETERS</option>
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
        case "TIQPMPT":
            appendStr=`
                <div class="popup-subheader">
                <div class="dashed-line"></div>
                <div class="popup-text-one">Task type</div>
                <div class="dashed-line"></div>
            </div>
            <div class="popup-options taskType" name="status">
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="taskType" value="Repair">
                    <span>Repair</span>
                </label>
                <label class="btn-dropdown-mock taskOption" >
                    <input type="radio" class="radioCheck" name="taskType" value="Replace">
                    <span>Replace</span>
                </label>
                <label class="btn-dropdown-mock taskOption">
                    <input type="radio" class="radioCheck" name="taskType" value="Return">
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
                    <div class="popup-text-one">and</div>
                    <div class="dashed-line"></div>
                    <div class="popup-text-one">Technician</div>

                </div>
            </div>
            <div class="popup-options">
            <select class="btn-dropdown-mock dropdown-selection" name="category1">
                <option value="default">(Item)</option>
                <option value="FRAME EZ-112A">FRAME EZ-112A</option>
                <option value="FRAME EZ-206A">FRAME EZ-206A</option>
                <option value="FRAME EZ-406A">FRAME EZ-406A</option>
                <option value="FRAME HLT12X">FRAME HLT12X</option>
                <option value="FRAME K-10A">FRAME K-10A</option>
                <option value="FRAME K3">FRAME K3</option>
                <option value="FRAME KIRA 288">FRAME KIRA 288</option>
                <option value="FRAME LC-12N">FRAME LC-12N</option>
                <option value="FRAME LX-18">FRAME LX-18</option>
                <option value="FRAME LX-212A">FRAME LX-212A</option>
                <option value="FRAME LXD-7000">FRAME LXD-7000</option>
                <option value="FRAME V12A">FRAME V12A</option>
                <option value="FRAME VPX COMBI">FRAME VPX COMBI</option>
                <option value="FRAME VPX-310">FRAME VPX-310</option>
                <option value="FRAME VPX-312 (TOP)">FRAME VPX-312 (TOP)</option>
                <option value="FRAME VRX932A">FRAME VRX932A</option>
                <option value="FRAME VTX-12">FRAME VTX-12</option>
                <option value="FRAME VTX-935">FRAME VTX-935</option>
                <option value="HF-203 TRANSFORMER">HF-203 TRANSFORMER</option>
                <option value="HORN H3002">HORN H3002</option>
                <option value="HORN H310">HORN H310</option>
                <option value="HORN H315">HORN H315</option>
                <option value="HORN H7003">HORN H7003</option>
                <option value="MC-02SP BLACK (100M)">MC-02SP BLACK (100M)</option>
                <option value="MC-02SP D.BLUE (100M)">MC-02SP D.BLUE (100M)</option>
                <option value="MS-3">MS-3</option>
                <option value="NB-908">NB-908</option>
                <option value="PL CONNECTOR (MONO)">PL CONNECTOR (MONO)</option>
                <option value="RJ-45 CONNECTOR">RJ-45 CONNECTOR</option>
                <option value="SP-1">SP-1</option>
                <option value="SP-2">SP-2</option>
                <option value="SPEAKON">SPEAKON</option>
                <option value="SPW14">SPW14</option>
                <option value="SS-5 SPEAKER STAND">SS-5 SPEAKER STAND</option>
                <option value="SS-8 SPEAKER STAND">SS-8 SPEAKER STAND</option>
                <option value="THX-12">THX-12</option>
                <option value="VC-100">VC-100</option>
                <option value="XLR (F)">XLR (F)</option>
                <option value="XLR (M)">XLR (M)</option>
            </select>

                <select class="btn-dropdown-mock dropdown-selection" name="technician">
                    <option value="default">(Technician)</option>
                    <option value="CHRISTIAN">CHRISTIAN</option>
                    <option value="DANIEL">DANIEL</option>
                    <option value="DREX">DREX</option>
                    <option value="MJ">MJ</option>
                    <option value="NEIL">NEIL</option>
                    <option value="OMER">OMER</option>
                </select>
            `
        break;
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
                <select class="btn-dropdown-mock dropdown-selection" name="quarterNum">
                    <option value="default">(Quarter)</option>
                    <option value="first">1st Quarter</option>
                    <option value="second">2nd Quarter</option>
                    <option value="third">3rd Quarter</option>
                    <option value="fourth">4th Quarter</option>
                </select>
                <select class="btn-dropdown-mock dropdown-selection" name="dateFrom">
                    <option value="default">(Year)</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
            </div>
            <button class="btn-option-close" onclick="closeOptions()"><img src="/images/close.svg" alt="close popup"></button>
        </div>
    `);
}

function selectYear(){
    // alert("hello world 3");

    $('.date_range').append(`
        <div class="date-options selectYear">
            <div class="selection">
                <select class="btn-dropdown-mock dropdown-selection" name="dateFrom">
                    <option value="default">(Year)</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
            </div>
            <button class="btn-option-close" onclick="closeOptions()"><img src="/images/close.svg" alt="close popup"></button>
        </div>
    `);
}

function closeOptions(){
    $(".date-options").remove();
}