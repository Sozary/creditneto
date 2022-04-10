ip = window.ip || 'no-ip'
console.log(ip)
var _gaq = _gaq || []
_gaq.push(['_setAccount', 'UA-219885464-1'])
_gaq.push(['_trackPageview'])
_gaq.push([
  '_addTrans',
  ip, // order ID - required
  'Provenance', // affiliation or store name
  '1.00', // total - required
  '0', // tax
  '0', // shipping
  'Ville', // city
  'Departement', // state or province
  'FR', // country
])
_gaq.push([
  '_addItem',
  ip, // order ID - required
  'DD44', // SKU/code - required
  'CREDIT', // product name
  'COFIDIS', // category or variation
  '1.00', // unit price - required
  '1', // quantity - required
])
_gaq.push(['_trackTrans'])
;(function () {
  var ga = document.createElement('script')
  ga.type = 'text/javascript'
  ga.async = true

  ga.src =
    ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') +
    '.google-analytics.com/ga.js'

  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(ga, s)
})()
