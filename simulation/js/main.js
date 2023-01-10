
$(document).ready(function () {
	var xx = $(document).on("#scaleDiv").html();
	//alert(xx);
	
	$(document).on("click", "#calculate", function() {
		//$(document).on("#scaleDiv").html("sdsdsd");	
		var dryBulbTemp =   parseInt($("#drybulbtemp").val());
		var wetBulbTemp =   parseInt($("#wetbulbtemp").val());
		var baroMetertemp = parseInt($("#barometertemp").val());
		//alert(dryBulbTemp+"     "+wetBulbTemp+"     "+baroMetertemp);
		if(isNaN(dryBulbTemp) || isNaN(wetBulbTemp) || isNaN(baroMetertemp)) {
			alert("Please enter data first!");
		} else {
			if(dryBulbTemp < 25 || dryBulbTemp > 39) {
				alert("Please give DryBulb Temperature in between 25 - 39 degree");
				return false;
			}
			if(wetBulbTemp < 20 || wetBulbTemp > 30) {
				alert("Please give WetBulb Temperature in between 20 - 30 degree");
				return false;
			}
			if(baroMetertemp < 99 || baroMetertemp > 103) {
				alert("Please give Barometer Temperature in between 99 - 103 KPa");
				return false;
			}
			/************************************** update assman psycometer and barometer ***************************************/
			//$(".apbar1,.apbar2, .apbar3").animate({height: "0px"});
			$(".apbar1,.apbar2, .apbar3").css({height: "0px"});
			
			var scale_size_pix = 18.5;
			
			var decm1 = dryBulbTemp / 5;		
			var tot_height1 = (scale_size_pix * decm1)+2;
			$(".apbar1").animate({height: tot_height1+"px"});
			
			var decm2 = wetBulbTemp / 5;		
			var tot_height2 = (scale_size_pix * decm2)+2;
			$(".apbar2").animate({height: tot_height2+"px"});
			
			var tot_height3 = 80 + Math.abs(99 - baroMetertemp);
			$(".apbar3").animate({height: tot_height3+"px"});
			
			
			
			/******************************************* vapour pressure ********************************************/
			var PWs1 = (0.6105 * Math.exp((17.27 * wetBulbTemp) / (237.3 + wetBulbTemp)));
			var A=0.000644;
			var Am = (dryBulbTemp - wetBulbTemp);
			var Pw = (PWs1 - ((A * baroMetertemp) * Am));
			var vapour_pressure = Pw.toFixed(2);
			$("#vapour_pressure").val(vapour_pressure);
			
			
			
			/******************************************* moisture content ********************************************/
			var L = ((0.622 * Pw) / (baroMetertemp - Pw));
			var L1 = L * 1000;
			var moisture_content = L1.toFixed(1);
			$("#moisture_content").val(moisture_content);
			
			
			
			/******************************************* specific volume ********************************************/
			var T = (273.15 + dryBulbTemp);
			var V = (0.287 * T) / (baroMetertemp - Pw);
			var specific_volume = V.toFixed(3);
			$("#specific_volume").val(specific_volume);
			
			
			
			/******************************************* density **************************************************/
			var w = ((1 + L ) / V);
			var density = w.toFixed(2);
			$("#density").val(density);
			
			
			
			/******************************************* enthalpy **************************************************/
			var Hw = (1.8 * dryBulbTemp) + 2501;
			var Ha = 1.005 * dryBulbTemp;
			var H = (Ha + ( L * Hw));
			var enthalpy = H.toFixed(2);
			$("#enthalpy").val(enthalpy);
			
			
			
			/******************************************* sigma heat **************************************************/
			var Hw1 = 4.18 * wetBulbTemp;
			var S = (H - (L * Hw1));
			var sigma_heat = S.toFixed(2);
			$("#sigma_heat").val(sigma_heat);
			
			
			
			/******************************************* relative humidity **************************************************/
			var Pws2 = (0.6105 * Math.exp((17.27 * dryBulbTemp) / (237.3 + dryBulbTemp)));
			var Fi = (Pw / Pws2) * 100;
			var relative_humidity = Fi.toFixed(2);
			$("#relative_humidity").val(relative_humidity);
			
			
			
			/******************************************* dew point temp **************************************************/
			var X = Math.log(Pw / 0.6105);
			var tdp = ((237.3 * X) / (17.27 - X));
			var dew_point_temp = tdp.toFixed(2);
			$("#dew_point_temp").val(dew_point_temp);
		}
	});
	
	
	
	$(document).on("click", "#reset", function() { 
		$('input[type="text"]').val('');	
		$(".apbar1,.apbar2, .apbar3").animate({height: "0px"});
		
	});
	
	
});
