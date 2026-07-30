let products = [
  {id:1, category:'appetizers', name:'بطاطا بالباربكيو', basePrice:500, desc:'بطاطا – جبنة موزاريلا – صوص باربكيو – صوص ابيض', subcat:'مقبلات', imgs:['https://i.ibb.co/JRPYLVT3/image.png']},
  {id:2, category:'appetizers', name:'بطاطا تشيز', basePrice:450, desc:'بطاطا – جبنة موزاريلا – صوص ابيض – بهارات', subcat:'مقبلات', imgs:['https://i.ibb.co/ym57pMT5/0022.png']},
  {id:3, category:'appetizers', name:'بطاطا مقلية', basePrice:350, desc:'بطاطا مقلية مقرمشة', subcat:'مقبلات', imgs:['https://i.ibb.co/CFHnP0Q/0021.png']},
  {id:4, category:'appetizers', name:'سلطة ذرة', basePrice:200, desc:'ذرة – فطر – صوص ابيض', subcat:'مقبلات', imgs:['https://i.ibb.co/nNHTyhG1/0015.png']},
  {id:5, category:'appetizers', name:'سلطة سيزر', basePrice:500, desc:'خس – توست – دجاج – صوص السيزر – جبنة بارميزان', subcat:'مقبلات', imgs:['https://i.ibb.co/1YXzvYxc/0014.png']},

  {id:6, category:'drinks', name:'بيبسي', basePrice:100, desc:'مشروب غازي بارد', subcat:'مشروبات', imgs:['https://i.ibb.co/cS6x6wv8/IMG-20260724-WA0001.jpg']},
  {id:7, category:'drinks', name:'سفن اب', basePrice:100, desc:'مشروب غازي بارد', subcat:'مشروبات', imgs:['https://i.ibb.co/vCjbCyn0/IMG-20260724-WA0000.jpg']},
  {id:8, category:'drinks', name:'مياه صغيرة', basePrice:50, desc:'مياه معدنية', subcat:'مشروبات', imgs:['https://i.ibb.co/Ndvy05v5/x.png']},
  {id:9, category:'drinks', name:'مياه كبيرة', basePrice:100, desc:'مياه معدنية', subcat:'مشروبات', imgs:['https://i.ibb.co/yBRDzyFC/ccc.png']},
  {id:10, category:'drinks', name:'ميرندا اورانج', basePrice:100, desc:'مشروب غازي بنكهة البرتقال', subcat:'مشروبات', imgs:['https://i.ibb.co/FbtnDGTJ/image.png']},
  {id:11, category:'drinks', name:'ميرندا تفاح', basePrice:100, desc:'مشروب غازي بنكهة التفاح', subcat:'مشروبات', imgs:['https://i.ibb.co/LzCGs7mX/copy.png']},

  {id:12, category:'sauces', name:'صوص ابيض', basePrice:30, desc:'صوص ابيض خاص', subcat:'الصوصات', imgs:['https://i.ibb.co/5xFDjG06/IMG-20260724-WA0004.jpg']},
  {id:13, category:'sauces', name:'صوص باربكيو', basePrice:80, desc:'صوص باربكيو مدخن', subcat:'الصوصات', imgs:['https://i.ibb.co/rfkM7Mkh/IMG-20260724-WA0005.jpg']},
  {id:14, category:'sauces', name:'صوص بوفالو', basePrice:80, desc:'صوص بوفالو حار', subcat:'الصوصات', imgs:['https://i.ibb.co/8LqzGTtJ/IMG-20260724-WA0007.jpg']},
  {id:15, category:'sauces', name:'صوص رانش', basePrice:80, desc:'صوص رانش كريمي', subcat:'الصوصات', imgs:['https://i.ibb.co/sd4J1jTy/IMG-20260724-WA0006.jpg']},
  {id:16, category:'sauces', name:'صوص سيزر', basePrice:80, desc:'صوص سيزر غني', subcat:'الصوصات', imgs:['https://i.ibb.co/fV9n03Kb/IMG-20260724-WA0008.jpg']},

  {
    id: 101, category: 'pizza', name: 'بيتزا الذرة', desc: 'صوص – جبنة – ذرة', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/j9XMLZ36/0019.png']
  },
  {
    id: 102, category: 'pizza', name: 'بيتزا الفصول الاربعة', desc: 'صوص – جبنة – فطر – فليفلة – بندورة – زيتون', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/rR4Dx4F9/0012.png']
  },
  {
    id: 103, category: 'pizza', name: 'بيتزا ببيروني', desc: 'صوص – جبنة – ببيروني', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/zh1Yk36g/0020.png']
  },
  {
    id: 104, category: 'pizza', name: 'بيتزا حبش مدخن', desc: 'صوص – جبنة – حبش مدخن', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/YMkR8j9/0018.png']
  },
  {
    id: 105, category: 'pizza', name: 'بيتزا دجاج الباربكيو', desc: 'صوص الباربكيو – جبنة – قطع دجاج – فطر', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/LhNsSGk8/0000s-0003.png']
  },
  {
    id: 106, category: 'pizza', name: 'بيتزا سجق', desc: 'صوص – جبنة – فطر – سجق', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/ynxBHFJW/0017.png']
  },
  {
    id: 107, category: 'pizza', name: 'بيتزا سلامي', desc: 'صوص – جبنة – سلامي', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/SCp8tp7/0016.png']
  },
  {
    id: 108, category: 'pizza', name: 'بيتزا سوبريم', desc: 'صوص – جبنة – لحم مفروم – ببيروني – فطر – بصل – فليلفة – زيتون', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/mC0Sb5J1/0000s-0002.png']
  },
  {
    id: 109, category: 'pizza', name: 'بيتزا شيش طاووق', desc: 'صوص – جبنة – شيش طاووق', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/vx2gVFdJ/0013.png']
  },
  {
    id: 110, category: 'pizza', name: 'بيتزا فور تشيز', desc: 'اربع أنواع جبنة : بلو تشيز – بارميزان – تشيدر – موزاريلا', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/zH80V6K0/0011.png']
  },
  {
    id: 111, category: 'pizza', name: 'بيتزا فيلاديلفيا ستيك', desc: 'صوص – جبنة – شرائح اللحمة – فطر – بصل', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/r2d6GNzQ/0010.png']
  },
  {
    id: 112, category: 'pizza', name: 'بيتزا كل تلت شكل', desc: 'صوص – جبنة – هوت دوغ – شيش – سجق', subcat: 'الكل',
    prices: { xsmall: 480, small: 850, medium: 1250, large: 1700 },
    imgs: ['https://i.ibb.co/bgyBKfTY/0009.png']
  },
  {
    id: 113, category: 'pizza', name: 'بيتزا كل ربع شكل', desc: 'صوص – جبنة – هوت دوغ – شيش – سجق', subcat: 'الكل',
    prices: { xsmall: 480, small: 850, medium: 1250, large: 1700 },
    imgs: ['https://i.ibb.co/r2YbgZHG/0008.png']
  },
  {
    id: 114, category: 'pizza', name: 'بيتزا لحومات باردة', desc: 'صوص – جبنة – سلامي – ببيروني – هوت دوغ – حبش مدخن', subcat: 'الكل',
    prices: { xsmall: 480, small: 850, medium: 1250, large: 1700 },
    imgs: ['https://i.ibb.co/KpjXqDbz/0007.png']
  },
  {
    id: 115, category: 'pizza', name: 'بيتزا مرغريتا', desc: 'صوص – جبنة', subcat: 'الكل',
    prices: { xsmall: 350, small: 650, medium: 930, large: 1300 },
    imgs: ['https://i.ibb.co/V0NQv022/0000s-0000.png']
  },
  {
    id: 116, category: 'pizza', name: 'بيتزا مكسيكي', desc: 'صوص – جبنة – قطع دجاج حارة – فليفلة – بصل – بهارات مكسيكي', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/vx2gVFdJ/0013.png']
  },
  {
    id: 117, category: 'pizza', name: 'بيتزا هوت دوغ', desc: 'صوص – جبنة – هوت دوغ', subcat: 'الكل',
    prices: { xsmall: 400, small: 750, medium: 1130, large: 1500 },
    imgs: ['https://i.ibb.co/8LT32QkV/0006.png']
  },
  {
    id: 118, category: 'pizza', name: 'رانش سبايسي', desc: 'صوص رانش – دجاج – جبنة – حبش مدخن – صوص بوفالو', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/wFQBChgf/copy.png']
  },
  {
    id: 119, category: 'pizza', name: 'رانش عادي', desc: 'صوص رانش – دجاج – جبنة – حبش مدخن', subcat: 'الكل',
    prices: { xsmall: 450, small: 800, medium: 1180, large: 1600 },
    imgs: ['https://i.ibb.co/xS4BKhdv/image.png']
  },
  {
    id: 120, category: 'pizza', name: 'روستو بقر مدخن', desc: 'صوص – جبنة – روستو بقر', subcat: 'الكل',
    prices: { xsmall: 400, small: 750, medium: 1130, large: 1500 },
    imgs: ['https://i.ibb.co/SCp8tp7/0016.png']
  }
];

const COUPONS = {'PIZZA10':10, 'HOT20':20, 'WELCOME15':15};
const RESTAURANT_PHONE = '963996190223';
