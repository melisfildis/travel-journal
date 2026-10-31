import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Globe2,
  Heart,
  Menu,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { isSupabaseConfigured, photoBucket, supabase } from './lib/supabase.js'

const LanguageContext = createContext('en')
const languageStorageKey = 'mels-journal-language'

const uiText = {
  en: {
    journal: 'Journal', destinations: 'Destinations', about: 'About', newsletterLink: 'Get the field notes',
    signIn: 'Sign in', profile: 'Profile', signOut: 'Sign out', writeMemory: 'Write a memory',
    notesOutThere: 'Notes from out there', latestDispatches: 'The latest dispatches.',
    exploreJournal: 'Explore the journal', findPlace: 'Find a place or story', clearSearch: 'Clear search',
    noNotes: 'No notes found for that search. Try another place.', showAll: 'Show all stories',
    fieldNotes: 'field notes', manyMore: '/ and many more on the way', getStories: 'Get new stories',
    worldPossibilities: 'A world of possibilities', whereNext: 'Where to next?',
    smallGuides: 'Small guides for places that make a big impression.', allDestinations: 'All destinations',
    destinationCount: 'destinations to explore', aJournal: 'A journal for the curious',
    heroText: 'Thoughtful travel notes, little local secrets, and the long way round. For the places that stay with you.',
    heroTitle: 'Find your somewhere.',
    heroNote: 'A little less itinerary. A lot more feeling.',
    goDay: 'GO WHERE THE DAY TAKES YOU', scenic: 'TAKE THE SCENIC ROUTE', linger: 'STAY A LITTLE LONGER',
    storyTitle: 'Story title', titleTurkish: 'Story title · Turkish', placeTurkish: 'Place · Turkish',
    bodyTurkish: 'Your story · Turkish', routeTurkish: 'Route · Turkish', place: 'Place', date: 'Date', category: 'Category', coverPhoto: 'Cover photo',
    galleryPhotos: 'Add up to 6 photos', galleryNote: 'Photos keep their full picture, fit into 480 × 640 portrait images, and upload when you save.',
    yourStory: 'Your story', storyPlaceholder: 'Write your memory here. Leave a blank line between paragraphs.',
    route: 'Places along the way', optional: '(optional)', saveOnline: 'Your story, cover photo, and gallery photos will be saved online and shared with site visitors.',
    saveLocal: 'Text saves in this browser for now. Connect Supabase to upload photos and share saved changes across devices.',
    signInToUpload: 'Sign in and connect the journal to enable photo uploads.',
    titlePlaceholder: 'Give this memory a title', placePlaceholder: 'City, country', routePlaceholder: 'Asakusa · Ueno · Shinjuku',
    selected: 'Selected:', remove: 'Remove', cancel: 'Cancel', savePost: 'Save post', saveChanges: 'Save changes', saveMemory: 'Save memory',
    editPost: 'Edit blog post', editMemory: 'Edit your memory', newMemory: 'Write a memory', yourJournal: 'Your travel journal',
    ownerAccess: 'Journal owner access', signInMels: 'Sign in to Mels', email: 'Email', password: 'Password',
    passwordHint: 'Use the password you created when you accepted your Supabase invitation. If you have not created an account yet, follow the Supabase setup guide.',
    forgotPassword: 'Forgot password?', close: 'Close', signingIn: 'Signing in…',
    accountHelp: 'Account help', resetPassword: 'Reset your password', resetHelp: 'Enter the email for your Supabase user. Supabase will email a link that brings you back here to choose a new password.',
    backToSignIn: 'Back to sign in', sendReset: 'Send reset link', sending: 'Sending…',
    choosePassword: 'Choose a new password', changePassword: 'Change password', currentPassword: 'Current password',
    newPassword: 'New password', confirmPassword: 'Confirm new password', passwordRule: 'Use at least 8 characters and keep your password private.',
    saving: 'Saving…', saveNewPassword: 'Save new password', yourAccount: 'Your account', signedInAs: 'Signed in as',
    destinationCard: 'Destination card', editDestination: 'Edit destination', destinationName: 'Destination name · English', destinationNameTr: 'Destination name · Turkish',
    cardWriting: 'Card writing · English', cardWritingTr: 'Card writing · Turkish', cardWritingHint: 'A short line about this place', topLabel: 'Small top label · English', topLabelTr: 'Small top label · Turkish', destinationPicture: 'Destination picture',
    saveDestination: 'Save destination', uploadHint: 'Choose a picture from your device. It uploads to Supabase when you save.',
    destinationUploadHint: 'The full picture is fitted into a 480 × 640 portrait image and uploaded when you save.',
    shareDestinationHint: 'Sign in and connect the journal to upload pictures and share destination edits.',
    noteFromRoad: 'A note from the road', aboutHeadline: 'Travel is less about where you go, more how.',
    aboutText: 'Mels is an independent travel journal for the beautiful in-between moments. The second coffee, the wrong turn, the stranger who pointed you home.',
    exploreJournalLink: 'Explore the journal', backJournal: 'Back to the journal',
    storyNotFound: 'We couldn’t find that story.', blogEmpty: 'This post is ready for your travel notes.',
    editToAdd: 'Use Edit post to add your story.', onOurRoute: 'ON OUR ROUTE', editThisPost: 'Edit this post',
    noteFromRoad: 'A note from the road', newsletterEyebrow: 'Every so often, not every day',
    postcard: 'A postcard for your inbox.', newsletterText: 'Fresh field notes, places worth the detour, and things we almost kept to ourselves.',
    emailPlaceholder: 'Your email address', emailAria: 'Your email address', join: 'Count me in', joined: 'You’re on the list ✓',
    newsletterSmall: 'No noise. Unsubscribe whenever.', sentWith: 'SENT WITH',
    footerLove: 'Made slowly, for going places.', instagram: 'Instagram',
    saveStory: 'Save', unsaveStory: 'Unsave', minRead: 'min read', closeEditor: 'Close editor',
    deletePost: 'Delete post', confirmDeleteTitle: 'Delete blog post?', confirmDelete: 'Are you sure you want to delete this blog post?', confirm: 'Confirm', deleting: 'Deleting…',
    databaseOnline: 'Online journal connected', databaseSetup: 'Database setup needed', databaseConnecting: 'Connecting to online journal…',
    destinationDatabase: 'Destination editing needs a database update. See the new SQL file in the setup guide.',
    cityGuide: 'City guide', roadTrip: 'Road trip', outdoors: 'Outdoors', foodDrink: 'Food & drink', localLife: 'Local life',
    newDestination: 'NEW DESTINATION', storyBadge: '01 STORY',
  },
  tr: {
    journal: 'Günlük', destinations: 'Destinasyonlar', about: 'Hakkında', newsletterLink: 'Gezi notlarını al',
    signIn: 'Giriş yap', profile: 'Profil', signOut: 'Çıkış yap', writeMemory: 'Bir anı yaz',
    notesOutThere: 'Yol notları', latestDispatches: 'En yeni yazılar.',
    exploreJournal: 'Günlüğü keşfet', findPlace: 'Bir yer veya yazı ara', clearSearch: 'Aramayı temizle',
    noNotes: 'Aramanla eşleşen not yok. Başka bir yer dene.', showAll: 'Tüm yazıları göster',
    fieldNotes: 'gezi notu', manyMore: '/ yenileri yolda', getStories: 'Yeni yazıları al',
    worldPossibilities: 'Keşfedilecek yerler', whereNext: 'Sırada neresi var?',
    smallGuides: 'İz bırakan yerlere küçük rehberler.', allDestinations: 'Tüm destinasyonlar',
    destinationCount: 'destinasyon keşfedilmeyi bekliyor', aJournal: 'Meraklılar için bir gezi günlüğü',
    heroText: 'Özenle yazılmış gezi notları, küçük yerel sırlar ve uzun yollar. Aklında kalan yerler için.',
    heroTitle: 'Kendine ait bir yer bul.',
    heroNote: 'Daha az plan, daha çok his.',
    goDay: 'GÜN SENİ NEREYE GÖTÜRÜRSE', scenic: 'MANZARALI YOLU SEÇ', linger: 'BİRAZ DAHA KAL',
    storyTitle: 'Yazı başlığı', titleTurkish: 'Yazı başlığı · Türkçe', placeTurkish: 'Yer · Türkçe',
    bodyTurkish: 'Hikâyen · Türkçe', routeTurkish: 'Rota · Türkçe', place: 'Yer', date: 'Tarih', category: 'Kategori', coverPhoto: 'Kapak fotoğrafı',
    galleryPhotos: 'En fazla 6 fotoğraf ekle', galleryNote: 'Fotoğraflar tam görünür, 480 × 640 dikey görsele sığdırılır ve kaydedince yüklenir.',
    yourStory: 'Hikâyen', storyPlaceholder: 'Anını buraya yaz. Paragraflar arasında boş satır bırak.',
    route: 'Uğranan yerler', optional: '(isteğe bağlı)', saveOnline: 'Hikâyen, kapak fotoğrafın ve galeri fotoğrafların çevrimiçi kaydedilir ve ziyaretçilerle paylaşılır.',
    saveLocal: 'Metin şimdilik bu tarayıcıya kaydediliyor. Fotoğraf yüklemek ve değişiklikleri cihazlar arasında paylaşmak için Supabase’i bağla.',
    signInToUpload: 'Fotoğraf yüklemek için giriş yap ve günlüğü bağla.',
    titlePlaceholder: 'Anına bir başlık ver', placePlaceholder: 'Şehir, ülke', routePlaceholder: 'Asakusa · Ueno · Shinjuku',
    selected: 'Seçildi:', remove: 'Kaldır', cancel: 'İptal', savePost: 'Yazıyı kaydet', saveChanges: 'Değişiklikleri kaydet', saveMemory: 'Anıyı kaydet',
    editPost: 'Blog yazısını düzenle', editMemory: 'Anını düzenle', newMemory: 'Bir anı yaz', yourJournal: 'Gezi günlüğün',
    ownerAccess: 'Günlük sahibi erişimi', signInMels: 'Mels’e giriş yap', email: 'E-posta', password: 'Şifre',
    passwordHint: 'Supabase davetini kabul ederken oluşturduğun şifreyi kullan. Henüz hesabın yoksa Supabase kurulum rehberini izle.',
    forgotPassword: 'Şifreni mi unuttun?', close: 'Kapat', signingIn: 'Giriş yapılıyor…',
    accountHelp: 'Hesap yardımı', resetPassword: 'Şifreni yenile', resetHelp: 'Supabase hesabındaki e-posta adresini gir. Yeni şifre belirleyebileceğin bir bağlantı gönderilecek.',
    backToSignIn: 'Girişe dön', sendReset: 'Sıfırlama bağlantısı gönder', sending: 'Gönderiliyor…',
    choosePassword: 'Yeni bir şifre belirle', changePassword: 'Şifreyi değiştir', currentPassword: 'Mevcut şifre',
    newPassword: 'Yeni şifre', confirmPassword: 'Yeni şifreyi doğrula', passwordRule: 'En az 8 karakter kullan ve şifreni kimseyle paylaşma.',
    saving: 'Kaydediliyor…', saveNewPassword: 'Yeni şifreyi kaydet', yourAccount: 'Hesabın', signedInAs: 'Giriş yapan',
    destinationCard: 'Destinasyon kartı', editDestination: 'Destinasyonu düzenle', destinationName: 'Destinasyon adı · İngilizce', destinationNameTr: 'Destinasyon adı · Türkçe',
    cardWriting: 'Kart yazısı · İngilizce', cardWritingTr: 'Kart yazısı · Türkçe', cardWritingHint: 'Bu yerle ilgili kısa bir cümle', topLabel: 'Üstteki küçük etiket · İngilizce', topLabelTr: 'Üstteki küçük etiket · Türkçe', destinationPicture: 'Destinasyon fotoğrafı',
    saveDestination: 'Destinasyonu kaydet', uploadHint: 'Cihazından bir fotoğraf seç. Kaydedince Supabase’e yüklenir.',
    destinationUploadHint: 'Fotoğrafın tamamı 480 × 640 dikey görsele sığdırılır ve kaydedince yüklenir.',
    shareDestinationHint: 'Fotoğraf yüklemek ve değişiklikleri paylaşmak için giriş yapıp günlüğü bağla.',
    noteFromRoad: 'Yoldan bir not', aboutHeadline: 'Seyahat, nereye gittiğinden çok nasıl gittiğinle ilgili.',
    aboutText: 'Mels; ikinci kahve, yanlış dönüş ve sana yolu gösteren yabancı gibi yolculukların güzel ara anları için bağımsız bir gezi günlüğü.',
    exploreJournalLink: 'Günlüğü keşfet', backJournal: 'Günlüğe dön',
    storyNotFound: 'Bu yazıyı bulamadık.', blogEmpty: 'Bu yazı gezi notlarını bekliyor.',
    editToAdd: 'Hikâyeni eklemek için Yazıyı düzenle’yi seç.', onOurRoute: 'ROTAMIZDA', editThisPost: 'Bu yazıyı düzenle',
    noteFromRoad: 'Yoldan bir not', newsletterEyebrow: 'Ara sıra, her gün değil',
    postcard: 'Posta kutuna bir kartpostal.', newsletterText: 'Yeni gezi notları, uğramaya değer yerler ve kendimize saklayamadığımız küçük keşifler.',
    emailPlaceholder: 'E-posta adresin', emailAria: 'E-posta adresin', join: 'Beni de ekle', joined: 'Listeye eklendin ✓',
    newsletterSmall: 'Gereksiz e-posta yok. İstediğinde ayrılabilirsin.', sentWith: 'GÖNDEREN',
    footerLove: 'Yollara düşmek için, ağır ağır hazırlandı.', instagram: 'Instagram',
    saveStory: 'Kaydet', unsaveStory: 'Kaydı kaldır', minRead: 'dk okuma', closeEditor: 'Düzenleyiciyi kapat',
    deletePost: 'Yazıyı sil', confirmDeleteTitle: 'Blog yazısı silinsin mi?', confirmDelete: 'Bu blog yazısını silmek istediğinizden emin misiniz?', confirm: 'Onayla', deleting: 'Siliniyor…',
    databaseOnline: 'Çevrimiçi günlük bağlı', databaseSetup: 'Veritabanı kurulumu gerekli', databaseConnecting: 'Çevrimiçi günlük bağlanıyor…',
    destinationDatabase: 'Destinasyon düzenlemek için veritabanı güncellemesi gerekli. Kurulum rehberindeki yeni SQL dosyasına bak.',
    cityGuide: 'Şehir rehberi', roadTrip: 'Yol gezisi', outdoors: 'Doğa', foodDrink: 'Yeme içme', localLife: 'Yerel yaşam',
    newDestination: 'YENİ DESTİNASYON', storyBadge: '01 YAZI',
  },
}

