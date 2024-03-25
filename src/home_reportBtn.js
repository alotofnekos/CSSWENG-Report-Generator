$(document).ready(function () {
    
    $('.btn-report-holder').click(function(){
        var report = $(this).data('report'); //Get report abbreviation from data attribute in .btn-report-holder
        var reportname= $(this).find('.report-name').text();

        alert("HI");
        var popup=`
        <div class="popup ${report}-popup">
        <div class="popup-header">
            <div class="popup-text">${reportname}</div>
            <button class="btn-close" onclick="close_Popup"><img src="../public/images/close.svg" alt="close popup"> </button>
        </div>
        <div class="popup-subheader">
            <div class="dashed-line"></div>
            <div class="popup-text-one">Date range</div>
            <div class="dashed-line"></div>
        </div>
        
        <div class="popup-options date_range">
            <button class="btn-dropdown-mock month" onclick="selectMonth()">Month</button>
            <button class="btn-dropdown-mock" id="quarter">Quarter</button>
            <button class="btn-dropdown-mock" id="year">Year</button>
        </div>
        <div class="popup-subheader">
            <div class="dashed-line"></div>
            <div class="popup-text-one">Task type</div>
            <div class="dashed-line"></div>
        </div>
        <div class="popup-options">
            <button class="btn-dropdown-mock">Repair</button>
            <button class="btn-dropdown-mock">Replace</button>
            <button class="btn-dropdown-mock">Return</button>
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
                <select class="btn-dropdown-mock">
                    <option value="0">(Select)</option>
                    <option value="1">Speakers</option>
                    <option value="2">Microphones</option>
                    <option value="3">Amplifiers</option>
                </select>
                <select class="btn-dropdown-mock">
                    <option value="0">(Select)</option>
                    <option value="1">Speakers</option>
                    <option value="2">Microphones</option>
                    <option value="3">Amplifiers</option>
                </select>
        </div>
        <div class="btn-generate-report">
                <a href="${report}.html">Generate report</a>
        </div>
    </div>
        `;        
        $('.overlay-holder').append(popup);
        $(".dark-overlay").fadeIn('fast', 'swing');
        $(".overlay-holder").fadeIn('fast', 'swing');
    });

    $('.btn-close').click(function(){
        alert("hi");
        $(".dark-overlay").fadeOut('fast', 'swing');
        $(".overlay-holder").fadeOut('fast', 'swing');
        $(this).closest(".popup").remove();
    });

    
});

function selectMonth(){
    alert("hello world");

    $('.date_range').replaceWith(`
        <div class="popup-options">
            <select class="btn-dropdown-mock">
                <option value="default">(Select)</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
            </select>
            <select class="btn-dropdown-mock">
                <option value="default">(Select)</option>
                <option value="24">2024</option>
                <option value="23">2023</option>
                <option value="22">2022</option>
            </select>
        </div>
    `);
}
