const puppeteer = require('puppeteer')
var fs = require('fs')

let items = [
    '335280',
    '335975',
    '334210',
    '813713',
    '814551',
    '112377',
    '130277',
    '112053',
    '812992',
    '805127'
]

let json = {
	"activo": true,
	"titulo": "Lo que tu hogar necesita",
	"items": [
    ]
}

async function get () {
    await puppeteer.launch({headless: true, args: ['--no-sandbox']}).then(async (browser) => {
    for (var i = 0; i < items.length; i++) {
        const page = await browser.newPage()
        process.on("unhandledRejection", async (reason, p) => {
            await page.waitFor(5000)
            browser.close()
        })
        try {
            console.log('generando carrusel, item: ' + i)
            let url = 'https://www.coppel.com/SearchDisplay?categoryId=&storeId=12756&catalogId=10001&langId=-5&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=12&searchTerm=' + items[i]
            console.log('url: ', url)
            await page.goto(url, { waitUntil: 'load'})
            console.log('obteniendo datos.')
            const element = await page.$("div.top.namePartPriceContainer.clearfix > div > h1")
            let titulo = await page.evaluate(element => element.textContent, element)

            const elementPrecioAnterior = await page.$("div > div.p_oferta > span:nth-child(2)")
            let precioAnterior = await page.evaluate(element => element.textContent, elementPrecioAnterior)

            const elementPrecioAhora = await page.$("div.p_oferta > div > div > span:nth-child(1)")
            let precioAhora = await page.evaluate(element => element.textContent, elementPrecioAhora)

            const imgSrc = await page.evaluate(
                () => [...document.querySelectorAll('#Zoomer > figure > img')]
                      .map(element => element.getAttribute('src'))
            )
            const imgAlt = await page.evaluate(
                () => [...document.querySelectorAll('#Zoomer > figure > img')]
                      .map(element => element.getAttribute('alt'))
            )
            let item = {
                index: '',
                sku: 'PR-',
                url: '',
                image: {
                    url: '',
                    alt: ''
                },
                texto: {
                    titulo: '',
                    copyContado: 'Precio contado'
                },
                precio: {
                    precioAnterior: '',
                    precioActual: '',
                    precioSinFormato: ''
                }
            }

            item.index = i + 1 + ''
            item.url = url
            item.sku = item.sku + items[i]
            item.texto.titulo = titulo.trim()
            item.image.url = imgSrc[0].trim()
            item.image.alt = imgAlt[0].trim()
            item.precio.precioAnterior = precioAnterior.trim()
            item.precio.precioActual = precioAhora.trim()
            item.precio.precioSinFormato = precioAhora.trim().replace('$', '').replace(',', '')
            
            json.items.push(item)

        }catch(error) {
            console.log(error)
            console.log('error al guardar el item: ', items[i])
        }finally {
            await page.waitFor(500)
            await page.close()
        }
    }
    await browser.close()
    return 'procesados'
})
fs.writeFileSync('carrusel.json', JSON.stringify(json))
return true

}
get()