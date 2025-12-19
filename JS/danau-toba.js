
document.addEventListener('DOMContentLoaded', function() {
  const testimoniData = [
    {
      text: "Liburan di Danau Toba sangat berkesan! Pemandangannya luar biasa dan budaya Batak sangat menarik.",
      author: "Rina, Jakarta"
    },
    {
      text: "Penginapan nyaman, makanan enak, dan suasana danau bikin betah. Pasti balik lagi!",
      author: "Andi, Medan"
    },
    {
      text: "Sangat cocok untuk healing dan foto-foto. Sunset di Tuk Tuk benar-benar indah.",
      author: "Sari, Bandung"
    },
    {
      text: "Wisata air di Danau Toba seru banget, anak-anak juga senang main di Pulau Samosir!",
      author: "Budi, Surabaya"
    },
    {
      text: "Budaya Batak dan keramahan penduduk lokal bikin pengalaman makin berkesan.",
      author: "Maya, Yogyakarta"
    }
  ];

  const list = document.getElementById('testimoni-list');
  if(list) {
    testimoniData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'testimoni-card';
      card.innerHTML = `<p>${item.text}</p><div class='testimoni-author'>${item.author}</div>`;
      list.appendChild(card);
    });
  }
});

