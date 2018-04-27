// WebTrends SmartSource Data Collector Tag v10.4.23
// Copyright (c) 2017 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.3.6
// Created: 2017.06.13
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:"dcss9yzisf9xjyg74mgbihg8p_8d2u",
        domain:"statse.webtrendslive.com",
        timezone:0,
        i18n:true,
        adimpressions:true,
        adsparam:"WT.ac",
        offsite:true,
        download:true,
        downloadtypes:"xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip",
        onsitedoms: "nhs.uk",
        fpcdom: ".www.nhs.uk",
        plugins:{
            hm:{src:"//s.webtrends.com/js/webtrends.hm.js"}
        }
      }).track();
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="webtrends.min.js";
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());
