$(document).ready(function () {
    
    $('.btn-report-holder').click(function(){
        var report = $(this).data('report'); //Get report abbreviation from data attribute in .btn-report-holder
        var reportname= $(this).find('.report-name').text();

        alert(report);
        var popup=`
        <div class="popup ${report}-popup">
        <div class="popup-header">
            <div class="popup-text">${reportname}</div>
            <div class="btn-close"><img src="/public/images/close.svg" alt="close popup"></div>
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
            <div class="btn-dropdown-mock">(select) <img src="/public/images/dropdownArrow.svg" alt="dropdown"></div>
            <div class="btn-dropdown-mock">(select) <img src="/public/images/dropdownArrow.svg" alt="dropdown"></div>
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
        $(".dark-overlay").fadeOut('fast', 'swing');
        $(".overlay-holder").fadeOut('fast', 'swing');
        $(this).closest(".popup").remove();
    });
});