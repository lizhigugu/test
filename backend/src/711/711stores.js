const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

function getStories(city) {
  console.log(city)
  var options = {
    url: 'https://www.ibon.com.tw/retail_inquiry_ajax.aspx',
    method: 'POST',
    form: {
      strTargetField: 'COUNTY',
      strKeyWords: city,
    }
  }
  request(options, (err, res, body) => {
    var $ = cheerio.load(body)
    var stores = $('tr').map((index, obj) => {
      return {
        id: $(obj).find('td').eq(0).text().trim(),
        store: $(obj).find('td').eq(1).text().trim(),
        address: $(obj).find('td').eq(2).text().trim(),
      }
    }).get()
    console.log(stores)
    //stores.shift()
    return(stores)
  })
}

export { getStories };