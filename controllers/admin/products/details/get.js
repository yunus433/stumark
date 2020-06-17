const categories = [
  'book', 'stationery', 'electronic', 'account', 'hobby', 'fashion', 'lesson', 'home', 'ticket', 'exchange', 'donation', 'other'
];

const subcategories = {
  book: ["Okuma Kitabı", "TYT/AYT", "SAT/AP", "Abitur", "Yabancı Dil", "IB", "Matura", "Sözlük", "LGS", "KPSS", "DGS", "Diğer"],
  stationery: ["Hepsi"],
  electronic: ["Telefon", "Tablet", "Bilgisayar", "Kulaklık", "Oyun/Konsol", "Powerbank", "Kamera", "Elektrikli Ev Aletleri", "Aksesuar", "Diğer"],
  account: ["Hepsi"],
  hobby: ["Hepsi"],
  fashion: ["T-Shirt", "Sweatshirt", "Parfüm", "Aksesuar", "Diğer"],
  lesson: ["TYT/AYT", "Almanca", "İngilizce", "Fransızca", "Mentorluk", "Ders Notu", "Diğer"],
  home: ["Hepsi"],
  ticket: ["Hepsi"],
  exchange: ["Hepsi"],
  donation: ["Hepsi"],
  other: ["Hepsi"]
};

const cities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Sivas', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

const mongoose = require('mongoose');

const Product = require('../../../../models/product/Product');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.redirect('/admin');

  Product.findById(mongoose.Types.ObjectId(req.query.id), (err, product) => {
    if (err) return res.redirect('/');

    return res.render('admin/products/details', {
      page: 'admin/products/details',
      title: product.name,
      includes: {
        external: ['css', 'js', 'admin_general_css', 'fontawesome']
      },
      product,
      cities,
      subcategories,
      categories
    });
  });
}