function copy(language, key) {
  return uiText[language]?.[key] || uiText.en[key] || key
}

function initialLanguage() {
  try {
    return window.localStorage.getItem(languageStorageKey) === 'tr' ? 'tr' : 'en'
  } catch {
    return 'en'
  }
}

function categoryLabel(language, category) {
  const keys = {
    'City guide': 'cityGuide',
    'Road trip': 'roadTrip',
    Outdoors: 'outdoors',
    'Food & drink': 'foodDrink',
    'Local life': 'localLife',
  }
  return copy(language, keys[category] || category)
}

function localizeStory(story, language) {
  const titleEn = story.titleEn || story.title || ''
  const placeEn = story.placeEn || story.place || ''
  const bodyEn = story.bodyEn ?? story.body ?? ''
  const excerptEn = story.excerptEn ?? story.excerpt ?? ''
  const routeEn = story.routeEn ?? story.route ?? ''

  return {
    ...story,
    titleEn,
    placeEn,
    bodyEn,
    excerptEn,
    routeEn,
    title: language === 'tr' ? story.titleTr || titleEn : titleEn,
    place: language === 'tr' ? story.placeTr || placeEn : placeEn,
    body: language === 'tr' ? story.bodyTr || bodyEn : bodyEn,
    excerpt: language === 'tr' ? story.excerptTr || excerptEn : excerptEn,
    route: language === 'tr' ? story.routeTr || routeEn : routeEn,
    typeLabel: categoryLabel(language, story.type),
  }
}

function useLanguage() {
  return useContext(LanguageContext)
}

const tokyoPhotoUrl =
  'https://i.pinimg.com/736x/60/92/0f/60920fb6fbdce4e9541c50e7b5c1af4b.jpg'

const stories = [
  {
    id: 'post-london',
    place: 'London, UK',
    placeTr: 'Londra, Birleşik Krallık',
    title: 'A long weekend, one London neighborhood at a time',
    titleTr: 'Uzun bir hafta sonunda Londra mahallelerini keşfetmek',
    type: 'City guide',
    date: '07.28.24',
    image: 'photo-1513635269975-59663e0ac1ad',
    read: '8 min read',
  },
  {
    id: 'post-budva',
    place: 'Budva, Montenegro',
    placeTr: 'Budva, Karadağ',
    title: 'Slow days along the Adriatic in Budva',
    titleTr: 'Budva’da Adriyatik kıyısında yavaş günler',
    type: 'Road trip',
    date: '06.05.24',
    image: 'photo-1555990793-da11153b2473',
    read: '5 min read',
  },
  {
    id: 'post-chios',
    place: 'Chios, Greece',
    placeTr: 'Sakız Adası, Yunanistan',
    title: 'A quieter Greek island escape on Chios',
    titleTr: 'Sakız Adası’nda sakin bir Yunan kaçamağı',
    type: 'Outdoors',
    date: '05.19.24',
    image: 'photo-1533105079780-92b9be482077',
    read: '7 min read',
  },
  {
    id: 'post-paris',
    place: 'Paris, France',
    placeTr: 'Paris, Fransa',
    title: 'A little love letter to Paris',
    titleTr: 'Paris’e küçük bir aşk mektubu',
    type: 'Food & drink',
    date: '04.02.24',
    image: 'photo-1502602898657-3e91760cbb34',
    read: '9 min read',
  },
  {
    id: 'post-brussels',
    place: 'Brussels, Belgium',
    placeTr: 'Brüksel, Belçika',
    title: 'Coffee, comic art, and a day in Brussels',
    titleTr: 'Kahve, çizgi roman sanatı ve Brüksel’de bir gün',
    type: 'Local life',
    date: '03.15.24',
    image: 'photo-1499856871958-5b9627545d1a',
    read: '4 min read',
  },
  {
    id: 'post-amsterdam',
    place: 'Amsterdam, Netherlands',
    placeTr: 'Amsterdam, Hollanda',
    title: 'A canal-side kind of afternoon',
    titleTr: 'Kanalların kıyısında bir öğleden sonra',
    type: 'City guide',
    date: '02.20.24',
    image: 'photo-1512470876302-972faa2aa9a4',
    read: '6 min read',
  },
]

const destinations = [
  {
    id: 'tokyo',
    country: 'Tokyo, Japan',
    countryTr: 'Tokyo, Japonya',
    count: '01 STORY',
    image: tokyoPhotoUrl,
    note: 'Find your quiet corner',
    noteTr: 'Kendine sakin bir köşe bul',
  },
  {
    id: 'istanbul',
    country: 'Istanbul, Türkiye',
    countryTr: 'İstanbul, Türkiye',
    count: 'NEW DESTINATION',
    image: 'photo-1524231757912-21f4fe3a7200',
    note: 'Take in the Bosphorus view',
    noteTr: 'Boğaz manzarasının tadını çıkar',
  },
  {
    id: 'london',
    country: 'London, UK',
    countryTr: 'Londra, Birleşik Krallık',
    count: '01 STORY',
    image: 'photo-1513635269975-59663e0ac1ad',
    note: 'Take the scenic route',
    noteTr: 'Manzaralı yolu seç',
  },
  {
    id: 'budva',
    country: 'Budva, Montenegro',
    countryTr: 'Budva, Karadağ',
    count: '01 STORY',
    image: 'photo-1555990793-da11153b2473',
    note: 'Follow the warm light',
    noteTr: 'Sıcak ışığı takip et',
  },
  {
    id: 'chios',
    country: 'Chios, Greece',
    countryTr: 'Sakız Adası, Yunanistan',
    count: '01 STORY',
    image: 'photo-1533105079780-92b9be482077',
    note: 'Let the afternoon linger',
    noteTr: 'Öğleden sonrayı uzat',
  },
  {
    id: 'paris',
    country: 'Paris, France',
    countryTr: 'Paris, Fransa',
    count: '01 STORY',
    image: 'photo-1502602898657-3e91760cbb34',
    note: 'Make time for a café',
    noteTr: 'Bir kafeye zaman ayır',
  },
  {
    id: 'brussels',
    country: 'Brussels, Belgium',
    countryTr: 'Brüksel, Belçika',
    count: '01 STORY',
    image: 'photo-1499856871958-5b9627545d1a',
    note: 'Look up as you wander',
    noteTr: 'Gezerken başını kaldırıp etrafa bak',
  },
  {
    id: 'amsterdam',
    country: 'Amsterdam, Netherlands',
    countryTr: 'Amsterdam, Hollanda',
    count: '01 STORY',
    image: 'photo-1512470876302-972faa2aa9a4',
    note: 'Follow the canals',
    noteTr: 'Kanalları takip et',
  },
]

const categories = [
  'Everything',
  'City guide',
  'Road trip',
  'Outdoors',
  'Food & drink',
  'Local life',
]

