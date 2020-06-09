const subcategories = {
  book: ["Okuma Kitabı", "TYT/AYT", "SAT/AP", "Abitur", "Yabancı Dil", "IB", "Matura", "Sözlük", "LGS", "KPSS", "DGS", "Diğer"],
  stationery: ["Hepsi"],
  electronic: ["Telefon", "Tablet", "Bilgisayar", "Kulaklık", "Oyun/Konsol", "Powerbank", "Kamera", "Elektrikli Ev Aletleri", "Aksesuar", "Diğer"],
  account: ["Hepsi"],
  hobby: ["Hepsi"],
  fashion: ["T-Shirt", "Sweatshirt", "Parfüm", "Aksesuar", "Diğer"],
  lesson: ["AYt/TYT", "Almanca", "İngilizce", "Fransızca", "Mentorluk", "Ders Notu", "Diğer"],
  home: ["Hepsi"],
  ticket: ["Hepsi"],
  exchange: ["Hepsi"],
  donation: ["Hepsi"],
  other: ["Hepsi"]
};

const cities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Sivas', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

module.exports = (req, res, next) => {
  if (req.query.image)
    return res.render('sell/new', {
      page: 'sell/new',
      title: 'Neue Anzeige',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      user: req.session.user,
      subcategories,
      cities,
      img: '/res/uploads/' + req.query.image
    });
  else
    return res.render('sell/new', {
      page: 'sell/new',
      title: 'Yeni Ürün',
      includes: {
        external: ['css', 'js', 'fontawesome']
      },
      user: req.session.user,
      subcategories,
      cities,
      img: '/res/images/defaultProductPicture.png'
    });
}
