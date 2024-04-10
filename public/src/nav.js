$(document).ready(function () {
    var navOpen= false;
    $('#CompanyLogo').click(function(){
        if(navOpen == false){
            var navbar=`
            <nav class="navbar">
                <button class="navBtn Btn-import">
                    <a href="/import"> <img src="/images/Btn_import.svg" alt="Import file"></a>
                </button>
                
                <button class="navBtn Btn-table">
                    <a href="/table"><img src="/images/Btn_table.svg" alt="View table"></a>
                </button>
    
                <button class="navBtn Btn-generateReport">
                    <a href="/home"><img src="/images/Btn_generateReport.svg" alt="Generate Report"></a>
                </button>
            </nav>
            `
            $(".navHolder").append(navbar);
            navOpen= true;
        }else{
            navOpen= false;
            $(".navbar").addClass('horizTranslate');
            setTimeout(0.5, second);
            $(".navbar").remove();
        }
    });

});