const initialMemories = [
  {
    id: 'tokyo',
    place: 'Tokyo, Japan',
    placeTr: 'Tokyo, Japonya',
    title: 'Seven days in Tokyo: temples, side streets & foods',
    titleTr: 'Tokyo’da yedi gün: tapınaklar, ara sokaklar ve lezzetler',
    type: 'City guide',
    date: '2026-06-21',
    image: tokyoPhotoUrl,
    excerpt:
      'Seven days in June, with historic walks from Asakusa to Ueno and beyond. The heat stayed with us until a typhoon shifted the weather. Favorite bites: Gyukatsu Ichinisan in Akihabara and a local Shinjuku dinner at Yuntaku Sakaba Azuma Shoten.',
    excerptTr:
      'Haziran ayında Asakusa’dan Ueno’ya uzanan tarihi yürüyüşlerle geçen yedi gün. Tayfun gelene kadar hava çok sıcaktı. En sevdiğimiz lezzetler Akihabara’daki Gyukatsu Ichinisan ve Shinjuku’daki Yuntaku Sakaba Azuma Shoten oldu.',
    route:
      'Asakusa · Ueno · Gotokuji · Ginza · Akihabara · Harajuku · Shibuya · Shinjuku · Tokyo DisneySea',
    routeTr:
      'Asakusa · Ueno · Gotokuji · Ginza · Akihabara · Harajuku · Shibuya · Shinjuku · Tokyo DisneySea',
    bodyTr: `Haziran ayında Tokyo’da yedi gün geçirdik. Tayfun gelene kadar havanın çoğu zaman sıcak olduğu bir geziydi. Şehri mahalle mahalle keşfettik; tarihi yerleri, alışveriş caddelerini, bahçeleri ve güzel yemekleri bir araya getirdik.

En aklımda kalan yerlerden biri Asakusa’daki Sensō-ji Tapınağı oldu. Tapınağın tarihine göre hikâyesi 628 yılında, iki balıkçı kardeşin Sumida Nehri’nde Kannon heykelini bulmasıyla başlıyor. Heykeli onurlandırmak için kurulan Sensō-ji, bugün Tokyo’nun en tanınmış Budist tapınaklarından biri.

Kaminarimon kapısından geçip tapınak alanını gezdik. Bir omikuji, yani kâğıt fal çektik ve orada falımızı okuduk. Küçük ama ziyareti bizim için kişisel kılan bir andı.

Gotokuji de gezimizin unutulmaz tapınaklarından biriydi. Tapınağın efsanesine göre, şahin avından dönen Lord Ii Naotaka’yı bir kedi içeri çağırmış. Naotaka içeri girdikten kısa süre sonra fırtına başlamış. Sığınak bulduğu ve tapınak rahibiyle sohbet ettiği için minnettar kalan Naotaka, daha sonra tapınağın yenilenmesine destek olmuş. Bu hikâye maneki-neko, yani çağıran kedi figürüyle ilişkilendiriliyor. Tapınağın Shofuku-den bölümü de çok sayıda küçük kedi heykelciğiyle biliniyor.

Tokyo National Museum, Nezu Shrine, Tokyo Tower’ın yanındaki Zojo-ji, Meiji Jingu, İmparatorluk Sarayı’nın dış bahçeleri, Yasukuni Shrine ve Hie Shrine gibi tarihi yerleri de ziyaret ettik. Her biri şehrin geçmişine farklı bir açıdan bakmamızı sağladı.

Akihabara, Ginza, Nakano Broadway, Harajuku, Shibuya ve Shinjuku’yu da keşfettik. Shinjuku Gyoen kalabalık sokaklardan uzaklaşıp dinlenmek için güzel bir yerdi; Golden Gai ise mahallenin daha samimi bir yüzünü gösterdi. Bir günümüzü de Tokyo DisneySea’de geçirdik.

Harajuku’daki vintage mağazaları gezmek çok keyifliydi. Mixthings’te yalnızca 15.000 yen’e ikinci el bir Coach çanta buldum. Sevdiğim bir parçayı bütçeme uygun bir fiyata almak ayrıca mutluluk verdi.

Tokyo’nun dev mağazaları da başlı başına bir alışveriş macerasıydı. Akihabara’daki Yodobashi Akiba elektronik, oyun ve daha fazlasıyla dolu dokuz kata yayılıyordu. Ginza’da on iki katlı Uniqlo’nun yanı sıra Itoya’nın kırtasiye katları ve Loft’un tasarım ürünleri vardı. Shibuya’da PARCO’yu ve kocaman MEGA Don Quijote’yi gezdik. Her zaman keşfedilecek başka bir kat ya da köşe vardı.

En sevdiğim gyukatsu, Akihabara’daki Gyukatsu Ichinisan’daydı. Shinjuku’da yerel bir restoran olan Yuntaku Sakaba Azuma Shoten’de akşam yemeği yedik; o da haftanın güzel anılarından biri oldu. Bu iki yemek hâlâ Tokyo’dan en net hatırladığım lezzetler arasında.`,
    body: `We spent seven days in Tokyo in June. It was hot for most of our trip, until a typhoon changed the weather. We explored the city one neighborhood at a time, mixing historic sights with shopping streets, gardens, and plenty of good food.

One of the places I remember most is Sensō-ji in Asakusa. According to the temple’s history, its story began in 628, when two brothers found a statue of Kannon while fishing in the Sumida River. Sensō-ji was built to honor the statue and is now one of Tokyo’s best-known Buddhist temples.

We walked through the Kaminarimon gate and visited the temple grounds. We also drew an omikuji—a paper fortune slip—and read our fortunes there. It was a small moment, but one that made the visit feel personal.

Gotokuji was another memorable temple stop. The temple’s legend tells of a cat beckoning Lord Ii Naotaka inside as he passed by after falconry. He had just stepped in when a thunderstorm began. Grateful for the shelter and the conversation with the temple priest, he later supported the temple’s restoration. The story is linked to the maneki-neko, or beckoning cat, and the temple’s Shofuku-den is known for its many small cat figures.

Other historic stops included the Tokyo National Museum, Nezu Shrine, Zojo-ji beside Tokyo Tower, Meiji Jingu, the Imperial Palace outer gardens, Yasukuni Shrine, and Hie Shrine. Each stop gave us a different view of the city’s past.

We also explored Akihabara, Ginza, Nakano Broadway, Harajuku, Shibuya, and Shinjuku. Shinjuku Gyoen gave us a quiet break from the busy streets, while Golden Gai showed us a more intimate side of the neighborhood. We spent a full day at Tokyo DisneySea, too.

Harajuku was a fun place to browse vintage shops. At Mixthings, I found a second-hand Coach bag for just ¥15,000. It felt especially satisfying to come away with a piece I loved at a price that worked for me.

Tokyo’s huge stores made shopping an adventure of their own. In Akihabara, Yodobashi Akiba stretched across nine floors of electronics, games, and more. Ginza had the twelve-floor Uniqlo, along with the stationery floors at Itoya and design finds at Loft. In Shibuya, we explored PARCO and the enormous MEGA Don Quijote. There was always another floor or another corner to look through.

My favorite gyukatsu was at Gyukatsu Ichinisan in Akihabara. In Shinjuku, we had dinner at Yuntaku Sakaba Azuma Shoten, a local place that became another highlight of the week. Those two meals are still among my strongest memories of Tokyo.`,
  },
]

const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

async function preparePortraitPhoto(file) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(480 / bitmap.width, 640 / bitmap.height)
  const drawWidth = bitmap.width * scale
  const drawHeight = bitmap.height * scale
  const drawX = (480 - drawWidth) / 2
  const drawY = (640 - drawHeight) / 2

  const canvas = document.createElement('canvas')
  canvas.width = 480
  canvas.height = 640
  const context = canvas.getContext('2d')

  if (!context) {
    bitmap.close()
    throw new Error('Could not prepare this photo. Please choose another image.')
  }

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight)
  bitmap.close()

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', 0.9),
  )
  if (!blob) {
    throw new Error('Could not prepare this photo. Please choose another image.')
  }

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'travel-photo'
  return new File([blob], `${baseName}.jpg`, {
    type: 'image/jpeg',
    lastModified: Date.now(),
  })
}

const memoryStorageKey = 'mels-travel-memories'
const destinationStorageKey = 'mels-destination-overrides'
const hiddenPostStorageKey = 'mels-hidden-blog-posts'

function readHiddenPostIds() {
  try {
    const ids = JSON.parse(window.localStorage.getItem(hiddenPostStorageKey) || '[]')
    return Array.isArray(ids) ? ids : []
  } catch {
    return []
  }
}

function readMemories() {
  try {
    const stored = window.localStorage.getItem(memoryStorageKey)
    if (!stored) return initialMemories

    const memories = JSON.parse(stored)
    if (!Array.isArray(memories)) return initialMemories
    const savedIds = new Set(memories.map((memory) => memory.id))
    return [
      ...initialMemories.filter((memory) => !savedIds.has(memory.id)),
      ...memories,
    ]
  } catch {
    return initialMemories
  }
}

function readDestinationOverrides() {
  try {
    const stored = window.localStorage.getItem(destinationStorageKey)
    const overrides = stored ? JSON.parse(stored) : []
    return Array.isArray(overrides) ? overrides : []
  } catch {
    return []
  }
}

function emptyMemory() {
  return {
    title: '',
    titleTr: '',
    place: '',
    placeTr: '',
    type: 'City guide',
    date: new Date().toISOString().slice(0, 10),
    image: '',
    body: '',
    bodyTr: '',
    route: '',
    routeTr: '',
    gallery: [],
  }
}

function formatMemoryDate(date) {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  return `${month}.${day}.${year.slice(-2)}`
}

function dateForInput(date) {
  if (!date) return new Date().toISOString().slice(0, 10)
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  const [month, day, shortYear] = date.split('.')
  if (month && day && shortYear) return `20${shortYear}-${month}-${day}`
  return new Date().toISOString().slice(0, 10)
}

function excerptFrom(body) {
  const firstParagraph = body.trim().split(/\n\s*\n/)[0]
  return firstParagraph.length > 165
    ? `${firstParagraph.slice(0, 162).trimEnd()}…`
    : firstParagraph
}

function memoryFromRow(row) {
  return {
    id: row.id,
    place: row.place,
    placeTr: row.place_tr || '',
    title: row.title,
    titleTr: row.title_tr || '',
    type: row.category,
    date: row.memory_date,
    body: row.body,
    bodyTr: row.body_tr || '',
    excerpt: row.excerpt || excerptFrom(row.body),
    excerptTr: row.excerpt_tr || excerptFrom(row.body_tr || ''),
    route: row.route || '',
    routeTr: row.route_tr || '',
    image: row.image_url || '',
    gallery: row.gallery_urls || [],
  }
}

function memoryToRow(memory) {
  return {
    id: memory.id,
    place: memory.place,
    place_tr: memory.placeTr || '',
    title: memory.title,
    title_tr: memory.titleTr || '',
    category: memory.type,
    memory_date: memory.date,
    body: memory.body,
    body_tr: memory.bodyTr || '',
    excerpt: memory.excerpt,
    excerpt_tr: memory.excerptTr || excerptFrom(memory.bodyTr || ''),
    route: memory.route || '',
    route_tr: memory.routeTr || '',
    image_url: memory.image || '',
    gallery_urls: memory.gallery || [],
    updated_at: new Date().toISOString(),
  }
}

