$(document).ready(function () {
    
    $('.btn-report-holder').click(function(){
        var report = $(this).data('report'); //Get report abbreviation from data attribute in .btn-report-holder
        var reportname= $(this).find('.report-name').text();

        // alert(report);
        var popup=`
        <div class="popup-header">
            <div class="popup-text">${reportname}</div>
            <div class="btn-close"><img src="/images/close.svg" alt="close popup"></div>
        </div>
        <div class="popup-subheader">
            <div class="dashed-line"></div>
            <div class="popup-text-one">Date range</div>
            <div class="dashed-line"></div>
        </div>
        <div class="popup-options">
            <div class="btn-dropdown-mock">Month</div>
            <div class="btn-dropdown-mock">Quarter</div>
            <div class="btn-dropdown-mock">Year</div>
        </div>
        <div class="popup-subheader">
            <div class="dashed-line"></div>
            <div class="popup-text-one">Task type</div>
            <div class="dashed-line"></div>
        </div>
        <div class="popup-options">
            <div class="btn-dropdown-mock">Repair</div>
            <div class="btn-dropdown-mock">Replace</div>
            <div class="btn-dropdown-mock">Return</div>
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
            <div class="btn-dropdown-mock">(select) <img src="/images/dropdownArrow.svg" alt="dropdown"></div>
            <div class="btn-dropdown-mock">(select) <img src="/images/dropdownArrow.svg" alt="dropdown"></div>
        </div>
        <div class="btn-generate-report">
                <a href="/${report}">Generate report</a>
        </div>
        `;        
        $('.popup').append(popup);

        $(".overlay-holder").fadeIn('fast', 'swing');
    });

    $('.btn-close').click(function(){
        alert("help me");
        $(".dark-overlay").fadeOut('fast', 'swing');
        $(".overlay-holder").fadeOut('fast', 'swing');
        $(this).closest(".popup").close();
    });
});