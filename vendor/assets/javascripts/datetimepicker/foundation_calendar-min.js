/*
Foundation Calendar Date Picker - Jocko MacGregor

Source available at: https://github.com/jockmac22/foundation_calendar_date_time_picker

Original Source Credit: Robert J. Patrick (rpatrick@mit.edu)
*/$.fn.fcdp=function(e,t,n){var r=$.type(e);r=="object"?$(this).each(function(){$.fcdp.buildUI($(this),e)}):r=="string"&&$(this).each(function(){$.fcdp.execute($(this),e,t,n)})};$.fcdp={init:function(){$("input[data-date-time]").add($("input[data-date]")).add($("input[data-time]")).each(function(){$.fcdp.buildUI($(this))});$(document).click(function(e){$(".calendar").not(".fixed").find(".date-picker").hide();$(".calendar").find(".time-picker").hide()})},getDateFromString:function(e,t){t=t||!0;return!e&&!t?null:e?new Date.parse(e):new Date},moveMonth:function(e,t){return e.add({months:t})},daysInMonth:function(e){lastDay=new Date(e.getFullYear(),e.getMonth()+1,0);return lastDay.getDate()},dateParts:function(e){var t={year:e.getYear(),month:e.getMonth(),day:e.getDate(),hour:e.getHours(),minute:e.getMinutes(),second:e.getSeconds()};t.year+=t.year<2e3?1900:0;return t},getFieldDate:function(e){var t=e.input.val();date=e.nullable&&!t?null:!e.nullable&&!t?new Date:this.getDateFromString(t);return date},setFieldDate:function(e,t){var n=t?t.format(e.formats.value):"";e.input.val(n);t=t?t.add(e.utcOffset).hours():t;this.setWorkingDate(e,t)},getWorkingDate:function(e){var t=e.input.data("working-date");if(!t||(""+t).length==0){date=new Date;this.setWorkingDate(e,date,!0)}else date=this.getDateFromString(t);return date},setWorkingDate:function(e,t){e.input.data("working-date",t?t.format("%Y-%m-%d %H:%M:%S"):"");var n="--",r="--";if(t){n=t.format(e.formats.date);r=t.format(e.formats.time)}e.dateSelector&&e.dateSelector.find(".value").html(n);e.timeSelector&&e.timeSelector.find(".value").html(r)},buildUI:function(e,t){e.wrap('<div class="calendar"></div>');e.wrap('<div class="hidden"></div>');e.addClass("value");var n=e.closest(".calendar"),r=$('<div class="selector"></div>');n.append(r);var i=e.is("[data-utc-offset]")?parseInt(e.data("utc-offset")):0;i=isNaN(i)?0:i;var s=e.is("[data-time]")||e.is("[data-date-time]")?!0:!1,o=e.is("[data-date]")||e.is("[data-date-time]")?!0:!s,u={input:e,calendar:n,formats:{date:e.is("[data-date-format]")?e.data("date-format"):"%A: %B %-d, %Y",time:e.is("[data-time-format]")?e.data("time-format"):"%-I:%M %p",value:e.is("[data-value-format]")?e.data("value-format"):"%Y-%m-%d %H:%M:%S"},hasTimePicker:s,hasDatePicker:o,nullable:e.is("[data-nullable]"),utcOffset:i,minDate:e.is("[data-min-date]")?this.getDateFromString(e.data("min-date")):null,maxDate:e.is("[data-max-date]")?this.getDateFromString(e.data("max-date")):null,fixed:e.is("[data-fixed]")?!0:!1};t?t=$.extend({},u,t):t=u;t.fixed&&n.addClass("fixed");if(t.hasDatePicker){if(!t.fixed){var a=$('<a class="date-selector"></a>');a.append('<i class="fi-calendar"></i><span class="value"></span>');r.append(a);r.addClass("date")}var f=$('<div class="date-picker"></div>');n.append(f);f.click(function(e){e.stopPropagation()})}if(t.hasTimePicker&&!t.fixed){var l=$('<a class="time-selector"></a>');l.append('<i class="fi-clock"></i><span class="value"></span>');r.append(l);r.addClass("time");var c=$('<div class="time-picker"></div>');n.append(c);c.click(function(e){e.stopPropagation()})}if(t.nullable){var h=$('<a class="clear"><i class="fi-x"></i></a>');r.append(h)}r.click(function(e){e.stopPropagation()});t=$.extend(t,{dateSelector:o?n.find(".date-selector"):null,datePicker:o?n.find(".date-picker"):null,timeSelector:s?r.find(".time-selector"):null,timePicker:s?n.find(".time-picker"):null,clearButton:t.nullable?n.find("a.clear"):null});n.data("opts",t);e.data("opts",t);t.dateSelector&&t.dateSelector.click(function(e){e.preventDefault();var t=$(this).closest(".calendar"),n=t.find(".time-picker"),r=t.find(".date-picker"),i=t.find(".date-selector");r.css({top:i.position().top+i.outerHeight(),left:i.position().left});n.hide();r.toggle()});t.timeSelector&&n.find("a.time-selector").click(function(e){e.preventDefault();var t=$(this).closest(".calendar"),n=t.find(".date-picker"),r=t.find(".time-picker"),i=t.find(".time-selector");r.css({top:i.position().top+i.outerHeight(),right:i.position().right});n.hide();r.toggle()});t.clearButton&&t.clearButton.click(function(e){e.preventDefault();var t=$(this).closest(".calendar").data("opts");t.datePicker.add(t.timePicker).hide();$.fcdp.setFieldDate(t,null)});this.buildCalendar(t);this.buildTime(t);this.setFieldDate(t,this.getFieldDate(t));this.updateTimePicker(t)},buildTime:function(e){if(tp=e.timePicker){var t=$('<div class="header"></div>'),n=$('<div class="time">Time</div>');t.append(n);tp.append(t);var r=$('<div class="time"></div>'),i=$('<div class="value-control hour"><label>Hr</label><a class="value-change up"><span></span></a><input type="text" class="display" value="12" /><a class="value-change down"><span></span></a></div>'),s=$('<div class="value-control minute"><label>Min</label><a class="value-change up"><span></span></a><input type="text" class="display" value="00" /><a class="value-change down"><span></span></a></div>'),o=$('<div class="value-control second"><label>Sec</label><a class="value-change up"><span></span></a><input type="text" class="display" value="00" /><a class="value-change down"><span></span></a></div>'),u=$('<div class="value-control ampm"><label>A/P</label><a class="value-change up"><span></span></a><input type="text" class="display" value="AM" /><a class="value-change down"><span></span></a></div>');r.append(i);r.append(s);r.append(o);r.append(u);tp.append(r);this.wireupTime(e)}},wireupTime:function(e){if(tp=e.timePicker){var t=tp.find(".value-control.hour");this.wireupTimeValueControl(t,1,12,1);var n=tp.find(".value-control.minute");this.wireupTimeValueControl(n,0,59,2);var r=tp.find(".value-control.second");this.wireupTimeValueControl(r,0,59,2);var i=tp.find(".value-control.ampm");this.wireupTimeAmPmControl(i)}},wireupTimeAmPmControl:function(e){e.find(".value-change").click(function(e){e.preventDefault();var t=$(this),n=t.closest(".value-control"),r=n.find("input.display").val().toLowerCase();r=r=="am"?"PM":"AM";n.find("input.display").val(r);$.fcdp.updateTime(t.closest(".calendar").data("opts"))});e.find("input.display").change(function(e){var t=$(this),n=t.closest(".value-control"),r=n.find("input.display").val().toLowerCase()[0];r=r=="p"?"PM":"AM";n.find("input.display").val(r);$.fcdp.updateTime(t.closest(".calendar").data("opts"))})},wireupTimeValueControl:function(e,t,n,r){e.data("opts",{max:n,min:t,pad:r});e.find(".value-change.up").click(function(e){e.preventDefault();var t=$(this),n=t.closest(".value-control"),i=n.data("opts"),s=parseInt(n.find("input.display").val());s+=1;s=s>i.max?i.min:s;n.find("input.display").val((""+s).lpad(r));var o=t.closest(".calendar").data("opts");$.fcdp.updateTime(o)});e.find(".value-change.down").click(function(e){e.preventDefault();var t=$(this),n=t.closest(".value-control"),i=n.data("opts"),s=parseInt(n.find("input.display").val());s-=1;s=s<i.min?i.max:s;n.find("input.display").val((""+s).lpad(r));var o=t.closest(".calendar").data("opts");$.fcdp.updateTime(o)});e.find("input.display").change(function(e){var t=$(this),n=t.closest(".value-control"),i=n.data("opts"),s=parseInt(n.find("input.display").val());isNaN(s)?s=i.min:s=s>i.max?i.max:s<i.min?i.min:s;n.find("input.display").val((""+s).lpad(r));var o=t.closest(".calendar").data("opts");$.fcdp.updateTime(o)})},updateTimePicker:function(e){var t;if(t=e.timePicker){var n=this.getWorkingDate(e);if(n){t.find(".value-control.hour").find("input.display").val(n.format("%-I"));t.find(".value-control.minute").find("input.display").val(n.format("%M"));t.find(".value-control.second").find("input.display").val(n.format("%S"));t.find(".value-control.ampm").find("input.display").val(n.format("%p"))}}},updateTime:function(e){var t;if(t=e.timePicker){var n=t.find(".value-control.hour").find("input.display").val();n=n?parseInt(n):0;var r=t.find(".value-control.minute").find("input.display").val();r=r?parseInt(r):0;var i=parseInt(t.find(".value-control.second").find("input.display").val());i=i?parseInt(i):0;var s=t.find(".value-control.ampm").find("input.display").val();n=n==12?0:n;s.toLowerCase()==="pm"&&(n+=12);n%=24;var o=this.getWorkingDate(e),u=new Date(o.getFullYear(),o.getMonth(),o.getDate(),n,r,i);u=u?u.add(-e.utcOffset).hours():u;this.setFieldDate(e,u);e.input.trigger("timeChange",[e])}},buildCalendar:function(e){var t;if(t=e.datePicker){t.empty();var n=this.getWorkingDate(e),r=this.getFieldDate(e);r=r?r:new Date;var i=this.dateParts(n),s=0,o=(new Date(i.year,i.month,1)).getDay(),u=this.daysInMonth(n)+o,a=$('<div class="week"></div>'),f=this.moveMonth(this.getWorkingDate(e),-1),l=this.daysInMonth(f),c=$('<div class="header"></div>');c.append('<a href="#" class="month-nav prev"><span></span</a>');c.append('<a href="#" class="month-nav next"><span></span></a>');c.append('<div class="month">'+n.format("%B %Y")+"</div>");t.append(c);var h=$('<div class="week labels"></div>');for(s=0;s<7;s++){var p=["Su","Mo","Tu","We","Th","Fr","Sa"];h.append('<div class="day">'+p[s]+"</div>")}t.append(h);for(s=0;s<42;s++){var d=s%7,v={date:null,weekday_num:d,is_weekend:d==0||d==6,is_current:!1,day_number:0};if(s<o||s>=u){s<o?v.day_number=l-(o-1)+s:s>=u&&(v.day_number=s-u+1);a.append(this.buildOtherMonthDayUI(e,v))}else{v.day_number=s-o+1;v.date=new Date(i.year,i.month,v.day_number,i.hour,i.minute,i.second);v.is_current=r.format("%Y%m%d")==v.date.format("%Y%m%d"),a.append(this.buildDayUI(e,v))}if(d==6){t.append(a);a=$('<div class="week"></div>')}}this.wireupCalendar(e)}},buildOtherMonthDayUI:function(e,t){var n=this.executeBehavior("buildOtherMonthDayUI",e,t);if(!n){var r="day other-month"+(t.is_weekend?" weekend":"");n='<div class="'+r+'">'+t.day_number+"</div>"}return n},buildDayUI:function(e,t){t.is_clickable=this.dateIsClickable(e,t);var n=t.date.getDate(),r=this.executeBehavior("buildDayUI",e,t);if(!r){var i="day"+(t.is_weekend?" weekend":"")+(t.is_current?" current":"");t.is_clickable?r='<a href="#'+n+'" class="'+i+'" data-date="'+t.date.format()+'">'+n+"</a>":r='<span class="'+i+'" data-date="'+t.date.format()+'">'+n+"</span>"}return r},dateIsClickable:function(e,t){if(e.minDate&&t.date<e.minDate||e.maxDate&&t.date>e.maxDate)return!1;var n=this.executeBehavior("dateIsClickable",e,t);n=n===null?!0:n;return n},wireupCalendar:function(e){var t;if(t=e.datePicker){t.find("a.month-nav.prev").click(function(e){e.preventDefault();var t=$(this).closest(".calendar").data("opts"),n=$.fcdp.moveMonth($.fcdp.getWorkingDate(t),-1);$.fcdp.setWorkingDate(t,n);$.fcdp.buildCalendar(t);t.input.trigger("monthChange",[t]);t.input.trigger("monthPrev",[t])});t.find("a.month-nav.next").click(function(e){e.preventDefault();var t=$(this).closest(".calendar").data("opts"),n=$.fcdp.moveMonth($.fcdp.getWorkingDate(t),1);$.fcdp.setWorkingDate(t,n);$.fcdp.buildCalendar(t);t.input.trigger("monthChange",[t]);t.input.trigger("monthNext",[t])});t.find("a.day").click(function(e){var t=$(this),n=t.closest(".calendar").data("opts"),r=n.datePicker;r.find("a.current").removeClass("current");t.addClass("current");var i=$.fcdp.getDateFromString(t.attr("data-date")),s=$.fcdp.getFieldDate(n)||$.fcdp.getWorkingDate(n),o=new Date(i.getFullYear(),i.getMonth(),i.getDate(),s.getHours(),s.getMinutes(),s.getSeconds());$.fcdp.setFieldDate(n,o);n.input.trigger("dateChange",[n])})}},execute:function(e,t,n,r){switch(t){case"bindBehavior":this.bindBehavior(e,n,r)}},bindBehavior:function(e,t,n){if($.isFunction(n)){var r=e.data("behaviors");r=r||{};r[t]=r[t]||[];r[t].push(n);e.data("behaviors",r)}},executeBehavior:function(e,t,n){var r=null,i=t.input.data("behaviors");i&&i[e]&&$.each(i[e],function(){$.isFunction(this)&&(r=this(t,n,r))});return r}};$(document).ready(function(){$.fcdp.init()});Date.prototype.getDayOfTheYear=function(){var e=new Date(this.getFullYear(),0,1);return Math.ceil((this-e)/864e5)};Date.prototype.format=function(e){e=e||"%Y-%m-%d %H:%M:%S";var t=e.match(/\%[-_^]{0,1}[YCymBbdejHkIlPpMSLNAauw]{1,1}/g);if(t.length==0)return e;var n=["January","February","March","April","May","June","July","August","September","October","November","December"],r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],s=["am","pm"],o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],u=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];t=t.sort();previous_match="";for(i=0;i<t.length;i++){var a=t[i];if(previous_match!=a){var f="",l=null;switch(a){case"%Y":l=/%Y/g;f=this.getFullYear();break;case"%C":l=/%C/g;f=Match.floor(this.getFullYear()/100);break;case"%y":l=/%y/g;f=(""+this.getFullYear%100).lpad(2);break;case"%m":l=/%m/g;f=(""+(this.getMonth()+1)).lpad(2);break;case"%_m":l=/%\_m/g;f=(""+(this.getMonth()+1)).lpad(2," ");break;case"%-m":l=/%\-m/g;f=""+(this.getMonth()+1);break;case"%B":l=/%B/g;f=n[this.getMonth()];break;case"%^B":l=/%\^B/g;f=n[this.getMonth()].toUpperCase();break;case"%b":l=/%b/g;f=r[this.getMonth()];break;case"%^b":l=/%\^b/g;f=r[this.getMonth()].toUpperCase();break;case"%d":l=/%d/g;f=(""+this.getDate()).lpad(2);break;case"%-d":l=/%\-d/g;f=""+this.getDate();break;case"%e":l=/%e/g;f=(""+this.getDate()).lpad(2," ");break;case"%j":l=/%j/g;f=(""+this.getDayOfTheYear()).lpad(3);break;case"%-j":l=/%\-j/g;f=""+this.getDayOfTheYear();break;case"%_j":l=/%\_j/g;f=(""+this.getDayOfTheYear()).lpad(3," ");break;case"%H":l=/%H/g;f=(""+this.getHours()).lpad(2);break;case"%-H":l=/%\-H/g;f=""+this.getHours();break;case"%_H":l=/%\_H/g;f=(""+this.getHours()).lpad(2," ");break;case"%k":l=/%k/g;f=(""+this.getHours()).lpad(2," ");break;case"%I":l=/%I/g;f=(""+(this.getHours()%12==0?12:this.getHours()%12)).lpad(2);break;case"%-I":l=/%\-I/g;f=""+(this.getHours()%12==0?12:this.getHours()%12);break;case"%_I":l=/%\_I/g;f=(""+(this.getHours()%12==0?12:this.getHours()%12)).lpad(2," ");break;case"%l":l=/%l/g;f=(""+(this.getHours()%12==0?12:this.getHours()%12)).lpad(2," ");break;case"%P":l=/%P/g;f=s[Math.floor(this.getHours()/12)];break;case"%p":l=/%p/g;f=s[Math.floor(this.getHours()/12)].toUpperCase();break;case"%M":l=/%M/g;f=(""+this.getMinutes()).lpad(2);break;case"%S":l=/%S/g;f=(""+this.getSeconds()).lpad(2);break;case"%A":l=/%A/g;f=o[this.getDay()];break;case"%^A":l=/%\^A/g;f=o[this.getDay()].toUpperCase;break;case"%a":l=/%a/g;f=u[this.getDay()];break;case"%^a":l=/%\^a/g;f=u[this.getDay()].toUpperCase;break;case"%w":l=/%w/g;f=""+this.getDay();break;case"%u":l=/%u/g;f=""+(this.getDay()==0?7:this.getDay())}e=e.replace(l,f);previous_match=a}}return e};String.prototype.lpad=function(e,t){t=t||"0";str=this+"";return str.length>=e?str:(new Array(e-str.length+1)).join(t)+str};String.prototype.rpad=function(e,t){t=t||"0";str=this+"";return str.length>=e?str:str+(new Array(e-str.length+1)).join(t)};