function destinationFromRow(row) {
  return {
    id: row.id,
    country: row.country,
    countryTr: row.country_tr || '',
    count: row.count_label || '',
    countTr: row.count_label_tr || '',
    note: row.note || '',
    noteTr: row.note_tr || '',
    image: row.image_url || '',
  }
}

function destinationToRow(destination) {
  return {
    id: destination.id,
    country: destination.country,
    country_tr: destination.countryTr || '',
    count_label: destination.count || '',
    count_label_tr: destination.countTr || '',
    note: destination.note || '',
    note_tr: destination.noteTr || '',
    image_url: destination.image || '',
    updated_at: new Date().toISOString(),
  }
}
function Brand({ footer = false }) {
  return (
    <a href="#top" className={`brand ${footer ? 'footer-brand' : ''}`}>
      <span className="brand-mark">
        <Compass size={18} />
      </span>
      mels<span className="brand-dot">.</span>
    </a>
  )
}

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </div>
  )
}

function MemoryFeature({ memory, onEdit }) {
  const paragraphs = memory.body.split(/\n\s*\n/).filter(Boolean)

  return (
    <section id={`memory-${memory.id}`} className="tokyo-feature">
      <div className="tokyo-feature-image">
        <img
          src={
            memory.image?.startsWith('http')
              ? memory.image
              : photo(memory.image || 'photo-1470770841072-f978cf4d019e', 1100)
          }
          alt={`Travel memory from ${memory.place}`}
          loading="lazy"
        />
        <span>{memory.place.toUpperCase()}</span>
      </div>

      <div className="tokyo-feature-copy">
        <h2>{memory.title}</h2>
        <Eyebrow>
          {formatMemoryDate(memory.date)} · {memory.place}
        </Eyebrow>
        {paragraphs.map((paragraph, index) => (
          <p key={`${memory.id}-${index}`}>{paragraph}</p>
        ))}

        {memory.route && (
          <div className="tokyo-route">
            <span>ON OUR ROUTE</span>
            <p>{memory.route}</p>
          </div>
        )}

        <button className="edit-memory-button" onClick={() => onEdit(memory)}>
          {memory.localOnly ? 'Publish this memory' : 'Edit this memory'} <ArrowRight size={15} />
        </button>
      </div>
      {memory.gallery?.length > 0 && (
        <div className="memory-gallery">
          {memory.gallery.map((image, index) => (
            <figure key={`${memory.id}-gallery-${index}`}>
              <img
                src={image}
                alt={`${memory.place} travel photo ${index + 1}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}

function MemoryEditor({
  open,
  editing,
  editingPost,
  formData,
  error,
  onChange,
  onClose,
  onSave,
  photoFile,
  galleryFiles,
  onPhotoChange,
  onGalleryChange,
  onRemoveGalleryPhoto,
  onRemoveGalleryFile,
  databaseConnected,
}) {
  const language = useLanguage()
  const [photoPreview, setPhotoPreview] = useState('')
  const [galleryPreviews, setGalleryPreviews] = useState([])

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview('')
      return undefined
    }

    const previewUrl = URL.createObjectURL(photoFile)
    setPhotoPreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [photoFile])

  useEffect(() => {
    const previewUrls = galleryFiles.map((file) => URL.createObjectURL(file))
    setGalleryPreviews(previewUrls)
    return () => previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl))
  }, [galleryFiles])

  if (!open) return null

  const existingCover = formData.image
    ? formData.image.startsWith('http')
      ? formData.image
      : photo(formData.image, 900)
    : photo('photo-1470770841072-f978cf4d019e', 900)
  const coverPreview = photoPreview || existingCover
  const savedGallery = formData.gallery || []
  const galleryCount = savedGallery.length + galleryFiles.length

  return (
    <div className="memory-dialog-backdrop">
      <section
        className="memory-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="memory-dialog-title"
      >
        <div className="memory-dialog-heading">
          <div>
            <Eyebrow>{copy(language, 'yourJournal')}</Eyebrow>
            <h2 id="memory-dialog-title">
              {editingPost
                ? copy(language, 'editPost')
                : editing
                  ? copy(language, 'editMemory')
                  : copy(language, 'newMemory')}
            </h2>
          </div>

          <button
            type="button"
            className="memory-dialog-close"
            onClick={onClose}
            aria-label={copy(language, 'closeEditor')}
          >
            <X size={20} />
          </button>
        </div>

        <form className="memory-form" onSubmit={onSave}>
          <label>
            {copy(language, 'storyTitle')} · English
            <input
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder={copy(language, 'titlePlaceholder')}
              required
            />
          </label>
          <label>
            {copy(language, 'titleTurkish')}
            <input
              name="titleTr"
              value={formData.titleTr || ''}
              onChange={onChange}
              placeholder="Türkçe başlık"
            />
          </label>

          <div className="memory-form-row">
            <label>
              {copy(language, 'place')} · English
              <input
                name="place"
                value={formData.place}
                onChange={onChange}
                placeholder={copy(language, 'placePlaceholder')}
                required
              />
            </label>
            <label>
              {copy(language, 'date')}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                required
              />
            </label>
          </div>

          <label>
            {copy(language, 'placeTurkish')}
            <input
              name="placeTr"
              value={formData.placeTr || ''}
              onChange={onChange}
              placeholder="Şehir, ülke"
            />
          </label>

          <label>
            {copy(language, 'category')}
            <select name="type" value={formData.type} onChange={onChange}>
              {categories
                .filter((item) => item !== 'Everything')
                .map((item) => (
                    <option key={item} value={item}>
                      {categoryLabel(language, item)}
                  </option>
                ))}
            </select>
          </label>

          <div className="cover-photo-editor">
            <div className="cover-photo-preview">
              <img src={coverPreview} alt="Cover photo preview" />
            </div>
            <div className="cover-photo-controls">
              <label>
              {copy(language, 'coverPhoto')} <span className="optional-label">(JPG, PNG, WebP)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={onPhotoChange}
                  disabled={!databaseConnected}
                />
              </label>
              <p className="memory-storage-note">
                {copy(language, 'uploadHint')} 480 × 640.
              </p>
              {!databaseConnected && (
                <p className="memory-storage-note">
                  {copy(language, 'signInToUpload')}
                </p>
              )}
              {photoFile && (
                <span className="photo-file-name">Selected: {photoFile.name}</span>
              )}
            </div>
          </div>

          <div className="gallery-editor">
            <label>
                {copy(language, 'galleryPhotos')} <span className="optional-label">({galleryCount}/6)</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={onGalleryChange}
                disabled={!databaseConnected || galleryCount >= 6}
              />
            </label>
            <p className="memory-storage-note">
              {copy(language, 'galleryNote')}
            </p>
            {(savedGallery.length > 0 || galleryFiles.length > 0) && (
              <div className="gallery-preview-grid">
                {savedGallery.map((image, index) => (
                  <figure key={`saved-gallery-${index}`}>
                      <img src={image} alt={`${copy(language, 'remove')} · ${index + 1}`} />
                    <button type="button" onClick={() => onRemoveGalleryPhoto(index)}>
                      {copy(language, 'remove')}
                    </button>
                  </figure>
                ))}
                {galleryPreviews.map((preview, index) => (
                  <figure key={`new-gallery-${index}`}>
                    <img src={preview} alt={`${copy(language, 'selected')} ${index + 1}`} />
                    <button type="button" onClick={() => onRemoveGalleryFile(index)}>
                      {copy(language, 'remove')}
                    </button>
                  </figure>
                ))}
              </div>
            )}
          </div>

          <label>
            {copy(language, 'yourStory')} · English
            <textarea
              name="body"
              value={formData.body}
              onChange={onChange}
              placeholder={copy(language, 'storyPlaceholder')}
              rows={9}
              required
            />
          </label>
          <label>
            {copy(language, 'bodyTurkish')}
            <textarea
              name="bodyTr"
              value={formData.bodyTr || ''}
              onChange={onChange}
              placeholder="Anının Türkçe anlatımını yaz."
              rows={9}
            />
          </label>

          <label>
            {copy(language, 'route')} · English <span className="optional-label">{copy(language, 'optional')}</span>
            <input
              name="route"
              value={formData.route}
              onChange={onChange}
              placeholder={copy(language, 'routePlaceholder')}
            />
          </label>
          <label>
            {copy(language, 'routeTurkish')} <span className="optional-label">{copy(language, 'optional')}</span>
            <input
              name="routeTr"
              value={formData.routeTr || ''}
              onChange={onChange}
              placeholder="Asakusa · Ueno · Shinjuku"
            />
          </label>

          <p className="memory-storage-note">
            {databaseConnected
              ? copy(language, 'saveOnline')
              : copy(language, 'saveLocal')}
          </p>
          {error && <p className="memory-save-error">{error}</p>}

          <div className="memory-form-actions">
            <button
              className="memory-cancel-button"
              type="button"
              onClick={onClose}
            >
              {copy(language, 'cancel')}
            </button>
            <button className="memory-save-button" type="submit">
              {editingPost
                ? copy(language, 'savePost')
                : editing
                  ? copy(language, 'saveChanges')
                  : copy(language, 'saveMemory')}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function SignInDialog({
  open,
  email,
  password,
  error,
  busy,
  onEmailChange,
  onPasswordChange,
  onClose,
  onSubmit,
  onForgotPassword,
}) {
  const language = useLanguage()
  if (!open) return null

  return (
    <div className="memory-dialog-backdrop">
      <section
        className="memory-dialog sign-in-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-in-title"
      >
        <div className="memory-dialog-heading">
          <div>
            <Eyebrow>{copy(language, 'ownerAccess')}</Eyebrow>
            <h2 id="sign-in-title">{copy(language, 'signInMels')}</h2>
          </div>
          <button
            type="button"
            className="memory-dialog-close"
            onClick={onClose}
            aria-label={copy(language, 'close')}
          >
            <X size={20} />
          </button>
        </div>
        <form className="memory-form" onSubmit={onSubmit}>
          <label>
            {copy(language, 'email')}
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label>
            {copy(language, 'password')}
            <input
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <p className="memory-storage-note">
            {copy(language, 'passwordHint')}
          </p>
          <button className="auth-text-button" type="button" onClick={onForgotPassword}>{copy(language, 'forgotPassword')}</button>
          {error && <p className="memory-save-error">{error}</p>}
          <div className="memory-form-actions">
            <button
              className="memory-cancel-button"
              type="button"
              onClick={onClose}
            >
              {copy(language, 'cancel')}
            </button>
            <button className="memory-save-button" type="submit" disabled={busy}>
              {busy ? copy(language, 'signingIn') : copy(language, 'signIn')}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function ForgotPasswordDialog({
  open,
  email,
  onEmailChange,
  error,
  message,
  busy,
  onClose,
  onSubmit,
}) {
  const language = useLanguage()
  if (!open) return null

  return (
    <div className="memory-dialog-backdrop">
      <section
        className="memory-dialog password-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        <div className="memory-dialog-heading">
          <div>
            <Eyebrow>{copy(language, 'accountHelp')}</Eyebrow>
            <h2 id="forgot-password-title">{copy(language, 'resetPassword')}</h2>
          </div>
          <button
            type="button"
            className="memory-dialog-close"
            onClick={onClose}
            aria-label={copy(language, 'close')}
          >
            <X size={20} />
          </button>
        </div>
        <form className="memory-form" onSubmit={onSubmit}>
          <p className="memory-storage-note">
            {copy(language, 'resetHelp')}
          </p>
          <label>
            {copy(language, 'email')}
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              autoComplete="email"
              required
            />
          </label>
          {message && <p className="password-success-message">{message}</p>}
          {error && <p className="memory-save-error">{error}</p>}
          <div className="memory-form-actions">
            <button
              className="memory-cancel-button"
              type="button"
              onClick={onClose}
            >
              {copy(language, 'backToSignIn')}
            </button>
            <button className="memory-save-button" type="submit" disabled={busy}>
              {busy ? copy(language, 'sending') : copy(language, 'sendReset')}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function PasswordDialog({
  open,
  mode,
  currentPassword,
  newPassword,
  confirmPassword,
  error,
  busy,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onClose,
  onSubmit,
}) {
  const language = useLanguage()
  if (!open) return null
  const recovery = mode === 'recovery'

  return (
    <div className="memory-dialog-backdrop">
      <section
        className="memory-dialog password-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-title"
      >
        <div className="memory-dialog-heading">
          <div>
            <Eyebrow>{copy(language, 'ownerAccess')}</Eyebrow>
            <h2 id="password-title">{recovery ? copy(language, 'choosePassword') : copy(language, 'changePassword')}</h2>
          </div>
          {!recovery && (
            <button type="button" className="memory-dialog-close" onClick={onClose} aria-label={copy(language, 'close')}>
              <X size={20} />
            </button>
          )}
        </div>
        <form className="memory-form" onSubmit={onSubmit}>
          {!recovery && (
            <label>
              {copy(language, 'currentPassword')}
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => onCurrentPasswordChange(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
          )}
          <label>
            {copy(language, 'newPassword')}
            <input
              type="password"
              value={newPassword}
              onChange={(event) => onNewPasswordChange(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <label>
            {copy(language, 'confirmPassword')}
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <p className="memory-storage-note">{copy(language, 'passwordRule')}</p>
          {error && <p className="memory-save-error">{error}</p>}
          <div className="memory-form-actions">
            {!recovery && <button className="memory-cancel-button" type="button" onClick={onClose}>{copy(language, 'cancel')}</button>}
            <button className="memory-save-button" type="submit" disabled={busy}>
              {busy ? copy(language, 'saving') : copy(language, 'saveNewPassword')}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function ProfileDialog({
  open,
  email,
  onClose,
  onChangePassword,
  onSignOut,
}) {
  const language = useLanguage()
  if (!open) return null

  return (
    <div className="memory-dialog-backdrop">
      <section
        className="memory-dialog profile-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <div className="memory-dialog-heading">
          <div>
            <Eyebrow>{copy(language, 'yourAccount')}</Eyebrow>
            <h2 id="profile-title">{copy(language, 'profile')}</h2>
          </div>
          <button
            type="button"
            className="memory-dialog-close"
            onClick={onClose}
            aria-label={copy(language, 'close')}
          >
            <X size={20} />
          </button>
        </div>
        <div className="profile-details">
          <span className="profile-avatar">
            {email?.charAt(0)?.toUpperCase() || 'M'}
          </span>
          <div>
            <span className="profile-label">{copy(language, 'signedInAs')}</span>
            <strong>{email}</strong>
          </div>
        </div>
        <div className="profile-actions">
          <button
            className="memory-save-button"
            type="button"
            onClick={onChangePassword}
          >
            {copy(language, 'changePassword')}
          </button>
          <button
            className="memory-cancel-button"
            type="button"
            onClick={onSignOut}
          >
            {copy(language, 'signOut')}
          </button>
        </div>
      </section>
    </div>
  )
}

function DestinationEditor({
  open,
  destination,
  imageFile,
  error,
  busy,
  databaseConnected,
  onChange,
  onImageChange,
  onClose,
  onSave,
}) {
  const language = useLanguage()
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile)
      setImagePreview(previewUrl)
      return () => URL.revokeObjectURL(previewUrl)
    }

    setImagePreview('')
    return undefined
  }, [imageFile])

  if (!open || !destination) return null

  const currentImage = destination.image
    ? destination.image.startsWith('http')
      ? destination.image
      : photo(destination.image, 900)
    : photo('photo-1524231757912-21f4fe3a7200', 900)

  return (
    <div className="memory-dialog-backdrop">
      <section
        className="memory-dialog destination-editor-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="destination-editor-title"
      >
        <div className="memory-dialog-heading">
          <div>
            <Eyebrow>{copy(language, 'destinationCard')}</Eyebrow>
            <h2 id="destination-editor-title">{copy(language, 'editDestination')}</h2>
          </div>
          <button type="button" className="memory-dialog-close" onClick={onClose} aria-label={copy(language, 'closeEditor')}>
            <X size={20} />
          </button>
        </div>
        <form className="memory-form" onSubmit={onSave}>
          <label>
            {copy(language, 'destinationName')}
            <input name="country" value={destination.country} onChange={onChange} required />
          </label>
          <label>
            {copy(language, 'destinationNameTr')}
            <input name="countryTr" value={destination.countryTr || ''} onChange={onChange} required />
          </label>
          <label>
            {copy(language, 'cardWriting')}
            <input
              name="note"
              value={destination.note}
              onChange={onChange}
              placeholder={copy(language, 'cardWritingHint')}
            />
          </label>
          <label>
            {copy(language, 'cardWritingTr')}
            <input name="noteTr" value={destination.noteTr || ''} onChange={onChange} />
          </label>
          <label>
            {copy(language, 'topLabel')}
            <input
              name="count"
              value={destination.count}
              onChange={onChange}
              placeholder="01 STORY"
            />
          </label>
          <label>
            {copy(language, 'topLabelTr')}
            <input name="countTr" value={destination.countTr || ''} onChange={onChange} />
          </label>
          <div className="cover-photo-editor">
            <div className="cover-photo-preview">
              <img src={imagePreview || currentImage} alt="Destination cover preview" />
            </div>
            <div className="cover-photo-controls">
              <label>
                {copy(language, 'destinationPicture')} <span className="optional-label">(JPG, PNG, WebP)</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={onImageChange}
                  disabled={!databaseConnected}
                />
              </label>
              <p className="memory-storage-note">
                {copy(language, 'destinationUploadHint')}
              </p>
            </div>
          </div>
          {!databaseConnected && (
            <p className="memory-storage-note">
              {copy(language, 'shareDestinationHint')}
            </p>
          )}
          {error && <p className="memory-save-error">{error}</p>}
          <div className="memory-form-actions">
            <button className="memory-cancel-button" type="button" onClick={onClose}>
              {copy(language, 'cancel')}
            </button>
            <button className="memory-save-button" type="submit" disabled={busy}>
              {busy ? copy(language, 'saving') : copy(language, 'saveDestination')}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

function pageFromHash() {
  const hash = window.location.hash
  if (hash === '#about') return { type: 'about' }
  if (hash.startsWith('#post/')) {
    return {
      type: 'post',
      id: decodeURIComponent(hash.slice('#post/'.length)),
    }
  }
  return { type: 'home' }
}

function AboutPage() {
  const language = useLanguage()

  return (
    <section className="about-page">
      <a className="text-link" href="#stories">
        <ArrowLeft size={15} /> {copy(language, 'backJournal')}
      </a>
      <div className="about-band">
        <div className="about-icon">
          <Compass size={29} />
        </div>
        <div className="about-copy">
          <Eyebrow>{copy(language, 'noteFromRoad')}</Eyebrow>
          <h1>{copy(language, 'aboutHeadline')}</h1>
          <p>{copy(language, 'aboutText')}</p>
          <a className="text-link" href="#stories">
            {copy(language, 'exploreJournalLink')} <ArrowRight size={15} />
          </a>
        </div>
        <div className="about-photo">
          <img
            src={photo('photo-1512470876302-972faa2aa9a4', 1000)}
            alt="Amsterdam canal houses on a sunny day"
            loading="lazy"
          />
          <span>{language === 'tr' ? 'Amsterdam, Hollanda' : 'Amsterdam, Netherlands'}</span>
        </div>
      </div>
    </section>
  )
}

function BlogPostPage({ post, canEdit, onEdit, onDelete }) {
  const language = useLanguage()

  if (!post) {
    return (
      <section className="blog-post-page blog-post-missing">
        <h1>{copy(language, 'storyNotFound')}</h1>
        <a className="text-link" href="#stories">
          {copy(language, 'backJournal')} <ArrowLeft size={15} />
        </a>
      </section>
    )
  }

  const coverImage = post.image?.startsWith('http')
    ? post.image
    : photo(post.image || 'photo-1470770841072-f978cf4d019e', 1200)
  const paragraphs = post.body?.split(/\n\s*\n/).filter(Boolean) || []

  return (
    <article className="blog-post-page">
      <a className="text-link blog-post-back" href="#stories">
        <ArrowLeft size={15} /> {copy(language, 'backJournal')}
      </a>
      <div className="blog-post-heading">
        <Eyebrow>{post.typeLabel || categoryLabel(language, post.type)} · {post.place}</Eyebrow>
        <h1>{post.title}</h1>
        <span>{post.date}</span>
      </div>
      <div className="blog-post-cover">
        <img src={coverImage} alt={`${post.place} cover`} />
      </div>
      <div className="blog-post-body">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={`${post.id}-paragraph-${index}`}>{paragraph}</p>
          ))
        ) : (
          <p className="blog-post-empty">
            {copy(language, 'blogEmpty')} {canEdit ? copy(language, 'editToAdd') : ''}
          </p>
        )}
        {post.route && (
          <div className="tokyo-route">
            <span>{copy(language, 'onOurRoute')}</span>
            <p>{post.route}</p>
          </div>
        )}
        {(
          <div className="blog-post-actions">
            <button className="edit-memory-button" onClick={() => onEdit(post)}>
              {copy(language, 'editThisPost')} <ArrowRight size={15} />
            </button>
            <button className="delete-memory-button" onClick={() => onDelete(post)}>
              {copy(language, 'deletePost')}
            </button>
          </div>
        )}
      </div>
      {post.gallery?.length > 0 && (
        <div className="memory-gallery blog-post-gallery">
          {post.gallery.map((image, index) => (
            <figure key={`${post.id}-photo-${index}`}>
              <img src={image} alt={`${post.place} travel photo ${index + 1}`} />
            </figure>
          ))}
        </div>
      )}
    </article>
  )
}

function App() {
  const [category, setCategory] = useState('Everything')
  const [currentPage, setCurrentPage] = useState(pageFromHash)
  const [language, setLanguage] = useState(initialLanguage)
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [memories, setMemories] = useState(readMemories)
  const [hiddenPostIds, setHiddenPostIds] = useState(readHiddenPostIds)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteBusy, setDeleteBusy] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [destinationOverrides, setDestinationOverrides] = useState(
    readDestinationOverrides,
  )
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saveError, setSaveError] = useState('')
  const [formData, setFormData] = useState(emptyMemory())
  const [photoFile, setPhotoFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  const [destinationEditorOpen, setDestinationEditorOpen] = useState(false)
  const [destinationForm, setDestinationForm] = useState(null)
  const [destinationImageFile, setDestinationImageFile] = useState(null)
  const [destinationError, setDestinationError] = useState('')
  const [destinationBusy, setDestinationBusy] = useState(false)
  const [destinationDatabaseError, setDestinationDatabaseError] = useState('')
  const [databaseStatus, setDatabaseStatus] = useState(
    isSupabaseConfigured ? 'connecting' : 'local',
  )
  const [databaseError, setDatabaseError] = useState('')
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInError, setSignInError] = useState('')
  const [signInBusy, setSignInBusy] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [forgotPasswordError, setForgotPasswordError] = useState('')
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('')
  const [forgotPasswordBusy, setForgotPasswordBusy] = useState(false)
  const [passwordDialogMode, setPasswordDialogMode] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordBusy, setPasswordBusy] = useState(false)
  const [passwordNotice, setPasswordNotice] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(languageStorageKey, language)
    } catch {
      // Keep the selected language for this visit if storage is unavailable.
    }
  }, [language])

  useEffect(() => {
    function handleHashChange() {
      setCurrentPage(pageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (currentPage.type !== 'home') {
      window.scrollTo({ top: 0 })
      return
    }

    const targetId = window.location.hash.slice(1)
    requestAnimationFrame(() => {
      if (targetId && targetId !== 'top') {
        document.getElementById(targetId)?.scrollIntoView()
      } else {
        window.scrollTo({ top: 0 })
      }
    })
  }, [currentPage])
  
  useEffect(() => {
    if (!supabase) return undefined

    let active = true

    async function loadDatabaseMemories() {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('memory_date', { ascending: false })

      if (!active) return
      if (error) {
        setDatabaseStatus('error')
        setDatabaseError(error.message)
        return
      }

      const savedMemories = data.map(memoryFromRow)
      const { data: hiddenRows, error: hiddenError } = await supabase
        .from('journal_hidden_posts')
        .select('post_id')
      if (hiddenError) {
        setDatabaseError(hiddenError.message)
      } else {
        setHiddenPostIds(hiddenRows.map((row) => row.post_id))
      }
      const savedIds = new Set(savedMemories.map((memory) => memory.id))
      let browserMemories = []

      try {
        const stored = window.localStorage.getItem(memoryStorageKey)
        if (stored) {
          browserMemories = JSON.parse(stored)
            .filter((memory) => !savedIds.has(memory.id))
            .map((memory) => ({ ...memory, localOnly: true }))
        }
      } catch {
        browserMemories = []
      }

      const visibleIds = new Set([
        ...savedIds,
        ...browserMemories.map((memory) => memory.id),
      ])
      const builtInMemories = initialMemories.filter(
        (memory) => !visibleIds.has(memory.id),
      )

      setMemories([...savedMemories, ...browserMemories, ...builtInMemories])
      setDatabaseStatus('connected')
      setDatabaseError('')
    }

    async function loadDatabaseDestinations() {
      const { data, error } = await supabase
        .from('journal_destinations')
        .select('*')

      if (!active) return
      if (error) {
        setDestinationDatabaseError(error.message)
        return
      }

      setDestinationOverrides(data.map(destinationFromRow))
      setDestinationDatabaseError('')
    }

    async function updateAdminStatus(currentSession) {
      if (!active) return
      setSession(currentSession)

      if (!currentSession?.user || !supabase) {
        setIsAdmin(false)
        return
      }

      const { data, error } = await supabase
        .from('journal_admins')
        .select('user_id')
        .eq('user_id', currentSession.user.id)
        .maybeSingle()

      if (active) setIsAdmin(Boolean(data) && !error)
    }

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!active) return
      void updateAdminStatus(currentSession)
      void loadDatabaseMemories()
      void loadDatabaseDestinations()
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession)
        if (event === 'PASSWORD_RECOVERY') {
          setSignInOpen(false)
          setForgotPasswordOpen(false)
          setPasswordError('')
          setPasswordDialogMode('recovery')
        }
        window.setTimeout(() => {
          void updateAdminStatus(currentSession)
        }, 0)
      },
    )

    return () => {
      active = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const allStories = useMemo(() => {
    const savedById = new Map(memories.map((memory) => [memory.id, memory]))
    const existingPosts = stories.filter((story) => !hiddenPostIds.includes(story.id)).map((story) => {
      const savedPost = savedById.get(story.id)
      const mergedStory = savedPost
        ? {
            ...story,
            ...savedPost,
            titleEn: savedPost.title,
            placeEn: savedPost.place,
            bodyEn: savedPost.body,
            excerptEn: savedPost.excerpt,
            routeEn: savedPost.route,
            isMemory: true,
            read: savedPost.localOnly ? 'Saved in this browser' : 'Your blog post',
            date: formatMemoryDate(savedPost.date),
          }
        : story
      return localizeStory(mergedStory, language)
    })
    const extraMemories = memories
      .filter((memory) => !hiddenPostIds.includes(memory.id))
      .filter((memory) => !stories.some((story) => story.id === memory.id))
      .map((memory) => ({
        ...localizeStory(memory, language),
        isMemory: true,
        read: memory.localOnly ? 'Saved in this browser' : 'Your memory',
        date: formatMemoryDate(memory.date),
      }))
    return [...existingPosts, ...extraMemories]
  }, [memories, hiddenPostIds, language])

  const shownStories = useMemo(
    () =>
      allStories.filter((story) => {
        const matchesCategory =
          category === 'Everything' || story.type === category
        const searchText = `${story.title} ${story.place}`.toLowerCase()
        const matchesSearch = searchText.includes(query.toLowerCase())

        return matchesCategory && matchesSearch
      }),
    [allStories, category, query],
  )

  const displayedDestinations = useMemo(() => {
    const savedById = new Map(
      destinationOverrides.map((destination) => [destination.id, destination]),
    )
    return destinations.map((destination) => {
      const saved = savedById.get(destination.id)
      const country = saved?.country || destination.country
      const note = saved?.note || destination.note
      const count = saved?.count || destination.count
      const countryTr = saved?.countryTr || destination.countryTr
      const noteTr = saved?.noteTr || destination.noteTr
      const countTr = saved?.countTr || destination.countTr || (count === 'NEW DESTINATION' ? copy(language, 'newDestination') : copy(language, 'storyBadge'))

      return {
        ...destination,
        ...saved,
        countryEn: country,
        noteEn: note,
        countEn: count,
        countryTr,
        noteTr,
        countTr,
        country: language === 'tr' ? countryTr || country : country,
        note: language === 'tr' ? noteTr || note : note,
        count: language === 'tr' ? countTr || count : count,
      }
    })
  }, [destinationOverrides, language])
  const canEditContent = isAdmin || !isSupabaseConfigured

  function openNewMemory() {
    if (isSupabaseConfigured && !isAdmin) {
      setSignInOpen(true)
      return
    }

    setEditingId(null)
    setSaveError('')
    setPhotoFile(null)
    setGalleryFiles([])
    setFormData(emptyMemory())
    setEditorOpen(true)
  }

  function openEditMemory(memory) {
    if (isSupabaseConfigured && !isAdmin) {
      setSignInOpen(true)
      return
    }

    setEditingId(memory.id)
    setSaveError('')
    setPhotoFile(null)
    setGalleryFiles([])
    setFormData({
      title: memory.titleEn || memory.title,
      titleTr: memory.titleTr || '',
      place: memory.placeEn || memory.place,
      placeTr: memory.placeTr || '',
      type: memory.type,
      date: dateForInput(memory.date),
      image: memory.image || '',
      body: memory.bodyEn ?? memory.body ?? '',
      bodyTr: memory.bodyTr || '',
      route: memory.routeEn ?? memory.route ?? '',
      routeTr: memory.routeTr || '',
      gallery: memory.gallery || [],
    })
    setEditorOpen(true)
  }

  function requestDeleteMemory(memory) {
    if (isSupabaseConfigured && !isAdmin) {
      setSignInOpen(true)
      return
    }
    setDeleteError('')
    setDeleteTarget(memory)
  }

  async function deleteMemory() {
    if (!deleteTarget) return
    setDeleteBusy(true)
    setDeleteError('')
    const id = deleteTarget.id
    const previousHiddenIds = hiddenPostIds

    try {
      if (isSupabaseConfigured) {
        if (!supabase || !isAdmin) {
          throw new Error('Sign in with the journal owner account to delete posts.')
        }

        const { error: hideError } = await supabase
          .from('journal_hidden_posts')
          .upsert({ post_id: id }, { onConflict: 'post_id', ignoreDuplicates: true })
        if (hideError) throw hideError

        const { error: deleteErrorFromDatabase } = await supabase
          .from('memories')
          .delete()
          .eq('id', id)
        if (deleteErrorFromDatabase) {
          await supabase.from('journal_hidden_posts').delete().eq('post_id', id)
          throw deleteErrorFromDatabase
        }
      }

      const nextMemories = memories.filter((memory) => memory.id !== id)
      const nextHiddenIds = [...new Set([...previousHiddenIds, id])]
      window.localStorage.setItem(
        memoryStorageKey,
        JSON.stringify(isSupabaseConfigured ? nextMemories.filter((memory) => memory.localOnly) : nextMemories),
      )
      window.localStorage.setItem(hiddenPostStorageKey, JSON.stringify(nextHiddenIds))
      setMemories(nextMemories)
      setHiddenPostIds(nextHiddenIds)
      setDeleteTarget(null)
      setCurrentPage({ type: 'home' })
      window.location.hash = '#stories'
    } catch (error) {
      setDeleteError(error.message || 'Could not delete this blog post.')
    } finally {
      setDeleteBusy(false)
    }
  }

  function updateField(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handlePhotoChange(event) {
    setPhotoFile(event.target.files?.[0] || null)
  }

  function handleGalleryChange(event) {
    const files = Array.from(event.target.files || [])
    const existingCount = (formData.gallery || []).length

    if (files.length + existingCount > 6) {
      setSaveError(`You can add up to ${6 - existingCount} more gallery photos.`)
      event.target.value = ''
      return
    }

    setSaveError('')
    setGalleryFiles(files)
  }

  function removeGalleryPhoto(indexToRemove) {
    setFormData((current) => ({
      ...current,
      gallery: (current.gallery || []).filter((_, index) => index !== indexToRemove),
    }))
  }

  function removeGalleryFile(indexToRemove) {
    setGalleryFiles((files) => files.filter((_, index) => index !== indexToRemove))
  }

  async function saveMemory(event) {
    event.preventDefault()
    setSaveError('')

    const existingMemory = memories.find((memory) => memory.id === editingId)
    const memoryId = editingId || `memory-${crypto.randomUUID()}`
    let image =
      formData.image ||
      existingMemory?.image ||
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85'
    const gallery = [...(formData.gallery || [])]

    try {
      if (isSupabaseConfigured) {
        if (!supabase || !isAdmin) {
          throw new Error('Sign in with the journal owner account to save changes.')
        }

        if (photoFile) {
          const preparedPhoto = await preparePortraitPhoto(photoFile)
          if (preparedPhoto.size > 8 * 1024 * 1024) {
            throw new Error('Choose a photo smaller than 8 MB.')
          }

          const safeName = preparedPhoto.name.replace(/[^a-zA-Z0-9._-]/g, '-')
          const filePath = `${memoryId}/${Date.now()}-${safeName}`
          const { data: upload, error: uploadError } = await supabase.storage
            .from(photoBucket)
            .upload(filePath, preparedPhoto, {
              cacheControl: '3600',
              contentType: preparedPhoto.type,
              upsert: false,
            })

          if (uploadError) throw uploadError
          image = supabase.storage.from(photoBucket).getPublicUrl(upload.path)
            .data.publicUrl
        }

        if (gallery.length + galleryFiles.length > 6) {
          throw new Error('A post can have up to 6 gallery photos.')
        }

        for (const [index, file] of galleryFiles.entries()) {
          const preparedPhoto = await preparePortraitPhoto(file)
          if (preparedPhoto.size > 8 * 1024 * 1024) {
            throw new Error(`${file.name} is larger than 8 MB.`)
          }

          const safeName = preparedPhoto.name.replace(/[^a-zA-Z0-9._-]/g, '-')
          const filePath = `${memoryId}/gallery/${Date.now()}-${index}-${safeName}`
          const { data: upload, error: uploadError } = await supabase.storage
            .from(photoBucket)
            .upload(filePath, preparedPhoto, {
              cacheControl: '3600',
              contentType: preparedPhoto.type,
              upsert: false,
            })

          if (uploadError) throw uploadError
          gallery.push(
            supabase.storage.from(photoBucket).getPublicUrl(upload.path).data.publicUrl,
          )
        }
      }

      const memory = {
        ...existingMemory,
        ...formData,
        id: memoryId,
        image,
        gallery,
        excerpt: excerptFrom(formData.body),
        localOnly: false,
      }

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('memories')
          .upsert(memoryToRow(memory), { onConflict: 'id' })
        if (error) throw error
      } else {
        const alreadySaved = memories.some((item) => item.id === memoryId)
        const nextMemories = alreadySaved
          ? memories.map((item) => (item.id === editingId ? memory : item))
          : [...memories, memory]
        window.localStorage.setItem(
          memoryStorageKey,
          JSON.stringify(nextMemories),
        )
      }

      const alreadySaved = memories.some((item) => item.id === memoryId)
      const nextMemories = alreadySaved
        ? memories.map((item) => (item.id === editingId ? memory : item))
        : [...memories, memory]
      setMemories(nextMemories)
      setPhotoFile(null)
      setGalleryFiles([])
      setEditorOpen(false)
    } catch (error) {
      setSaveError(error.message || 'Could not save this memory. Please try again.')
    }
  }

  async function signIn(event) {
    event.preventDefault()
    setSignInError('')
    setSignInBusy(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      })
      if (error) throw error

      const { data: adminRecord, error: roleError } = await supabase
        .from('journal_admins')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle()

      if (roleError || !adminRecord) {
        await supabase.auth.signOut()
        throw new Error('This account has not been given journal editing access.')
      }

      setSession(data.session)
      setIsAdmin(true)
      setSignInOpen(false)
      setSignInPassword('')
    } catch (error) {
      setSignInError(error.message || 'Could not sign in. Please try again.')
    } finally {
      setSignInBusy(false)
    }
  }

  async function requestPasswordReset(event) {
    event.preventDefault()
    setForgotPasswordError('')
    setForgotPasswordMessage('')
    setForgotPasswordBusy(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(signInEmail.trim(), {
        redirectTo: `${window.location.origin}${window.location.pathname}`,
      })
      if (error) throw error
      setForgotPasswordMessage(
        'If an account exists for this email, Supabase will send a reset link. Check your inbox and spam folder.',
      )
    } catch (error) {
      setForgotPasswordError(error.message || 'Could not send the reset email. Please try again.')
    } finally {
      setForgotPasswordBusy(false)
    }
  }

  async function updatePassword(event) {
    event.preventDefault()
    setPasswordError('')

    if (newPassword.length < 8) {
      setPasswordError('Choose a password with at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('The new passwords do not match.')
      return
    }

    setPasswordBusy(true)
    try {
      const attributes = { password: newPassword }
      if (passwordDialogMode === 'change') {
        attributes.current_password = currentPassword
      }
      const { error } = await supabase.auth.updateUser(attributes)
      if (error) throw error

      const wasRecovery = passwordDialogMode === 'recovery'
      setPasswordDialogMode(null)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordNotice(wasRecovery ? 'Your password has been reset. You can now sign in.' : 'Your password has been changed.')
      if (wasRecovery) await supabase.auth.signOut()
      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (error) {
      setPasswordError(error.message || 'Could not update your password. Please try again.')
    } finally {
      setPasswordBusy(false)
    }
  }

  async function signOut() {
    await supabase?.auth.signOut()
    setSession(null)
    setIsAdmin(false)
  }
  function toggleSaved(title) {
    setSaved((items) =>
      items.includes(title)
        ? items.filter((item) => item !== title)
        : [...items, title],
    )
  }

  function clearFilters() {
    setQuery('')
    setCategory('Everything')
  }

  function openDestinationEditor(destination) {
    if (isSupabaseConfigured && !isAdmin) {
      setSignInError('')
      setSignInOpen(true)
      return
    }

    setDestinationError('')
    setDestinationImageFile(null)
    setDestinationForm({
      ...destination,
      country: destination.countryEn || destination.country,
      note: destination.noteEn || destination.note,
      count: destination.countEn || destination.count,
      countryTr: destination.countryTr || '',
      noteTr: destination.noteTr || '',
      countTr: destination.countTr || '',
    })
    setDestinationEditorOpen(true)
  }

  function updateDestinationField(event) {
    const { name, value } = event.target
    setDestinationForm((current) => ({ ...current, [name]: value }))
  }

  function handleDestinationImageChange(event) {
    setDestinationImageFile(event.target.files?.[0] || null)
  }

  async function saveDestination(event) {
    event.preventDefault()
    setDestinationError('')
    setDestinationBusy(true)

    try {
      let image = destinationForm.image || ''

      if (isSupabaseConfigured) {
        if (!supabase || !isAdmin) {
          throw new Error('Sign in with the journal owner account to save destination changes.')
        }

        if (destinationImageFile) {
          const preparedPhoto = await preparePortraitPhoto(destinationImageFile)
          if (preparedPhoto.size > 8 * 1024 * 1024) {
            throw new Error('Choose a destination photo smaller than 8 MB.')
          }

          const safeName = preparedPhoto.name.replace(/[^a-zA-Z0-9._-]/g, '-')
          const filePath = `destinations/${destinationForm.id}/${Date.now()}-${safeName}`
          const { data: upload, error: uploadError } = await supabase.storage
            .from(photoBucket)
            .upload(filePath, preparedPhoto, {
              cacheControl: '3600',
              contentType: preparedPhoto.type,
              upsert: false,
            })

          if (uploadError) throw uploadError
          image = supabase.storage.from(photoBucket).getPublicUrl(upload.path).data.publicUrl
        }

        const updatedDestination = { ...destinationForm, image }
        const { error } = await supabase
          .from('journal_destinations')
          .upsert(destinationToRow(updatedDestination), { onConflict: 'id' })
        if (error) throw error
        setDestinationOverrides((current) => [
          ...current.filter((item) => item.id !== updatedDestination.id),
          updatedDestination,
        ])
        setDestinationDatabaseError('')
      } else {
        const updatedDestination = { ...destinationForm, image }
        const nextOverrides = [
          ...destinationOverrides.filter((item) => item.id !== updatedDestination.id),
          updatedDestination,
        ]
        window.localStorage.setItem(destinationStorageKey, JSON.stringify(nextOverrides))
        setDestinationOverrides(nextOverrides)
      }

      setDestinationImageFile(null)
      setDestinationEditorOpen(false)
    } catch (error) {
      setDestinationError(error.message || 'Could not save this destination.')
    } finally {
      setDestinationBusy(false)
    }
  }

  return (
    <LanguageContext.Provider value={language}>
    <div className="min-h-screen bg-[#faf9f6] text-[#24241f]">
      <header className="site-header">
        <Brand />

        <div className="language-switch" aria-label="Language">
          <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          <span>/</span>
          <button type="button" aria-pressed={language === 'tr'} onClick={() => setLanguage('tr')}>TR</button>
        </div>

        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
          <a
            className="nav-link active"
            href="#stories"
            onClick={() => setMenuOpen(false)}
          >
            {copy(language, 'journal')}
          </a>
          <a
            className="nav-link"
            href="#destinations"
            onClick={() => setMenuOpen(false)}
          >
            {copy(language, 'destinations')}
          </a>
          <a
            className="nav-link"
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            {copy(language, 'about')}
          </a>
        </nav>

        <a className="header-cta" href="#newsletter">
          {copy(language, 'newsletterLink')} <ArrowUpRight size={15} />
        </a>
        {isSupabaseConfigured && (
          <button
            className="database-auth-button"
            onClick={() => {
              if (isAdmin) {
                setProfileOpen(true)
              } else {
                setSignInError('')
                setSignInOpen(true)
              }
            }}
          >
            {copy(language, isAdmin ? 'profile' : 'signIn')}
          </button>
        )}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        {currentPage.type === 'home' ? (
          <>
        <section className="hero-wrap">
          <div className="hero-copy">
            <Eyebrow>{copy(language, 'aJournal')}</Eyebrow>
            <h1>{language === 'tr' ? <>Kendine ait<br /><em>bir yer bul.</em></> : <>Find your<br /><em>somewhere.</em></>}</h1>
            <p className="hero-text">
              {copy(language, 'heroText')}
            </p>
            <a className="round-link" href="#stories">
              <span>{copy(language, 'exploreJournal')}</span>
              <span className="round-icon">
                <ArrowDown size={17} />
              </span>
            </a>
            <div className="hero-note">
              <span className="tiny-spark">
                <Sparkles size={15} />
              </span>
              {copy(language, 'heroNote')}
            </div>
          </div>

          <div className="hero-art">
            <div
              className="hero-image"
              role="img"
              aria-label="Paris rooftops at golden hour"
            />
            <div className="image-label">
              <span className="label-dot" />
              Paris, France <span className="label-divider">/</span> 48°51' N,
              2°21' E
            </div>
            <div className="hero-stamp">
              <span>
                TAKE
                <br />
                THE
              </span>
              <strong>
                SCENIC
                <br />
                ROUTE
              </strong>
              <ArrowDown size={17} />
            </div>
            <div className="hero-index">
              VOL. 04 <span>—</span> 2024
            </div>
          </div>
        </section>

        <section className="ticker">
              <span>{copy(language, 'goDay')}</span>
          <span className="ticker-star">✳</span>
              <span>{copy(language, 'scenic')}</span>
          <span className="ticker-star">✳</span>
              <span>{copy(language, 'linger')}</span>
          <span className="ticker-star">✳</span>
              <span>{copy(language, 'goDay')}</span>
        </section>

        <section id="destinations" className="destinations-section">
          <div className="section-head">
            <div>
              <Eyebrow>{copy(language, 'worldPossibilities')}</Eyebrow>
              <h2>
                {copy(language, 'whereNext')}
              </h2>
            </div>
            <p className="section-aside">
              {copy(language, 'smallGuides')}
            </p>
          </div>

          <div className="destination-grid">
            {displayedDestinations.map((destination, index) => (
              <div
                className="destination-card-wrap"
                key={destination.id}
              >
                <a
                  className={`destination-card dest-${index + 1}`}
                  href="#stories"
                  onClick={() => {
                    setQuery(destination.country.split(',')[0])
                    setCategory('Everything')
                  }}
                >
                  <img
                    src={
                      destination.image.startsWith('http')
                        ? destination.image
                        : photo(destination.image, 700)
                    }
                    alt={`${destination.country} travel scene`}
                    loading="lazy"
                  />
                  <div className="dest-shade" />
                  <span className="dest-count">{destination.count}</span>
                  <div className="dest-bottom">
                    <div>
                    <span className="dest-note">{destination.note}</span>
                      <h3>{destination.country}</h3>
                    </div>
                    <span className="dest-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </a>
                {canEditContent && (
                  <button
                    className="destination-edit-button"
                    onClick={() => openDestinationEditor(destination)}
                  >
                    {copy(language, 'editDestination')}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="destination-foot">
            <span>
              <Globe2 size={15} /> {displayedDestinations.length} {copy(language, 'destinationCount')}
            </span>
            <a href="#stories">
              {copy(language, 'allDestinations')} <ArrowRight size={15} />
            </a>
          </div>
          {isAdmin && destinationDatabaseError && (
            <p className="destination-database-error">
              {copy(language, 'destinationDatabase')}
            </p>
          )}
        </section>

        <section id="stories" className="stories-section">
          <div className="section-head stories-head">
            <div>
              <Eyebrow>{copy(language, 'notesOutThere')}</Eyebrow>
              <h2>
                {copy(language, 'latestDispatches')}
              </h2>
              <button className="write-memory-button" onClick={openNewMemory}>
                {copy(language, 'writeMemory')} <ArrowUpRight size={15} />
              </button>
              {passwordNotice && <p className="password-success-message">{passwordNotice}</p>}
              {isSupabaseConfigured && (
                <p className={`database-status status-${databaseStatus}`} title={databaseError || undefined}>
                  {databaseStatus === 'connected'
                    ? copy(language, 'databaseOnline')
                    : databaseStatus === 'error'
                      ? copy(language, 'databaseSetup')
                      : copy(language, 'databaseConnecting')}
                </p>
              )}
            </div>
            <div className="search-wrap">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy(language, 'findPlace')}
                aria-label={copy(language, 'findPlace')}
              />
              {query && (
                <button aria-label={copy(language, 'clearSearch')} onClick={() => setQuery('')}>
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="filter-row" role="tablist">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-chip ${category === item ? 'selected' : ''}`}
                onClick={() => setCategory(item)}
                role="tab"
                aria-selected={category === item}
              >
                {categoryLabel(language, item)}
              </button>
            ))}
          </div>

          {shownStories.length > 0 ? (
            <div className="stories-grid">
              {shownStories.map((story) => {
                const storyLink = `#post/${encodeURIComponent(story.id)}`
                const isSaved = saved.includes(story.title)

                return (
                  <article
                    className="story-card"
                    key={story.isMemory ? story.id : story.title}
                  >
                    <a className="story-photo" href={storyLink}>
                      <img
                        src={
                          story.image?.startsWith('http')
                            ? story.image
                            : photo(story.image)
                        }
                        alt={story.place}
                        loading="lazy"
                      />
                      <span className="story-type">{story.typeLabel}</span>
                    </a>
                    <div className="story-meta">
                      <span>{story.place}</span>
                      <span>{story.date}</span>
                    </div>
                    <h3>
                      <a href={storyLink}>{story.title}</a>
                    </h3>
                    {story.isMemory && (
                      <p className="story-excerpt">{story.excerpt}</p>
                    )}
                    <div className="story-bottom">
                      <span>{story.read?.match(/^\d+/)?.[0]} {copy(language, 'minRead')}</span>
                      <button
                        className="story-edit-button"
                        onClick={() => openEditMemory(story)}
                      >
                        {copy(language, 'editPost')}
                      </button>
                      <button
                        className="story-delete-button"
                        onClick={() => requestDeleteMemory(story)}
                      >
                        {copy(language, 'deletePost')}
                      </button>
                      <button
                        aria-label={`${copy(language, isSaved ? 'unsaveStory' : 'saveStory')} ${story.title}`}
                        className={`save-button ${isSaved ? 'is-saved' : ''}`}
                        onClick={() => toggleSaved(story.title)}
                      >
                        <Heart
                          size={17}
                          fill={isSaved ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <Compass size={25} />
              <p>{copy(language, 'noNotes')}</p>
              <button onClick={clearFilters}>
                {copy(language, 'showAll')} <ArrowRight size={14} />
              </button>
            </div>
          )}

          <div className="more-stories">
            <span>
              {shownStories.length} {copy(language, 'fieldNotes')}{' '}
              <span className="soft-text">{copy(language, 'manyMore')}</span>
            </span>
            <a href="#newsletter">
              {copy(language, 'getStories')} <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        <section id="newsletter" className="newsletter">
          <div className="newsletter-stamp">
            A NOTE
            <br />
            FROM
            <br />
            SOMEWHERE
          </div>
          <div className="newsletter-content">
            <Eyebrow>{copy(language, 'newsletterEyebrow')}</Eyebrow>
            <h2>
              {copy(language, 'postcard')}
            </h2>
            <p>
              {copy(language, 'newsletterText')}
            </p>
            <form
              className="subscribe-form"
              onSubmit={(event) => {
                event.preventDefault()
                setSubscribed(true)
              }}
            >
              <input
                type="email"
                required
                placeholder={copy(language, 'emailPlaceholder')}
                aria-label={copy(language, 'emailAria')}
              />
              <button type="submit">
                {subscribed ? copy(language, 'joined') : copy(language, 'join')}
                <ArrowUpRight size={16} />
              </button>
            </form>
            <span className="newsletter-small">
              {copy(language, 'newsletterSmall')}
            </span>
          </div>
          <div className="newsletter-side-note">
            {copy(language, 'sentWith')}
            <br />
            <span>✳</span> FROM SOMEWHERE GOOD
          </div>
        </section>
          </>
        ) : currentPage.type === 'about' ? (
          <AboutPage />
        ) : (
          <BlogPostPage
            post={allStories.find((story) => story.id === currentPage.id)}
            canEdit
            onEdit={openEditMemory}
            onDelete={requestDeleteMemory}
          />
        )}
      </main>

      <MemoryEditor
        open={editorOpen}
        editing={Boolean(editingId)}
        editingPost={Boolean(editingId?.startsWith('post-'))}
        formData={formData}
        error={saveError}
        photoFile={photoFile}
        galleryFiles={galleryFiles}
        onPhotoChange={handlePhotoChange}
        onGalleryChange={handleGalleryChange}
        onRemoveGalleryPhoto={removeGalleryPhoto}
        onRemoveGalleryFile={removeGalleryFile}
        databaseConnected={databaseStatus === 'connected' && isAdmin}
        onChange={updateField}
        onClose={() => setEditorOpen(false)}
        onSave={saveMemory}
      />
      {deleteTarget && (
        <div className="memory-dialog-backdrop">
          <section className="memory-dialog delete-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-post-title">
            <div className="memory-dialog-heading">
              <div>
                <Eyebrow>{copy(language, 'deletePost')}</Eyebrow>
                <h2 id="delete-post-title">{copy(language, 'confirmDeleteTitle')}</h2>
              </div>
            </div>
            <p className="memory-storage-note">{copy(language, 'confirmDelete')}</p>
            {deleteError && <p className="memory-save-error">{deleteError}</p>}
            <div className="memory-form-actions">
              <button className="memory-cancel-button" type="button" onClick={() => setDeleteTarget(null)} disabled={deleteBusy}>{copy(language, 'cancel')}</button>
              <button className="delete-memory-button" type="button" onClick={deleteMemory} disabled={deleteBusy}>{deleteBusy ? copy(language, 'deleting') : copy(language, 'confirm')}</button>
            </div>
          </section>
        </div>
      )}
      <DestinationEditor
        open={destinationEditorOpen}
        destination={destinationForm}
        imageFile={destinationImageFile}
        error={destinationError}
        busy={destinationBusy}
        databaseConnected={databaseStatus === 'connected' && isAdmin}
        onChange={updateDestinationField}
        onImageChange={handleDestinationImageChange}
        onClose={() => setDestinationEditorOpen(false)}
        onSave={saveDestination}
      />
      <SignInDialog
        open={signInOpen}
        email={signInEmail}
        password={signInPassword}
        error={signInError}
        busy={signInBusy}
        onEmailChange={setSignInEmail}
        onPasswordChange={setSignInPassword}
        onClose={() => setSignInOpen(false)}
        onSubmit={signIn}
        onForgotPassword={() => {
          setForgotPasswordError('')
          setForgotPasswordMessage('')
          setSignInOpen(false)
          setForgotPasswordOpen(true)
        }}
      />
      <ProfileDialog
        open={profileOpen}
        email={session?.user?.email}
        onClose={() => setProfileOpen(false)}
        onChangePassword={() => {
          setProfileOpen(false)
          setPasswordError('')
          setPasswordDialogMode('change')
        }}
        onSignOut={() => {
          setProfileOpen(false)
          void signOut()
        }}
      />
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        email={signInEmail}
        onEmailChange={setSignInEmail}
        error={forgotPasswordError}
        message={forgotPasswordMessage}
        busy={forgotPasswordBusy}
        onClose={() => {
          setForgotPasswordOpen(false)
          setSignInOpen(true)
        }}
        onSubmit={requestPasswordReset}
      />
      <PasswordDialog
        open={Boolean(passwordDialogMode)}
        mode={passwordDialogMode}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        error={passwordError}
        busy={passwordBusy}
        onCurrentPasswordChange={setCurrentPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onClose={() => {
          setPasswordDialogMode(null)
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
        }}
        onSubmit={updatePassword}
      />

      <footer className="site-footer">
        <Brand footer />
        <span className="footer-love">{copy(language, 'footerLove')}</span>
        <div className="footer-links">
          <a href="#about">{copy(language, 'about')}</a>
          <a href="#stories">
            {copy(language, 'instagram')} <ArrowUpRight size={12} />
          </a>
          <span>© 2024 MELS JOURNAL</span>
        </div>
      </footer>
    </div>
    </LanguageContext.Provider>
  )
}

export default App
