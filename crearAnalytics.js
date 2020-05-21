var fs = require('fs');
let bloques = JSON.parse(fs.readFileSync( 'wcsstore/AuroraStorefrontAssetStore/emarketing/ampphot/json/category.json'))
let carr_1 = JSON.parse(fs.readFileSync( 'wcsstore/AuroraStorefrontAssetStore/emarketing/ampphot/json/carousel1.json'))
let carr_2 = JSON.parse(fs.readFileSync( 'wcsstore/AuroraStorefrontAssetStore/emarketing/ampphot/json/carousel2.json'))
let carr_3 = JSON.parse(fs.readFileSync( 'wcsstore/AuroraStorefrontAssetStore/emarketing/ampphot/json/carousel3.json'))

let JsonA =                
{
	"vars": {
		"account": "UA-11434205-16"
	},
	"triggers": {
		"trackPageview": {
			"on": "visible",
			"request": "pageview",
			"extraUrlParams": {
				
			}
		},
		"Click en la promo": {
			"on": "click",
			"selector": "#the-button",
			"request": "event",
			"vars": {
				"eventCategory": "EEC - Promo - Selección",
				"eventAction": "Landing HS 2020|"
			}
		},
		"Click en producto": {
			"on": "click",
			"selector": "#prod",
			"request": "event",
			"vars": {
				"eventCategory": "EEC - Lista - Selección",
				"eventAction": "Landing HS 2020|${id}"
			},
			"extraUrlParams": {
				"pal": "Demo AMP Lista",
				"pa": "click",
				"pr1nm": "${name}",
				"pr1id": "${id}",
				"pr1pr": "${prc}",
				"pr1ps": "${pos}"
			}
		},
		"extraUrlParams": {
			"promoa": "click",
			"promo1id": "${id}",
			"promo1nm": "${name}",
			"promo1ps": "${pos}"
		}
	}
}

let estraUrl = {
    "promoa": "promotions"
}

for (var i = 0; i < bloques.items.length; i++) {
    let cont = (i + 1).toString();
    estraUrl['promo' + cont + 'id' ] = 'Hero|Banner-' + cont
    estraUrl['promo' + cont + 'nm' ] = bloques.items[i].text
    estraUrl['promo' + cont + 'ps' ] = cont
}


estraUrl.il1nm = 'Landing HS 2020|LP|' + carr_1.titulo

for (var i = 0; i < carr_1.items.length; i++) {
    let cont = (i + 1).toString();
    estraUrl['il1pi' + cont + 'nm' ] = carr_1.items[i].texto.titulo
    estraUrl['il1pi' + cont + 'id' ] = carr_1.items[i].sku
    estraUrl['il1pi' + cont + 'pr' ] = carr_1.items[i].precio.precioActual.replace(/\,/g,'').replace('$','')
    estraUrl['il1pi' + cont + 'ps' ] = cont
}

estraUrl.il2nm = 'Landing HS 2020|LP|' + carr_2.titulo

for (var i = 0; i < carr_2.items.length; i++) {
    let cont = (i + 1).toString();
    estraUrl['il2pi' + cont + 'nm' ] = carr_2.items[i].texto.titulo
    estraUrl['il2pi' + cont + 'id' ] = carr_2.items[i].sku
    estraUrl['il2pi' + cont + 'pr' ] = carr_2.items[i].precio.precioActual.replace(/\,/g,'').replace('$','')
    estraUrl['il2pi' + cont + 'ps' ] = cont
}

estraUrl.il3nm = 'Landing HS 2020|LP|' + carr_3.titulo

for (var i = 0; i < carr_3.items.length; i++) {
    let cont = (i + 1).toString();
    estraUrl['il3pi' + cont + 'nm' ] = carr_3.items[i].texto.titulo
    estraUrl['il3pi' + cont + 'id' ] = carr_3.items[i].sku
    estraUrl['il3pi' + cont + 'pr' ] = carr_3.items[i].precio.precioActual.replace(/\,/g,'').replace('$','')
    estraUrl['il3pi' + cont + 'ps' ] = cont
}

JsonA.triggers.trackPageview.extraUrlParams = estraUrl

fs.writeFileSync('wcsstore/AuroraStorefrontAssetStore/emarketing/ampphot/json/analytics.json', JSON.stringify(JsonA));


